
import React, { useEffect, useState, useRef } from 'react';
import { Cloud, Sparkles } from 'lucide-react';

interface MeditationProps {
  isActive: boolean;
  timeLeft: number;
  audioError: boolean;
}

const MeditationGuide = [
  "Find a comfortable position and close your eyes.",
  "Take a deep breath in through your nose.",
  "Breathe out slowly through your mouth.",
  "Feel the support of the ground beneath you.",
  "Allow any thoughts to drift by, like soft clouds.",
  "There's no need to hold onto your thoughts—simply observe and let them go.",
  "Bring your attention back to your breath whenever your mind wanders.",
  "Feel the quiet in your heart. Stay in this peaceful moment.",
  "Each inhale brings in calm, each exhale releases tension.",
  "Be present in this moment of stillness."
];

const MeditationPrompts = [
  "Breathe",
  "Let Go",
  "Be Present",
  "Find Peace",
  "Just Be"
];

const Meditation: React.FC<MeditationProps> = ({ isActive, timeLeft, audioError }) => {
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [promptOpacity, setPromptOpacity] = useState(0);
  const [pulseSize, setPulseSize] = useState(100);
  const lastInstructionTime = useRef<number | null>(null);
  const lastPromptTime = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speakingRef = useRef<boolean>(false);
  
  // Control breathing animation
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setPulseSize(prev => (prev === 100 ? 108 : 100));
    }, 4000);
    
    return () => clearInterval(breathingInterval);
  }, []);
  
  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && speechRef.current) {
        window.speechSynthesis.cancel();
        speakingRef.current = false;
      }
    };
  }, []);
  
  // Improved meditation instruction timing with better sync
  useEffect(() => {
    if (isActive && !audioError && window.speechSynthesis) {
      const currentTime = Math.floor(timeLeft);
      
      // Initialize for first instruction
      if (lastInstructionTime.current === null && timeLeft > 0) {
        lastInstructionTime.current = currentTime;
        speakInstruction(MeditationGuide[0], true);
        return;
      }
      
      // Every 15-18 seconds, move to next meditation guide instruction
      // Only proceed if not currently speaking to prevent overlapping instructions
      if (lastInstructionTime.current && 
          (lastInstructionTime.current - currentTime >= 15) && 
          timeLeft > 0 && 
          !speakingRef.current) {
        const nextIndex = (currentGuideIndex + 1) % MeditationGuide.length;
        setCurrentGuideIndex(nextIndex);
        lastInstructionTime.current = currentTime;
        
        // Speak the instruction
        speakInstruction(MeditationGuide[nextIndex], false);
      }
      
      // Every 8-10 seconds, change the floating prompt
      if ((lastPromptTime.current === null || 
          (lastPromptTime.current - currentTime >= 8)) && 
          timeLeft > 0) {
        lastPromptTime.current = currentTime;
        const nextPromptIndex = (currentPromptIndex + 1) % MeditationPrompts.length;
        setCurrentPromptIndex(nextPromptIndex);
        
        // Fade in the prompt
        setPromptOpacity(1);
        
        // Fade out after 5 seconds
        setTimeout(() => {
          setPromptOpacity(prev => Math.max(0, prev - 0.5));
        }, 5000);
      }
    }
  }, [timeLeft, isActive, audioError, currentGuideIndex, currentPromptIndex]);
  
  const speakInstruction = (text: string, isFirst: boolean) => {
    if (window.speechSynthesis) {
      // If currently speaking and not the first instruction, don't interrupt
      if (speakingRef.current && !isFirst) return;
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      speakingRef.current = true;
      
      // Create a new utterance with improved settings
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slightly slower for better clarity
      utterance.pitch = 0.9; // Adjusted for more natural sound
      utterance.volume = 0.9; // Slightly higher volume
      
      // Track when speech ends
      utterance.onend = () => {
        speakingRef.current = false;
      };
      
      utterance.onerror = () => {
        speakingRef.current = false;
      };
      
      // Store reference
      speechRef.current = utterance;
      
      // Add a slight delay to ensure smooth transitions
      setTimeout(() => {
        // Play the audio instruction
        window.speechSynthesis.speak(utterance);
      }, 300);
    }
  };
  
  return (
    <div className="text-center relative">
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
      
      <div className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-white px-4">
        Find a comfortable position and clear your mind
      </div>
      
      {/* Floating meditation prompt */}
      <div 
        className="absolute w-full top-1/4 left-0 flex justify-center transition-opacity duration-1000"
        style={{ opacity: promptOpacity }}
      >
        <div className="px-4 md:px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-lg md:text-xl">
          {MeditationPrompts[currentPromptIndex]}
        </div>
      </div>
      
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
            {isActive ? MeditationGuide[currentGuideIndex] : "Guided meditation will begin when you start the timer."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Meditation;
