
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
        const session = await getTestSession(sessionId)
        if (session && session.questions) {
          setQuestions(session.questions)
          setIsLoading(false)
          return
        }
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
          const updatedTags = q.tags.includes(tagId)
            ? q.tags.filter((t) => t !== tagId)
            : [...q.tags, tagId]

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

    // Add mock test parameters to URL if this is a mock test
    let url = `/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`
    if (isMock && cycle && testNumber) {
      url += `${sessionId ? '&' : '?'}mock=true&cycle=${cycle}&testNumber=${testNumber}`
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
