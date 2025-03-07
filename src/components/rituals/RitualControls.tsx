
import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../../utils/ritualUtils';

interface RitualControlsProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
  audioEnabled: boolean;
  toggleActivity: () => void;
  resetActivity: () => void;
  toggleAudio: () => void;
  handleComplete: () => void;
}

const RitualControls: React.FC<RitualControlsProps> = ({
  timeLeft,
  totalTime,
  isActive,
  audioEnabled,
  toggleActivity,
  resetActivity,
  toggleAudio,
  handleComplete
}) => {
  return (
    <div className="relative z-10 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-3 md:p-4">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <div className="text-xl md:text-2xl font-medium text-white">{formatTime(timeLeft)}</div>
        <div className="flex gap-1 md:gap-2">
          <button 
            onClick={toggleAudio}
            className={`p-1.5 md:p-2 rounded-full transition-colors ${
              audioEnabled 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-300'
            }`}
            title={audioEnabled ? "Mute audio guidance" : "Enable audio guidance"}
            aria-label={audioEnabled ? "Mute audio guidance" : "Enable audio guidance"}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5 md:w-6 md:h-6" /> : <VolumeX className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <button 
            onClick={toggleActivity}
            className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label={isActive ? "Pause" : "Play"}
          >
            {isActive ? <Pause className="w-5 h-5 md:w-6 md:h-6" /> : <Play className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <button 
            onClick={resetActivity}
            className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2 md:h-2.5 mb-4 md:mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full transition-all duration-1000" 
          style={{ width: `${(timeLeft / totalTime) * 100}%` }}
        ></div>
      </div>
      
      <button 
        onClick={handleComplete}
        className="w-full py-2.5 md:py-3 px-4 border border-white/20 rounded-xl bg-white/10 hover:bg-white/20 
                  text-white font-medium transition-all duration-300 flex justify-center items-center text-sm md:text-base"
      >
        Skip to Test <span className="ml-2">→</span>
      </button>
    </div>
  );
};

export default RitualControls;
