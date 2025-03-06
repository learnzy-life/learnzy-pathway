
import React from 'react'
import { useParams } from 'react-router-dom'
import QuestionNavigation from '../components/QuestionNavigation'
import SubmitWarningDialog from '../components/SubmitWarningDialog'
import TestFooter from '../components/TestFooter'
import TestHeader from '../components/TestHeader'
import TestQuestion from '../components/TestQuestion'
import { useTestState } from '../hooks/test/useTestState'
import { Subject } from '../services/questionService'

const Test: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const [
    {
      questions,
      currentQuestionIndex,
      timeRemaining,
      isSubmitting,
      showWarning,
      isLoading,
    },
    {
      handleAnswerSelected,
      handleNextQuestion,
      handlePrevQuestion,
      handleJumpToQuestion,
      handleSubmitTest,
      handleSubmitClick,
      formatTime,
      setShowWarning,
    },
  ] = useTestState(subject as Subject)

  const currentQuestion = questions[currentQuestionIndex]
  const answeredCount = questions.filter((q) => q.answer).length

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading test questions...</h2>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No questions available. Please try again later.
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium">Submitting your test...</h2>
        <p className="text-muted-foreground">
          Please wait while we process your answers.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TestHeader
        subject={subject || ''}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
      />

      <div className="flex flex-1 overflow-hidden">
        <QuestionNavigation
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onJumpToQuestion={handleJumpToQuestion}
        />

        <div className="flex-1 overflow-y-auto pb-32">
          <div className="container mx-auto px-6 py-8 max-w-3xl">
            {questions.map((question, index) => (
              <TestQuestion
                key={question.id}
                id={question.id}
                text={question.text}
                options={question.options}
                onAnswerSelected={handleAnswerSelected}
                selectedAnswer={question.answer}
                isCurrentQuestion={index === currentQuestionIndex}
              />
            ))}
          </div>
        </div>
      </div>

      <TestFooter
        currentQuestionIndex={currentQuestionIndex}
        questionsLength={questions.length}
        onPrevQuestion={handlePrevQuestion}
        onNextQuestion={handleNextQuestion}
        onSubmitClick={handleSubmitClick}
      />

      {showWarning && (
        <SubmitWarningDialog
          answeredCount={answeredCount}
          totalQuestions={questions.length}
          onContinue={() => setShowWarning(false)}
          onSubmit={handleSubmitTest}
        />
      )}
    </div>
  )
}

export default Test
