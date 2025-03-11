
import React from 'react';
import { QuestionResult } from '../../services/testSession/types';
import QuestionOption from './QuestionOption';

interface QuestionCardProps {
  question: QuestionResult;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="card-glass p-6 mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
          Question {question.id}
        </span>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          question.isCorrect 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {question.isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      
      <p className="text-lg text-learnzy-dark mb-5">{question.text}</p>
      
      <div className="space-y-3">
        {question.options?.map((option) => (
          <QuestionOption
            key={option.id}
            optionId={option.id}
            optionText={option.text}
            isCorrectAnswer={option.id === question.correctAnswer}
            isUserAnswer={option.id === question.userAnswer}
          />
        ))}
        
        {!question.userAnswer && (
          <div className="p-3 bg-gray-50 rounded-lg text-center text-muted-foreground">
            This question was not attempted
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
