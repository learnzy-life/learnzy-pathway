import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import QuestionNavigation from '../components/QuestionNavigation'
import SubmitWarningDialog from '../components/SubmitWarningDialog'
import TestFooter from '../components/TestFooter'
import TestHeader from '../components/TestHeader'
import TestQuestion from '../components/TestQuestion'
import { useAuth } from '../context/AuthContext'
import { useMockTestState } from '../hooks/test/useMockTestState'

const MockTest: React.FC = () => {
  const { cycle, testNumber } = useParams<{
    cycle: string
    testNumber: string
  }>()
  const navigate = useNavigate()
  const { user, isLoading: isAuthLoading } = useAuth()

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error('Please log in to take mock tests')
      navigate('/auth', {
        state: { from: `/mock-test/${cycle}/${testNumber}` },
      })
    }
  }, [user, isAuthLoading, navigate, cycle, testNumber])

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
  ] = useMockTestState(cycle || '1', testNumber || '1')

  // Sort questions by their ID to ensure numerical ascending order
  const sortedQuestions = [...questions].sort((a, b) => a.id - b.id)

  const currentQuestion = sortedQuestions[currentQuestionIndex]
  const answeredCount = sortedQuestions.filter((q) => q.answer).length

  // Show loading state while checking authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading...</h2>
      </div>
    )
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">
          Loading mock test questions...
        </h2>
      </div>
    )
  }

  if (sortedQuestions.length === 0) {
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
        subject={`Mock Test ${testNumber}`}
        answeredCount={answeredCount}
        totalQuestions={sortedQuestions.length}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
      />

      <div className="flex flex-1 overflow-hidden">
        <QuestionNavigation
          questions={sortedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onJumpToQuestion={handleJumpToQuestion}
        />

        <div className="flex-1 overflow-y-auto pb-32">
          <div className="container mx-auto px-6 py-8 max-w-3xl">
            {sortedQuestions.map((question, index) => (
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
        questionsLength={sortedQuestions.length}
        onPrevQuestion={handlePrevQuestion}
        onNextQuestion={handleNextQuestion}
        onSubmitClick={handleSubmitClick}
      />

      {showWarning && (
        <SubmitWarningDialog
          answeredCount={answeredCount}
          totalQuestions={sortedQuestions.length}
          onContinue={() => setShowWarning(false)}
          onSubmit={handleSubmitTest}
        />
      )}
    </div>
  )
}

export default MockTest
