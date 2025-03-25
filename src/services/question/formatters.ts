
import { Question } from './types'

export const formatBiologyQuestion = (q: any): Question => {
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
    // Include uppercase properties for analytics compatibility
    Subject: q.subject,
    Chapter_name: q.chapter_name,
    Topic: q.topic,
    Subtopic: q.subtopic,
    Difficulty_Level: q.difficulty_level,
    Question_Structure: q.question_structure,
    Bloom_Taxonomy: q.bloom_taxonomy,
    Priority_Level: q.priority_level,
    Time_to_Solve: q.time_to_solve,
    Key_Concept_Tested: q.key_concept_tested,
    Common_Pitfalls: q.common_pitfalls,
    // Include option properties
    option_a: q.option_a || '',
    option_b: q.option_b || '',
    option_c: q.option_c || '',
    option_d: q.option_d || '',
  }
}

export const formatPhysicsQuestion = (q: any): Question => {
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
    // Include both lowercase properties 
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
    // And uppercase properties for analytics compatibility
    Subject: q.subject,
    Chapter_name: q.chapter_name,
    Topic: q.topic,
    Subtopic: q.subtopic,
    Difficulty_Level: q.difficulty_level,
    Question_Structure: q.question_structure,
    Bloom_Taxonomy: q.bloom_taxonomy,
    Priority_Level: q.priority_level,
    Time_to_Solve: q.time_to_solve,
    Key_Concept_Tested: q.key_concept_tested,
    Common_Pitfalls: q.common_pitfalls,
    // Include lowercase option properties
    option_a: q.option_a || '',
    option_b: q.option_b || '',
    option_c: q.option_c || '',
    option_d: q.option_d || '',
    // Include uppercase option properties for compatibility
    Option_A: q.option_a || '',
    Option_B: q.option_b || '',
    Option_C: q.option_c || '',
    Option_D: q.option_d || '',
  }
}

export const formatChemistryQuestion = (q: any): Question => {
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
    // Include lowercase properties for compatibility
    subject: q.Subject,
    chapter_name: q.Chapter_name,
    topic: q.Topic,
    subtopic: q.Subtopic,
    difficulty_level: q.Difficulty_Level,
    question_structure: q.Question_Structure,
    bloom_taxonomy: q.Bloom_Taxonomy,
    priority_level: q.Priority_Level,
    time_to_solve: q.Time_to_Solve,
    key_concept_tested: q.Key_Concept_Tested,
    common_pitfalls: q.Common_Pitfalls,
    // Include uppercase and lowercase option properties
    Option_A: q.Option_A || '',
    Option_B: q.Option_B || '',
    Option_C: q.Option_C || '',
    Option_D: q.Option_D || '',
    option_a: q.Option_A || '',
    option_b: q.Option_B || '',
    option_c: q.Option_C || '',
    option_d: q.Option_D || '',
  }
}
