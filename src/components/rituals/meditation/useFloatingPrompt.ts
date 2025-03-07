
import { useState, useRef, useEffect } from 'react';

export const useFloatingPrompt = (
  timeLeft: number, 
  isActive: boolean
) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [promptOpacity, setPromptOpacity] = useState(0);
  const lastPromptTime = useRef<number | null>(null);
  
  const MEDITATION_PROMPTS = [
    "Breathe",
    "Let Go",
    "Be Present",
    "Find Peace",
    "Just Be"
  ];
  
  // Handle prompt changes and animations
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const currentTime = Math.floor(timeLeft);
      
      // Every 8-10 seconds, change the floating prompt
      if (lastPromptTime.current === null || 
          (lastPromptTime.current - currentTime >= 8)) {
        lastPromptTime.current = currentTime;
        const nextPromptIndex = (currentPromptIndex + 1) % MEDITATION_PROMPTS.length;
        setCurrentPromptIndex(nextPromptIndex);
        
        // Fade in the prompt
        setPromptOpacity(1);
        
        // Fade out after 5 seconds
        setTimeout(() => {
          setPromptOpacity(prev => Math.max(0, prev - 0.5));
        }, 5000);
      }
    }
  }, [timeLeft, isActive, currentPromptIndex]);
  
  return {
    currentPromptIndex,
    promptOpacity,
    currentPrompt: MEDITATION_PROMPTS[currentPromptIndex]
  };
};
