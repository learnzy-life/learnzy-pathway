
import React from 'react'
import { QuestionResult } from '../../../services/testSession'
import TagOptions from './TagOptions'
import { TagOption } from './TagOptions'
import { QuestionFilterType } from '@/hooks/test/types'

interface QuestionDisplayProps {
  currentQuestion: QuestionResult
  tagOptions: TagOption[]
  onTagToggle: (tagId: string) => void
  questionType: QuestionFilterType
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  currentQuestion,
  tagOptions,
  onTagToggle,
  questionType,
}) => {
  return (
    <div className="card-glass p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-medium text-learnzy-dark mb-3 sm:mb-4">
        Question {currentQuestion.id}
      </h3>
      <p className="text-sm sm:text-base text-learnzy-dark mb-4 sm:mb-6">{currentQuestion.text}</p>

      <div className="mb-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
          {questionType === 'incorrect' ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-muted-foreground">Your answer:</span>
                <span className="text-xs sm:text-sm font-medium text-red-600">
                  {currentQuestion.userAnswer || 'Not answered'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-muted-foreground">Correct answer:</span>
                <span className="text-xs sm:text-sm font-medium text-green-600">
                  {currentQuestion.correctAnswer}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Correct answer:</span>
              <span className="text-xs sm:text-sm font-medium text-green-600">
                {currentQuestion.correctAnswer}
              </span>
            </div>
          )}
        </div>
      </div>

      <h4 className="text-sm sm:text-base font-medium text-learnzy-dark mb-2 sm:mb-3">
        {questionType === 'incorrect' 
          ? 'Why did you get this wrong?' 
          : 'Why did you skip this question?'}
      </h4>

      <TagOptions 
        tagOptions={tagOptions} 
        currentQuestion={currentQuestion} 
        onTagToggle={onTagToggle} 
      />
    </div>
  )
}

export default QuestionDisplay
