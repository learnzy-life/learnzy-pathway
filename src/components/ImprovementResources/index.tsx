
import React from 'react';
import { TrendingUp, AlertCircle, BookOpen } from 'lucide-react';
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
    <div className="card-glass p-5 sm:p-7">
      <div className="mb-5 sm:mb-7">
        <div className="flex items-center mb-4 sm:mb-5">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-learnzy-purple mr-3" />
          <h3 className="text-lg sm:text-xl font-semibold">Top Improvement Areas</h3>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base text-blue-800 font-medium mb-1">How we selected these topics</p>
              <p className="text-xs sm:text-sm text-blue-700">
                These topics are prioritized based on your current accuracy, the difficulty level, and exam importance.
                Focusing on these areas will have the greatest impact on your overall score improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
      
      <Separator className="my-6 sm:my-8" />
      
      <div className="bg-green-50 rounded-lg border border-green-200 p-4 sm:p-5">
        <div className="flex items-start">
          <BookOpen className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
          <div>
            <p className="text-sm sm:text-base text-green-800 font-medium mb-1">Study Strategy Tip</p>
            <p className="text-xs sm:text-sm text-green-700">
              For maximum improvement, we recommend spending 70% of your study time on these focus areas
              and 30% on reviewing topics you're already strong in to maintain your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementResources;
