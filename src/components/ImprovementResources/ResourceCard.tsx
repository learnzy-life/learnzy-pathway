
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getDifficultyColor, getPriorityColor, getAccuracyColor } from './utils';
import ResourceItem from './ResourceItem';
import { BioResource } from '../../utils/analytics/types';

interface Resource {
  type: string;
  title: string;
  url: string;
  description?: string;
}

export interface ResourceCardProps {
  topic: string;
  accuracy: number;
  resources: Resource[];
  progress: number;
  totalActions: number;
  difficultyLevel?: string;
  priorityLevel?: string;
  bioResources?: BioResource[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  topic, 
  accuracy, 
  difficultyLevel, 
  priorityLevel,
  bioResources
}) => {
  // Helper function to find the most closely matching resource
  const findMatchingResource = (topic: string) => {
    if (!bioResources || !Array.isArray(bioResources)) return null;
    
    // Try exact match first
    let match = bioResources.find(resource => 
      resource.chapter_name && 
      topic.toLowerCase() === resource.chapter_name.toLowerCase()
    );
    
    // If no exact match, try includes
    if (!match) {
      match = bioResources.find(resource => 
        resource.chapter_name && 
        (topic.toLowerCase().includes(resource.chapter_name.toLowerCase()) ||
        resource.chapter_name.toLowerCase().includes(topic.toLowerCase()))
      );
    }
    
    return match;
  };

  // Find matching resource for this topic
  const matchingResource = findMatchingResource(topic);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-subtle overflow-hidden">
      <div className="p-3 sm:p-5 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h4 className="text-sm sm:font-medium text-learnzy-dark">{topic}</h4>
          <span className={`text-xs sm:text-sm font-medium ${getAccuracyColor(accuracy)}`}>
            {accuracy}%
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          {difficultyLevel && (
            <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getDifficultyColor(difficultyLevel)}`}>
              {difficultyLevel}
            </span>
          )}
          {priorityLevel && (
            <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getPriorityColor(priorityLevel)}`}>
              {priorityLevel} Priority
            </span>
          )}
        </div>
      </div>
      
      <div className="px-3 sm:px-5 py-2 sm:py-3">
        <h5 className="text-xs sm:text-sm font-medium text-learnzy-dark mb-2 sm:mb-3">Recommended Resources</h5>
        <ul className="space-y-2 sm:space-y-3">
          {/* NCERT Resource */}
          <ResourceItem 
            type="NCERT"
            topic={topic}
            resourceAvailable={matchingResource && matchingResource.ncert_link !== 'NA'}
            resourceLink={matchingResource?.ncert_link}
          />
          
          {/* Video Resource */}
          <ResourceItem 
            type="Video" 
            topic={topic}
            resourceAvailable={matchingResource && matchingResource.video_link !== 'NA'}
            resourceLink={matchingResource?.video_link}
          />
        </ul>
      </div>
    </div>
  );
};

export default ResourceCard;
