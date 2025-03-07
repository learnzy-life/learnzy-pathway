
import React from 'react';
import BreathingExercise from './BreathingExercise';
import Meditation from './Meditation';
import Affirmation from './Affirmation';

interface RitualContentProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  step: number;
  isActive: boolean;
  audioEnabled: boolean;
  timeLeft: number;
  audioError: boolean;
  currentAffirmationIndex: number;
  affirmationSpoken: boolean;
  isSpeaking: boolean;
  startSpeechRecognition: () => void;
}

const RitualContent: React.FC<RitualContentProps> = ({
  ritual,
  step,
  isActive,
  audioEnabled,
  timeLeft,
  audioError,
  currentAffirmationIndex,
  affirmationSpoken,
  isSpeaking,
  startSpeechRecognition
}) => {
  switch (ritual) {
    case 'breathing':
      return <BreathingExercise step={step} isActive={isActive && audioEnabled} />;
    case 'meditation':
      return <Meditation isActive={isActive && audioEnabled} timeLeft={timeLeft} audioError={audioError} />;
    case 'affirmation':
      return (
        <Affirmation 
          currentAffirmationIndex={currentAffirmationIndex}
          affirmationSpoken={affirmationSpoken}
          isSpeaking={isSpeaking}
          isActive={isActive}
          audioError={audioError}
          startSpeechRecognition={startSpeechRecognition}
        />
      );
    default:
      return null;
  }
};

export default RitualContent;
