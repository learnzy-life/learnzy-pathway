
export interface TopicItem {
  id: string;
  name: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
  previousPercentage?: number;
  masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  avgTimePerQuestion?: string;
  needsAttention?: boolean;
  difficultyLevel?: string;
  topics?: {
    name: string;
    correctCount: number;
    totalCount: number;
  }[];
}

export interface DifficultyPerformance {
  easy: {
    total: number;
    correct: number;
    percentage: number;
  };
  medium: {
    total: number;
    correct: number;
    percentage: number;
  };
  hard: {
    total: number;
    correct: number;
    percentage: number;
  };
}

export interface TopicBreakdownProps {
  topics: TopicItem[];
  isFirstTest?: boolean;
  overallDifficultyPerformance?: DifficultyPerformance;
}
