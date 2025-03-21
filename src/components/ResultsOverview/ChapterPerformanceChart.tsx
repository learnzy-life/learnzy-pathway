import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '../ui/scroll-area';
import { ChapterPerformance } from '../../utils/analytics/types';

interface ChapterPerformanceChartProps {
  subjectScores: ChapterPerformance[];
}

const ChapterPerformanceChart: React.FC<ChapterPerformanceChartProps> = ({ subjectScores }) => {
  // Format the tooltip for the chapter performance chart
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 sm:p-3 border border-gray-200 shadow-lg rounded-md text-xs sm:text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-600">Accuracy: {data.score}%</p>
          <p className="text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
        </div>
      );
    }
    
    return null;
  };

  // Calculate chart width based on number of chapters
  const getChartWidth = () => {
    if (!subjectScores || subjectScores.length === 0) return '100%';
    // Allocate at least 100px per chapter for better readability
    const minWidth = subjectScores.length * 100;
    return Math.max(minWidth, 300);
  };

  // Process chapter data for better mobile display
  const processChapterDataForMobile = () => {
    // If we have more than 4 chapters, only show top and bottom performing chapters on mobile
    if (subjectScores.length > 4) {
      const sortedScores = [...subjectScores].sort((a, b) => b.score - a.score);
      const topChapters = sortedScores.slice(0, 2);
      const bottomChapters = sortedScores.slice(-2);
      
      // Generate shortened names for mobile
      return [...topChapters, ...bottomChapters].map(chapter => ({
        ...chapter,
        mobileName: chapter.name.length > 10 ? `${chapter.name.substring(0, 8)}...` : chapter.name
      }));
    }
    
    // Otherwise just add shortened names
    return subjectScores.map(chapter => ({
      ...chapter,
      mobileName: chapter.name.length > 10 ? `${chapter.name.substring(0, 8)}...` : chapter.name
    }));
  };

  const mobileChapterData = processChapterDataForMobile();

  return (
    <div>
      <h4 className="text-sm sm:text-base font-medium text-learnzy-dark mb-3 sm:mb-4">Chapter Performance</h4>
      <div className="h-56 sm:h-64">
        {subjectScores.length > 0 ? (
          <ScrollArea className="w-full h-full">
            <div style={{ width: getChartWidth(), height: '100%', minWidth: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectScores}
                  margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip content={renderTooltip} />
                  <Bar dataKey="score" fill="#FFBD59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">No chapter data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterPerformanceChart;
