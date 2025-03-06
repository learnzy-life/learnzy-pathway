
import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus, Award, Clock, CheckCircle } from 'lucide-react';

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
      case 'NEET Ready': return 'bg-green-500 text-white';
      case 'On the Path': return 'bg-blue-500 text-white';
      case 'Needs Improvement': return 'bg-yellow-500 text-white';
      case 'Poor': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getMasteryLevel = (percentage: number): string => {
    if (percentage > 95) return 'NEET Ready';
    if (percentage >= 85) return 'On the Path';
    if (percentage >= 75) return 'Needs Improvement';
    return 'Poor';
  };

  const getProgressIndicator = (current: number, previous?: number) => {
    if (!previous) return (
      <span className="text-gray-500">— N/A</span>
    );
    
    const diff = current - previous;
    
    if (diff > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{diff.toFixed(1)}%</span>
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{diff.toFixed(1)}%</span>
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
    <div className="card-glass">
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white rounded-xl">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Topic</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Accuracy</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Previous</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Progress</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Mastery</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Avg. Time</th>
              <th className="py-4 px-6 text-left text-gray-700 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map((topic) => {
                const masteryLevel = getMasteryLevel(topic.percentage);
                return (
                <tr key={topic.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-800">{topic.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800 mr-2">
                        {topic.percentage.toFixed(0)}%
                      </span>
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            masteryLevel === 'NEET Ready' || masteryLevel === 'On the Path' 
                              ? 'bg-green-500' 
                              : masteryLevel === 'Needs Improvement' 
                                ? 'bg-blue-500' 
                                : 'bg-red-500'
                          }`} 
                          style={{ width: `${topic.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {topic.previousPercentage ? `${topic.previousPercentage.toFixed(0)}%` : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    {getProgressIndicator(topic.percentage, topic.previousPercentage)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getMasteryColor(masteryLevel)}`}>
                      {masteryLevel === 'NEET Ready' ? 'Excellent' : 
                       masteryLevel === 'On the Path' ? 'Good' : 
                       masteryLevel === 'Needs Improvement' ? 'Average' : 'Poor'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {topic.avgTimePerQuestion || 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    {topic.needsAttention || masteryLevel === 'Poor' || masteryLevel === 'Needs Improvement' ? (
                      <button className="text-sm font-medium text-learnzy-purple flex items-center hover:underline">
                        Practice <ArrowRight className="ml-1 w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm">Good</span>
                    )}
                  </td>
                </tr>
              )})
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No topic data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100 mx-6 mb-6">
        <h4 className="font-medium text-amber-800 mb-2">Recommendations</h4>
        <p className="text-amber-700">
          Focus on improving topics that show a mastery level of "Needs Improvement" or "Poor" to boost your overall performance.
        </p>
      </div>
    </div>
  );
};

export default TopicBreakdown;
