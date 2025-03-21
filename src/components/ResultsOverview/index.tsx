
import React from 'react';
import { ChapterPerformance } from '../../utils/analytics/types';
import ScoreCards from './ScoreCards';
import ResponseBreakdown from './ResponseBreakdown';
import AchievementCard from './AchievementCard';
import ChapterPerformanceChart from './ChapterPerformanceChart';

interface ResultsOverviewProps {
  subject: string;
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string; // in format "2h 15m"
  subjectScores: ChapterPerformance[];
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  subject,
  totalScore,
  maxScore,
  correctAnswers,
  incorrectAnswers,
  unattempted,
  accuracy,
  timeSpent,
  subjectScores,
}) => {
  // Only show high performance card if accuracy is above 95% and we have topic data
  const showHighPerformanceCard = accuracy > 95 && subjectScores.length > 0 && subjectScores[0] !== null;

  return (
    <div className="card-glass p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-learnzy-dark mb-4 sm:mb-6">Performance Overview</h3>
      
      {/* High Performance Card */}
      <AchievementCard 
        subject={subject}
        accuracy={accuracy}
        subjectScores={subjectScores}
        showCard={showHighPerformanceCard}
      />
      
      {/* Score Cards */}
      <ScoreCards 
        totalScore={totalScore}
        maxScore={maxScore}
        accuracy={accuracy}
        timeSpent={timeSpent}
      />
      
      {/* Response Breakdown */}
      <ResponseBreakdown 
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        unattempted={unattempted}
      />
      
      {/* Chapter Performance Chart */}
      <ChapterPerformanceChart subjectScores={subjectScores} />
    </div>
  );
};

export default ResultsOverview;
