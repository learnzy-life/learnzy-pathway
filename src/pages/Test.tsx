
import React from 'react'
import { useParams } from 'react-router-dom'
import QuestionNavigation from '../components/QuestionNavigation'
import SubmitWarningDialog from '../components/SubmitWarningDialog'
import TestFooter from '../components/TestFooter'
import TestHeader from '../components/TestHeader'
import TestQuestion from '../components/TestQuestion'
import { useTestState } from '../hooks/test/useTestState'
import { Subject } from '../services/question'
import TestSubjectFilter from '../components/TestSubjectFilter'

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
      activeSubjectFilter,
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
      handleSubjectFilterChange,
    },
  ] = useTestState(subject as Subject)

  // Sort questions by their ID to ensure numerical ascending order
  const sortedQuestions = [...questions].sort((a, b) => a.id - b.id)
  
  // Apply subject filter if active
  const filteredQuestions = activeSubjectFilter 
    ? sortedQuestions.filter(q => (q.subject || q.Subject || '').toLowerCase() === activeSubjectFilter.toLowerCase())
    : sortedQuestions;
  
  const currentQuestion = filteredQuestions[currentQuestionIndex] || sortedQuestions[currentQuestionIndex]
  const answeredCount = sortedQuestions.filter((q) => q.answer).length

  // Get unique subjects from questions
  const subjects = Array.from(new Set(sortedQuestions.map(q => 
    (q.subject || q.Subject || '').toLowerCase()))).filter(Boolean) as string[];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading test questions...</h2>
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
        subject={subject || ''}
        answeredCount={answeredCount}
        totalQuestions={sortedQuestions.length}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
      />

      {subjects.length > 1 && (
        <TestSubjectFilter 
          subjects={subjects} 
          activeFilter={activeSubjectFilter} 
          onFilterChange={handleSubjectFilterChange}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        <QuestionNavigation
          questions={sortedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onJumpToQuestion={handleJumpToQuestion}
          activeFilter={activeSubjectFilter}
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
                isCurrentQuestion={index === currentQuestionIndex}
                subjectTag={question.subject || question.Subject}
              />
            ))}
          </div>
        </div>
      </div>

      <TestFooter
        currentQuestionIndex={currentQuestionIndex}
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

export default Test
