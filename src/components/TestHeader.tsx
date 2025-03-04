
import React from 'react';
import { Clock } from 'lucide-react';

interface TestHeaderProps {
  subject: string;
  answeredCount: number;
  totalQuestions: number;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
}

const TestHeader: React.FC<TestHeaderProps> = ({
  subject,
  answeredCount,
  totalQuestions,
  timeRemaining,
  formatTime
}) => {
  return (
    <div className="bg-white border-b border-gray-100 py-3 px-6 sticky top-0 z-10 shadow-subtle">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
            {subject?.charAt(0).toUpperCase() + subject?.slice(1)} Test
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{answeredCount}/{totalQuestions} answered</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
