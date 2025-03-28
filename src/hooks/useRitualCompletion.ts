
import { toast } from './use-toast';
import { saveRitualActivity } from '../utils/ritualService';

interface UseRitualCompletionProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  subject: string;
  mood: string;
  initialTime: number;
  timeLeft: number;
  actualDuration: number;
  onComplete: () => void;
}

export const useRitualCompletion = ({
  ritual,
  subject,
  mood,
  initialTime,
  timeLeft,
  actualDuration,
  onComplete
}: UseRitualCompletionProps) => {
  
  const handleComplete = async () => {
    console.log('Running ritual completion in hook');
    
    // Cancel any ongoing speech when completing
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Calculate duration (how long they actually took)
    const ritualDuration = actualDuration > 0 ? actualDuration : initialTime - timeLeft;
    
    try {
      // Save the ritual activity data
      await saveRitualActivity({
        subject,
        ritual,
        mood,
        completedAt: new Date().toISOString(),
        duration: ritualDuration
      });
      
      toast({
        title: "Ritual Complete",
        description: "You're now prepared for your test. Good luck!",
      });
    } catch (error) {
      console.error('Error saving ritual activity:', error);
    }
    
    // Always call the onComplete callback
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };
  
  return { handleComplete };
};
