
import React from 'react';

interface BreathingProgressProps {
  step: number;
}

const BreathingProgress: React.FC<BreathingProgressProps> = ({ step }) => {
  return (
    <div className="w-32 md:w-48 h-1.5 bg-white/20 rounded-full mx-auto mb-4 md:mb-6 overflow-hidden">
      <div 
        className={`h-full bg-white transition-all ${
          step === 1 ? 'animate-[grow_4s_ease-in-out]' : 
          step === 2 ? 'w-full' : 
          step === 3 ? 'animate-[shrink_4s_ease-in-out]' :
          'w-0'
        }`}
        style={{ 
          width: step === 1 ? '100%' : step === 2 ? '100%' : step === 3 ? '0%' : '0%',
        }}
      />
    </div>
  );
};

export default BreathingProgress;
