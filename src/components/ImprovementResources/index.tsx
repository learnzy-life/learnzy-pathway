
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BioResource } from '../../utils/analytics/types';
import ResourceCard, { ResourceCardProps } from './ResourceCard';
import { Separator } from '../ui/separator';

interface Resource {
  type: string;
  title: string;
  url: string;
  description?: string;
}

interface ImprovementResourceItem {
  topic: string;
  accuracy: number;
  resources: Resource[];
  progress: number;
  totalActions: number;
  difficultyLevel?: string;
  priorityLevel?: string;
}

interface ImprovementResourcesProps {
  resources: ImprovementResourceItem[];
  bioResources?: BioResource[];
}

const ImprovementResources: React.FC<ImprovementResourcesProps> = ({ resources, bioResources }) => {
  // Sort resources by accuracy gap (lower accuracy first)
  const sortedResources = [...resources].sort((a, b) => {
    return a.accuracy - b.accuracy;
  });
  
  // Limit to top 10 resources
  const topResources = sortedResources.slice(0, 10);

  return (
    <div className="card-glass p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-learnzy-purple mr-2" />
          <h3 className="text-base sm:text-lg font-medium">Topics With Highest Improvement Potential</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          We've identified these topics where focused study will have the greatest impact on your score. 
          Topics are prioritized based on your current accuracy, difficulty level, and exam importance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {topResources.map((item, index) => (
          <ResourceCard
            key={index}
            topic={item.topic}
            accuracy={item.accuracy}
            resources={item.resources}
            progress={item.progress}
            totalActions={item.totalActions}
            difficultyLevel={item.difficultyLevel}
            priorityLevel={item.priorityLevel}
            bioResources={bioResources}
          />
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex items-center justify-center mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="text-center">
          <div className="text-sm sm:text-base text-green-700 font-medium">Focus on these topics to maximize your score improvement!</div>
          <div className="text-xs sm:text-sm text-green-600 mt-1">
            We've prioritized topics where you'll see the biggest gains with the least effort
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementResources;
