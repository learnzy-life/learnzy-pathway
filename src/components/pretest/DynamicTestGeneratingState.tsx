
import React from 'react';
import { Loader2, Brain } from 'lucide-react';
import DynamicTestProgressBar from './DynamicTestProgressBar';

type DynamicTestGeneratingStateProps = {
  progress: number;
};

const DynamicTestGeneratingState = ({ progress }: DynamicTestGeneratingStateProps) => {
  return (
    <div className="max-w-xl mx-auto mt-12 text-center">
      <div className="mb-8">
        <Brain className="w-16 h-16 text-learnzy-amber mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold mb-3">
          Cooking up your personalized test
        </h1>
        <p className="text-muted-foreground">
          We're analyzing your weak areas from previous tests and creating a personalized test just for you.
        </p>
      </div>
      
      <DynamicTestProgressBar progress={progress} />
      
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>
            {progress < 30 ? "Analyzing your test history..." : 
             progress < 60 ? "Identifying areas for improvement..." : 
             progress < 90 ? "Creating personalized questions..." :
             "Finalizing your test..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DynamicTestGeneratingState;
