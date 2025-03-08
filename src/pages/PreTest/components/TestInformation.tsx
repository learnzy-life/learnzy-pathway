
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Subject } from '../utils/subjectUtils';

const TestInformation: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  
  const timeLimit = subject === 'biology' ? 90 : 180;
  const questionCount = 180;

  return (
    <div className="bg-learnzy-purple/5 border border-learnzy-purple/20 rounded-xl p-4 mb-8 flex items-start">
      <AlertCircle className="w-5 h-5 text-learnzy-purple flex-shrink-0 mt-0.5 mr-3" />
      <div>
        <h3 className="text-sm font-medium text-learnzy-dark mb-1">
          Important Information
        </h3>
        <p className="text-sm text-muted-foreground">
          This test contains {questionCount} questions and has a time limit of {timeLimit} minutes. 
          Once started, the timer cannot be paused. Ensure you have a stable 
          internet connection and a distraction-free environment.
        </p>
      </div>
    </div>
  );
};

export default TestInformation;
