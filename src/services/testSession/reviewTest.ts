
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { Question, Subject } from '../question'
import { createTestSession } from './createUpdateSession'
import { QuestionResult } from './types'

interface SubjectQuestions {
  physics: QuestionResult[]
  chemistry: QuestionResult[]
  biology: QuestionResult[]
}

/**
 * Generates an AI-Powered Review Test based on incorrectly answered questions from previous tests
 * It selects up to 45 questions for each subject (physics, chemistry, biology)
 * prioritizing questions based on their Priority_Level (High, Medium, Low)
 *
 * @param sourceSessionId The ID of the test session that triggered the review generation
 * @param cycle The cycle number to analyze (will use all mocks from this cycle)
 * @returns The ID of the newly created review test session, or null if an error occurred
 */
export const generateReviewTest = async (
  sourceSessionId: string,
  cycle: number
): Promise<string | null> => {
  try {
    console.log(
      'Generating review test from session:',
      sourceSessionId,
      'for cycle:',
      cycle
    )

    // 1. First fetch the source session data to get the user ID
    const { data: sourceSession, error: sourceError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sourceSessionId)
      .single()

    if (sourceError || !sourceSession) {
      console.error('Error fetching source test session:', sourceError)
      toast.error('Failed to fetch test data for review')
      return null
    }

    const userId = sourceSession.user_id

    // 2. Fetch all mock tests from this cycle (Mocks 1-4)
    const { data: mockSessions, error: mocksError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('user_id', userId)
      .like('id', `mock-${cycle}-%`)
      .not('id', 'like', `mock-${cycle}-5-%`) // Exclude any existing Mock 5
      .order('id', { ascending: true })

    if (mocksError) {
      console.error('Error fetching mock tests for cycle:', mocksError)
      toast.error('Failed to fetch your mock test data')
      return null
    }

    console.log(
      `Found ${mockSessions?.length || 0} mock tests for cycle ${cycle}`
    )

    // 3. Collect all incorrectly answered questions from all mocks
    const incorrectQuestions: SubjectQuestions = {
      physics: [],
      chemistry: [],
      biology: [],
    }

    // Track questions we've already added to avoid duplicates
    const addedQuestions = new Set<string>()

    mockSessions?.forEach((session) => {
      const questions = session.questions_data || []

      questions.forEach((q: QuestionResult) => {
        // Skip correctly answered questions
        if (q.isCorrect === true) {
          return
        }

        // Create a unique key for this question to avoid duplicates
        const questionKey = `${q.id}-${q.Subject || q.subject}`
        if (addedQuestions.has(questionKey)) {
          return
        }

        // Determine the subject (case insensitive check)
        // Handle both 'Subject' and 'subject' properties
        const subject = ((q.Subject || q.subject) || '').toLowerCase()

        if (subject === 'physics') {
          incorrectQuestions.physics.push(q)
          addedQuestions.add(questionKey)
        } else if (subject === 'chemistry') {
          incorrectQuestions.chemistry.push(q)
          addedQuestions.add(questionKey)
        } else if (subject === 'biology') {
          incorrectQuestions.biology.push(q)
          addedQuestions.add(questionKey)
        }
      })
    })

    console.log('Unique incorrect questions by subject:', {
      physics: incorrectQuestions.physics.length,
      chemistry: incorrectQuestions.chemistry.length,
      biology: incorrectQuestions.biology.length,
    })

    // 4. Sort each subject's questions by priority (High → Medium → Low)
    const sortByPriority = (questions: QuestionResult[]): QuestionResult[] => {
      return [...questions].sort((a, b) => {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 }
        const aPriority = priorityOrder[a.Priority_Level || 'Medium'] || 1
        const bPriority = priorityOrder[b.Priority_Level || 'Medium'] || 1
        return aPriority - bPriority
      })
    }

    const sortedPhysics = sortByPriority(incorrectQuestions.physics)
    const sortedChemistry = sortByPriority(incorrectQuestions.chemistry)
    const sortedBiology = sortByPriority(incorrectQuestions.biology)

    // 5. Select up to 45 questions for each subject
    const selectedPhysics = sortedPhysics.slice(0, 45)
    const selectedChemistry = sortedChemistry.slice(0, 45)
    const selectedBiology = sortedBiology.slice(0, 45)

    console.log('Selected questions for review test:', {
      physics: selectedPhysics.length,
      chemistry: selectedChemistry.length,
      biology: selectedBiology.length,
    })

    // 6. Convert QuestionResult[] to Question[] format for the new test
    const convertToQuestion = (q: QuestionResult): Question => ({
      id: q.id,
      text: q.text,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      Subject: q.Subject || q.subject || '', // Handle both uppercase and lowercase properties
      Chapter_name: q.Chapter_name,
      Topic: q.Topic,
      Subtopic: q.Subtopic,
      Difficulty_Level: q.Difficulty_Level,
      Question_Structure: q.Question_Structure,
      Bloom_Taxonomy: q.Bloom_Taxonomy,
      Priority_Level: q.Priority_Level,
      Time_to_Solve: q.Time_to_Solve,
      Key_Concept_Tested: q.Key_Concept_Tested,
      Common_Pitfalls: q.Common_Pitfalls,
      Option_A: q.Option_A,
      Option_B: q.Option_B,
      Option_C: q.Option_C,
      Option_D: q.Option_D,
    })

    const reviewQuestions: Question[] = [
      ...selectedPhysics.map(convertToQuestion),
      ...selectedChemistry.map(convertToQuestion),
      ...selectedBiology.map(convertToQuestion),
    ]

    if (reviewQuestions.length === 0) {
      console.warn('No questions available for review test')
      toast.error('No incorrect questions found to create a review test')
      return null
    }

    // 7. Generate a unique session ID for the review test (Mock 5)
    const reviewSessionId = `mock-${cycle}-5-${Date.now()}`

    // 8. Create the review test session
    console.log(`Creating Mock 5 test with ${reviewQuestions.length} questions`)

    // Use 'mixed' as subject since we're combining multiple subjects
    const newSessionId = await createTestSession(
      'mixed' as Subject,
      reviewQuestions,
      reviewSessionId
    )

    console.log('Mock 5 test created with ID:', newSessionId)
    return newSessionId
  } catch (error) {
    console.error('Error generating review test:', error)
    toast.error('Failed to generate review test')
    return null
  }
}
