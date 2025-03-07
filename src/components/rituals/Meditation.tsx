
import React, { useEffect, useState } from 'react';

interface MeditationProps {
  isActive: boolean;
  timeLeft: number;
  audioError: boolean;
}

const MeditationGuide = [
  "Find a comfortable position and close your eyes.",
  "Take a deep breath in through your nose.",
  "Breathe out slowly through your mouth.",
  "Focus on how your body feels right now.",
  "Notice your thoughts without judgment.",
  "If your mind wanders, gently bring it back to your breath.",
  "Feel the tension leaving your body with each breath.",
  "You are calm and focused.",
  "You are present in this moment.",
  "You are prepared and confident."
];

const Meditation: React.FC<MeditationProps> = ({ isActive, timeLeft, audioError }) => {
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  
  useEffect(() => {
    if (isActive && !audioError && window.speechSynthesis) {
      // Every 20 seconds, move to next meditation guide instruction
      if (timeLeft % 20 === 0 && timeLeft > 0) {
        const nextIndex = (currentGuideIndex + 1) % MeditationGuide.length;
        setCurrentGuideIndex(nextIndex);
        
        // Speak the instruction
        const utterance = new SpeechSynthesisUtterance(MeditationGuide[nextIndex]);
        utterance.rate = 0.8; // Slower than normal
        utterance.pitch = 1;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Play the audio instruction
        window.speechSynthesis.speak(utterance);
      }
    }
    
    return () => {
      // Clean up on component unmount
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [timeLeft, isActive, audioError, currentGuideIndex]);
  
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
            {isActive ? MeditationGuide[currentGuideIndex] : "Guided meditation will begin when you start the timer."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Meditation;
