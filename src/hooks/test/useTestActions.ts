
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Subject } from '../../services/questionService'
import { Question } from '../../types/dashboard'
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

  // Always work with sorted questions to ensure consistent ordering
  const sortedQuestions = [...questions].sort((a, b) => a.id - b.id)

  const handleAnswerSelected = (
    questionId: number,
    answerId: string,
    timeTaken: number
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer: answerId, timeTaken } : q))
    )
    
    if (sessionId) {
      updateQuestionAnswer(sessionId, questionId, answerId, timeTaken)
        .catch(error => console.error('Error updating question answer:', error))
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sortedQuestions.length - 1) {
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

    const timeTaken = Math.floor((Date.now() - startTime) / 1000)

    const questionResults = sortedQuestions.map((q) => {
      const isCorrect =
        q.answer && q.correctAnswer ? q.answer === q.correctAnswer : false

      return {
        id: q.id,
        text: q.text,
        userAnswer: q.answer || null,
        correctAnswer: q.correctAnswer || '',
        isCorrect,
        timeTaken: q.timeTaken || timeTaken / sortedQuestions.length,
        tags: [],
        Subject: q.Subject || '',
        Chapter_name: q.Chapter_name || '',
        Topic: q.Topic || '',
        Subtopic: q.Subtopic || '',
        Difficulty_Level: q.Difficulty_Level || '',
        Question_Structure: q.Question_Structure || '',
        Bloom_Taxonomy: q.Bloom_Taxonomy || '',
        Priority_Level: q.Priority_Level || '',
        Time_to_Solve: q.Time_to_Solve || 0,
        Key_Concept_Tested: q.Key_Concept_Tested || '',
        Common_Pitfalls: q.Common_Pitfalls || ''
      }
    })

    if (sessionId) {
      completeTestSession(sessionId, questionResults)
        .then(() => {
          navigate(`/analysis/${subject}?sessionId=${sessionId}`)
        })
        .catch((error) => {
          console.error('Error completing test session:', error)
          localStorage.setItem('testResults', JSON.stringify(questionResults))
          navigate(`/analysis/${subject}`)
        })
    } else {
      localStorage.setItem('testResults', JSON.stringify(questionResults))
      setTimeout(() => {
        navigate(`/analysis/${subject}`)
      }, 1500)
    }
  }

  const handleSubmitClick = () => {
    const answeredCount = sortedQuestions.filter((q) => q.answer).length
    if (answeredCount < sortedQuestions.length * 0.5) {
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
