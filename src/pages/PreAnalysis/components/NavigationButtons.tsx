
import React from 'react'
import { ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  currentQuestionIndex: number
  totalQuestions: number
  onPrevQuestion: () => void
  onNextQuestion: () => void
  onSubmitAnalysis: () => void
  isMobile?: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevQuestion,
  onNextQuestion,
  onSubmitAnalysis,
  isMobile = false,
}) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between'}`}>
      {isMobile ? (
        // Mobile layout
        <>
          <button
            onClick={onNextQuestion}
            className="button-primary flex items-center justify-center w-full"
          >
            {currentQuestionIndex < totalQuestions - 1
              ? 'Next Question'
              : 'Finish Analysis'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          
          <button
            onClick={onPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`button-secondary w-full ${
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>

          <button
            onClick={onSubmitAnalysis}
            className="button-secondary hover:bg-learnzy-amber/10 w-full"
          >
            Skip Analysis
          </button>
        </>
      ) : (
        // Desktop layout
        <>
          <button
            onClick={onPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`button-secondary ${
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>

          <div className="flex">
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
        </>
      )}
    </div>
  )
}

export default NavigationButtons
