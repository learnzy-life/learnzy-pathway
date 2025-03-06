
import { Subject } from '../questionService'

export interface QuestionResult {
  id: number
  text: string
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
  timeTaken: number // in seconds
  tags: string[]
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
