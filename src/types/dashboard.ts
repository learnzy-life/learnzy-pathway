
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
