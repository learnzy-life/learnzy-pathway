
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Option {
  id: string;
  text: string;
}

interface QuestionProps {
  id: number;
  text: string;
  options: Option[];
  onAnswerSelected: (questionId: number, answerId: string, timeTaken: number) => void;
  selectedAnswer?: string;
  isCurrentQuestion: boolean;
}

const TestQuestion: React.FC<QuestionProps> = ({
  id,
  text,
  options,
  onAnswerSelected,
  selectedAnswer,
  isCurrentQuestion,
}) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isCurrentQuestion) {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      setTimer(interval);
      return () => clearInterval(interval);
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [isCurrentQuestion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerClick = (answerId: string) => {
    onAnswerSelected(id, answerId, timeSpent);
  };

  if (!isCurrentQuestion) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-learnzy-purple px-3 py-1 bg-learnzy-purple/10 rounded-full">
          Question {id}
        </span>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" /> 
          <span>{formatTime(timeSpent)}</span>
        </div>
      </div>

      <div className="card-glass p-6 mb-6">
        <p className="text-lg text-learnzy-dark">{text}</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerClick(option.id)}
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-200
              ${selectedAnswer === option.id 
                ? 'bg-learnzy-purple text-white shadow-md' 
                : 'bg-white border border-gray-100 hover:border-learnzy-purple/30 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-start">
              <span className={`
                flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium
                ${selectedAnswer === option.id ? 'bg-white text-learnzy-purple' : 'bg-gray-100 text-learnzy-dark'}
              `}>
                {option.id}
              </span>
              <span className="text-base">{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestQuestion;
