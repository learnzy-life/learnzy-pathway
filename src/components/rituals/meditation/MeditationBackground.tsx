
import React from 'react';
import { Cloud, Sparkles } from 'lucide-react';

interface MeditationBackgroundProps {
  isActive: boolean;
}

const MeditationBackground: React.FC<MeditationBackgroundProps> = ({ isActive }) => {
  return (
    <>
      {/* Serene background gradient */}
      <div 
        className="absolute inset-0 -z-10 rounded-2xl transition-opacity duration-700"
        style={{
          background: 'linear-gradient(to top, #2c3e50 0%, #3498db 100%)',
          opacity: isActive ? 0.7 : 0.3
        }}
      />
      
      {/* Floating clouds */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Cloud className="absolute text-white/20 w-16 md:w-24 h-16 md:h-24 animate-float" 
          style={{ top: '10%', left: '15%', animationDuration: '15s' }} />
        <Cloud className="absolute text-white/15 w-14 md:w-20 h-14 md:h-20 animate-float" 
          style={{ top: '30%', left: '70%', animationDuration: '12s', animationDelay: '2s' }} />
        <Cloud className="absolute text-white/10 w-12 md:w-16 h-12 md:h-16 animate-float" 
          style={{ top: '70%', left: '25%', animationDuration: '20s', animationDelay: '5s' }} />
        
        {/* Drifting particles */}
        <Sparkles className="absolute text-white/10 w-4 md:w-6 h-4 md:h-6 animate-float" 
          style={{ top: '20%', left: '45%', animationDuration: '25s' }} />
        <Sparkles className="absolute text-white/10 w-3 md:w-4 h-3 md:h-4 animate-float" 
          style={{ top: '60%', left: '55%', animationDuration: '18s', animationDelay: '3s' }} />
      </div>
    </>
  );
};

export default MeditationBackground;
