
import React, { useEffect } from 'react';
import BreathingBackground from './breathing/BreathingBackground';
import BreathingOrb from './breathing/BreathingOrb';
import BreathingProgress from './breathing/BreathingProgress';
import BreathingInstructions from './breathing/BreathingInstructions';
import { useBreathingAnimation } from './breathing/useBreathingAnimation';
import { useBreathingMusic } from './breathing/useBreathingMusic';

interface BreathingExerciseProps {
  step: number;
  isActive: boolean;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ step, isActive }) => {
  // Custom hooks for animation and music
  const { animationSize, glowIntensity } = useBreathingAnimation({ step });
  const { audioRef } = useBreathingMusic({ isActive });
  
  // Enable audio playback on first render to handle iOS/Safari restrictions
  useEffect(() => {
    // Touch event to unlock audio on iOS
    const unlockAudioOnStart = () => {
      if (audioRef.current && isActive) {
        audioRef.current.play().catch(err => {
          console.log('Initial audio play attempt:', err);
        });
      }
    };
    
    // Attempt to play audio on component mount
    if (isActive) {
      unlockAudioOnStart();
    }
  }, [isActive]);
  
  return (
    <div className="text-center">
      {/* Background elements */}
      <BreathingBackground isActive={isActive} />
      
      {/* Breathing instructions */}
      <BreathingInstructions step={step} />
      
      {/* Breathing visualization orb */}
      <BreathingOrb 
        animationSize={animationSize} 
        glowIntensity={glowIntensity} 
        step={step} 
      />
      
      {/* Progress indicator */}
      <BreathingProgress step={step} />
    </div>
  );
};

export default BreathingExercise;
