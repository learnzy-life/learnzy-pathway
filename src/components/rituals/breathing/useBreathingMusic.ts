
import { useRef, useEffect, useState } from 'react';

interface UseBreathingMusicProps {
  isActive: boolean;
}

export const useBreathingMusic = ({ isActive }: UseBreathingMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  
  // Initialize calming background music
  useEffect(() => {
    // Create audio element for background music if not already created
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous"; // Add crossOrigin for CORS issues
      
      // Use a content delivery network URL for better global access
      // Use a relative path to avoid CORS issues on different domains
      audioRef.current.src = "/audio/calming-music.mp3";
      
      // Add event listeners for better error handling
      audioRef.current.addEventListener('canplaythrough', () => {
        setAudioInitialized(true);
        console.log('Audio loaded and ready to play');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        // Fallback to another source if the primary source fails
        if (audioRef.current) {
          audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3";
          console.log('Trying fallback audio source');
        }
      });
      
      // iOS Safari and some mobile browsers require user interaction
      const unlockAudio = () => {
        if (audioRef.current) {
          // Short playback attempt to unlock audio
          audioRef.current.play().then(() => {
            if (!isActive) {
              audioRef.current?.pause();
            }
            console.log('Audio unlocked');
          }).catch(e => {
            console.log('Audio unlock attempt error (normal on first try):', e);
          });
        }
        
        // Remove event listeners after first interaction
        document.removeEventListener('touchstart', unlockAudio, true);
        document.removeEventListener('click', unlockAudio, true);
      };
      
      document.addEventListener('touchstart', unlockAudio, true);
      document.addEventListener('click', unlockAudio, true);
    }
    
    // Start music based on active state
    if (isActive && audioRef.current && audioInitialized) {
      const playPromise = audioRef.current.play();
      
      // Handle play promise properly
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Audio playing');
        }).catch(e => {
          console.log('Audio play error:', e);
          
          // Try playing again with user interaction if there's an error
          const retryPlay = () => {
            if (audioRef.current && isActive) {
              audioRef.current.play().catch(e => console.log('Retry play error:', e));
            }
            document.removeEventListener('click', retryPlay);
          };
          
          document.addEventListener('click', retryPlay);
        });
      }
    } else if (audioRef.current) {
      // Pause when not active
      audioRef.current.pause();
    }
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener('touchstart', () => {}, true);
      document.removeEventListener('click', () => {}, true);
    };
  }, [isActive, audioInitialized]);

  return { audioRef };
};
