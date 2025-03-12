
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

  // Debug bioResources data
  console.log('Bio Resources:', bioResources);

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
        {topResources.map((item, index) => {
          // Find matching resource for this topic
          const matchingResource = findMatchingResource(item.topic);
          console.log(`Topic: ${item.topic}, Matching resource:`, matchingResource);

          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-subtle overflow-hidden">
              <div className="p-3 sm:p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <h4 className="text-sm sm:font-medium text-learnzy-dark">{item.topic}</h4>
                  <span className={`text-xs sm:text-sm font-medium ${getAccuracyColor(item.accuracy)}`}>
                    {item.accuracy}%
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {item.difficultyLevel && (
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getDifficultyColor(item.difficultyLevel)}`}>
                      {item.difficultyLevel}
                    </span>
                  )}
                  {item.priorityLevel && (
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getPriorityColor(item.priorityLevel)}`}>
                      {item.priorityLevel} Priority
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-3 sm:px-5 py-2 sm:py-3">
                <h5 className="text-xs sm:text-sm font-medium text-learnzy-dark mb-2 sm:mb-3">Recommended Resources</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {/* NCERT Resource */}
                  <li>
                    {matchingResource && matchingResource.ncert_link === 'NA' ? (
                      <div className="flex items-start p-1.5 sm:p-2 rounded-lg bg-gray-50">
                        <div className="p-1 sm:p-1.5 bg-gray-200 rounded-md mr-2 sm:mr-3">
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm font-medium text-learnzy-dark">Self-study recommended</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">NCERT</div>
                        </div>
                      </div>
                    ) : (
                      <a 
                        href={matchingResource?.ncert_link || `https://learnzy.com/resources/biology/ncert/${item.topic.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="flex items-start p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="p-1 sm:p-1.5 bg-learnzy-purple/10 rounded-md mr-2 sm:mr-3">
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm font-medium text-learnzy-dark">{item.topic} NCERT</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">Study Material</div>
                        </div>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground self-center" />
                      </a>
                    )}
                  </li>
                  
                  {/* Video Resource */}
                  <li>
                    {matchingResource && matchingResource.video_link === 'NA' ? (
                      <div className="flex items-start p-1.5 sm:p-2 rounded-lg bg-gray-50">
                        <div className="p-1 sm:p-1.5 bg-gray-200 rounded-md mr-2 sm:mr-3">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm font-medium text-learnzy-dark">Self-study recommended</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">Video</div>
                        </div>
                      </div>
                    ) : (
                      <a 
                        href={matchingResource?.video_link || `https://learnzy.com/resources/biology/video/${item.topic.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="flex items-start p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="p-1 sm:p-1.5 bg-learnzy-purple/10 rounded-md mr-2 sm:mr-3">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-learnzy-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm font-medium text-learnzy-dark">{item.topic} Video</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">Video Lecture</div>
                        </div>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground self-center" />
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      
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
