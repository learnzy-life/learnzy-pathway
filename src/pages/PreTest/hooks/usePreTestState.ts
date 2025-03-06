
import { useState } from 'react';
import { toast } from '../../../hooks/use-toast';
import { Mood, PreRitual } from '../utils/subjectUtils';

export const usePreTestState = () => {
  const [mood, setMood] = useState<Mood | undefined>(undefined);
  const [ritual, setRitual] = useState<PreRitual | undefined>(undefined);
  const [ritualCompleted, setRitualCompleted] = useState(false);
  const [showRitualActivity, setShowRitualActivity] = useState(false);
  const [showPostRitualInfo, setShowPostRitualInfo] = useState(false);

  const handleMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    localStorage.setItem('selected_mood', selectedMood);
  };

  const handleRitualSelect = (selectedRitual: PreRitual) => {
    setRitual(selectedRitual);
    localStorage.setItem('selected_ritual', selectedRitual);

    if (selectedRitual === 'none') {
      setRitualCompleted(true);
      setShowPostRitualInfo(true);
      toast({
        title: 'Ready to begin!',
        description: "You've chosen to skip the pre-test ritual.",
      });
    } else {
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

  const handleRitualComplete = () => {
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
