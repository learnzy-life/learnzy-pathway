
import { Question } from "../question";

export interface TestSessionData {
  id: string;
  user_id: string;
  subject: string;
  start_time: string;
  end_time?: string;
  score?: number;
  max_score?: number;
  questions_data?: QuestionResult[];
  answers?: Record<string, string>;
  tags_data?: Record<string, string[]>;
  time_data?: {
    [questionId: string]: number; // Time in seconds spent on each question
  };
  question_order?: string[]; // Array of question IDs in the order they were presented
  analysis_data?: any; // For storing any additional analysis data
}

export interface QuestionResult extends Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  selectedAnswer?: string;
  isCorrect?: boolean;
  timeSpent?: number; // Time spent on this question in seconds
  Subject?: string; // Adding this property
  subject?: string; // Adding this property
  // Additional properties for analysis
  tags?: string[];
}

export interface TestTagsProgress {
  [tagKey: string]: {
    total: number;
    correct: number;
  }
}

export interface TestSessionProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredQuestions: number;
  isComplete: boolean;
  timeRemaining?: number;
}

// Interface for tracking time spent on questions
export interface QuestionTimes {
  [questionId: string]: number; // Time in seconds
}
