
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

    const { data, error } = await supabase
      .from(tableToQuery)
      .select(
        'q_no, Question_Text, Option_A, Option_B, Option_C, Option_D, Correct_Answer'
      )

    if (error) {
      console.error('Error fetching questions:', error)
      toast.error('Failed to load questions. Using sample questions instead.')
      return generateMockQuestions(180)
    } else if (data && data.length > 0) {
      console.log(
        `Successfully loaded ${data.length} questions from ${tableToQuery}`
      )
      console.log('Sample question:', data[0])

      const formattedQuestions: Question[] = data.map((q: any) => ({
        id: q.q_no || 0,
        text: q.Question_Text || 'No question text available',
        options: [
          { id: 'A', text: q.Option_A || 'Option A' },
          { id: 'B', text: q.Option_B || 'Option B' },
          { id: 'C', text: q.Option_C || 'Option C' },
          { id: 'D', text: q.Option_D || 'Option D' },
        ],
        correctAnswer: q.Correct_Answer || '',
      }))

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
