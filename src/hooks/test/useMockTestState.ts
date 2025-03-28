
import { useState } from 'react'
import { useTestTimer } from './useTestTimer'
import { useMockTestQuestions } from './useMockTestQuestions'
import { TestState, TestActions } from './types'
import { useTestActions } from './useTestActions'

export const useMockTestState = (cycle: string, testNumber: string): [TestState, TestActions] => {
  const [questions, setQuestions] = useState([])
  const [questionsData, isLoading, sessionId, startTime] = useMockTestQuestions(cycle, testNumber)
  
  // Sync questions from questionsData when it changes
  if (questionsData.length > 0 && questions.length === 0) {
    setQuestions(questionsData)
  }

  // Determine subject from the first question
  const subject = questions.length > 0 
    ? (questions[0].subject as any) 
    : 'mixed';

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

  // Mock tests have the same time limit as diagnostic tests
  const [timeRemaining, formatTime] = useTestTimer(180 * 60, handleSubmitTest, subject)

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
