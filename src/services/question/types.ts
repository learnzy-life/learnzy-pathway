
export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  text: string
  options: Option[]
  answer?: string
  correctAnswer?: string
  Subject?: string
  Chapter_name?: string
  Topic?: string
  Subtopic?: string
  Difficulty_Level?: string
  Question_Structure?: string
  Bloom_Taxonomy?: string
  Priority_Level?: string
  Time_to_Solve?: number
  Key_Concept_Tested?: string
  Common_Pitfalls?: string
  // For biology (lowercase with underscores)
  subject?: string
  chapter_name?: string
  topic?: string
  subtopic?: string
  difficulty_level?: string
  question_structure?: string
  bloom_taxonomy?: string
  priority_level?: string
  time_to_solve?: number
  key_concept_tested?: string
  common_pitfalls?: string
  // Add option properties for both uppercase and lowercase variants
  Option_A?: string
  Option_B?: string
  Option_C?: string
  Option_D?: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
}

export type Subject = 'biology' | 'physics' | 'chemistry'
