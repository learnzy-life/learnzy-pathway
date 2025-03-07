
import React from 'react';

interface MeditationGuideDisplayProps {
  isActive: boolean;
  audioError: boolean;
  currentGuideText: string;
}

const MeditationGuideDisplay: React.FC<MeditationGuideDisplayProps> = ({ 
  isActive, 
  audioError, 
  currentGuideText 
}) => {
  return (
    <>
      <div className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-white px-4">
        Find a comfortable position and clear your mind
      </div>
      
      <p className="text-white/80 mb-4 md:mb-6 max-w-xs md:max-w-md mx-auto font-light text-sm md:text-base px-4">
        Allow any thoughts to drift by like clouds passing in the sky. 
        Notice how each inhale brings in calm, and each exhale releases tension.
      </p>
      
      {audioError ? (
        <div className="bg-black/20 backdrop-blur-sm text-white/90 p-3 md:p-4 rounded-xl mb-4 max-w-xs md:max-w-md mx-auto text-sm px-4">
          <p>
            Audio playback is not supported. Please follow the visual guidance.
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-xl mb-4 shadow-sm max-w-xs md:max-w-md mx-auto transition-opacity duration-500 text-sm md:text-base px-4">
          <p className="text-center text-white/90">
            {isActive ? currentGuideText : "Guided meditation will begin when you start the timer."}
          </p>
        </div>
      )}
    </>
  );
};

export default MeditationGuideDisplay;
