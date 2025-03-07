
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
}

export interface Option {
  id: string;
  text: string;
}
