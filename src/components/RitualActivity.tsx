
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { getRitualDuration } from '../utils/ritualUtils';
import { saveRitualActivity } from '../utils/ritualService';
import { useRitualTimer } from '../hooks/useRitualTimer';
import RitualContent from './rituals/RitualContent';
import RitualControls from './rituals/RitualControls';

interface RitualActivityProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  mood: string;
  subject: string;
  onComplete: () => void;
}

const RitualActivity: React.FC<RitualActivityProps> = ({ ritual, mood, subject, onComplete }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  
  const {
    isSpeaking,
    affirmationSpoken,
    currentAffirmationIndex,
    audioError: speechRecognitionError,
    startSpeechRecognition,
    setAffirmationSpoken
  } = useSpeechRecognition();
  
  // Custom timer hook
  const { timeLeft, step, actualDuration, resetTimer, initialTime } = useRitualTimer({
    ritual,
    isActive,
    onComplete: handleComplete
  });
  
  useEffect(() => {
    // Test if speech synthesis is available
    if (!window.speechSynthesis) {
      setAudioError(true);
      setAudioEnabled(false);
    }
    
    if (speechRecognitionError) {
      setAudioError(true);
    }
  }, [speechRecognitionError]);
  
  useEffect(() => {
    // Start automatically after a short delay
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [ritual]);
  
  async function handleComplete() {
    // Calculate duration (how long they actually took)
    const ritualDuration = actualDuration > 0 ? actualDuration : initialTime - timeLeft;
    
    // Save the ritual activity data
    await saveRitualActivity({
      subject,
      ritual,
      mood,
      completedAt: new Date().toISOString(),
      duration: ritualDuration
    });
    
    toast({
      title: "Ritual Complete",
      description: "You're now prepared for your test. Good luck!",
    });
    
    onComplete();
  }
  
  const toggleActivity = () => {
    setIsActive(!isActive);
    
    // If pausing, cancel any ongoing speech
    if (isActive && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  
  const resetActivity = () => {
    resetTimer();
    setIsActive(false);
    setAffirmationSpoken(false);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    if (audioEnabled && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
    }
  };
  
  return (
    <div className="card-glass p-8 animate-fade-in bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-xl font-medium text-learnzy-dark mb-6 text-center">
        {ritual === 'breathing' ? 'Deep Breathing Exercise' : 
         ritual === 'meditation' ? 'Mindfulness Meditation' : 
         'Positive Affirmations'}
      </h2>
      
      <div className="mb-8">
        <RitualContent 
          ritual={ritual}
          step={step}
          isActive={isActive}
          audioEnabled={audioEnabled}
          timeLeft={timeLeft}
          audioError={audioError}
          currentAffirmationIndex={currentAffirmationIndex}
          affirmationSpoken={affirmationSpoken}
          isSpeaking={isSpeaking}
          startSpeechRecognition={startSpeechRecognition}
        />
      </div>
      
      <RitualControls 
        timeLeft={timeLeft}
        totalTime={getRitualDuration(ritual)}
        isActive={isActive}
        audioEnabled={audioEnabled}
        toggleActivity={toggleActivity}
        resetActivity={resetActivity}
        toggleAudio={toggleAudio}
        handleComplete={handleComplete}
      />
    </div>
  );
};

export default RitualActivity;
