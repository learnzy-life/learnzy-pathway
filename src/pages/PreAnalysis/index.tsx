
import React from 'react'
import { usePreAnalysisState } from './hooks/usePreAnalysisState'
import QuestionDisplay from './components/QuestionDisplay'
import NavigationButtons from './components/NavigationButtons'

const PreAnalysis: React.FC = () => {
  const {
    subject,
    sessionId,
    navigate,
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

  if (incorrectQuestions.length === 0 && !isLoading && questions.length > 0) {
    navigate(`/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`)
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
            onClick={() =>
              navigate(
                `/results/${subject}${
                  sessionId ? `?sessionId=${sessionId}` : ''
                }`
              )
            }
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

        <QuestionDisplay
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          incorrectQuestionsCount={incorrectQuestions.length}
          onTagToggle={(tagId) => handleTagToggle(tagId, currentQuestion)}
        />

        <NavigationButtons
          canGoBack={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === incorrectQuestions.length - 1}
          onPrevious={handlePrevQuestion}
          onNext={() => handleNextQuestion(incorrectQuestions)}
          onSkip={handleSubmitAnalysis}
        />
      </div>
    </div>
  )
}

export default PreAnalysis
