import { useState } from 'react'
import { TestActions, TestState } from './types'
import { useMockTestQuestions } from './useMockTestQuestions'
import { useTestActions } from './useTestActions'
import { useTestTimer } from './useTestTimer'

export const useMockTestState = (
  cycle: string,
  testNumber: string
): [TestState, TestActions] => {
  const [questions, setQuestions] = useState([])
  const [questionsData, isLoading, sessionId, startTime] = useMockTestQuestions(
    cycle,
    testNumber
  )

  // Sync questions from questionsData when it changes
  if (questionsData.length > 0 && questions.length === 0) {
    setQuestions(questionsData)
  }

  // Determine subject from the first question or use "mixed" for mock tests
  const subject = questions.length > 0 ? (questions[0].subject as any) : 'mixed'

  const {
    currentQuestionIndex,
    isSubmitting,
    showWarning,
    setShowWarning,
    handleAnswerSelected,
    handleNextQuestion,
    handlePrevQuestion,
    handleJumpToQuestion,
    handleSubmitTest,
    handleSubmitClick,
  } = useTestActions(subject, questions, setQuestions, sessionId, startTime)

  // All mock tests (including the dynamic 5th test) use the same time limit (180 min = 3 hours)
  // This ensures a consistent experience across all tests in a cycle
  const [timeRemaining, formatTime] = useTestTimer(
    180 * 60,
    handleSubmitTest,
    subject
  )

  return [
    {
      questions,
      currentQuestionIndex,
      timeRemaining,
      isSubmitting,
      showWarning,
      isLoading,
      sessionId,
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
  ]
}
