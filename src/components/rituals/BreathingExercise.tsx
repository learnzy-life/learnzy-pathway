
import React, { useEffect, useRef, useState } from 'react';

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
  const [animationSize, setAnimationSize] = useState<number>(100);
  
  const audioInstructions = {
    1: "Breathe in deeply through your nose for 4 seconds",
    2: "Now hold your breath for 4 seconds",
    3: "Exhale slowly through your mouth for 4 seconds" 
  };
  
  // Control the breathing animation size
  useEffect(() => {
    if (step === 1) {
      // Breathe in - expand
      setAnimationSize(140);
    } else if (step === 2) {
      // Hold - stay expanded
      setAnimationSize(140);
    } else if (step === 3) {
      // Breathe out - contract
      setAnimationSize(100);
    }
  }, [step]);
  
  useEffect(() => {
    if (isActive && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance for the current step
      const utterance = new SpeechSynthesisUtterance(audioInstructions[step as keyof typeof audioInstructions]);
      utterance.rate = 0.8; // Slower than before for a calmer pace
      utterance.pitch = 0.9; // Slightly lower pitch for relaxation
      utterance.volume = 0.9; // Slightly lower volume for gentleness
      
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
  
  // Gentle background sound could be added here
  
  return (
    <div className="text-center">
      <div className="text-3xl font-light mb-8 text-learnzy-dark transition-all duration-700">
        {instructions[step - 1]}
      </div>
      <div className="relative w-48 h-48 mx-auto mb-10">
        <div 
          className="absolute rounded-full transition-all duration-4000 ease-in-out bg-gradient-to-br from-learnzy-purple/30 to-indigo-300/40"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${animationSize}%`,
            height: `${animationSize}%`,
            opacity: step === 2 ? 0.7 : 0.5,
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-learnzy-dark">
          {step === 1 ? "Inhale" : step === 2 ? "Hold" : "Exhale"}
        </div>
      </div>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Focus on your breath and clear your mind. This exercise will help reduce anxiety and improve concentration.
      </p>
      
      {isActive && (
        <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4 transition-opacity duration-500 shadow-sm max-w-md mx-auto">
          <p className="text-sm text-center text-gray-700">
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
