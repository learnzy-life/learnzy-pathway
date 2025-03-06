
import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

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
}

interface TopicBreakdownProps {
  topics: TopicItem[];
}

const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ topics }) => {
  const getMasteryColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Average': return 'bg-yellow-500';
      case 'Needs Improvement': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressIndicator = (current: number, previous?: number) => {
    if (!previous) return null;
    
    const diff = current - previous;
    
    if (diff > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{diff}%</span>
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{diff}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <Minus className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">0%</span>
        </div>
      );
    }
  };

  return (
    <div className="card-glass p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl border border-gray-200 shadow-subtle">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Topic</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Accuracy</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Previous</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Progress</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Mastery</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Avg. Time</th>
              <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map((topic) => (
                <tr key={topic.id} className={topic.needsAttention ? 'bg-red-50' : 'bg-white'}>
                  <td className="py-3 px-4 border-b">
                    <span className="font-medium text-learnzy-dark">{topic.name}</span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center">
                      <span className="font-medium text-learnzy-dark mr-2">
                        {topic.percentage}%
                      </span>
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getMasteryColor(topic.masteryLevel)}`} 
                          style={{ width: `${topic.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b text-muted-foreground">
                    {topic.previousPercentage}%
                  </td>
                  <td className="py-3 px-4 border-b">
                    {getProgressIndicator(topic.percentage, topic.previousPercentage)}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getMasteryColor(topic.masteryLevel)}`}>
                      {topic.masteryLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-muted-foreground">
                    {topic.avgTimePerQuestion}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {topic.needsAttention ? (
                      <button className="text-sm font-medium text-learnzy-purple flex items-center hover:underline">
                        Practice <ArrowRight className="ml-1 w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm">Good</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-muted-foreground">
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
          Focus on improving topics that show a decline in performance compared to previous tests.
        </p>
      </div>
    </div>
  );
};

export default TopicBreakdown;
