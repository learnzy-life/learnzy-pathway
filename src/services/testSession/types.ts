
import { Question } from '../question'

export interface QuestionResult {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  timeTaken?: number;
  tags?: string[];
  // Metadata fields
  subject?: string;
  Subject?: string;
  Chapter_name?: string;
  Topic?: string;
  Subtopic?: string;
  Difficulty_Level?: string;
  Question_Structure?: string;
  Bloom_Taxonomy?: string;
  Priority_Level?: string;
  Time_to_Solve?: number;
  Key_Concept_Tested?: string;
  Common_Pitfalls?: string;
  // For biology (lowercase with underscores)
  chapter_name?: string;
  topic?: string;
  subtopic?: string;
  difficulty_level?: string;
  question_structure?: string;
  bloom_taxonomy?: string;
  priority_level?: string;
  time_to_solve?: number;
  key_concept_tested?: string;
  common_pitfalls?: string;
  // Legacy options format
  Option_A?: string;
  Option_B?: string;
  Option_C?: string;
  Option_D?: string;
}

export interface TestSessionData {
  id: string;
  user_id: string;
  subject: string;
  start_time: string;
  end_time: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unattempted: number;
  questions?: Question[];
  answers?: QuestionResult[];
}

export interface TestSession {
  id: string;
  subject: string;
  questions: QuestionResult[];
  score: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unattempted: number;
  start_time: string;
  end_time: string;
  user_id: string;
}
