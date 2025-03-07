
import { useRef, useEffect } from 'react';

export interface VoiceGuidanceProps {
  isActive: boolean;
  audioError: boolean;
  timeLeft: number;
  currentGuideIndex: number;
  setCurrentGuideIndex: (index: number) => void;
  meditationGuide: string[];
}

export const useVoiceGuidance = ({
  isActive,
  audioError,
  timeLeft,
  currentGuideIndex,
  setCurrentGuideIndex,
  meditationGuide
}: VoiceGuidanceProps) => {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speakingRef = useRef<boolean>(false);
  const lastInstructionTime = useRef<number | null>(null);
  
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
        speakInstruction(meditationGuide[0], true);
        return;
      }
      
      // Every 15-18 seconds, move to next meditation guide instruction
      // Only proceed if not currently speaking to prevent overlapping instructions
      if (lastInstructionTime.current && 
          (lastInstructionTime.current - currentTime >= 15) && 
          timeLeft > 0 && 
          !speakingRef.current) {
        const nextIndex = (currentGuideIndex + 1) % meditationGuide.length;
        setCurrentGuideIndex(nextIndex);
        lastInstructionTime.current = currentTime;
        
        // Speak the instruction
        speakInstruction(meditationGuide[nextIndex], false);
      }
    }
  }, [timeLeft, isActive, audioError, currentGuideIndex, meditationGuide, setCurrentGuideIndex]);
  
  const speakInstruction = (text: string, isFirst: boolean) => {
    if (window.speechSynthesis) {
      try {
        // If currently speaking and not the first instruction, don't interrupt
        if (speakingRef.current && !isFirst) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        speakingRef.current = true;
        
        // Create a new utterance with improved settings
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slightly slower for better clarity
        utterance.pitch = 0.9; // Adjusted for more natural sound
        utterance.volume = 1.0; // Full volume for mobile devices
        
        // Track when speech ends
        utterance.onend = () => {
          speakingRef.current = false;
        };
        
        utterance.onerror = () => {
          console.error("Speech synthesis error during meditation");
          speakingRef.current = false;
        };
        
        // Store reference
        speechRef.current = utterance;
        
        // Workaround for mobile browsers that may pause speech synthesis
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
        
        // Add a slight delay to ensure smooth transitions
        setTimeout(() => {
          // Play the audio instruction
          window.speechSynthesis.speak(utterance);
        }, 300);
      } catch (err) {
        console.error("Speech synthesis error:", err);
        speakingRef.current = false;
      }
    }
  };
  
  return { speakingRef };
};
