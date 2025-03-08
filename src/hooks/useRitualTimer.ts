
import { useState, useEffect } from 'react';
import { getRitualDuration } from '../utils/ritualUtils';

interface UseRitualTimerProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  isActive: boolean;
  onComplete: () => void;
}

export const useRitualTimer = ({ ritual, isActive, onComplete }: UseRitualTimerProps) => {
  const initialTime = getRitualDuration(ritual);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [step, setStep] = useState<number>(1);
  const [actualDuration, setActualDuration] = useState<number>(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      // For affirmations, we'll still track time but won't use it as a hard limit
      // Instead, we'll rely on the user completing the affirmations
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // For breathing exercise, change instructions according to 4-4-4-4 pattern
          if (ritual === 'breathing') {
            // Count down 4 seconds for each step in the box breathing pattern
            if (newTime % 4 === 0) {
              setStep(prevStep => (prevStep % 4) + 1);
            }
          }

          // Track actual time spent on ritual
          setActualDuration(prev => prev + 1);
          
          // For affirmations, don't automatically complete - user completes by doing the affirmations
          // For other rituals, complete when time is up
          if (newTime <= 0 && ritual !== 'affirmation') {
            if (interval) clearInterval(interval);
            onComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive && ritual !== 'affirmation') {
      onComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, ritual, onComplete]);
  
  const resetTimer = () => {
    setTimeLeft(getRitualDuration(ritual));
    setStep(1);
    setActualDuration(0);
  };

  return {
    timeLeft,
    step,
    actualDuration,
    resetTimer,
    initialTime
  };
};
