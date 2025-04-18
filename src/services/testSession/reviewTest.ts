import { QuestionResultType } from '@/types/testTypes'
import { supabase } from '../../lib/supabase'

export const reviewTest = async (
  questionResults: QuestionResultType[],
  subject: string,
  testType: string,
  testSessionId: string
) => {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
      throw new Error('User not authenticated')
    }

    // Fetch the test session to get the questions order
    const { data: testSession, error: testSessionError } = await supabase
      .from('test_sessions')
      .select('questions_order')
      .eq('id', testSessionId)
      .single()

    if (testSessionError) {
      throw new Error(`Error fetching test session: ${testSessionError.message}`)
    }

    if (!testSession || !testSession.questions_order) {
      throw new Error('Questions order not found for this test session')
    }

    const questionsOrder = testSession.questions_order as string[]

    // Fetch all questions based on the questionsOrder
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .in('id', questionsOrder)

    if (questionsError) {
      throw new Error(`Error fetching questions: ${questionsError.message}`)
    }

    if (!questions || questions.length === 0) {
      throw new Error('No questions found for this test session')
    }

    // Sort questions based on questionsOrder
    const sortedQuestions = questions.sort((a, b) => {
      return questionsOrder.indexOf(a.id) - questionsOrder.indexOf(b.id)
    })

    // Map through the sorted questions and update the questionResults
    const updatedQuestionResults = sortedQuestions.map((question, index) => {
      const question_result = questionResults.find(
        (qr) => qr.questionId === question.id
      ) as QuestionResultType

      if (!question_result) {
        console.warn(`No result found for question ID: ${question.id}`)
        return null // Skip this question if no result is found
      }

      // Assign user ID and subject to the question result
      question_result.userId = userId
      question_result.subject = question_result.subject || question.subject

      const mapped_question_result = {
        ...question_result,
        question_id: question.id,
        user_id: userId,
        test_type: testType,
        test_session_id: testSessionId,
        correct_answer: question.correct_answer,
        is_correct: question_result.selectedAnswer === question.correct_answer,
        question_marks: question.question_marks,
        question_negative_marks: question.question_negative_marks,
        subject: question.subject,
      }

      return mapped_question_result
    })

    // Filter out any null results (questions with no result found)
    const validQuestionResults = updatedQuestionResults.filter(
      (result) => result !== null
    ) as QuestionResultType[]

    // Insert the question results into the database
    const { error: insertError } = await supabase
      .from('question_results')
      .insert(validQuestionResults)

    if (insertError) {
      throw new Error(`Error inserting question results: ${insertError.message}`)
    }

    // Update the test session with is_completed = true
    const { error: updateError } = await supabase
      .from('test_sessions')
      .update({ is_completed: true })
      .eq('id', testSessionId)

    if (updateError) {
      throw new Error(`Error updating test session: ${updateError.message}`)
    }

    return { success: true, message: 'Test reviewed successfully' }
  } catch (error: any) {
    console.error('Error reviewing test:', error.message)
    return { success: false, message: error.message }
  }
}
