
import React from 'react';

interface BreathingExerciseProps {
  step: number;
  isActive: boolean;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ step, isActive }) => {
  const instructions = [
    "Breathe in slowly through your nose...",
    "Hold your breath...",
    "Exhale slowly through your mouth..."
  ];
  
  return (
    <div className="text-center">
      <div className="text-4xl font-light mb-8">{instructions[step - 1]}</div>
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div 
          className={`absolute inset-0 bg-learnzy-purple/20 rounded-full 
            ${step === 1 ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}
            ${step === 2 ? 'bg-learnzy-purple/40' : ''}
            ${step === 3 ? 'animate-[pulse_4s_ease-out_infinite]' : ''}`}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-medium">
          {step === 1 ? "Inhale" : step === 2 ? "Hold" : "Exhale"}
        </div>
      </div>
      <p className="text-muted-foreground mb-4">
        Focus on your breath and clear your mind. This exercise will help reduce anxiety and improve concentration.
      </p>
      
      {isActive && (
        <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
          <p className="text-sm text-center">
            {step === 1 ? "Inhale deeply for 4 seconds" : 
             step === 2 ? "Hold your breath for 4 seconds" : 
                         "Exhale slowly for 4 seconds"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BreathingExercise;
