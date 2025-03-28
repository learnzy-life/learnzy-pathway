
import { useState, useEffect } from 'react';
import { toast } from '../../../hooks/use-toast';
import { Mood, PreRitual } from '../utils/subjectUtils';
import { saveRitualActivity } from '../../../utils/ritualService';
import { supabase } from '../../../lib/supabase';
import { Subject } from '../../../services/question/types';

export const usePreTestState = () => {
  const [mood, setMood] = useState<Mood | undefined>(undefined);
  const [ritual, setRitual] = useState<PreRitual | undefined>(undefined);
  const [ritualCompleted, setRitualCompleted] = useState(false);
  const [showRitualActivity, setShowRitualActivity] = useState(false);
  const [showPostRitualInfo, setShowPostRitualInfo] = useState(false);

  // Load previously selected mood if available
  useEffect(() => {
    const savedMood = localStorage.getItem('selected_mood');
    if (savedMood) {
      setMood(savedMood as Mood);
    }
  }, []);

  const saveMoodData = async (selectedMood: Mood) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // If logged in, save to Supabase (we'll use local storage as fallback)
      if (user) {
        await supabase.from('mood_tracking').insert({
          user_id: user.id,
          mood: selectedMood,
          timestamp: new Date().toISOString(),
          context: 'pre-test'
        });
        console.log('Mood data saved to Supabase');
      }
    } catch (error) {
      console.error('Error saving mood data:', error);
    }
  };

  const handleMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    localStorage.setItem('selected_mood', selectedMood);
    saveMoodData(selectedMood);
  };

  const handleRitualSelect = (selectedRitual: PreRitual) => {
    setRitual(selectedRitual);
    localStorage.setItem('selected_ritual', selectedRitual);

    if (selectedRitual === 'none') {
      console.log('Ritual selected as none, completing immediately');
      setRitualCompleted(true);
      setShowPostRitualInfo(true);
      toast({
        title: 'Ready to begin!',
        description: "You've chosen to skip the pre-test ritual.",
      });
    } else {
      console.log('Starting ritual activity:', selectedRitual);
      setShowRitualActivity(true);

      const toastMessages = {
        breathing: {
          title: 'Breathing Exercise Selected',
          description: 'Take deep breaths for 2 minutes to calm your mind.',
        },
        meditation: {
          title: 'Meditation Selected',
          description: 'Find a comfortable position and clear your mind for 3 minutes.',
        },
        affirmation: {
          title: 'Positive Affirmations Selected',
          description: 'Repeat confidence-building statements to boost your mindset.',
        },
      };

      const message = toastMessages[selectedRitual as keyof typeof toastMessages];
      if (message) {
        toast(message);
      }
    }
  };

  const handleRitualComplete = async (duration?: number) => {
    console.log('Ritual completed:', ritual, 'with duration:', duration);
    if (mood && ritual) {
      // Save completed ritual data
      await saveRitualActivity({
        subject: 'biology', // Use a valid Subject type as default
        ritual,
        mood,
        completedAt: new Date().toISOString(),
        duration: duration || 0
      });
    }
    
    setShowRitualActivity(false);
    setRitualCompleted(true);
    setShowPostRitualInfo(true);
  };

  return {
    mood,
    ritual,
    ritualCompleted,
    showRitualActivity,
    showPostRitualInfo,
    handleMoodSelect,
    handleRitualSelect,
    handleRitualComplete,
  };
};
