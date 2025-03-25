
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { Question, Subject } from './types'
import { generateMockQuestions } from './mockQuestions'
import { formatBiologyQuestion, formatChemistryQuestion, formatPhysicsQuestion } from './formatters'

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

      let formattedQuestions: Question[] = []
      
      // Format questions based on subject
      if (subject === 'biology') {
        formattedQuestions = data.map(formatBiologyQuestion)
      } else if (subject === 'physics') {
        formattedQuestions = data.map(formatPhysicsQuestion)
      } else if (subject === 'chemistry') {
        formattedQuestions = data.map(formatChemistryQuestion)
      }

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
