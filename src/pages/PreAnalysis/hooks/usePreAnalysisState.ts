
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

  useEffect(() => {
    const fetchTestData = async () => {
      setIsLoading(true)

      if (sessionId) {
        try {
          const session = await getTestSession(sessionId)
          if (session && session.questions) {
            console.log('PreAnalysis: Found session data with', session.questions.length, 'questions')
            setQuestions(session.questions)
            setIsLoading(false)
            return
          } else {
            console.error('PreAnalysis: Session data is missing or has no questions')
          }
        } catch (error) {
          console.error('PreAnalysis: Error fetching session data:', error)
        }
      } else {
        console.error('PreAnalysis: No sessionId provided')
      }

      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          setQuestions(parsedResults)
        } catch (error) {
          console.error('Error parsing stored results:', error)
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
      url = `/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`
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
    handleTagToggle,
    handleNextQuestion,
    handlePrevQuestion,
    handleSubmitAnalysis,
  }
}
