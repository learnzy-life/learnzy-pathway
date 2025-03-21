
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h4 className="text-base sm:text-lg font-semibold text-learnzy-dark">{topic}</h4>
          <span className={`text-sm sm:text-base font-medium ${getAccuracyColor(accuracy)}`}>
            {accuracy}%
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
          {difficultyLevel && (
            <span className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${getDifficultyColor(difficultyLevel)}`}>
              {difficultyLevel}
            </span>
          )}
          {priorityLevel && (
            <span className={`text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${getPriorityColor(priorityLevel)}`}>
              {priorityLevel} Priority
            </span>
          )}
        </div>
      </div>
      
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
        <h5 className="text-sm sm:text-base font-medium text-learnzy-dark mb-3 sm:mb-4">Recommended Resources</h5>
        <ul className="space-y-3 sm:space-y-4">
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
