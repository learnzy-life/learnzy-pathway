
import { Question, Subject } from '../../services/question'

export interface TestState {
  questions: Question[]
  currentQuestionIndex: number
  timeRemaining: number
  isSubmitting: boolean
  showWarning: boolean
  isLoading: boolean
  sessionId: string | null
}

export interface TestActions {
  handleAnswerSelected: (questionId: number, answerId: string, timeTaken: number) => void
  handleNextQuestion: () => void
  handlePrevQuestion: () => void
  handleJumpToQuestion: (index: number) => void
  handleSubmitTest: () => void
  handleSubmitClick: () => void
  formatTime: (seconds: number) => string
  setShowWarning: (show: boolean) => void
}

export type QuestionFilterType = 'incorrect' | 'unattempted';
