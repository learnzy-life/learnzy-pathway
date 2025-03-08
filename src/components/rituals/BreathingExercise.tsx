
import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Music } from 'lucide-react';

interface BreathingExerciseProps {
  step: number;
  isActive: boolean;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ step, isActive }) => {
  const instructions = [
    "Inhale slowly...",
    "Hold gently...",
    "Exhale completely...",
    "Pause briefly..."
  ];
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [animationSize, setAnimationSize] = useState<number>(100);
  const [glowIntensity, setGlowIntensity] = useState<number>(0);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(true);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const audioInstructions = {
    1: "Inhale deeply through your nose for 4 seconds",
    2: "Hold your breath gently for 4 seconds",
    3: "Exhale completely through your mouth for 4 seconds",
    4: "Pause for 4 seconds before beginning again"
  };
  
  // Initialize calming background music
  useEffect(() => {
    // Create audio element for background music
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      
      // Mock URL - in production this would be a real calming music track
      // Using a placeholder that doesn't actually play for this example
      audioRef.current.src = "https://example.com/calming-music.mp3";
    }
    
    // Start or stop music based on active state and music setting
    if (isActive && musicPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play error (expected in some browsers):', e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isActive, musicPlaying]);
  
  // Control the breathing animation size and glow
  useEffect(() => {
    if (step === 1) {
      // Breathe in - expand with increasing glow
      setAnimationSize(160);
      setGlowIntensity(30);
    } else if (step === 2) {
      // Hold - stay expanded with gentle pulse
      setAnimationSize(160);
      setGlowIntensity(25);
    } else if (step === 3) {
      // Breathe out - contract with fading glow
      setAnimationSize(100);
      setGlowIntensity(15);
    } else if (step === 4) {
      // Pause - remain small with minimal glow
      setAnimationSize(100);
      setGlowIntensity(5);
    }
  }, [step]);
  
  // Improved syncing of voice with animations
  useEffect(() => {
    // Cancel any previous speech when step changes or component unmounts
    return () => {
      if (window.speechSynthesis && speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    if (isActive && window.speechSynthesis) {
      // Mobile Safari and some Android browsers need user interaction
      // before allowing speech synthesis to work properly
      try {
        // Cancel any ongoing speech when step changes
        window.speechSynthesis.cancel();
        
        // Create a new utterance for the current step
        const utterance = new SpeechSynthesisUtterance(audioInstructions[step as keyof typeof audioInstructions]);
        utterance.rate = 0.8; // Slower for better clarity
        utterance.pitch = 0.85; // Lower pitch for relaxation
        utterance.volume = 1.0; // Full volume for mobile devices
        
        // Store reference to current utterance
        speechRef.current = utterance;
        
        // Short delay to ensure animation and speech are in sync
        const timer = setTimeout(() => {
          // Some mobile browsers pause speech synthesis when the app is in background
          // This is a workaround to keep it active
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
          
          // Play the audio instruction
          window.speechSynthesis.speak(utterance);
        }, 200);
        
        return () => {
          clearTimeout(timer);
        };
      } catch (err) {
        console.error("Speech synthesis error:", err);
      }
    }
  }, [step, isActive, audioInstructions]);
  
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play error:', e));
      }
    }
  };
  
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
      
      <div className="text-2xl md:text-3xl font-light mb-4 md:mb-6 text-white transition-all duration-500">
        {instructions[step - 1]}
      </div>
      
      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
        {/* Floating clouds in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Cloud className="absolute w-12 h-12 text-white animate-float" 
            style={{ top: '15%', left: '20%', animationDelay: '0.5s' }} />
          <Cloud className="absolute w-10 h-10 text-white animate-float" 
            style={{ top: '60%', left: '70%', animationDelay: '1.2s' }} />
          <Cloud className="absolute w-8 h-8 text-white animate-float" 
            style={{ top: '30%', left: '50%', animationDelay: '2.5s' }} />
        </div>
        
        {/* Main breathing orb */}
        <div 
          className="absolute rounded-full transition-all ease-in-out"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${animationSize}%`,
            height: `${animationSize}%`,
            opacity: 0.8,
            background: 'radial-gradient(circle, rgba(221,238,255,0.8) 0%, rgba(155,135,245,0.4) 100%)',
            boxShadow: `0 0 ${glowIntensity}px ${glowIntensity/2}px rgba(155, 135, 245, 0.6)`,
            transition: step === 1 ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' : 
                       step === 2 ? 'all 0.5s ease' : 
                       step === 3 ? 'all 4s cubic-bezier(0.4, 0, 0.2, 1)' :
                       'all 0.5s ease'
          }}
        />
        
        {/* Central instruction text */}
        <div className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-medium text-white">
          <span className="bg-black/10 backdrop-blur-sm px-5 py-2 rounded-full transition-all duration-300">
            {step === 1 ? "Inhale" : step === 2 ? "Hold" : step === 3 ? "Exhale" : "Pause"}
          </span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="w-32 md:w-48 h-1.5 bg-white/20 rounded-full mx-auto mb-4 md:mb-6 overflow-hidden">
        <div 
          className={`h-full bg-white transition-all ${
            step === 1 ? 'animate-[grow_4s_ease-in-out]' : 
            step === 2 ? 'w-full' : 
            step === 3 ? 'animate-[shrink_4s_ease-in-out]' :
            'w-0'
          }`}
          style={{ 
            width: step === 1 ? '100%' : step === 2 ? '100%' : step === 3 ? '0%' : '0%',
          }}
        />
      </div>
      
      <p className="text-white/80 mb-4 md:mb-6 max-w-xs md:max-w-md mx-auto text-sm md:text-base font-light">
        Follow the 4-4-4-4 box breathing technique. This calming exercise reduces anxiety and improves focus before your test.
      </p>
      
      {/* Music toggle button */}
      <button 
        onClick={toggleMusic}
        className="flex items-center mx-auto bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 text-white text-sm transition-colors"
      >
        <Music className="w-4 h-4 mr-1" />
        {musicPlaying ? "Mute Music" : "Play Music"}
      </button>
    </div>
  );
};

export default BreathingExercise;
