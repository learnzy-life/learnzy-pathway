
import React, { useEffect, useRef } from 'react';

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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const audioInstructions = {
    1: "Breathe in deeply through your nose for 4 seconds",
    2: "Now hold your breath for 4 seconds",
    3: "Exhale slowly through your mouth for 4 seconds" 
  };
  
  useEffect(() => {
    if (isActive && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance for the current step
      const utterance = new SpeechSynthesisUtterance(audioInstructions[step as keyof typeof audioInstructions]);
      utterance.rate = 0.9; // Slightly slower than normal
      utterance.pitch = 1;
      
      // Play the audio instruction
      window.speechSynthesis.speak(utterance);
    }
    
    return () => {
      // Clean up on component unmount or step change
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [step, isActive]);
  
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
      
      <audio ref={audioRef} className="hidden">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BreathingExercise;
