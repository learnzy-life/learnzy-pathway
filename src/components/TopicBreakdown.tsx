
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, Signal, SignalHigh, SignalLow, SignalMedium } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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

interface DifficultyPerformance {
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
  overallDifficultyPerformance?: DifficultyPerformance;
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ 
  topics, 
  isFirstTest = false,
  overallDifficultyPerformance
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  const getMasteryColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Average': return 'bg-yellow-500';
      case 'Needs Improvement': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <div className="card-glass p-6">
      {/* Difficulty Performance Section */}
      {overallDifficultyPerformance && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-subtle p-6">
          <h3 className="text-lg font-semibold text-learnzy-dark mb-4">Performance by Difficulty Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Easy Questions */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center mb-2">
                <SignalLow className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">Easy Questions</h4>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Accuracy</span>
                <span className="text-xl font-semibold text-green-600">{overallDifficultyPerformance.easy.percentage}%</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">{overallDifficultyPerformance.easy.correct} correct</span>
                <span className="mx-1">out of</span>
                <span>{overallDifficultyPerformance.easy.total} questions</span>
              </div>
            </div>
            
            {/* Medium Questions */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <div className="flex items-center mb-2">
                <SignalMedium className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-800">Medium Questions</h4>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Accuracy</span>
                <span className="text-xl font-semibold text-yellow-600">{overallDifficultyPerformance.medium.percentage}%</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">{overallDifficultyPerformance.medium.correct} correct</span>
                <span className="mx-1">out of</span>
                <span>{overallDifficultyPerformance.medium.total} questions</span>
              </div>
            </div>
            
            {/* Hard Questions */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="flex items-center mb-2">
                <SignalHigh className="w-5 h-5 text-red-600 mr-2" />
                <h4 className="font-medium text-red-800">Hard Questions</h4>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Accuracy</span>
                <span className="text-xl font-semibold text-red-600">{overallDifficultyPerformance.hard.percentage}%</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">{overallDifficultyPerformance.hard.correct} correct</span>
                <span className="mx-1">out of</span>
                <span>{overallDifficultyPerformance.hard.total} questions</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-learnzy-dark mb-4">Chapter Performance</h3>
      <ScrollArea className="w-full" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <div className="min-w-[600px]">
          <table className="w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Chapter Name</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Mastery Level</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 ? (
                topics.map((chapter) => (
                  <React.Fragment key={chapter.id}>
                    {/* Chapter Row */}
                    <tr className={chapter.needsAttention ? 'bg-red-50' : 'bg-white'}>
                      <td className="py-3 px-4 border-b">
                        <button 
                          onClick={() => toggleChapter(chapter.id)}
                          className="flex items-center font-medium text-learnzy-dark"
                        >
                          {expandedChapters[chapter.id] ? 
                            <ChevronDown className="w-4 h-4 mr-2" /> : 
                            <ChevronRight className="w-4 h-4 mr-2" />}
                          {chapter.name}
                        </button>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getMasteryColor(chapter.masteryLevel)}`}>
                          {chapter.masteryLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex items-center">
                          <span className="font-medium text-learnzy-dark mr-2">
                            {chapter.percentage}%
                          </span>
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getMasteryColor(chapter.masteryLevel)}`} 
                              style={{ width: `${chapter.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Topic Rows (if expanded) */}
                    {expandedChapters[chapter.id] && chapter.topics && chapter.topics.map((topic, index) => (
                      <tr key={`${chapter.id}-topic-${index}`} className="bg-gray-50">
                        <td className="py-2 px-4 border-b pl-12">
                          <span className="text-sm text-gray-700">{topic.name}</span>
                        </td>
                        <td className="py-2 px-4 border-b" colSpan={2}>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                              <span className="font-medium text-green-600">{topic.correctCount}</span> correct
                            </span>
                            <span className="text-sm text-gray-700">
                              <span className="font-medium">{topic.totalCount}</span> total questions
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    No topic data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea>
      
      <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100">
        <h4 className="font-medium text-amber-800 mb-2">Recommendations</h4>
        <p className="text-amber-700">
          {isFirstTest 
            ? "This is your first test. Complete more tests to track your progress over time."
            : "Focus on improving chapters that show a 'Needs Improvement' mastery level."}
        </p>
      </div>
    </div>
  );
};

export default TopicBreakdown;
