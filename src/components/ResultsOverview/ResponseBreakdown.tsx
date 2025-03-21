
import React from 'react';

interface ResponseBreakdownProps {
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
}

const ResponseBreakdown: React.FC<ResponseBreakdownProps> = ({
  correctAnswers,
  incorrectAnswers,
  unattempted,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h4 className="text-sm sm:text-base font-medium text-learnzy-dark mb-3 sm:mb-4">Response Breakdown</h4>
      <div className="flex space-x-2 sm:space-x-4">
        <div className="flex-1 p-2 sm:p-4 bg-green-100/50 rounded-lg">
          <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Correct</h5>
          <span className="text-lg sm:text-xl font-semibold text-green-600">{correctAnswers}</span>
        </div>
        <div className="flex-1 p-2 sm:p-4 bg-red-100/50 rounded-lg">
          <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Incorrect</h5>
          <span className="text-lg sm:text-xl font-semibold text-red-600">{incorrectAnswers}</span>
        </div>
        <div className="flex-1 p-2 sm:p-4 bg-gray-100/50 rounded-lg">
          <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Unattempted</h5>
          <span className="text-lg sm:text-xl font-semibold text-gray-600">{unattempted}</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseBreakdown;
