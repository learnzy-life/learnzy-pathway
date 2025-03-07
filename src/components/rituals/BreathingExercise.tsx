
import React, { useEffect, useRef, useState } from 'react';
import { Cloud } from 'lucide-react';

interface BreathingExerciseProps {
  step: number;
  isActive: boolean;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ step, isActive }) => {
  const instructions = [
    "Inhale slowly...",
    "Hold gently...",
    "Exhale completely..."
  ];
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [animationSize, setAnimationSize] = useState<number>(100);
  const [glowIntensity, setGlowIntensity] = useState<number>(0);
  
  const audioInstructions = {
    1: "Inhale slowly through your nose for 4 seconds",
    2: "Hold your breath gently for 4 seconds",
    3: "Exhale completely through your mouth for 6 seconds" 
  };
  
  // Control the breathing animation size and glow
  useEffect(() => {
    if (step === 1) {
      // Breathe in - expand with increasing glow
      setAnimationSize(150);
      setGlowIntensity(25);
    } else if (step === 2) {
      // Hold - stay expanded with gentle pulse
      setAnimationSize(150);
      setGlowIntensity(20);
    } else if (step === 3) {
      // Breathe out - contract with fading glow
      setAnimationSize(100);
      setGlowIntensity(5);
    }
  }, [step]);
  
  useEffect(() => {
    if (isActive && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance for the current step
      const utterance = new SpeechSynthesisUtterance(audioInstructions[step as keyof typeof audioInstructions]);
      utterance.rate = 0.7; // Slower for a calmer pace
      utterance.pitch = 0.85; // Lower pitch for relaxation
      utterance.volume = 0.85; // Slightly lower volume for gentleness
      
      // Play the audio instruction
      window.speechSynthesis.speak(utterance);
    }
    
    return () => {
      // Clean up on component unmount or step change
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [step, isActive]);
  
  return (
    <div className="text-center">
      {/* Calm background with gradient */}
      <div 
        className="absolute inset-0 -z-10 rounded-2xl opacity-60 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(to top, #0f2027 0%, #203a43 50%, #83c4e6 100%)',
          opacity: isActive ? 0.7 : 0.3
        }}
      />
      
      <div className="text-3xl font-light mb-6 text-white transition-all duration-500">
        {instructions[step - 1]}
      </div>
      
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Floating clouds in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Cloud className="absolute w-12 h-12 text-white animate-float" 
            style={{ top: '15%', left: '20%', animationDelay: '0.5s' }} />
          <Cloud className="absolute w-10 h-10 text-white animate-float" 
            style={{ top: '60%', left: '70%', animationDelay: '1.2s' }} />
        </div>
        
        {/* Main breathing orb */}
        <div 
          className="absolute rounded-full transition-all duration-4000 ease-in-out"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${animationSize}%`,
            height: `${animationSize}%`,
            opacity: 0.8,
            background: 'radial-gradient(circle, rgba(221,238,255,0.8) 0%, rgba(155,135,245,0.4) 100%)',
            boxShadow: `0 0 ${glowIntensity}px ${glowIntensity/2}px rgba(155, 135, 245, 0.6)`,
            transition: 'all 4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Central instruction text */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white">
          <span className="bg-black/10 backdrop-blur-sm px-5 py-2 rounded-full transition-all duration-300">
            {step === 1 ? "Inhale" : step === 2 ? "Hold" : "Exhale"}
          </span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="w-48 h-1.5 bg-white/20 rounded-full mx-auto mb-6 overflow-hidden">
        <div 
          className={`h-full bg-white transition-all duration-300 ${
            step === 1 ? 'animate-[grow_4s_ease-in-out]' : 
            step === 2 ? 'w-full' : 
            'animate-[shrink_6s_ease-in-out]'
          }`}
          style={{ 
            width: step === 1 ? '100%' : step === 2 ? '100%' : '0%',
          }}
        />
      </div>
      
      <p className="text-white/80 mb-6 max-w-md mx-auto font-light">
        Focus on your breath and clear your mind. This exercise helps reduce anxiety and improve concentration.
      </p>
      
      <audio ref={audioRef} className="hidden">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BreathingExercise;
