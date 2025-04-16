import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import QuestionNavigation from '../components/QuestionNavigation'
import SubmitWarningDialog from '../components/SubmitWarningDialog'
import TestFooter from '../components/TestFooter'
import TestHeader from '../components/TestHeader'
import TestQuestion from '../components/TestQuestion'
import { useAuth } from '../context/AuthContext'
import { useMockTestState } from '../hooks/test/useMockTestState'

// Define subject types for filtering
type Subject = 'all' | 'physics' | 'chemistry' | 'biology'

const MockTest: React.FC = () => {
  const { cycle, testNumber } = useParams<{
    cycle: string
    testNumber: string
  }>()
  const navigate = useNavigate()
  const { user, isLoading: isAuthLoading } = useAuth()
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all')

  // Determine if this is the dynamic 5th test
  const isDynamicTest = testNumber === '5'

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

  // Get available subjects from questions
  const availableSubjects = sortedQuestions.length
    ? [...new Set(sortedQuestions.map(q =>
        (q.subject?.toLowerCase() || '') as string
      ))].filter(Boolean)
    : []

  // Filter questions by selected subject if not showing all
  const filteredQuestions = selectedSubject === 'all'
    ? sortedQuestions
    : sortedQuestions.filter(q => {
        const qSubject = q.subject?.toLowerCase() || '';
        return qSubject === selectedSubject;
      })

  // Adjust currentQuestionIndex if filtered questions are fewer than the current index
  const adjustedIndex = Math.min(currentQuestionIndex, filteredQuestions.length - 1);

  // Count answered questions
  const answeredCount = sortedQuestions.filter((q) => q.answer).length

  // Get the appropriate test title
  const testTitle = isDynamicTest
    ? 'Personalized Mock Test'
    : `Mock Test ${testNumber}`

  // Subject filter handler
  const handleSubjectChange = (subject: Subject) => {
    setSelectedSubject(subject)
    // Reset to first question whenever filter changes
    handleJumpToQuestion(0)
  }

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
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-medium mb-2">
            Loading {isDynamicTest ? 'personalized' : 'mock'} test questions...
          </h2>
          {isDynamicTest && (
            <p className="text-center text-muted-foreground max-w-md">
              This test is tailored to your performance in the previous 4 mock
              tests, focusing on areas where you can improve.
            </p>
          )}
        </div>
      </div>
    )
  }

  if (sortedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">
            No questions available. Please try again later.
          </p>
          <button
            onClick={() => navigate('/subjects')}
            className="button-primary"
          >
            Return to Dashboard
          </button>
        </div>
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
        subject={testTitle}
        answeredCount={answeredCount}
        totalQuestions={sortedQuestions.length}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
      />

      {/* Subject Filter Controls */}
      {availableSubjects.length > 0 && (
        <div className="bg-white border-b border-gray-100 py-3 shadow-subtle">
          <div className="container mx-auto flex items-center justify-center px-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSubjectChange('all')}
                  className={`
                    px-3 py-1 text-sm font-medium rounded-full transition-all
                    ${selectedSubject === 'all'
                      ? 'bg-learnzy-purple text-white'
                      : 'bg-learnzy-purple/10 text-learnzy-purple hover:bg-learnzy-purple/20'
                    }
                  `}
                >
                  All
                </button>
                {availableSubjects.includes('physics') && (
                  <button
                    onClick={() => handleSubjectChange('physics')}
                    className={`
                      px-3 py-1 text-sm font-medium rounded-full transition-all
                      ${selectedSubject === 'physics'
                        ? 'bg-learnzy-purple text-white'
                        : 'bg-learnzy-purple/10 text-learnzy-purple hover:bg-learnzy-purple/20'
                      }
                    `}
                  >
                    Physics
                  </button>
                )}
                {availableSubjects.includes('chemistry') && (
                  <button
                    onClick={() => handleSubjectChange('chemistry')}
                    className={`
                      px-3 py-1 text-sm font-medium rounded-full transition-all
                      ${selectedSubject === 'chemistry'
                        ? 'bg-learnzy-purple text-white'
                        : 'bg-learnzy-purple/10 text-learnzy-purple hover:bg-learnzy-purple/20'
                      }
                    `}
                  >
                    Chemistry
                  </button>
                )}
                {availableSubjects.includes('biology') && (
                  <button
                    onClick={() => handleSubjectChange('biology')}
                    className={`
                      px-3 py-1 text-sm font-medium rounded-full transition-all
                      ${selectedSubject === 'biology'
                        ? 'bg-learnzy-purple text-white'
                        : 'bg-learnzy-purple/10 text-learnzy-purple hover:bg-learnzy-purple/20'
                      }
                    `}
                  >
                    Biology
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <QuestionNavigation
          questions={filteredQuestions}
          currentQuestionIndex={adjustedIndex}
          onJumpToQuestion={handleJumpToQuestion}
        />

        <div className="flex-1 overflow-y-auto pb-32">
          <div className="container mx-auto px-6 py-8 max-w-3xl">
            {filteredQuestions.map((question, index) => (
              <TestQuestion
                key={question.id}
                id={question.id}
                text={question.text}
                options={question.options}
                onAnswerSelected={handleAnswerSelected}
                selectedAnswer={question.answer}
                isCurrentQuestion={index === adjustedIndex}
              />
            ))}
          </div>
        </div>
      </div>

      <TestFooter
        currentQuestionIndex={adjustedIndex}
        questionsLength={filteredQuestions.length}
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
