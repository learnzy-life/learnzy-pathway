
import { useState, useEffect } from 'react'
import { Question, Subject, fetchQuestions } from '../../services/questionService'
import { createTestSession } from '../../services/testSession'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

export const useTestQuestions = (
  subject: Subject
): [Question[], boolean, string | null, number] => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)

      try {
        // Load the questions first with full metadata
        const loadedQuestions = await fetchQuestions(subject)
        
        // Sort questions by their ID to ensure numerical ascending order
        const sortedQuestions = [...loadedQuestions].sort((a, b) => a.id - b.id)
        
        // Ensure questions have all metadata fields with proper handling of lowercase column names for biology
        const enhancedQuestions = sortedQuestions.map(q => {
          // For biology, use lowercase properties
          if (subject === 'biology') {
            return {
              ...q,
              Subject: q.Subject || subject,
              Chapter_name: q.chapter_name || 'Unknown Chapter',
              Topic: q.topic || 'General Topic',
              Subtopic: q.subtopic || 'General Subtopic',
              Difficulty_Level: q.difficulty_level || 'Medium',
              Question_Structure: q.question_structure || 'Multiple Choice',
              Bloom_Taxonomy: q.bloom_taxonomy || 'Knowledge',
              Priority_Level: q.priority_level || 'Medium',
              Time_to_Solve: q.time_to_solve || 1.0,
              Key_Concept_Tested: q.key_concept_tested || 'General Knowledge',
              Common_Pitfalls: q.common_pitfalls || 'None'
            }
          } else {
            // For other subjects, use original capitalized properties
            return {
              ...q,
              Subject: q.Subject || subject,
              Chapter_name: q.Chapter_name || 'Unknown Chapter',
              Topic: q.Topic || 'General Topic',
              Subtopic: q.Subtopic || 'General Subtopic',
              Difficulty_Level: q.Difficulty_Level || 'Medium',
              Question_Structure: q.Question_Structure || 'Multiple Choice',
              Bloom_Taxonomy: q.Bloom_Taxonomy || 'Knowledge',
              Priority_Level: q.Priority_Level || 'Medium',
              Time_to_Solve: q.Time_to_Solve || 1.0,
              Key_Concept_Tested: q.Key_Concept_Tested || 'General Knowledge',
              Common_Pitfalls: q.Common_Pitfalls || 'None'
            }
          }
        })
        
        console.log('Enhanced questions with metadata:', enhancedQuestions[0])
        
        // Get user mood and ritual data from localStorage
        const mood = localStorage.getItem('selected_mood') || 'unknown'
        const ritual = localStorage.getItem('selected_ritual') || 'none'
        
        // Then create a new test session with the loaded questions
        const newSessionId = await createTestSession(subject, enhancedQuestions)
        setSessionId(newSessionId)
        
        if (newSessionId) {
          // Save the preparation data
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            const { error } = await supabase.from('user_test_preparations').insert({
              user_id: user.id,
              test_session_id: newSessionId,
              subject,
              mood,
              ritual
            })
            
            if (error) {
              console.error('Error saving test preparation data:', error)
            }
          }
        }
        
        setStartTime(Date.now())
        setQuestions(enhancedQuestions)
      } catch (error) {
        console.error('Error loading test:', error)
        toast.error('Failed to load questions. Using sample questions instead.')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [subject])

  return [questions, isLoading, sessionId, startTime]
}
