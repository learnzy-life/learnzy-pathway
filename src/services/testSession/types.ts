
import { Subject } from '../questionService'

export interface QuestionResult {
  id: number
  text: string
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  timeTaken: number // in seconds
  tags: string[]
  Subject: string
  Chapter_name: string
  Topic: string
  Subtopic: string
  Difficulty_Level: string
  Question_Structure: string
  Bloom_Taxonomy: string
  Priority_Level: string
  Time_to_Solve: number
  Key_Concept_Tested: string
  Common_Pitfalls: string
}

export interface TestSession {
  id: string
  userId: string | null
  subject: Subject
  startTime: string
  endTime: string | null
  score: number | null
  totalQuestions: number
  questions: QuestionResult[]
}
