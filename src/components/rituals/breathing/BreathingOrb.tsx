
import React from 'react';

interface BreathingOrbProps {
  animationSize: number;
  glowIntensity: number;
  step: number;
}

const BreathingOrb: React.FC<BreathingOrbProps> = ({ animationSize, glowIntensity, step }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
      {/* Main breathing orb */}
      <div 
        className="absolute rounded-full transition-all ease-in-out"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${animationSize}%`,
          height: `${animationSize}%`,
          opacity: 0.8,
          background: 'radial-gradient(circle, rgba(221,238,255,0.8) 0%, rgba(155,135,245,0.4) 100%)',
          boxShadow: `0 0 ${glowIntensity}px ${glowIntensity/2}px rgba(155, 135, 245, 0.6)`,
          transition: step === 1 ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' : 
                     step === 2 ? 'all 0.5s ease' : 
                     step === 3 ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' :
                     'all 0.5s ease'
        }}
      />
      
      {/* Central instruction text */}
      <div className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-medium text-white">
        <span className="bg-black/10 backdrop-blur-sm px-5 py-2 rounded-full transition-all duration-300">
          {step === 1 ? "Inhale" : step === 2 ? "Hold" : step === 3 ? "Exhale" : "Pause"}
        </span>
      </div>
    </div>
  );
};

export default BreathingOrb;
