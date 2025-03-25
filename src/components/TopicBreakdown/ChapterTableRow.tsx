
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TopicItem } from './types';

interface ChapterTableRowProps {
  chapter: TopicItem;
}

const ChapterTableRow: React.FC<ChapterTableRowProps> = ({ chapter }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

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
    <React.Fragment>
      {/* Chapter Row */}
      <tr className={chapter.needsAttention ? 'bg-red-50' : 'bg-white'}>
        <td className="py-3 px-4 border-b">
          <button 
            onClick={toggleExpanded}
            className="flex items-center font-medium text-learnzy-dark"
          >
            {expanded ? 
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
      {expanded && chapter.topics && chapter.topics.map((topic, index) => (
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
  );
};

export default ChapterTableRow;
