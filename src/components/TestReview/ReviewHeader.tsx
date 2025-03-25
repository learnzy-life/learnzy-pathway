import React from 'react';
import { Question } from '../../services/question';

interface ReviewHeaderProps {
  currentQuestion: Question;
  questionIndex: number;
  totalQuestions: number;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ currentQuestion, questionIndex, totalQuestions }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-learnzy-dark">
        Question {questionIndex + 1} / {totalQuestions}
      </h2>
      <div className="text-sm text-muted-foreground">
        {currentQuestion.Topic && <span>Topic: {currentQuestion.Topic}</span>}
      </div>
    </div>
  );
};

export default ReviewHeader;
