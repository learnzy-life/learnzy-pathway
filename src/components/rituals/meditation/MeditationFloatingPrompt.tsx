
import React from 'react';

interface MeditationFloatingPromptProps {
  promptOpacity: number;
  currentPrompt: string;
}

const MeditationFloatingPrompt: React.FC<MeditationFloatingPromptProps> = ({ 
  promptOpacity, 
  currentPrompt 
}) => {
  return (
    <div 
      className="absolute w-full top-1/4 left-0 flex justify-center transition-opacity duration-1000"
      style={{ opacity: promptOpacity }}
    >
      <div className="px-4 md:px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-lg md:text-xl">
        {currentPrompt}
      </div>
    </div>
  );
};

export default MeditationFloatingPrompt;
