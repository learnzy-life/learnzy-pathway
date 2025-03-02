
import React from 'react';

interface MeditationProps {
  isActive: boolean;
  timeLeft: number;
  audioError: boolean;
}

const Meditation: React.FC<MeditationProps> = ({ isActive, timeLeft, audioError }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-light mb-8">Find a comfortable position and clear your mind</div>
      <div className="relative w-40 h-40 mx-auto mb-8">
        <div className="absolute inset-0 bg-learnzy-purple/20 rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">🧘</span>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">
        Focus on the present moment. Notice your thoughts without judgment, then let them pass by.
      </p>
      
      {audioError ? (
        <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4">
          <p className="text-sm">
            Audio playback is not supported in your browser. Please continue with visual guidance.
          </p>
        </div>
      ) : (
        <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
          <p className="text-sm text-center">
            Guided meditation: Close your eyes. Take deep breaths. Focus on your breath.
            {isActive && timeLeft % 15 === 0 && " Feel the tension leaving your body."}
            {isActive && timeLeft % 30 === 0 && " You are calm and focused."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Meditation;
