
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Question, Subject, fetchQuestions } from '../services/questionService'
import {
  createTestSession,
  completeTestSession,
  updateQuestionAnswer,
} from '../services/testSession'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

interface TestState {
  questions: Question[]
  currentQuestionIndex: number
  timeRemaining: number
  isSubmitting: boolean
  showWarning: boolean
  isLoading: boolean
  sessionId: string | null
}

interface TestActions {
  handleAnswerSelected: (questionId: number, answerId: string, timeTaken: number) => void
  handleNextQuestion: () => void
  handlePrevQuestion: () => void
  handleJumpToQuestion: (index: number) => void
  handleSubmitTest: () => void
  handleSubmitClick: () => void
  formatTime: (seconds: number) => string
  setShowWarning: (show: boolean) => void
}

export const useTestState = (subject: Subject): [TestState, TestActions] => {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeRemaining, setTimeRemaining] = useState(180 * 60) // 180 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)

      try {
        // Load the questions first
        const loadedQuestions = await fetchQuestions(subject)
        
        // Get user mood and ritual data from localStorage
        const mood = localStorage.getItem('selected_mood') || 'unknown'
        const ritual = localStorage.getItem('selected_ritual') || 'none'
        
        // Then create a new test session with the loaded questions
        const newSessionId = await createTestSession(subject, loadedQuestions)
        setSessionId(newSessionId)
        
        if (newSessionId) {
          // Save the preparation data
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            const { error } = await supabase.from('user_test_preparations').insert({
              user_id: user.id,
              test_session_id: newSessionId,
              subject,
              mood,
              ritual
            })
            
            if (error) {
              console.error('Error saving test preparation data:', error)
            }
          }
        }
        
        setStartTime(Date.now())
        setQuestions(loadedQuestions)
      } catch (error) {
        console.error('Error loading test:', error)
        toast.error('Failed to load test questions')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [subject])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`
  }

  const handleAnswerSelected = (questionId: number, answerId: string, timeTaken: number) => {
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
          // Navigate to analysis page with session ID
          navigate(`/analysis/${subject}?sessionId=${sessionId}`)
        })
        .catch((error) => {
          console.error('Error completing test session:', error)
          // Fallback to localStorage if database save fails
          localStorage.setItem('testResults', JSON.stringify(questionResults))
          navigate(`/analysis/${subject}`)
        })
    } else {
      // Fallback to localStorage if no session ID
      localStorage.setItem('testResults', JSON.stringify(questionResults))
      setTimeout(() => {
        navigate(`/analysis/${subject}`)
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
