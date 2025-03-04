
import { supabase } from "@/integrations/supabase/client";
import { Subject, DBQuestion, TestSession } from "@/types/common";
import { Question } from "./csvQuestionService";

// Convert DB question format to app question format
export const mapDBQuestionToAppQuestion = (dbQuestion: DBQuestion): Question => {
  return {
    id: dbQuestion.question_number,
    text: dbQuestion.question_text,
    options: [
      { id: 'A', text: dbQuestion.option_a },
      { id: 'B', text: dbQuestion.option_b },
      { id: 'C', text: dbQuestion.option_c },
      { id: 'D', text: dbQuestion.option_d }
    ],
    correctAnswerId: dbQuestion.correct_answer,
    metadata: {
      subject: dbQuestion.subject,
      chapter: dbQuestion.chapter_name,
      topic: dbQuestion.topic,
      subtopic: dbQuestion.subtopic,
      difficultyLevel: dbQuestion.difficulty_level.toLowerCase() as any,
      questionStructure: dbQuestion.question_structure.toLowerCase() as any,
      bloomsTaxonomy: dbQuestion.blooms_taxonomy.toLowerCase() as any,
      priorityLevel: dbQuestion.priority_level,
      timeToSolve: dbQuestion.time_to_solve,
      keyConcept: dbQuestion.key_concept_tested,
      commonPitfalls: dbQuestion.common_pitfalls,
    }
  };
};

// Load questions from Supabase for a specific subject
export const loadQuestionsFromSupabase = async (subject: Subject): Promise<Question[]> => {
  try {
    const { data: dbQuestions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('subject', subject.charAt(0).toUpperCase() + subject.slice(1)) // Capitalize first letter
      .order('question_number', { ascending: true });
    
    if (error) {
      console.error(`Error loading questions for ${subject}:`, error);
      return loadQuestionsFromCSV(subject); // Fallback to CSV if Supabase fails
    }
    
    if (!dbQuestions || dbQuestions.length === 0) {
      console.log(`No questions found in Supabase for ${subject}, falling back to CSV`);
      return loadQuestionsFromCSV(subject);
    }
    
    return dbQuestions.map(mapDBQuestionToAppQuestion);
  } catch (error) {
    console.error(`Error in loadQuestionsFromSupabase for ${subject}:`, error);
    return loadQuestionsFromCSV(subject); // Fallback to CSV if Supabase fails
  }
};

// Fallback to load from CSV if Supabase fails
const loadQuestionsFromCSV = async (subject: Subject): Promise<Question[]> => {
  try {
    // Import the csvQuestionService
    const { loadQuestions } = await import('./csvQuestionService');
    return loadQuestions(subject);
  } catch (error) {
    console.error(`Error in loadQuestionsFromCSV for ${subject}:`, error);
    return [];
  }
};

// Import CSV questions to Supabase
export const importCSVQuestionsToSupabase = async (subject: Subject): Promise<boolean> => {
  try {
    // Import the csvQuestionService
    const { loadQuestions } = await import('./csvQuestionService');
    const questions = await loadQuestions(subject);
    
    if (!questions || questions.length === 0) {
      console.error(`No questions found for ${subject} in CSV`);
      return false;
    }
    
    // Convert app questions to DB format
    const dbQuestions = questions.map(q => ({
      question_number: q.id,
      question_text: q.text,
      option_a: q.options[0].text,
      option_b: q.options[1].text,
      option_c: q.options[2].text,
      option_d: q.options[3].text,
      correct_answer: q.correctAnswerId,
      subject: subject.charAt(0).toUpperCase() + subject.slice(1), // Capitalize first letter
      chapter_name: q.metadata.chapter,
      topic: q.metadata.topic,
      subtopic: q.metadata.subtopic,
      difficulty_level: q.metadata.difficultyLevel,
      question_structure: q.metadata.questionStructure,
      blooms_taxonomy: q.metadata.bloomsTaxonomy,
      priority_level: q.metadata.priorityLevel,
      time_to_solve: q.metadata.timeToSolve,
      key_concept_tested: q.metadata.keyConcept,
      common_pitfalls: q.metadata.commonPitfalls
    }));
    
    // Insert in batches of 50 to avoid payload size limits
    const batchSize = 50;
    for (let i = 0; i < dbQuestions.length; i += batchSize) {
      const batch = dbQuestions.slice(i, i + batchSize);
      const { error } = await supabase
        .from('questions')
        .upsert(batch, { 
          onConflict: 'subject,question_number',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        return false;
      }
    }
    
    console.log(`Successfully imported ${dbQuestions.length} questions for ${subject}`);
    return true;
  } catch (error) {
    console.error(`Error importing CSV questions to Supabase for ${subject}:`, error);
    return false;
  }
};

// Create a new test session
export const createTestSession = async (subject: Subject, preRitual?: { mood?: string, ritual?: string }): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .insert([{
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        pre_ritual: preRitual
      }])
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating test session:', error);
      return null;
    }
    
    return data?.id || null;
  } catch (error) {
    console.error('Error in createTestSession:', error);
    return null;
  }
};

// Update test session with results
export const updateTestSession = async (
  sessionId: string,
  answers: Record<number, string>,
  timeSpent: Record<number, number>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('test_sessions')
      .update({
        answers: answers,
        end_time: new Date().toISOString(),
        is_completed: true,
        // Calculate score
        total_score: Object.keys(answers).length
      })
      .eq('id', sessionId);
    
    if (error) {
      console.error('Error updating test session:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateTestSession:', error);
    return false;
  }
};

// Get test session by ID
export const getTestSession = async (sessionId: string): Promise<TestSession | null> => {
  try {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    if (error) {
      console.error('Error retrieving test session:', error);
      return null;
    }
    
    return data as TestSession;
  } catch (error) {
    console.error('Error in getTestSession:', error);
    return null;
  }
};

// Get user's test history (will be enhanced with auth later)
export const getUserTestHistory = async (userId?: string): Promise<TestSession[]> => {
  try {
    let query = supabase
      .from('test_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error retrieving test history:', error);
      return [];
    }
    
    return data as TestSession[];
  } catch (error) {
    console.error('Error in getUserTestHistory:', error);
    return [];
  }
};
