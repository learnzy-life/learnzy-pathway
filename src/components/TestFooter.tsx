
import React from 'react';

interface TestFooterProps {
  currentQuestionIndex: number;
  questionsLength: number;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onSubmitClick: () => void;
}

const TestFooter: React.FC<TestFooterProps> = ({
  currentQuestionIndex,
  questionsLength,
  onPrevQuestion,
  onNextQuestion,
  onSubmitClick
}) => {
  return (
    <div className="bg-white border-t border-gray-100 py-4 px-6 sticky bottom-0 z-10 shadow-subtle">
      <div className="container mx-auto flex items-center justify-between max-w-3xl">
        <button
          onClick={onPrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`button-secondary ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onNextQuestion}
            disabled={currentQuestionIndex === questionsLength - 1}
            className={`button-primary ${currentQuestionIndex === questionsLength - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next Question
          </button>
          
          <button
            onClick={onSubmitClick}
            className="button-primary bg-green-600 hover:bg-green-700"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestFooter;
