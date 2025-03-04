
export type Subject = 'biology' | 'physics' | 'chemistry';

export interface DBQuestion {
  id: string;
  question_number: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  subject: string;
  chapter_name: string;
  topic: string;
  subtopic: string;
  difficulty_level: string;
  question_structure: string;
  blooms_taxonomy: string;
  priority_level: string;
  time_to_solve: number;
  key_concept_tested: string;
  common_pitfalls: string;
}

export interface TestSession {
  id?: string;
  user_id?: string;
  subject: Subject;
  start_time?: string;
  end_time?: string;
  is_completed?: boolean;
  total_score?: number;
  answers?: Record<string, string>;
  pre_ritual?: {
    mood?: string;
    ritual?: string;
  };
}
