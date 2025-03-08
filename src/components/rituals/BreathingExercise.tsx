
import React from 'react';
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
