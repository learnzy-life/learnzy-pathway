
export interface TestSession {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
  end_time: string;
  questions_data: any[];
}

export interface TestPreparation {
  test_session_id: string;
  mood: string;
  ritual: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswer?: string;
  answer?: string;
  timeTaken?: number;
  // Add metadata fields that are being referenced in useTestActions.ts
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
  subject?: string;
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
}

export interface Option {
  id: string;
  text: string;
}
