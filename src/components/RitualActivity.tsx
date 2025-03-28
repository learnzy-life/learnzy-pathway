
import React, { useEffect, useState } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { useRitualTimer } from '../hooks/useRitualTimer';
import { useAudioInitialization } from '../hooks/useAudioInitialization';
import { useRitualCompletion } from '../hooks/useRitualCompletion';
import RitualContent from './rituals/RitualContent';
import RitualControls from './rituals/RitualControls';
import RitualContainer from './rituals/RitualContainer';
import RitualHeader from './rituals/RitualHeader';
import RitualContentContainer from './rituals/RitualContentContainer';
import { getRitualDuration } from '../utils/ritualUtils';

interface RitualActivityProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  mood: string;
  subject: string;
  onComplete: () => void;
}

const RitualActivity: React.FC<RitualActivityProps> = ({ ritual, mood, subject, onComplete }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  
  // Custom hooks
  const { audioError, audioEnabled, toggleAudio } = useAudioInitialization();
  
  const {
    isSpeaking,
    affirmationSpoken,
    currentAffirmationIndex,
    audioError: speechRecognitionError,
    startSpeechRecognition,
    setAffirmationSpoken
  } = useSpeechRecognition();
  
  // Initialize the useRitualCompletion hook
  const initialTime = getRitualDuration(ritual);
  const { timeLeft, step, actualDuration, resetTimer } = useRitualTimer({
    ritual,
    isActive,
    onComplete
  });
  
  // Define handleComplete callback
  const handleComplete = () => {
    console.log('Ritual completion handler called');
    if (onComplete) {
      onComplete();
    }
  };
  
  // Start automatically after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [ritual]);
  
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
  
  return (
    <RitualContainer>
      <RitualHeader ritual={ritual} />
      
      <RitualContentContainer>
        <RitualContent 
          ritual={ritual}
          step={step}
          isActive={isActive}
          audioEnabled={audioEnabled}
          timeLeft={timeLeft}
          audioError={audioError || speechRecognitionError}
          currentAffirmationIndex={currentAffirmationIndex}
          affirmationSpoken={affirmationSpoken}
          isSpeaking={isSpeaking}
          startSpeechRecognition={startSpeechRecognition}
        />
      </RitualContentContainer>
      
      <div className="p-4 md:p-6">
        <RitualControls 
          timeLeft={timeLeft}
          totalTime={initialTime}
          isActive={isActive}
          audioEnabled={audioEnabled}
          toggleActivity={toggleActivity}
          resetActivity={resetActivity}
          toggleAudio={toggleAudio}
          handleComplete={handleComplete}
        />
      </div>
    </RitualContainer>
  );
};

export default RitualActivity;
