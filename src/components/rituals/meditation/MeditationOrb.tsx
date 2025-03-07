
import React from 'react';

interface MeditationOrbProps {
  pulseSize: number;
}

const MeditationOrb: React.FC<MeditationOrbProps> = ({ pulseSize }) => {
  return (
    <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-6 md:mb-10">
      {/* Ambient pulsing circle */}
      <div 
        className="absolute rounded-full bg-gradient-to-br from-white/20 to-indigo-300/20 transition-all duration-4000 ease-in-out"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${pulseSize}%`,
          height: `${pulseSize}%`,
          opacity: 0.5,
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl md:text-5xl">🧘</span>
      </div>
    </div>
  );
};

export default MeditationOrb;
