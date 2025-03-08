
import { useState, useEffect } from 'react';

interface UseBreathingAnimationProps {
  step: number;
}

export const useBreathingAnimation = ({ step }: UseBreathingAnimationProps) => {
  const [animationSize, setAnimationSize] = useState<number>(100);
  const [glowIntensity, setGlowIntensity] = useState<number>(0);
  
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

  return {
    animationSize,
    glowIntensity
  };
};
