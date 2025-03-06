
import React from 'react';
import { ExternalLink, Play, FileText, CheckCircle, BookOpen, ChevronRight } from 'lucide-react';

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
}

interface ImprovementResourcesProps {
  resources: ImprovementResourceItem[];
}

const ImprovementResources: React.FC<ImprovementResourcesProps> = ({ resources }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="w-4 h-4 text-learnzy-purple" />;
      case 'Practice':
        return <FileText className="w-4 h-4 text-learnzy-purple" />;
      case 'Reading':
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

  return (
    <div className="card-glass p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-subtle overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-learnzy-dark">{item.topic}</h4>
                <span className={`text-sm font-medium ${getAccuracyColor(item.accuracy)}`}>
                  {item.accuracy}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full ${
                    item.accuracy >= 80 ? 'bg-green-500' : 
                    item.accuracy >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${item.accuracy}%` }}
                ></div>
              </div>
              <div className="text-sm text-muted-foreground">
                {item.progress} of {item.totalActions} actions completed
              </div>
            </div>
            
            <div className="px-5 py-3">
              <h5 className="text-sm font-medium text-learnzy-dark mb-3">Recommended Resources</h5>
              <ul className="space-y-3">
                {item.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a 
                      href={resource.url} 
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
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <button className="w-full py-2 text-sm font-medium text-learnzy-purple flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Complete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="text-center">
          <div className="text-green-700 font-medium">Complete these resources before your next test to see improved results!</div>
          <div className="text-sm text-green-600 mt-1">{resources.length} topics need your attention</div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementResources;
