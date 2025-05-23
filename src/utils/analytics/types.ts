
// Import the QuestionResult type from testSession types
import { QuestionResult } from '../../services/testSession/types';

export interface QueryResult {
  id: number;
  Question_Text?: string;
  Option_A?: string;
  Option_B?: string;
  Option_C?: string;
  Option_D?: string;
  Correct_Answer?: string;
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
  question_text?: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_answer?: string;
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
  q_no?: number;
}

export interface ChapterPerformance {
  name: string;
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  difficultyPerformance?: {
    easy: { total: number; correct: number; percentage: number; };
    medium: { total: number; correct: number; percentage: number; };
    hard: { total: number; correct: number; percentage: number; };
  };
}

export interface DifficultyPerformance {
  easy: { total: number; correct: number; percentage: number; };
  medium: { total: number; correct: number; percentage: number; };
  hard: { total: number; correct: number; percentage: number; };
}

export interface SubjectScores {
  chapters: ChapterPerformance[];
  overallDifficultyPerformance: DifficultyPerformance;
}

export interface BioResource {
  chapter_name: string;
  video_link: string | null;
  ncert_link: string | null;
}

export interface ResultsData {
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string;
  subjectScores: SubjectScores;
  topics: {
    id: string;
    name: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
    previousPercentage: number;
    masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
    avgTimePerQuestion: string;
    needsAttention: boolean;
    // Add the new properties
    accuracyGap?: number;
    difficultyLevel?: string;
    priorityLevel?: string;
    improvementPriorityScore?: number;
  }[];
  timeAnalysis: {
    timeSpent: string;
    allowedTime: string;
    idealTime: string;
    timeSummary: string;
    slowQuestions: number[];
    quickQuestions: number[];
    feedback: string;
    timeData: {
      questionId: number;
      actualTime: number;
      idealTime: number;
    }[];
  };
  cognitiveInsights: {
    difficultyAccuracy: {
      easy: number;
      medium: number;
      hard: number;
    };
    questionTypeAccuracy: {
      conceptual: number;
      numerical: number;
      application: number;
      analytical: number;
    };
    bloomsAccuracy: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
    insights: string[];
    // Additional properties that we'll use internally
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
    bloomTaxonomyPerformance?: {
      remember: number;
      understand: number;
      apply: number;
      analyze: number;
      evaluate: number;
      create: number;
    };
  };
  improvementResources: {
    topic: string;
    accuracy: number;
    resources: {
      type: string;
      title: string;
      url: string;
      description?: string;
    }[];
    progress: number;
    totalActions: number;
  }[];
  mindsetAnalysis?: {
    confidence: number;
    stress: number;
    focus: number;
    resilience: number;
    insights: string[];
    improvements: string[];
  };
  // Add the questions property to store test question data for review
  questions?: QuestionResult[];
  // Add the bioResources property
  bioResources?: BioResource[];
}
