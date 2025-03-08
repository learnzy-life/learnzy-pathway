
import React from 'react';

interface BreathingInstructionsProps {
  step: number;
}

const BreathingInstructions: React.FC<BreathingInstructionsProps> = ({ step }) => {
  const instructions = [
    "Inhale slowly...",
    "Hold gently...",
    "Exhale completely...",
    "Pause briefly..."
  ];

  return (
    <>
      <div className="text-2xl md:text-3xl font-light mb-4 md:mb-6 text-white transition-all duration-500">
        {instructions[step - 1]}
      </div>
      
      <p className="text-white/80 mb-4 md:mb-6 max-w-xs md:max-w-md mx-auto text-sm md:text-base font-light">
        Follow the 4-4-4-4 box breathing technique. This calming exercise reduces anxiety and improves focus before your test.
      </p>
      
      <div className="opacity-60 text-white text-sm px-3 py-1.5 bg-white/10 rounded-full inline-block">
        Calming music playing 🎵
      </div>
    </>
  );
};

export default BreathingInstructions;
