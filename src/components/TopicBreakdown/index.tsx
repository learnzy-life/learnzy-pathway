import React from 'react';
import ChaptersTable from './ChaptersTable';
import DifficultyPerformanceCards from './DifficultyPerformanceCards';
import RecommendationsSection from './RecommendationsSection';
import { TopicBreakdownProps } from './types';

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({
  topics,
  isFirstTest = false,
  overallDifficultyPerformance
}) => {
  return (
    <div className="card-glass p-6">
      {/* Difficulty Performance Section */}
      {overallDifficultyPerformance && (
        <DifficultyPerformanceCards difficultyPerformance={overallDifficultyPerformance} />
      )}

      <h3 className="text-lg font-semibold text-learnzy-dark mb-4">Chapter Performance</h3>

      <ChaptersTable topics={topics} />

      <RecommendationsSection isFirstTest={isFirstTest} />
    </div>
  );
};

export default TopicBreakdown;
