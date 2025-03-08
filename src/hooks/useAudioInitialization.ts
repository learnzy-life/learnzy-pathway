
import { useState, useEffect, useRef } from 'react';
import { toast } from './use-toast';

export const useAudioInitialization = () => {
  const [audioError, setAudioError] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);
  const speechInitialized = useRef<boolean>(false);
  
  // Initialize speech synthesis for mobile
  useEffect(() => {
    // Create a short utterance to initialize speech synthesis
    // This is especially important for iOS which requires user interaction
    if (!speechInitialized.current && window.speechSynthesis) {
      try {
        const initUtterance = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(initUtterance);
        speechInitialized.current = true;
        
        // iOS requires a user-initiated event to enable speech synthesis
        const unlockAudio = () => {
          if (window.speechSynthesis) {
            const silence = new SpeechSynthesisUtterance('.');
            silence.volume = 0;
            window.speechSynthesis.speak(silence);
          }
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('click', unlockAudio);
        };
        
        document.addEventListener('touchstart', unlockAudio);
        document.addEventListener('click', unlockAudio);
      } catch (err) {
        console.error("Speech synthesis initialization error:", err);
      }
    }
  }, []);
  
  useEffect(() => {
    // Test if speech synthesis is available
    if (!window.speechSynthesis) {
      setAudioError(true);
      setAudioEnabled(false);
      toast({
        title: "Audio Guidance Unavailable",
        description: "Your browser doesn't support voice guidance. Visual guidance will still work.",
        variant: "destructive"
      });
    }
    
    // For iOS, we need to initialize audio on first user interaction
    const initAudio = () => {
      if (!initialized) {
        setInitialized(true);
        // For iOS, create and play a silent audio to unlock audio
        try {
          const silentAudio = new Audio();
          silentAudio.play().catch(e => console.log('Audio play error:', e));
        } catch (e) {
          console.error('Audio initialization error:', e);
        }
      }
      document.removeEventListener('touchstart', initAudio);
    };
    
    document.addEventListener('touchstart', initAudio);
    
    return () => {
      document.removeEventListener('touchstart', initAudio);
    };
  }, [initialized]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    if (audioEnabled && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
    } else if (!audioEnabled) {
      toast({
        title: "Audio Guidance Enabled",
        description: "You'll now hear voice guidance for this ritual.",
      });
    }
  };

  return {
    audioError,
    audioEnabled,
    toggleAudio
  };
};
