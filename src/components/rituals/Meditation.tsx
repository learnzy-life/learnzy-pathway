
import React, { useState, useEffect } from 'react';
import MeditationBackground from './meditation/MeditationBackground';
import MeditationOrb from './meditation/MeditationOrb';
import MeditationFloatingPrompt from './meditation/MeditationFloatingPrompt';
import MeditationGuideDisplay from './meditation/MeditationGuideDisplay';
import { useVoiceGuidance } from './meditation/useVoiceGuidance';
import { useFloatingPrompt } from './meditation/useFloatingPrompt';

interface MeditationProps {
  isActive: boolean;
  timeLeft: number;
  audioError: boolean;
}

// Meditation guide text content
const MEDITATION_GUIDE = [
  "Find a comfortable position and close your eyes.",
  "Take a deep breath in through your nose.",
  "Breathe out slowly through your mouth.",
  "Feel the support of the ground beneath you.",
  "Allow any thoughts to drift by, like soft clouds.",
  "There's no need to hold onto your thoughts—simply observe and let them go.",
  "Bring your attention back to your breath whenever your mind wanders.",
  "Feel the quiet in your heart. Stay in this peaceful moment.",
  "Each inhale brings in calm, each exhale releases tension.",
  "Be present in this moment of stillness."
];

const Meditation: React.FC<MeditationProps> = ({ isActive, timeLeft, audioError }) => {
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [pulseSize, setPulseSize] = useState(100);
  
  // Custom hooks
  const { currentPrompt, promptOpacity } = useFloatingPrompt(timeLeft, isActive);
  useVoiceGuidance({
    isActive,
    audioError,
    timeLeft,
    currentGuideIndex,
    setCurrentGuideIndex,
    meditationGuide: MEDITATION_GUIDE
  });
  
  // Control breathing animation
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setPulseSize(prev => (prev === 100 ? 108 : 100));
    }, 4000);
    
    return () => clearInterval(breathingInterval);
  }, []);
  
  return (
    <div className="text-center relative">
      {/* Background and ambient elements */}
      <MeditationBackground isActive={isActive} />
      
      {/* Floating meditation prompt */}
      <MeditationFloatingPrompt 
        promptOpacity={promptOpacity}
        currentPrompt={currentPrompt}
      />
      
      {/* Breathing orb animation */}
      <MeditationOrb pulseSize={pulseSize} />
      
      {/* Instructions and guidance text */}
      <MeditationGuideDisplay 
        isActive={isActive}
        audioError={audioError}
        currentGuideText={MEDITATION_GUIDE[currentGuideIndex]}
      />
    </div>
  );
};

export default Meditation;
