
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`
          flex items-center px-4 py-2 rounded-lg transition-colors
          ${currentIndex === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-200 text-learnzy-dark hover:border-learnzy-purple/30'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous Question
      </button>
      
      <button
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className={`
          flex items-center px-4 py-2 rounded-lg transition-colors
          ${currentIndex === totalQuestions - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-learnzy-purple text-white hover:bg-learnzy-purple/90'
          }
        `}
      >
        Next Question
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default NavigationButtons;
