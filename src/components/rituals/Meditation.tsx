
import React, { useEffect, useState, useRef } from 'react';

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
  const [pulseSize, setPulseSize] = useState(100);
  const lastInstructionTime = useRef<number | null>(null);
  
  // Control breathing animation
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setPulseSize(prev => (prev === 100 ? 110 : 100));
    }, 4000);
    
    return () => clearInterval(breathingInterval);
  }, []);
  
  // Meditation instruction timing
  useEffect(() => {
    if (isActive && !audioError && window.speechSynthesis) {
      const currentTime = Math.floor(timeLeft);
      
      // Initialize for first instruction
      if (lastInstructionTime.current === null && timeLeft > 0) {
        lastInstructionTime.current = currentTime;
        speakInstruction(MeditationGuide[0]);
        return;
      }
      
      // Every 18-20 seconds, move to next meditation guide instruction
      if (lastInstructionTime.current && 
          (lastInstructionTime.current - currentTime >= 18) && 
          timeLeft > 0) {
        const nextIndex = (currentGuideIndex + 1) % MeditationGuide.length;
        setCurrentGuideIndex(nextIndex);
        lastInstructionTime.current = currentTime;
        
        // Speak the instruction
        speakInstruction(MeditationGuide[nextIndex]);
      }
    }
    
    return () => {
      // Clean up on component unmount
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [timeLeft, isActive, audioError, currentGuideIndex]);
  
  const speakInstruction = (text: string) => {
    if (window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.75; // Slower for meditation
      utterance.pitch = 0.9; // Lower pitch for calm effect
      utterance.volume = 0.85; // Moderate volume
      
      // Play the audio instruction
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="text-center">
      <div className="text-3xl font-light mb-8 text-learnzy-dark">
        Find a comfortable position and clear your mind
      </div>
      <div className="relative w-48 h-48 mx-auto mb-10">
        <div 
          className="absolute rounded-full bg-gradient-to-br from-learnzy-purple/20 to-indigo-300/30 transition-all duration-4000 ease-in-out"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${pulseSize}%`,
            height: `${pulseSize}%`,
            opacity: 0.6,
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-80">🧘</span>
        </div>
      </div>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Focus on the present moment. Notice your thoughts without judgment, then let them pass by.
      </p>
      
      {audioError ? (
        <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4 max-w-md mx-auto">
          <p className="text-sm">
            Audio playback is not supported in your browser. Please continue with visual guidance.
          </p>
        </div>
      ) : (
        <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4 shadow-sm max-w-md mx-auto transition-opacity duration-500">
          <p className="text-sm text-center text-gray-700">
            {isActive ? MeditationGuide[currentGuideIndex] : "Guided meditation will begin when you start the timer."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Meditation;
