
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { QuestionResult, getTestSession, updateQuestionTags } from '../../../services/testSession'

export function usePreAnalysisState() {
  const { subject } = useParams<{ subject: string }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const navigate = useNavigate()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<QuestionResult[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTestData = async () => {
      setIsLoading(true)
      console.log('PreAnalysis: Fetching test data with sessionId:', sessionId, 'and subject:', subject)

      if (sessionId) {
        const session = await getTestSession(sessionId)
        console.log('PreAnalysis: Retrieved session:', session)
        if (session && session.questions) {
          setQuestions(session.questions)
          setIsLoading(false)
          return
        }
      }

      console.log('PreAnalysis: No session found, trying localStorage')
      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults)
          console.log('PreAnalysis: Using data from localStorage:', parsedResults)
          setQuestions(parsedResults)
        } catch (error) {
          console.error('Error parsing stored results:', error)
          setQuestions([])
        }
      } else {
        console.log('PreAnalysis: No data found in localStorage')
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
          // Initialize tags array if it doesn't exist
          const currentTags = q.tags || []
          const updatedTags = currentTags.includes(tagId)
            ? currentTags.filter((t) => t !== tagId)
            : [...currentTags, tagId]

          if (sessionId) {
            console.log('PreAnalysis: Updating tags for question', q.id, 'to', updatedTags)
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

  const handleNextQuestion = (incorrectQuestions: QuestionResult[]) => {
    if (currentQuestionIndex < incorrectQuestions.length - 1) {
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

    // Save to localStorage for backup
    localStorage.setItem('analyzedQuestions', JSON.stringify(questions))
    console.log('PreAnalysis: Analysis completed, navigating to results')

    toast({
      title: 'Analysis complete',
      description:
        'Your test has been analyzed. View your detailed results now.',
    })

    setTimeout(() => {
      // Ensure sessionId is passed to the results page
      const resultsUrl = `/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`
      console.log('PreAnalysis: Navigating to', resultsUrl)
      navigate(resultsUrl)
    }, 800)
  }

  return {
    subject,
    sessionId,
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
