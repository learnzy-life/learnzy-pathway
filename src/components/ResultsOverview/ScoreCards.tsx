
import React from 'react';

interface ScoreCardsProps {
  totalScore: number;
  maxScore: number;
  accuracy: number;
  timeSpent: string;
}

const ScoreCards: React.FC<ScoreCardsProps> = ({
  totalScore,
  maxScore,
  accuracy,
  timeSpent,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Total Score</h4>
        <div className="flex items-end">
          <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{totalScore}</span>
          <span className="text-sm sm:text-base text-muted-foreground ml-1 mb-0.5">/ {maxScore}</span>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Accuracy</h4>
        <div className="flex items-end">
          <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{accuracy}%</span>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Time Spent</h4>
        <div className="flex items-end">
          <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{timeSpent}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCards;
