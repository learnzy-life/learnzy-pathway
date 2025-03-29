
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
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string | null>(null)
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

  const handleSubjectFilterChange = (subject: string | null) => {
    setActiveSubjectFilter(subject)
    
    // If filter is applied, jump to the first question of that subject
    if (subject) {
      const firstQuestionIndex = questions.findIndex(q => 
        (q.subject || q.Subject || '').toLowerCase() === subject.toLowerCase()
      )
      
      if (firstQuestionIndex !== -1) {
        setCurrentQuestionIndex(firstQuestionIndex)
        window.scrollTo(0, 0)
      }
    }
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)

    try {
      const user = await getCurrentUser()
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      if (sessionId) {
        // Create complete question results with all required fields
        const questionResults = questions.map(q => ({
          id: q.id,
          text: q.text || '',
          options: q.options || [],
          userAnswer: q.answer || null,
          correctAnswer: q.correctAnswer || '',
          isCorrect: q.answer === q.correctAnswer,
          timeTaken: q.timeTaken || 0,
          tags: q.tags || [],
          // Include both uppercase and lowercase metadata fields for compatibility
          subject: q.subject || q.Subject || subject,
          Subject: q.Subject || q.subject || subject,
          chapter_name: q.chapter_name || q.Chapter_name || '',
          Chapter_name: q.Chapter_name || q.chapter_name || '',
          topic: q.topic || q.Topic || '',
          Topic: q.Topic || q.topic || '',
          subtopic: q.subtopic || q.Subtopic || '',
          Subtopic: q.Subtopic || q.subtopic || '',
          difficulty_level: q.difficulty_level || q.Difficulty_Level || '',
          Difficulty_Level: q.Difficulty_Level || q.difficulty_level || '',
          question_structure: q.question_structure || q.Question_Structure || '',
          Question_Structure: q.Question_Structure || q.question_structure || '',
          bloom_taxonomy: q.bloom_taxonomy || q.Bloom_Taxonomy || '',
          Bloom_Taxonomy: q.Bloom_Taxonomy || q.bloom_taxonomy || '',
          priority_level: q.priority_level || q.Priority_Level || '',
          Priority_Level: q.Priority_Level || q.priority_level || '',
          time_to_solve: q.time_to_solve || q.Time_to_Solve || 0,
          Time_to_Solve: q.Time_to_Solve || q.time_to_solve || 0,
          key_concept_tested: q.key_concept_tested || q.Key_Concept_Tested || '',
          Key_Concept_Tested: q.Key_Concept_Tested || q.key_concept_tested || '',
          common_pitfalls: q.common_pitfalls || q.Common_Pitfalls || '',
          Common_Pitfalls: q.Common_Pitfalls || q.common_pitfalls || '',
        }));

        // Complete the test session with the rich question data
        const success = await completeTestSession(sessionId, questionResults)
        
        if (!success) {
          throw new Error('Failed to complete test session')
        }
        
        // Check if this is a mock test session
        const isMock = await isMockTestSession(sessionId)
        console.log('Is mock test:', isMock, 'SessionId:', sessionId)
        
        if (isMock) {
          // For mock tests, extract cycle and test number for results page
          const { cycle, testNumber } = await getMockTestMetadata(sessionId)
          console.log('Mock test metadata:', { cycle, testNumber })
          
          // Redirect to pre-analysis for mock tests with correct query parameters
          navigate(`/analysis/mixed?sessionId=${sessionId}&mock=true&cycle=${cycle}&testNumber=${testNumber}`)
        } else {
          // Regular diagnostic test flow
          navigate(`/analysis/${subject}?sessionId=${sessionId}`)
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
    activeSubjectFilter,
    setShowWarning,
    handleAnswerSelected,
    handleNextQuestion,
    handlePrevQuestion,
    handleJumpToQuestion,
    handleSubmitTest,
    handleSubmitClick,
    handleSubjectFilterChange,
  }
}
