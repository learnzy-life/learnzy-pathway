
import React from 'react';
import { ExternalLink, Play, BookOpen, ChevronRight, TrendingUp } from 'lucide-react';
import { BioResource } from '../utils/analytics/types';

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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="w-4 h-4 text-learnzy-purple" />;
      case 'NCERT':
        return <BookOpen className="w-4 h-4 text-learnzy-purple" />;
      default:
        return <ExternalLink className="w-4 h-4 text-learnzy-purple" />;
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return 'bg-gray-200 text-gray-700';
    
    const diff = difficulty.toLowerCase();
    if (diff.includes('easy')) return 'bg-green-100 text-green-800';
    if (diff.includes('hard')) return 'bg-red-100 text-red-800';
    return 'bg-amber-100 text-amber-800';
  };
  
  const getPriorityColor = (priority?: string) => {
    if (!priority) return 'bg-gray-200 text-gray-700';
    
    const prio = priority.toLowerCase();
    if (prio.includes('high')) return 'bg-purple-100 text-purple-800';
    if (prio.includes('low')) return 'bg-blue-100 text-blue-800';
    return 'bg-indigo-100 text-indigo-800';
  };

  return (
    <div className="card-glass p-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-learnzy-purple mr-2" />
          <h3 className="text-lg font-medium">Topics With Highest Improvement Potential</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          We've identified these topics where focused study will have the greatest impact on your score. 
          Topics are prioritized based on your current accuracy, difficulty level, and exam importance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topResources.map((item, index) => {
          // Find matching resource from bioResources if available
          const matchingResource = bioResources?.find(resource => 
            resource.chapter_name && item.topic.toLowerCase().includes(resource.chapter_name.toLowerCase())
          );

          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-subtle overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-learnzy-dark">{item.topic}</h4>
                  <span className={`text-sm font-medium ${getAccuracyColor(item.accuracy)}`}>
                    {item.accuracy}%
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.difficultyLevel && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficultyLevel)}`}>
                      {item.difficultyLevel}
                    </span>
                  )}
                  {item.priorityLevel && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priorityLevel)}`}>
                      {item.priorityLevel} Priority
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-5 py-3">
                <h5 className="text-sm font-medium text-learnzy-dark mb-3">Recommended Resources</h5>
                <ul className="space-y-3">
                  {item.resources.map((resource, idx) => {
                    // Determine if the resource is available or needs self-study
                    const isNCERT = resource.type === 'NCERT';
                    const isVideo = resource.type === 'Video';
                    const unavailableNCERT = isNCERT && matchingResource?.ncert_link === 'NA';
                    const unavailableVideo = isVideo && matchingResource?.video_link === 'NA';
                    
                    // Use actual resource URL from bioResources if available
                    let resourceUrl = resource.url;
                    if (isNCERT && matchingResource?.ncert_link && matchingResource.ncert_link !== 'NA') {
                      resourceUrl = matchingResource.ncert_link;
                    } else if (isVideo && matchingResource?.video_link && matchingResource.video_link !== 'NA') {
                      resourceUrl = matchingResource.video_link;
                    }

                    return (
                      <li key={idx}>
                        {unavailableNCERT || unavailableVideo ? (
                          <div className="flex items-start p-2 rounded-lg bg-gray-50">
                            <div className="p-1.5 bg-gray-200 rounded-md mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-learnzy-dark">Self-study recommended</div>
                              <div className="text-xs text-muted-foreground">{resource.type}</div>
                            </div>
                          </div>
                        ) : (
                          <a 
                            href={resourceUrl} 
                            className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="p-1.5 bg-learnzy-purple/10 rounded-md mr-3">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-learnzy-dark">{resource.title}</div>
                              <div className="text-xs text-muted-foreground">{resource.type}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="text-center">
          <div className="text-green-700 font-medium">Focus on these topics to maximize your score improvement!</div>
          <div className="text-sm text-green-600 mt-1">
            We've prioritized topics where you'll see the biggest gains with the least effort
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementResources;
