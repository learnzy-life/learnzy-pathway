
export interface ResultsData {
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string;
  subjectScores: {
    name: string;
    score: number;
    total: number;
    correct: number;
    incorrect: number;
    subjectCategory?: string;
  }[];
  subjectCategoryData?: {
    name: string;
    score: number;
    total: number;
    correct: number;
    incorrect: number;
    chapterCount: number;
  }[];
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
  subject?: string;
}
