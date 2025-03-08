
import React from 'react';
import { Cloud } from 'lucide-react';

interface BreathingBackgroundProps {
  isActive: boolean;
}

const BreathingBackground: React.FC<BreathingBackgroundProps> = ({ isActive }) => {
  return (
    <>
      {/* Calm background with gradient */}
      <div 
        className="absolute inset-0 -z-10 rounded-2xl opacity-60 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(to top, #0f2027 0%, #203a43 50%, #83c4e6 100%)',
          opacity: isActive ? 0.7 : 0.3
        }}
      />
      
      {/* Floating clouds in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <Cloud className="absolute w-12 h-12 text-white animate-float" 
          style={{ top: '15%', left: '20%', animationDelay: '0.5s' }} />
        <Cloud className="absolute w-10 h-10 text-white animate-float" 
          style={{ top: '60%', left: '70%', animationDelay: '1.2s' }} />
        <Cloud className="absolute w-8 h-8 text-white animate-float" 
          style={{ top: '30%', left: '50%', animationDelay: '2.5s' }} />
      </div>
    </>
  );
};

export default BreathingBackground;
