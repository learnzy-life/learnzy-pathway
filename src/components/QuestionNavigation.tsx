
import React from 'react';
import { Question } from '../services/questionService';

interface QuestionNavigationProps {
  questions: Question[];
  currentQuestionIndex: number;
  onJumpToQuestion: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentQuestionIndex,
  onJumpToQuestion
}) => {
  return (
    <div className="w-20 md:w-64 border-r border-gray-100 bg-white shadow-subtle h-[calc(100vh-57px)] overflow-y-auto p-4 hidden md:block">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 hidden md:block">Questions</h3>
      
      <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => onJumpToQuestion(index)}
            className={`
              w-full aspect-square flex items-center justify-center rounded-lg text-sm
              ${index === currentQuestionIndex 
                ? 'bg-learnzy-purple text-white' 
                : q.answer 
                  ? 'bg-learnzy-purple/20 text-learnzy-purple'
                  : 'bg-gray-100 text-learnzy-dark/70'
              }
              hover:opacity-90 transition-opacity
            `}
          >
            {q.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
