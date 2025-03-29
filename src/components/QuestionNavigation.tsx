
import React from 'react'

interface Question {
  id: number
  answer?: string
  subject?: string
  Subject?: string
}

interface QuestionNavigationProps {
  questions: Question[]
  currentQuestionIndex: number
  onJumpToQuestion: (index: number) => void
  activeFilter?: string | null
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentQuestionIndex,
  onJumpToQuestion,
  activeFilter,
}) => {
  // Filter questions based on active filter
  const filteredQuestions = activeFilter 
    ? questions.filter(q => (q.subject || q.Subject || '').toLowerCase() === activeFilter.toLowerCase())
    : questions;

  // Map subject to colors
  const getSubjectColor = (subject?: string) => {
    if (!subject) return '';
    const lowerSubject = subject.toLowerCase();
    
    switch (lowerSubject) {
      case 'physics': return 'border-blue-500';
      case 'chemistry': return 'border-purple-500';
      case 'biology': return 'border-green-500';
      default: return '';
    }
  };

  return (
    <div className="bg-white border-r border-gray-200 w-24 flex-shrink-0 overflow-y-auto">
      <div className="p-4 grid grid-cols-2 gap-2">
        {filteredQuestions.map((question, index) => {
          const isCurrentQuestion = index === currentQuestionIndex;
          const isAnswered = !!question.answer;
          const subjectColor = getSubjectColor(question.subject || question.Subject);

          return (
            <button
              key={question.id}
              onClick={() => onJumpToQuestion(index)}
              className={`
                h-12 w-12 flex items-center justify-center rounded-lg text-sm font-medium
                transition-all border-2
                ${isCurrentQuestion ? 'bg-learnzy-purple text-white' : ''}
                ${isAnswered && !isCurrentQuestion ? 'bg-learnzy-purple/10 border-learnzy-purple text-learnzy-purple' : ''}
                ${!isAnswered && !isCurrentQuestion ? 'bg-white border-gray-200 text-gray-700' : ''}
                ${subjectColor && !isCurrentQuestion && !isAnswered ? subjectColor : ''}
              `}
            >
              {question.id}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionNavigation
