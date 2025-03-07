
import React from 'react'
import { QuestionResult } from '../../../services/testSession'
import TagOptions from './TagOptions'
import { TagOption } from './TagOptions'

interface QuestionDisplayProps {
  currentQuestion: QuestionResult
  tagOptions: TagOption[]
  onTagToggle: (tagId: string) => void
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  currentQuestion,
  tagOptions,
  onTagToggle,
}) => {
  return (
    <div className="card-glass p-6 mb-6">
      <h3 className="text-lg font-medium text-learnzy-dark mb-4">
        Question {currentQuestion.id}
      </h3>
      <p className="text-learnzy-dark mb-6">{currentQuestion.text}</p>

      <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Your answer:</span>
            <span className="font-medium text-red-600">
              {currentQuestion.userAnswer || 'Not answered'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Correct answer:</span>
            <span className="font-medium text-green-600">
              {currentQuestion.correctAnswer}
            </span>
          </div>
        </div>
      </div>

      <h4 className="text-base font-medium text-learnzy-dark mb-3">
        Why did you get this wrong?
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
