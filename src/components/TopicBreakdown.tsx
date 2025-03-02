
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TopicItem {
  id: string;
  name: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
  masteryLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
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

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Topic Breakdown</h3>
      
      <div className="space-y-5">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-subtle">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-base font-medium text-learnzy-dark">{topic.name}</h4>
              <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getMasteryColor(topic.masteryLevel)}`}>
                {topic.masteryLevel}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {topic.correctCount} of {topic.totalCount} correct
              </span>
              <span className="text-sm font-medium text-learnzy-dark">
                {topic.percentage}%
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full ${getMasteryColor(topic.masteryLevel)}`} 
                style={{ width: `${topic.percentage}%` }}
              ></div>
            </div>
            
            <button className="text-sm font-medium text-learnzy-purple flex items-center hover:underline">
              View recommended resources <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicBreakdown;
