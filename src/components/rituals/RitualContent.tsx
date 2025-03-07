
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
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Common ambient background particles - only visible on breathing & meditation */}
      {(ritual === 'breathing' || ritual === 'meditation') && (
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-20 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Render the appropriate ritual content */}
      {(() => {
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
      })()}
    </div>
  );
};

export default RitualContent;
