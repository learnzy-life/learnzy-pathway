
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from '../../../hooks/use-toast';
import { Mood, PreRitual } from '../utils/subjectUtils';

interface StartTestButtonProps {
  mood?: Mood;
  ritual?: PreRitual;
  subject: string;
  subjectTitle: string;
  onStartTest: () => void;
}

const StartTestButton: React.FC<StartTestButtonProps> = ({
  mood,
  ritual,
  subject,
  subjectTitle,
  onStartTest,
}) => {
  const handleStartTest = () => {
    if (!mood) {
      toast({
        title: 'Mood Required',
        description: 'Please select your current mood',
        variant: 'destructive',
      });
      return;
    }

    if (!ritual) {
      toast({
        title: 'Ritual Selection Required',
        description: 'Please select a pre-test ritual or choose to skip',
        variant: 'destructive',
      });
      return;
    }

    console.log('Starting test with:', { subject, mood, ritual });
    onStartTest();
  };

  return (
    <button
      onClick={handleStartTest}
      className="button-primary w-full flex justify-center items-center"
    >
      Start {subjectTitle} Test <ArrowRight className="ml-2 w-5 h-5" />
    </button>
  );
};

export default StartTestButton;
