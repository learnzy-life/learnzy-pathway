
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
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-medium text-learnzy-dark">{formatTime(timeLeft)}</div>
        <div className="flex gap-2">
          <button 
            onClick={toggleAudio}
            className={`p-2 rounded-full transition-colors ${
              audioEnabled 
                ? 'bg-learnzy-purple/10 hover:bg-learnzy-purple/20' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            title={audioEnabled ? "Mute audio guidance" : "Enable audio guidance"}
          >
            {audioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <button 
            onClick={toggleActivity}
            className="p-2 rounded-full bg-learnzy-purple/10 hover:bg-learnzy-purple/20 transition-colors"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button 
            onClick={resetActivity}
            className="p-2 rounded-full bg-learnzy-purple/10 hover:bg-learnzy-purple/20 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-learnzy-purple to-indigo-400 h-2.5 rounded-full transition-all duration-1000" 
          style={{ width: `${(timeLeft / totalTime) * 100}%` }}
        ></div>
      </div>
      
      <button 
        onClick={handleComplete}
        className="button-secondary w-full flex justify-center items-center transition-all duration-300 hover:bg-gray-100"
      >
        Skip to Test <span className="ml-2">→</span>
      </button>
    </>
  );
};

export default RitualControls;
