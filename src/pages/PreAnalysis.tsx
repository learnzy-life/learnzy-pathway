
import { useToast } from '@/hooks/use-toast'
import { ArrowRight, Check, Info } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  QuestionResult,
  getTestSession,
  updateQuestionTags,
} from '../services/testSession'

interface TagOption {
  id: string
  label: string
  description: string
}

const PreAnalysis: React.FC = () => {
  const { subject } = useParams<{ subject: string }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const navigate = useNavigate()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<QuestionResult[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tagOptions: TagOption[] = [
    {
      id: 'misunderstood_concept',
      label: 'Misunderstood Concept',
      description: "I didn't fully understand the underlying concept",
    },
    {
      id: 'calculation_error',
      label: 'Calculation Error',
      description: 'I made a mistake in my calculations',
    },
    {
      id: 'careless_mistake',
      label: 'Careless Mistake',
      description: 'I knew the answer but made a simple error',
    },
    {
      id: 'time_pressure',
      label: 'Time Pressure',
      description: 'I rushed through this question due to time constraints',
    },
    {
      id: 'unknown_material',
      label: 'Unknown Material',
      description: "This material wasn't part of my preparation",
    },
    {
      id: 'misread_question',
      label: 'Misread Question',
      description: 'I misunderstood what the question was asking',
    },
  ]

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

  const incorrectQuestions = questions.filter((q) => !q.isCorrect)
  console.log('PreAnalysis: Incorrect questions:', incorrectQuestions.length)

  if (incorrectQuestions.length === 0 && !isLoading && questions.length > 0) {
    console.log('PreAnalysis: No incorrect questions, navigating to results')
    // Ensure sessionId is passed to the results page
    const resultsUrl = `/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`
    console.log('PreAnalysis: Navigating to', resultsUrl)
    navigate(resultsUrl)
    return null
  }

  const currentQuestion = incorrectQuestions[currentQuestionIndex]

  const handleTagToggle = (tagId: string) => {
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

  const handleNextQuestion = () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Preparing your analysis...</h2>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium">Processing your analysis...</h2>
        <p className="text-muted-foreground">
          Please wait while we generate your insights.
        </p>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">
            No incorrect questions found
          </h2>
          <p className="text-muted-foreground mb-6">
            Great job! Proceeding to your results.
          </p>
          <button
            onClick={() => {
              const resultsUrl = `/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`
              console.log('PreAnalysis: Navigating to', resultsUrl)
              navigate(resultsUrl)
            }}
            className="button-primary"
          >
            View Results
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-learnzy-dark mb-2">
            Analyze Your Mistakes
          </h1>
          <p className="text-muted-foreground">
            Understanding why you got questions wrong will help you improve
            faster. Select all tags that apply to each incorrect question.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full">
            Question {currentQuestionIndex + 1} of {incorrectQuestions.length}
          </span>

          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="w-4 h-4 mr-1" />
            <span>You can select multiple reasons</span>
          </div>
        </div>

        <div className="card-glass p-6 mb-6">
          <h3 className="text-lg font-medium text-learnzy-dark mb-4">
            Question {currentQuestion.id}
          </h3>
          <p className="text-learnzy-dark mb-6">{currentQuestion.text}</p>

          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Your answer:</span>
                <span className="font-medium text-red-600">
                  {currentQuestion.userAnswer || 'Not answered'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Correct answer:</span>
                <span className="font-medium text-green-600">
                  {currentQuestion.correctAnswer}
                </span>
              </div>
            </div>
          </div>

          <h4 className="text-base font-medium text-learnzy-dark mb-3">
            Why did you get this wrong?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tagOptions.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`
                  flex items-start p-3 rounded-lg text-left transition-all
                  ${
                    currentQuestion.tags.includes(tag.id)
                      ? 'bg-learnzy-purple/20 border border-learnzy-purple/30'
                      : 'bg-white border border-gray-100 hover:border-learnzy-purple/30'
                  }
                `}
              >
                <div
                  className={`
                  w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mr-3 mt-0.5
                  ${
                    currentQuestion.tags.includes(tag.id)
                      ? 'bg-learnzy-purple text-white'
                      : 'border border-gray-300'
                  }
                `}
                >
                  {currentQuestion.tags.includes(tag.id) && (
                    <Check className="w-3 h-3" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-learnzy-dark">
                    {tag.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tag.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`button-secondary ${
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleSubmitAnalysis}
            className="button-secondary ml-auto mr-2"
          >
            Skip Analysis
          </button>

          <button
            onClick={handleNextQuestion}
            className="button-primary flex items-center"
          >
            {currentQuestionIndex < incorrectQuestions.length - 1
              ? 'Next Question'
              : 'Finish Analysis'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreAnalysis
