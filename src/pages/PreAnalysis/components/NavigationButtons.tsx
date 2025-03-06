
import React from 'react'
import { ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  canGoBack: boolean
  isLastQuestion: boolean
  onPrevious: () => void
  onNext: () => void
  onSkip: () => void
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  canGoBack,
  isLastQuestion,
  onPrevious,
  onNext,
  onSkip,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevious}
        disabled={!canGoBack}
        className={`button-secondary ${
          !canGoBack ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Previous
      </button>

      <button onClick={onSkip} className="button-secondary ml-auto mr-2">
        Skip Analysis
      </button>

      <button onClick={onNext} className="button-primary flex items-center">
        {!isLastQuestion ? 'Next Question' : 'Finish Analysis'}
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  )
}

export default NavigationButtons
