
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  text: string
  options: Option[]
  answer?: string
  correctAnswer?: string
  Subject?: string
  Chapter_name?: string
  Topic?: string
  Subtopic?: string
  Difficulty_Level?: string
  Question_Structure?: string
  Bloom_Taxonomy?: string
  Priority_Level?: string
  Time_to_Solve?: number
  Key_Concept_Tested?: string
  Common_Pitfalls?: string
  // For biology (lowercase with underscores)
  subject?: string
  chapter_name?: string
  topic?: string
  subtopic?: string
  difficulty_level?: string
  question_structure?: string
  bloom_taxonomy?: string
  priority_level?: string
  time_to_solve?: number
  key_concept_tested?: string
  common_pitfalls?: string
}

export type Subject = 'biology' | 'physics' | 'chemistry'

export const generateMockQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    text: `This is a sample question about a topic in ${
      i % 3 === 0 ? 'cell biology' : i % 3 === 1 ? 'genetics' : 'physiology'
    }. It tests your understanding of key concepts and principles.`,
    options: [
      {
        id: 'A',
        text: 'Sample option A with some explanation text to make it longer.',
      },
      {
        id: 'B',
        text: 'Sample option B that provides an alternative answer to the question.',
      },
      { id: 'C', text: 'Sample option C which might be correct or incorrect.' },
      {
        id: 'D',
        text: 'Sample option D to complete the four possible answers.',
      },
    ],
    Subject: 'biology',
    Chapter_name: 'Sample Chapter',
    Topic: 'Sample Topic',
    Subtopic: 'Sample Subtopic',
    Difficulty_Level: 'Medium',
    Question_Structure: 'Multiple Choice',
    Bloom_Taxonomy: 'Comprehension',
    Priority_Level: 'Medium',
    Time_to_Solve: 1.0,
    Key_Concept_Tested: 'Sample concept',
    Common_Pitfalls: 'Common mistake',
  }))
}

export const fetchQuestions = async (subject: Subject): Promise<Question[]> => {
  console.log(`Fetching questions for ${subject}...`)

  try {
    let tableToQuery = ''

    if (subject === 'physics') {
      tableToQuery = 'physics_dt'
      console.log('Attempting to fetch from physics_dt table...')
    } else if (subject === 'biology') {
      tableToQuery = 'biology_dt'
      console.log('Attempting to fetch from biology_dt table...')
    } else if (subject === 'chemistry') {
      tableToQuery = 'chemistry_dt'
      console.log('Attempting to fetch from chemistry_dt table...')
    } else {
      console.log(`No specific table for ${subject}, using mock data.`)
      return generateMockQuestions(180)
    }

    // Log Supabase URL for debugging (don't log the key)
    console.log(`Using Supabase URL: ${import.meta.env.VITE_SUPABASE_URL}`)

    const { data, error } = await supabase.from(tableToQuery).select('*')

    if (error) {
      console.error('Error fetching questions:', error)
      toast.error('Failed to load questions. Using sample questions instead.')
      return generateMockQuestions(180)
    } else if (data && data.length > 0) {
      console.log(
        `Successfully loaded ${data.length} questions from ${tableToQuery}`
      )
      console.log('Sample question:', data[0])

      const formattedQuestions: Question[] = data.map((q: any) => {
        // Handle differences in column naming between tables
        if (subject === 'biology') {
          // Biology uses lowercase with underscores
          return {
            id: q.q_no || 0,
            text: q.question_text || 'No question text available',
            options: [
              { id: 'A', text: q.option_a || 'Option A' },
              { id: 'B', text: q.option_b || 'Option B' },
              { id: 'C', text: q.option_c || 'Option C' },
              { id: 'D', text: q.option_d || 'Option D' },
            ],
            correctAnswer: q.correct_answer || '',
            subject: q.subject,
            chapter_name: q.chapter_name,
            topic: q.topic,
            subtopic: q.subtopic,
            difficulty_level: q.difficulty_level,
            question_structure: q.question_structure,
            bloom_taxonomy: q.bloom_taxonomy,
            priority_level: q.priority_level,
            time_to_solve: q.time_to_solve,
            key_concept_tested: q.key_concept_tested,
            common_pitfalls: q.common_pitfalls,
          }
        } else {
          // Chemistry and Physics still use the original column names
          return {
            id: q.q_no || 0,
            text: q.Question_Text || 'No question text available',
            options: [
              { id: 'A', text: q.Option_A || 'Option A' },
              { id: 'B', text: q.Option_B || 'Option B' },
              { id: 'C', text: q.Option_C || 'Option C' },
              { id: 'D', text: q.Option_D || 'Option D' },
            ],
            correctAnswer: q.Correct_Answer || '',
            Subject: q.Subject,
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
          }
        }
      })

      return formattedQuestions
    } else {
      console.warn(
        'No questions found in the database. Using sample questions instead.'
      )
      return generateMockQuestions(180)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    toast.error('An unexpected error occurred. Using sample questions instead.')
    return generateMockQuestions(180)
  }
}
