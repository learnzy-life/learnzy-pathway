
import React from 'react';

interface QuestionProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
}

const QuestionProgressBar: React.FC<QuestionProgressBarProps> = ({ 
  currentIndex, 
  totalQuestions 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-learnzy-purple" 
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuestionProgressBar;
