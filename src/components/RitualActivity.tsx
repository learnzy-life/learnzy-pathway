
import React, { useEffect, useState } from 'react';
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
      toast({
        title: "Audio Guidance Unavailable",
        description: "Your browser doesn't support voice guidance. Visual guidance will still work.",
        variant: "destructive"
      });
    }
    
    if (speechRecognitionError) {
      setAudioError(true);
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition for affirmations.",
        variant: "destructive"
      });
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
    // Cancel any ongoing speech when completing
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
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
    } else if (!audioEnabled) {
      toast({
        title: "Audio Guidance Enabled",
        description: "You'll now hear voice guidance for this ritual.",
      });
    }
  };
  
  return (
    <div className="card-glass p-0 animate-fade-in overflow-hidden bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="p-4 md:p-6 pt-6 md:pt-8">
        <h2 className="text-lg md:text-xl font-medium text-white mb-4 md:mb-6 text-center">
          {ritual === 'breathing' ? 'Deep Breathing Exercise' : 
           ritual === 'meditation' ? 'Mindfulness Meditation' : 
           'Positive Affirmations'}
        </h2>
      </div>
      
      <div className="min-h-[260px] md:min-h-[320px] mb-2 md:mb-4 flex items-center justify-center relative">
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
      
      <div className="p-4 md:p-6">
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
    </div>
  );
};

export default RitualActivity;
