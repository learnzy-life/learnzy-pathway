
import React from 'react';
import { Play, BookOpen, ChevronRight } from 'lucide-react';

interface ResourceItemProps {
  type: string;
  topic: string;
  resourceAvailable: boolean;
  resourceLink?: string | null;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ 
  type, 
  topic, 
  resourceAvailable,
  resourceLink 
}) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />;
      case 'NCERT':
        return <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />;
      default:
        return null;
    }
  };

  // If resource is not available, show unavailable state
  if (!resourceAvailable) {
    return (
      <li>
        <div className="flex items-start p-1.5 sm:p-2 rounded-lg bg-gray-50">
          <div className="p-1 sm:p-1.5 bg-gray-200 rounded-md mr-2 sm:mr-3">
            {getResourceIcon(type)}
          </div>
          <div className="flex-1">
            <div className="text-xs sm:text-sm font-medium text-learnzy-dark">Self-study recommended</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">{type}</div>
          </div>
        </div>
      </li>
    );
  }

  // If resource is available, show as a link
  const defaultLink = `https://learnzy.com/resources/biology/${type.toLowerCase()}/${topic.toLowerCase().replace(/\s+/g, '-')}`;
  const link = resourceLink || defaultLink;

  return (
    <li>
      <a 
        href={link}
        className="flex items-start p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-1 sm:p-1.5 bg-learnzy-purple/10 rounded-md mr-2 sm:mr-3">
          {getResourceIcon(type)}
        </div>
        <div className="flex-1">
          <div className="text-xs sm:text-sm font-medium text-learnzy-dark">{topic} {type}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            {type === 'NCERT' ? 'Study Material' : 'Video Lecture'}
          </div>
        </div>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground self-center" />
      </a>
    </li>
  );
};

export default ResourceItem;
