import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Question, Subject, fetchQuestions } from '../services/questionService'
import {
  createTestSession,
  completeTestSession,
} from '../services/testSession'

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
  handleAnswerSelected: (questionId: number, answerId: string) => void
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

      // Load the questions first
      const loadedQuestions = await fetchQuestions(subject)
      
      // Then create a new test session with the loaded questions
      const newSessionId = await createTestSession(subject, loadedQuestions)
      setSessionId(newSessionId)
      setStartTime(Date.now())
      
      setQuestions(loadedQuestions)
      setIsLoading(false)
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

  const handleAnswerSelected = (questionId: number, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer: answerId } : q))
    )
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

  const getRandomDifferentAnswer = (question: Question): string => {
    const options = question.options.map((o) => o.id)
    const filteredOptions = options.filter((id) => id !== question.answer)
    return filteredOptions[Math.floor(Math.random() * filteredOptions.length)]
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
        timeTaken: timeTaken / questions.length, // Add the missing timeTaken property
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
