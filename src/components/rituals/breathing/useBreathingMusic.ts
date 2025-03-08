
import { useRef, useEffect } from 'react';

interface UseBreathingMusicProps {
  isActive: boolean;
}

export const useBreathingMusic = ({ isActive }: UseBreathingMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize calming background music
  useEffect(() => {
    // Create audio element for background music
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      
      // Mock URL - in production this would be a real calming music track
      // Using a placeholder that doesn't actually play for this example
      audioRef.current.src = "https://example.com/calming-music.mp3";
    }
    
    // Start music based on active state - music is non-optional
    if (isActive) {
      audioRef.current.play().catch(e => console.log('Audio play error (expected in some browsers):', e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isActive]);

  return { audioRef };
};
