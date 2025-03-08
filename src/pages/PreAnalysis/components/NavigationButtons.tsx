
import React from 'react'
import { ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  currentQuestionIndex: number
  totalQuestions: number
  onPrevQuestion: () => void
  onNextQuestion: () => void
  onSubmitAnalysis: () => void
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevQuestion,
  onNextQuestion,
  onSubmitAnalysis,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevQuestion}
        disabled={currentQuestionIndex === 0}
        className={`button-secondary ${
          currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Previous
      </button>

      <button
        onClick={onSubmitAnalysis}
        className="button-secondary ml-auto mr-2 hover:bg-learnzy-amber/10"
      >
        Skip Analysis
      </button>

      <button
        onClick={onNextQuestion}
        className="button-primary flex items-center"
      >
        {currentQuestionIndex < totalQuestions - 1
          ? 'Next Question'
          : 'Finish Analysis'}
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  )
}

export default NavigationButtons
