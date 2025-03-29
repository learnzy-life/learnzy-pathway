
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { QuestionResult, getTestSession, updateQuestionTags } from '../../../services/testSession'

export function usePreAnalysisState() {
  const { subject } = useParams<{ subject: string }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const isMock = searchParams.get('mock') === 'true'
  const cycle = searchParams.get('cycle')
  const testNumber = searchParams.get('testNumber')
  const navigate = useNavigate()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<QuestionResult[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestData = async () => {
      setIsLoading(true)
      setErrorMessage(null)

      if (!sessionId) {
        console.error('PreAnalysis: No sessionId provided')
        setErrorMessage('No session ID provided. Please take a test first.')
        setIsLoading(false)
        return
      }

      try {
        const session = await getTestSession(sessionId)
        if (session && session.questions && session.questions.length > 0) {
          console.log('PreAnalysis: Found session data with', session.questions.length, 'questions')
          setQuestions(session.questions)
          setIsLoading(false)
          return
        } else {
          console.error('PreAnalysis: Session data is missing or has no questions')
          setErrorMessage('No questions found in this test session.')
        }
      } catch (error) {
        console.error('PreAnalysis: Error fetching session data:', error)
        setErrorMessage('Error loading test data. Please try again.')
      }

      // Fallback to localStorage if sessionId fails
      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          setQuestions(parsedResults)
        } catch (error) {
          console.error('Error parsing stored results:', error)
          setErrorMessage('Error loading test data from local storage.')
          setQuestions([])
        }
      } else {
        setQuestions([])
      }

      setIsLoading(false)
    }

    fetchTestData()
  }, [sessionId, subject])

  const handleTagToggle = (tagId: string, currentQuestion: QuestionResult) => {
    if (!currentQuestion) return

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === currentQuestion.id) {
          const existingTags = q.tags || []
          const updatedTags = existingTags.includes(tagId)
            ? existingTags.filter((t) => t !== tagId)
            : [...existingTags, tagId]

          if (sessionId) {
            updateQuestionTags(sessionId, q.id, updatedTags).catch((error) =>
              console.error('Error updating tags:', error)
            )
          }

          return { ...q, tags: updatedTags }
        }
        return q
      })
    )
  }

  const handleNextQuestion = (filteredQuestions: QuestionResult[]) => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleSubmitAnalysis()
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitAnalysis = () => {
    setIsSubmitting(true)

    localStorage.setItem('analyzedQuestions', JSON.stringify(questions))

    toast({
      title: 'Analysis complete',
      description:
        'Your test has been analyzed. View your detailed results now.',
    })

    // Construct URL based on test type
    let url
    if (isMock && cycle && testNumber) {
      url = `/results/mixed?sessionId=${sessionId}&mock=true&cycle=${cycle}&testNumber=${testNumber}`
    } else if (isMock) {
      url = `/results/mixed?sessionId=${sessionId}&mock=true`
    } else {
      url = `/results/${subject}?sessionId=${sessionId}`
    }

    setTimeout(() => {
      navigate(url)
    }, 800)
  }

  return {
    subject,
    sessionId,
    navigate,
    questions,
    currentQuestionIndex,
    isLoading,
    isSubmitting,
    errorMessage,
    handleTagToggle,
    handleNextQuestion,
    handlePrevQuestion,
    handleSubmitAnalysis,
  }
}
