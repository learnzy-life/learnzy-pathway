
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { Question, Subject } from './types'
import { generateMockQuestions } from './mockQuestions'

export const fetchMockQuestions = async (cycle: string, testNumber: string): Promise<Question[]> => {
  console.log(`Fetching mock test ${testNumber} questions for cycle ${cycle}...`)

  try {
    // Map testNumber to the corresponding table name
    const tableToQuery = `mock_${testNumber}`
    console.log(`Attempting to fetch from ${tableToQuery} table...`)

    const { data, error } = await supabase.from(tableToQuery).select('*')

    if (error) {
      console.error(`Error fetching mock test questions:`, error)
      toast.error('Failed to load mock test questions. Using sample questions instead.')
      return generateMockQuestions(180)
    } else if (data && data.length > 0) {
      console.log(`Successfully loaded ${data.length} questions from ${tableToQuery}`)
      
      // Determine subject based on first question's subject field
      const mainSubject = data[0].subject?.toLowerCase() || 'mixed'
      
      // Format questions based on table structure
      const formattedQuestions = data.map(q => {
        // Create options array
        const options = [
          { id: 'A', text: q.option_a || q.Option_A || '' },
          { id: 'B', text: q.option_b || q.Option_B || '' },
          { id: 'C', text: q.option_c || q.Option_C || '' },
          { id: 'D', text: q.option_d || q.Option_D || '' },
        ].filter(option => option.text !== '')

        // Normalize fields regardless of case
        return {
          id: q.q_no,
          text: q.question_text || q.Question_Text || '',
          options,
          correctAnswer: q.correct_answer || q.Correct_Answer || 'A',
          subject: q.subject || q.Subject || mainSubject,
          Subject: q.Subject || q.subject || mainSubject,
          Chapter_name: q.Chapter_name || q.chapter_name || 'Unknown',
          Topic: q.Topic || q.topic || '',
          Subtopic: q.Subtopic || q.subtopic || '',
          Difficulty_Level: q.Difficulty_Level || q.difficulty_level || 'Medium',
          Question_Structure: q.Question_Structure || q.question_structure || 'Multiple Choice',
          Bloom_Taxonomy: q.Bloom_Taxonomy || q.bloom_taxonomy || '',
          Priority_Level: q.Priority_Level || q.priority_level || 'Medium',
          Time_to_Solve: q.Time_to_Solve || q.time_to_solve || 1.0,
          Key_Concept_Tested: q.Key_Concept_Tested || q.key_concept_tested || '',
          Common_Pitfalls: q.Common_Pitfalls || q.common_pitfalls || '',
          // Ensure lowercase properties also exist
          chapter_name: q.chapter_name || q.Chapter_name || 'Unknown',
          topic: q.topic || q.Topic || '',
          subtopic: q.subtopic || q.Subtopic || '',
          difficulty_level: q.difficulty_level || q.Difficulty_Level || 'Medium',
          question_structure: q.question_structure || q.Question_Structure || 'Multiple Choice',
          bloom_taxonomy: q.bloom_taxonomy || q.Bloom_Taxonomy || '',
          priority_level: q.priority_level || q.Priority_Level || 'Medium',
          time_to_solve: q.time_to_solve || q.Time_to_Solve || 1.0,
          key_concept_tested: q.key_concept_tested || q.Key_Concept_Tested || '',
          common_pitfalls: q.common_pitfalls || q.Common_Pitfalls || ''
        }
      })

      return formattedQuestions
    } else {
      console.warn(
        `No questions found in the ${tableToQuery} table. Using sample questions instead.`
      )
      return generateMockQuestions(180)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    toast.error('An unexpected error occurred. Using sample questions instead.')
    return generateMockQuestions(180)
  }
}
