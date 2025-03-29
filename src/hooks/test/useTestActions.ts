
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../lib/supabase'
import { Subject } from '../../services/question'
import { completeTestSession } from '../../services/testSession'
import { isMockTestSession, getMockTestMetadata } from '../../services/testSession/dynamicTestService'

export const useTestActions = (
  subject: Subject,
  questions: any[],
  setQuestions: (questions: any[]) => void,
  sessionId: string | null,
  startTime: number
) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const navigate = useNavigate()

  const handleAnswerSelected = (questionId: number, answer: string, timeTaken?: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answer: answer,
              timeTaken: timeTaken || 0, // Store time taken if provided
            }
          : q
      )
    )
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
    window.scrollTo(0, 0)
  }

  const handleSubmitClick = () => {
    const unansweredCount = questions.filter((q) => !q.answer).length

    if (unansweredCount > 0) {
      setShowWarning(true)
    } else {
      handleSubmitTest()
    }
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)

    try {
      const user = await getCurrentUser()
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      if (sessionId) {
        await completeTestSession(
          sessionId,
          questions.map((q) => ({
            id: q.id,
            answer: q.answer || null,
          }))
        )

        // Check if this is a mock test session
        const isMock = await isMockTestSession(sessionId);
        
        if (isMock) {
          // For mock tests, extract cycle and test number for results page
          const { cycle, testNumber } = getMockTestMetadata(sessionId);
          
          // Redirect to pre-analysis for mock tests
          navigate(`/analysis/${subject}?sessionId=${sessionId}&mock=true&cycle=${cycle}&testNumber=${testNumber}`);
        } else {
          // Regular diagnostic test flow
          navigate(`/analysis/${subject}?sessionId=${sessionId}`);
        }
      } else {
        console.error('No session ID available')
        navigate(`/results/${subject}`)
      }
    } catch (error) {
      console.error('Error submitting test:', error)
      toast.error('Failed to submit test. Please try again.')
      setIsSubmitting(false)
    }
  }

  return {
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
  }
}
