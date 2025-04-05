import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

export const useDynamicTestGenerator = (cycle: string) => {
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(true)
  const [progress, setProgress] = useState(10)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    // Increment progress for visual feedback
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 5
      })
    }, 1000)

    const generateDynamicTest = async () => {
      try {
        // Get user ID
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          toast.error('You need to be logged in to take this test')
          navigate('/auth')
          return
        }

        // Step 1: Get completed tests from this cycle to analyze weakness
        const { data: sessions, error: sessionsError } = await supabase
          .from('test_sessions')
          .select('*')
          .eq('user_id', user.id)
          .like('source_session_id', `mock-${cycle}-%`)
          .not('end_time', 'is', null)
          .order('start_time', { ascending: false })
          .limit(4)

        if (sessionsError) {
          console.error('Error fetching mock test sessions:', sessionsError)
          toast.error('Failed to generate your personalized test')
          navigate('/subjects')
          return
        }

        // If not enough tests completed, redirect back
        if (!sessions || sessions.length < 4) {
          toast.error('You need to complete all 4 tests in this cycle first')
          navigate('/subjects')
          return
        }

        // Step 2: Extract all questions from the previous tests with user performance
        const allQuestions: {
          question: any
          isCorrect: boolean
          mockNumber: string
        }[] = []

        sessions.forEach((session) => {
          const mockNumber = session.source_session_id?.split('-')[2] || '0'

          if (session.questions_data && Array.isArray(session.questions_data)) {
            session.questions_data.forEach((q) => {
              allQuestions.push({
                question: q,
                isCorrect: q.isCorrect === true,
                mockNumber,
              })
            })
          }
        })

        // Step 3: Group questions by subject
        const questionsBySubject: Record<string, any[]> = {
          physics: [],
          chemistry: [],
          biology: [],
        }

        allQuestions.forEach((item) => {
          const subject = determineSubject(item.question)
          if (
            subject === 'physics' ||
            subject === 'chemistry' ||
            subject === 'biology'
          ) {
            questionsBySubject[subject].push(item)
          }
        })

        // Step 4: Select 60 questions from each subject, prioritizing incorrect answers
        const selectedQuestions: any[] = []

        Object.entries(questionsBySubject).forEach(([subject, questions]) => {
          // Remove duplicates (keep only one instance of each unique question)
          const uniqueQuestions = removeDuplicateQuestions(questions)

          // Sort by correct/incorrect and then by priority
          const sortedQuestions = uniqueQuestions.sort((a, b) => {
            // First sort by correctness (incorrect first)
            if (a.isCorrect !== b.isCorrect) {
              return a.isCorrect ? 1 : -1
            }

            // Then by priority level if available
            const aPriority = getPriorityValue(a.question)
            const bPriority = getPriorityValue(b.question)
            return aPriority - bPriority
          })

          // Take top 60 questions from each subject
          const topQuestions = sortedQuestions
            .slice(0, 60)
            .map((item) => item.question)
          selectedQuestions.push(...topQuestions)
        })

        // Step 5: If we don't have enough questions, fill with others
        if (selectedQuestions.length < 180) {
          console.warn(
            `Only ${selectedQuestions.length} unique questions found from previous tests`
          )

          // This situation might happen if there aren't enough unique questions
          // Try to fill each subject to 60 questions
          Object.entries(questionsBySubject).forEach(([subject, questions]) => {
            const currentCount = selectedQuestions.filter(
              (q) => determineSubject(q) === subject
            ).length

            if (currentCount < 60) {
              // Need to add more questions for this subject
              const neededCount = 60 - currentCount

              // Get all the questions for this subject that aren't already selected
              const selectedIds = new Set(selectedQuestions.map((q) => q.id))
              const remainingQuestions = questions
                .filter((item) => !selectedIds.has(item.question.id))
                .sort((a, b) => (a.isCorrect ? 1 : -1))
                .map((item) => item.question)

              // If we still don't have enough, we might need to duplicate some questions
              if (remainingQuestions.length < neededCount) {
                // Add what we have and note the gap
                selectedQuestions.push(...remainingQuestions)
                console.warn(
                  `Could not find ${
                    neededCount - remainingQuestions.length
                  } more unique ${subject} questions`
                )

                // As a fallback, duplicate some of the existing questions
                // This ensures the test always has the required number of questions
                const existingSubjectQuestions = selectedQuestions.filter(
                  (q) => determineSubject(q) === subject
                )

                // Duplicate some questions to reach the target count
                // Modify them slightly so they appear as different questions
                const duplicatesNeeded = neededCount - remainingQuestions.length
                for (let i = 0; i < duplicatesNeeded; i++) {
                  const sourceDQ =
                    existingSubjectQuestions[
                      i % existingSubjectQuestions.length
                    ]
                  if (sourceDQ) {
                    // Create a copy with a new ID to avoid duplicates
                    const duplicatedQuestion = {
                      ...sourceDQ,
                      id: `dup-${subject}-${i}-${sourceDQ.id}`,
                      userAnswer: null,
                      isCorrect: false,
                    }
                    selectedQuestions.push(duplicatedQuestion)
                  }
                }
              } else {
                // Add just what we need
                selectedQuestions.push(
                  ...remainingQuestions.slice(0, neededCount)
                )
              }
            }
          })
        }

        // Step 6: Ensure we have exactly 180 questions (60 per subject)
        // Verify the counts for each subject
        const finalCounts = {
          physics: 0,
          chemistry: 0,
          biology: 0,
        }

        selectedQuestions.forEach((q) => {
          const subject = determineSubject(q)
          if (subject in finalCounts) {
            finalCounts[subject as keyof typeof finalCounts]++
          }
        })

        console.log('Final question counts:', finalCounts)

        // Final safety check - if somehow we don't have 180 total questions,
        // adjust the array size
        if (selectedQuestions.length !== 180) {
          if (selectedQuestions.length > 180) {
            // Trim excess questions evenly from each subject
            const excess = selectedQuestions.length - 180
            console.warn(`Trimming ${excess} excess questions`)

            const bySubject: Record<string, any[]> = {
              physics: [],
              chemistry: [],
              biology: [],
            }

            selectedQuestions.forEach((q) => {
              const subject = determineSubject(q)
              if (subject in bySubject) {
                bySubject[subject].push(q)
              }
            })

            // Reset the list and rebuild with exactly 60 per subject
            selectedQuestions.length = 0
            Object.values(bySubject).forEach((subjectQuestions) => {
              selectedQuestions.push(...subjectQuestions.slice(0, 60))
            })
          } else {
            // Should not happen with our fallback logic, but just in case
            console.error(
              `Error: Only generated ${selectedQuestions.length} questions`
            )
            toast.error('Error generating complete test. Please try again.')
            navigate('/subjects')
            return
          }
        }

        // Step 7: Assign new sequential IDs for the test
        // Group by subject for ID assignment
        const questionsWithIds: any[] = []

        // Physics: IDs 1-60
        const physicsQuestions = selectedQuestions.filter(
          (q) => determineSubject(q) === 'physics'
        )
        physicsQuestions.forEach((q, i) => {
          questionsWithIds.push({ ...q, id: i + 1 })
        })

        // Chemistry: IDs 61-120
        const chemistryQuestions = selectedQuestions.filter(
          (q) => determineSubject(q) === 'chemistry'
        )
        chemistryQuestions.forEach((q, i) => {
          questionsWithIds.push({ ...q, id: i + 61 })
        })

        // Biology: IDs 121-180
        const biologyQuestions = selectedQuestions.filter(
          (q) => determineSubject(q) === 'biology'
        )
        biologyQuestions.forEach((q, i) => {
          questionsWithIds.push({ ...q, id: i + 121 })
        })

        // Reset user answers from previous attempts
        const formattedQuestions = questionsWithIds.map((q) => ({
          ...q,
          userAnswer: null,
          isCorrect: false,
        }))

        // Step 8: Create a new test session
        const dynamicSessionId = `mock-${cycle}-5`

        const sessionData = {
          user_id: user.id,
          subject: 'mixed',
          start_time: new Date().toISOString(),
          end_time: null,
          score: null,
          total_questions: formattedQuestions.length,
          source_session_id: dynamicSessionId,
          questions_data: formattedQuestions,
        }

        const { data: session, error: sessionError } = await supabase
          .from('test_sessions')
          .insert(sessionData)
          .select('id')
          .single()

        if (sessionError) {
          console.error('Error creating test session:', sessionError)
          toast.error('Failed to create your test session')
          navigate('/subjects')
          return
        }

        setSessionId(session.id)
        setProgress(100)

        // Complete test generation and navigate to the test
        setTimeout(() => {
          setIsGenerating(false)
          navigate(`/mock-test/${cycle}/5`)
        }, 2000)
      } catch (error) {
        console.error('Error generating dynamic test:', error)
        toast.error('An unexpected error occurred')
        navigate('/subjects')
      }
    }

    generateDynamicTest()

    return () => clearInterval(progressInterval)
  }, [cycle, navigate])

  // Helper functions
  const determineSubject = (question: any): string => {
    // First check if the question has a subject field
    if (question.subject) {
      const subjectLower = question.subject.toLowerCase()
      if (['physics', 'chemistry', 'biology'].includes(subjectLower)) {
        return subjectLower
      }
    }

    if (question.Subject) {
      const subjectLower = question.Subject.toLowerCase()
      if (['physics', 'chemistry', 'biology'].includes(subjectLower)) {
        return subjectLower
      }
    }

    // Then check the chapter name for keywords
    const chapterName = question.Chapter_name || question.chapter_name || ''
    const chapterLower = chapterName.toLowerCase()

    if (
      chapterLower.includes('physics') ||
      chapterLower.includes('mechanics') ||
      chapterLower.includes('electro') ||
      chapterLower.includes('optics')
    ) {
      return 'physics'
    } else if (
      chapterLower.includes('chem') ||
      chapterLower.includes('organic') ||
      chapterLower.includes('inorganic') ||
      chapterLower.includes('periodic')
    ) {
      return 'chemistry'
    }

    // Default to biology for medical entrance focus
    return 'biology'
  }

  const getPriorityValue = (question: any): number => {
    const priority =
      question.Priority_Level || question.priority_level || 'Medium'
    const priorityMap: Record<string, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    }
    return priorityMap[priority] || 1
  }

  const removeDuplicateQuestions = (questions: any[]): any[] => {
    // Group by question text to identify duplicates
    const uniqueQuestions = new Map()

    questions.forEach((item) => {
      const text = item.question.text
      if (!uniqueQuestions.has(text) || !item.isCorrect) {
        // Keep if not seen before or if incorrect (prioritize incorrect answers)
        uniqueQuestions.set(text, item)
      }
    })

    return Array.from(uniqueQuestions.values())
  }

  return {
    isGenerating,
    progress,
    sessionId,
  }
}
