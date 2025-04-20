import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'
import { sendTopperBioEmail } from '../emailService'
import { generateReviewTest } from './reviewTest'
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
    const questionsWithMetadata = questions.map((q) => ({
      id: q.id,
      text: q.text,
      userAnswer: q.userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: q.isCorrect,
      timeTaken: q.timeTaken,
      tags: q.tags || [],
      // Include both uppercase and lowercase variants for maximum compatibility
      // Using optional chaining to safely access properties that might not exist
      Chapter_name: q.Chapter_name || '',
      Topic: q.Topic || '',
      Subtopic: q.Subtopic || '',
      Difficulty_Level: q.Difficulty_Level || '',
      Question_Structure: q.Question_Structure || '',
      Bloom_Taxonomy: q.Bloom_Taxonomy || '',
      Priority_Level: q.Priority_Level || '',
      Time_to_Solve: q.Time_to_Solve || 0,
      Key_Concept_Tested: q.Key_Concept_Tested || '',
      Common_Pitfalls: q.Common_Pitfalls || '',
      // Include option properties for both uppercase and lowercase variants
      Option_A: q.Option_A || '',
      Option_B: q.Option_B || '',
      Option_C: q.Option_C || '',
      Option_D: q.Option_D || '',
      options: q.options || [],
    }))

    // Get subject-level metadata from the first question (trying both cases)
    const firstQuestion = questions.length > 0 ? questions[0] : null

    // Determine the test subject from the questions or session ID
    let testSubject = '';

    // Try to determine subject from questions first
    if (firstQuestion) {
      testSubject = (firstQuestion.Subject || firstQuestion.subject || '').toLowerCase();
    }

    // If subject is not determined from questions, try from sessionId
    if (!testSubject && sessionId) {
      // If it's a diagnostic test, the subject is part of the URL/path
      if (sessionId.includes('biology')) {
        testSubject = 'biology';
      }
    }

    // Update the session with both questions data and top-level metadata fields
    const { error } = await supabase
      .from('test_sessions')
      .update({
        end_time: new Date().toISOString(),
        score,
        questions_data: questionsWithMetadata,
        // Save metadata at the session level too (trying both cases)
        chapter_name: firstQuestion?.Chapter_name || null,
        topic: firstQuestion?.Topic || null,
        subtopic: firstQuestion?.Subtopic || null,
        difficulty_level: firstQuestion?.Difficulty_Level || null,
        question_structure: firstQuestion?.Question_Structure || null,
        bloom_taxonomy: firstQuestion?.Bloom_Taxonomy || null,
        priority_level: firstQuestion?.Priority_Level || null,
        time_to_solve: firstQuestion?.Time_to_Solve || null,
        key_concept_tested: firstQuestion?.Key_Concept_Tested || null,
        common_pitfalls: firstQuestion?.Common_Pitfalls || null,
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Error completing test session:', error)
      toast.error('Failed to save test results')
      return false
    }

    // Get user data to send emails
    const { data: sessionData } = await supabase
      .from('test_sessions')
      .select('user_id, subject')
      .eq('id', sessionId)
      .single()

    // If subject wasn't determined earlier, use the one from the database
    if (!testSubject && sessionData?.subject) {
      testSubject = sessionData.subject.toLowerCase();
    }

    // Send email if this is a biology test
    if (testSubject === 'biology' && sessionData?.user_id) {
      try {
        // Get user's email
        const { data: userData } = await supabase
          .from('user_details')
          .select('email, full_name')
          .eq('user_id', sessionData.user_id)
          .single()

        if (userData?.email) {
          // Prepare download link for biology notes
          console.log(`Sending topperBio email to ${userData.email} after biology test completion`);

          // Send the topperBio email
          await sendTopperBioEmail(userData.email, {
            userName: userData.full_name || 'Student',
          });

          console.log('TopperBio email sent successfully');

          // Don't show toast to avoid distracting the user from test results
        }
      } catch (emailError) {
        console.error('Error sending topperBio email:', emailError);
        // Don't fail the test completion if email fails
      }
    }

    // Check if this is Mock 4 of a cycle and automatically generate Mock 5
    if (sessionId.startsWith('mock-')) {
      const parts = sessionId.split('-')

      // Check if this is Mock 4
      if (parts.length >= 3 && parts[2] === '4') {
        const cycle = parseInt(parts[1])

        if (!isNaN(cycle)) {
          console.log(
            `Mock 4 of cycle ${cycle} completed. Automatically generating Mock 5...`
          )

          try {
            // Generate Mock 5 in the background
            const mock5Id = await generateReviewTest(sessionId, cycle)

            if (mock5Id) {
              console.log(`Successfully generated Mock 5 with ID: ${mock5Id}`)
              toast.success(
                'Your Mock 5 test has been generated! It will be available in your dashboard.'
              )
            } else {
              console.error('Failed to generate Mock 5')
            }
          } catch (error) {
            console.error('Error generating Mock 5:', error)
            // Don't show error to user here, as the test completion was still successful
          }
        }
      }
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
      user_id: data.user_id,
      subject: data.subject,
      start_time: data.start_time,
      end_time: data.end_time,
      score: data.score || 0,
      total_questions: data.total_questions || questionsData.length,
      questions: questionsData,
      // Calculate these values to match the TestSession type
      correct_answers: questionsData.filter((q) => q.isCorrect).length,
      incorrect_answers: questionsData.filter(
        (q) => !q.isCorrect && q.userAnswer
      ).length,
      unattempted: questionsData.filter((q) => !q.userAnswer).length,
    }
  } catch (err) {
    console.error('Unexpected error fetching test session:', err)
    return null
  }
}
