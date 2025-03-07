
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
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // For breathing exercise, change instructions every few seconds
          if (ritual === 'breathing') {
            if (newTime % 4 === 0) {
              setStep(prevStep => (prevStep % 3) + 1);
            }
          }

          // Track actual time spent on ritual
          setActualDuration(prev => prev + 1);
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
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
