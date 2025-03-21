
import React from 'react';
import DifficultyPerformance from './DifficultyPerformance';
import ChapterTable from './ChapterTable';
import Recommendations from './Recommendations';

interface TopicItem {
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

// Use a different name to avoid conflict with the imported component
interface DifficultyPerformanceData {
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

interface TopicBreakdownProps {
  topics: TopicItem[];
  isFirstTest?: boolean;
  overallDifficultyPerformance?: DifficultyPerformanceData;
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ 
  topics, 
  isFirstTest = false,
  overallDifficultyPerformance
}) => {
  return (
    <div className="card-glass p-6">
      {/* Difficulty Performance Section */}
      {overallDifficultyPerformance && (
        <DifficultyPerformance difficultyPerformance={overallDifficultyPerformance} />
      )}
      
      <h3 className="text-lg font-semibold text-learnzy-dark mb-4">Chapter Performance</h3>
      <ChapterTable topics={topics} />
      
      <Recommendations isFirstTest={isFirstTest} />
    </div>
  );
};

export default TopicBreakdown;
