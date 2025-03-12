
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

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

interface TopicBreakdownProps {
  topics: TopicItem[];
  isFirstTest?: boolean;
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ topics, isFirstTest = false }) => {
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Chapter Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Mastery Level</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Accuracy</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Performance by Difficulty</th>
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
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Easy
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Medium
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Hard
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Topic Rows (if expanded) */}
                  {expandedChapters[chapter.id] && chapter.topics && chapter.topics.map((topic, index) => (
                    <tr key={`${chapter.id}-topic-${index}`} className="bg-gray-50">
                      <td className="py-2 px-4 border-b pl-12">
                        <span className="text-sm text-gray-700">{topic.name}</span>
                      </td>
                      <td className="py-2 px-4 border-b" colSpan={3}>
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
                <td colSpan={4} className="py-6 text-center text-muted-foreground">
                  No topic data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
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
