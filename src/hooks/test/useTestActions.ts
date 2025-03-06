
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Question, Subject } from '../../services/questionService'
import { completeTestSession, updateQuestionAnswer } from '../../services/testSession'

export const useTestActions = (
  subject: Subject,
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  sessionId: string | null,
  startTime: number
) => {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleAnswerSelected = (
    questionId: number,
    answerId: string,
    timeTaken: number
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer: answerId } : q))
    )
    
    // Update the answer in the database if we have a session
    if (sessionId) {
      updateQuestionAnswer(sessionId, questionId, answerId, timeTaken)
        .catch(error => console.error('Error updating question answer:', error))
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const handleSubmitTest = () => {
    setIsSubmitting(true)

    // Calculate time taken in seconds
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)

    // Prepare question results
    const questionResults = questions.map((q) => {
      // Check if the answer is correct by comparing with correctAnswer
      const isCorrect =
        q.answer && q.correctAnswer ? q.answer === q.correctAnswer : false

      return {
        id: q.id,
        text: q.text,
        userAnswer: q.answer,
        correctAnswer: q.correctAnswer || '',
        isCorrect,
        timeTaken: timeTaken / questions.length, // Default time distribution if not tracked per question
        tags: [],
      }
    })

    // Save to test session in database
    if (sessionId) {
      completeTestSession(sessionId, questionResults)
        .then(() => {
          // Navigate to results page with session ID
          navigate(`/results/${subject}?sessionId=${sessionId}`)
        })
        .catch((error) => {
          console.error('Error completing test session:', error)
          // Fallback to localStorage if database save fails
          localStorage.setItem('testResults', JSON.stringify(questionResults))
          navigate(`/results/${subject}`)
        })
    } else {
      // Fallback to localStorage if no session ID
      localStorage.setItem('testResults', JSON.stringify(questionResults))
      setTimeout(() => {
        navigate(`/results/${subject}`)
      }, 1500)
    }
  }

  const handleSubmitClick = () => {
    const answeredCount = questions.filter((q) => q.answer).length
    if (answeredCount < questions.length * 0.5) {
      setShowWarning(true)
    } else {
      handleSubmitTest()
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
