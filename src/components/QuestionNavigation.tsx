
import React from 'react'
import { Check } from 'lucide-react'

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
      case 'physics': return 'border-blue-500 bg-blue-50';
      case 'chemistry': return 'border-purple-500 bg-purple-50';
      case 'biology': return 'border-green-500 bg-green-50';
      default: return '';
    }
  };

  return (
    <div className="bg-white border-r border-gray-200 w-28 flex-shrink-0 overflow-y-auto">
      <div className="p-4 grid grid-cols-2 gap-3">
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
                transition-all border-2 relative
                ${isCurrentQuestion ? 'bg-learnzy-purple text-white border-learnzy-purple ring-2 ring-learnzy-purple/30' : ''}
                ${isAnswered && !isCurrentQuestion ? 'bg-learnzy-purple/10 border-learnzy-purple text-learnzy-purple' : ''}
                ${!isAnswered && !isCurrentQuestion ? 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50' : ''}
                ${subjectColor && !isCurrentQuestion && !isAnswered ? subjectColor : ''}
                shadow-sm
              `}
            >
              {isAnswered && !isCurrentQuestion && (
                <Check className="absolute top-0.5 right-0.5 w-3 h-3 text-learnzy-purple" />
              )}
              {question.id}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionNavigation
