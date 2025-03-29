
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
  subjectTag?: string;
}

const TestQuestion: React.FC<QuestionProps> = ({
  id,
  text,
  options,
  onAnswerSelected,
  selectedAnswer,
  isCurrentQuestion,
  subjectTag,
}) => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isCurrentQuestion) {
      // Reset timer when switching to a new question
      setTimeSpent(0);
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCurrentQuestion, id]); // Added id to dependencies to reset on question change

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerClick = (answerId: string) => {
    // Pass the exact time taken in seconds to parent component
    onAnswerSelected(id, answerId, timeSpent);
  };

  if (!isCurrentQuestion) return null;

  // Map of subjects to colors
  const subjectColors: Record<string, string> = {
    physics: 'bg-blue-500',
    chemistry: 'bg-purple-500',
    biology: 'bg-green-500',
    mathematics: 'bg-red-500',
  };

  // Get color based on subject or default to gray
  const getSubjectColor = (subject?: string) => {
    if (!subject) return 'bg-gray-500';
    const lowerSubject = subject.toLowerCase();
    return subjectColors[lowerSubject] || 'bg-gray-500';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-learnzy-purple px-3 py-1 bg-learnzy-purple/10 rounded-full">
            Question {id}
          </span>
          
          {subjectTag && (
            <span className={`text-xs text-white px-3 py-1 rounded-full ${getSubjectColor(subjectTag)}`}>
              {subjectTag}
            </span>
          )}
        </div>
        
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
