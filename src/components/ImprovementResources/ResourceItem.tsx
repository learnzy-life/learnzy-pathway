
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

  // If resource is not available, show unavailable state with more prominence
  if (!resourceAvailable) {
    return (
      <li className="border rounded-lg">
        <div className="flex items-start p-2.5 sm:p-3.5 rounded-lg bg-gray-50">
          <div className="p-1.5 sm:p-2 bg-gray-200 rounded-md mr-3 sm:mr-4">
            {getResourceIcon(type)}
          </div>
          <div className="flex-1">
            <div className="text-sm sm:text-base font-medium text-learnzy-dark">Self-study recommended</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{type} resource not available for {topic}</div>
          </div>
        </div>
      </li>
    );
  }

  // If resource is available, show as a prominent link
  // Using learnzy.ai instead of learnzy.com to match your actual domain
  const defaultLink = `https://learnzy.ai/resources/${type.toLowerCase()}/${topic.toLowerCase().replace(/\s+/g, '-')}`;
  const link = resourceLink || defaultLink;

  return (
    <li className="border rounded-lg hover:border-learnzy-purple transition-colors">
      <a 
        href={link}
        className="flex items-start p-2.5 sm:p-3.5 rounded-lg hover:bg-gray-50 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${topic} ${type} resource`}
      >
        <div className="p-1.5 sm:p-2 bg-learnzy-purple/10 rounded-md mr-3 sm:mr-4">
          {getResourceIcon(type)}
        </div>
        <div className="flex-1">
          <div className="text-sm sm:text-base font-medium text-learnzy-dark">{topic} {type}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {type === 'NCERT' ? 'Topper-highlighted study material' : 'Expert video lecture'}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground self-center" />
      </a>
    </li>
  );
};

export default ResourceItem;
