
import React from 'react'
import { Info } from 'lucide-react'
import { usePreAnalysisState } from './hooks/usePreAnalysisState'
import QuestionDisplay from './components/QuestionDisplay'
import NavigationButtons from './components/NavigationButtons'
import { tagOptions } from './constants/tagOptions'

const PreAnalysis: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    isLoading,
    isSubmitting,
    handleTagToggle,
    handleNextQuestion,
    handlePrevQuestion,
    handleSubmitAnalysis,
  } = usePreAnalysisState()

  const incorrectQuestions = questions.filter((q) => !q.isCorrect)
  console.log('PreAnalysis: Incorrect questions:', incorrectQuestions.length)

  if (incorrectQuestions.length === 0 && !isLoading && questions.length > 0) {
    console.log('PreAnalysis: No incorrect questions, navigating to results')
    handleSubmitAnalysis()
    return null
  }

  const currentQuestion = incorrectQuestions[currentQuestionIndex]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Preparing your analysis...</h2>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium">Processing your analysis...</h2>
        <p className="text-muted-foreground">
          Please wait while we generate your insights.
        </p>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">
            No incorrect questions found
          </h2>
          <p className="text-muted-foreground mb-6">
            Great job! Proceeding to your results.
          </p>
          <button
            onClick={handleSubmitAnalysis}
            className="button-primary"
          >
            View Results
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-learnzy-dark mb-2">
            Analyze Your Mistakes
          </h1>
          <p className="text-muted-foreground">
            Understanding why you got questions wrong will help you improve
            faster. Select all tags that apply to each incorrect question.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
            Question {currentQuestionIndex + 1} of {incorrectQuestions.length}
          </span>

          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="w-4 h-4 mr-1" />
            <span>You can select multiple reasons</span>
          </div>
        </div>

        <QuestionDisplay 
          currentQuestion={currentQuestion}
          tagOptions={tagOptions}
          onTagToggle={(tagId) => handleTagToggle(tagId, currentQuestion)}
        />

        <NavigationButtons 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={incorrectQuestions.length}
          onPrevQuestion={handlePrevQuestion}
          onNextQuestion={() => handleNextQuestion(incorrectQuestions)}
          onSubmitAnalysis={handleSubmitAnalysis}
        />
      </div>
    </div>
  )
}

export default PreAnalysis
