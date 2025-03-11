
import React from 'react';
import { Check, X } from 'lucide-react';

interface QuestionOptionProps {
  optionId: string;
  optionText: string;
  isCorrectAnswer: boolean;
  isUserAnswer: boolean;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ 
  optionId, 
  optionText, 
  isCorrectAnswer, 
  isUserAnswer 
}) => {
  const getBackgroundColor = () => {
    if (isCorrectAnswer) return 'bg-green-50 border-green-200';
    if (isUserAnswer && !isCorrectAnswer) return 'bg-red-50 border-red-200';
    return 'bg-white border-gray-100';
  };
  
  const getIconBackgroundColor = () => {
    if (isCorrectAnswer) return 'bg-green-100 text-green-700';
    if (isUserAnswer && !isCorrectAnswer) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-learnzy-dark';
  };
  
  return (
    <div className={`p-4 rounded-xl border transition-all ${getBackgroundColor()}`}>
      <div className="flex items-start">
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${getIconBackgroundColor()}`}>
          {optionId}
        </span>
        <div className="flex-1">
          <span className="text-base">{optionText}</span>
          
          {isCorrectAnswer && (
            <div className="mt-1 text-sm text-green-600 font-medium flex items-center">
              <Check className="w-4 h-4 mr-1" />
              {isUserAnswer && isCorrectAnswer ? 'You answered correctly' : 'Correct Answer'}
            </div>
          )}
          
          {isUserAnswer && !isCorrectAnswer && (
            <div className="mt-1 text-sm text-red-600 font-medium flex items-center">
              <X className="w-4 h-4 mr-1" />
              Your Answer
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionOption;
