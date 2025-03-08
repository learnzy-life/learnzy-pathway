
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
      
      // Use an actual calming music file that exists (royalty-free from Mixkit)
      audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3";
    }
    
    // Start music based on active state - music is non-optional
    if (isActive) {
      const playPromise = audioRef.current.play();
      
      // Handle play() promise to prevent uncaught rejection errors
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Audio play error (expected in some browsers):', e);
        });
      }
    } else {
      // Pause when not active
      audioRef.current.pause();
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
