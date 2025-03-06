
import { supabase } from '../../lib/supabase'
import { QuestionResult } from './types'

// Update question tags
export const updateQuestionTags = async (
  sessionId: string,
  questionId: number,
  tags: string[]
): Promise<boolean> => {
  try {
    // First get the current session data
    const { data: sessionData, error: fetchError } = await supabase
      .from('test_sessions')
      .select('questions_data')
      .eq('id', sessionId)
      .single()

    if (fetchError) {
      console.error('Error fetching test session:', fetchError)
      return false
    }

    // Update the specific question in the questions_data array
    const updatedQuestionsData = sessionData.questions_data.map(
      (q: QuestionResult) => {
        if (q.id === questionId) {
          return {
            ...q,
            tags,
          }
        }
        return q
      }
    )

    // Update the session with the modified questions_data
    const { error: updateError } = await supabase
      .from('test_sessions')
      .update({ questions_data: updatedQuestionsData })
      .eq('id', sessionId)

    if (updateError) {
      console.error('Error updating question tags:', updateError)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error updating question tags:', err)
    return false
  }
}
