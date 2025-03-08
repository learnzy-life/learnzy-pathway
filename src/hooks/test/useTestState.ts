
import { useState } from 'react'
import { Subject } from '../../services/questionService'
import { useTestTimer } from './useTestTimer'
import { useTestQuestions } from './useTestQuestions'
import { useTestActions } from './useTestActions'
import { TestState, TestActions } from './types'

export const useTestState = (subject: Subject): [TestState, TestActions] => {
  const [questions, setQuestions] = useState([])
  const [questionsData, isLoading, sessionId, startTime] = useTestQuestions(subject)
  
  // Sync questions from questionsData when it changes
  if (questionsData.length > 0 && questions.length === 0) {
    setQuestions(questionsData)
  }

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

  // Pass subject to useTestTimer to set the correct time limit
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
