
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { QuestionResult, TestSession } from './types'

// Complete a test session
export const completeTestSession = async (
  sessionId: string,
  questions: QuestionResult[]
): Promise<boolean> => {
  try {
    // Calculate score
    const answeredQuestions = questions.filter((q) => q.userAnswer !== null)
    const correctAnswers = questions.filter((q) => q.isCorrect)
    const score = (correctAnswers.length / questions.length) * 100

    console.log('Completing test session:', sessionId, 'with score:', score)
    console.log('Questions data with metadata:', questions[0])

    // Ensure all questions have the required metadata fields (both cases)
    const questionsWithMetadata = questions.map(q => ({
      id: q.id,
      text: q.text,
      userAnswer: q.userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: q.isCorrect,
      timeTaken: q.timeTaken,
      tags: q.tags || [],
      // Include both uppercase and lowercase variants for maximum compatibility
      Subject: q.Subject || q.subject || '',
      Chapter_name: q.Chapter_name || q.chapter_name || '',
      Topic: q.Topic || q.topic || '',
      Subtopic: q.Subtopic || q.subtopic || '',
      Difficulty_Level: q.Difficulty_Level || q.difficulty_level || '',
      Question_Structure: q.Question_Structure || q.question_structure || '',
      Bloom_Taxonomy: q.Bloom_Taxonomy || q.bloom_taxonomy || '',
      Priority_Level: q.Priority_Level || q.priority_level || '',
      Time_to_Solve: q.Time_to_Solve || q.time_to_solve || 0,
      Key_Concept_Tested: q.Key_Concept_Tested || q.key_concept_tested || '',
      Common_Pitfalls: q.Common_Pitfalls || q.common_pitfalls || '',
      subject: q.subject || q.Subject || '',
      chapter_name: q.chapter_name || q.Chapter_name || '',
      topic: q.topic || q.Topic || '',
      subtopic: q.subtopic || q.Subtopic || '',
      difficulty_level: q.difficulty_level || q.Difficulty_Level || '',
      question_structure: q.question_structure || q.Question_Structure || '',
      bloom_taxonomy: q.bloom_taxonomy || q.Bloom_Taxonomy || '',
      priority_level: q.priority_level || q.Priority_Level || '',
      time_to_solve: q.time_to_solve || q.Time_to_Solve || 0,
      key_concept_tested: q.key_concept_tested || q.Key_Concept_Tested || '',
      common_pitfalls: q.common_pitfalls || q.Common_Pitfalls || '',
      // Include options data for review
      Option_A: q.Option_A || q.option_a || '',
      Option_B: q.Option_B || q.option_b || '',
      Option_C: q.Option_C || q.option_c || '',
      Option_D: q.Option_D || q.option_d || '',
      option_a: q.option_a || q.Option_A || '',
      option_b: q.option_b || q.Option_B || '',
      option_c: q.option_c || q.Option_C || '',
      option_d: q.option_d || q.Option_D || '',
      options: q.options || []
    }))

    // Get subject-level metadata from the first question (trying both cases)
    const firstQuestion = questions.length > 0 ? questions[0] : null
    
    // Update the session with both questions data and top-level metadata fields
    const { error } = await supabase
      .from('test_sessions')
      .update({
        end_time: new Date().toISOString(),
        score,
        questions_data: questionsWithMetadata,
        // Save metadata at the session level too (trying both cases)
        chapter_name: firstQuestion?.chapter_name || firstQuestion?.Chapter_name || null,
        topic: firstQuestion?.topic || firstQuestion?.Topic || null,
        subtopic: firstQuestion?.subtopic || firstQuestion?.Subtopic || null,
        difficulty_level: firstQuestion?.difficulty_level || firstQuestion?.Difficulty_Level || null,
        question_structure: firstQuestion?.question_structure || firstQuestion?.Question_Structure || null,
        bloom_taxonomy: firstQuestion?.bloom_taxonomy || firstQuestion?.Bloom_Taxonomy || null,
        priority_level: firstQuestion?.priority_level || firstQuestion?.Priority_Level || null,
        time_to_solve: firstQuestion?.time_to_solve || firstQuestion?.Time_to_Solve || null,
        key_concept_tested: firstQuestion?.key_concept_tested || firstQuestion?.Key_Concept_Tested || null,
        common_pitfalls: firstQuestion?.common_pitfalls || firstQuestion?.Common_Pitfalls || null
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Error completing test session:', error)
      toast.error('Failed to save test results')
      return false
    }

    console.log('Test session completed successfully with all metadata fields')
    return true
  } catch (err) {
    console.error('Unexpected error completing test session:', err)
    return false
  }
}

// Get a test session by ID
export const getTestSession = async (
  sessionId: string
): Promise<TestSession | null> => {
  try {
    console.log('Fetching test session:', sessionId)

    const { data, error } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching test session:', error)
      return null
    }

    if (!data) {
      console.error('No test session found with ID:', sessionId)
      return null
    }

    console.log('Test session data:', data)

    // Make sure questions_data is always an array
    const questionsData = Array.isArray(data.questions_data) 
      ? data.questions_data 
      : []

    return {
      id: data.id,
      userId: data.user_id,
      subject: data.subject,
      startTime: data.start_time,
      endTime: data.end_time,
      score: data.score || 0,
      totalQuestions: data.total_questions || questionsData.length,
      questions: questionsData,
      // Include metadata fields
      chapterName: data.chapter_name,
      topic: data.topic,
      subtopic: data.subtopic,
      difficultyLevel: data.difficulty_level,
      questionStructure: data.question_structure,
      bloomTaxonomy: data.bloom_taxonomy,
      priorityLevel: data.priority_level,
      timeToSolve: data.time_to_solve,
      keyConceptTested: data.key_concept_tested,
      commonPitfalls: data.common_pitfalls
    }
  } catch (err) {
    console.error('Unexpected error fetching test session:', err)
    return null
  }
}
