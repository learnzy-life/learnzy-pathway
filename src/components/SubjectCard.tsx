
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';

interface SubjectCardProps {
  subject: 'biology' | 'physics' | 'chemistry';
  title: string;
  description: string;
  icon: string;
  color: string;
  attempted?: boolean;
  locked?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  title, 
  description, 
  icon, 
  color,
  attempted = false,
  locked = false
}) => {
  // Map the original colors to our new amber theme
  const colorClass = color === 'bg-green-500' ? 'bg-learnzy-amber' :
                     color === 'bg-blue-500' ? 'bg-learnzy-amber/80' :
                     color === 'bg-purple-500' ? 'bg-learnzy-amber/90' : color;
  
  return (
    <div className={`card-glass p-6 card-hover h-full ${attempted ? 'opacity-60' : ''} ${locked ? 'opacity-70' : ''}`}>
      <div className="flex flex-col h-full">
        <div 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${colorClass}`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-learnzy-dark mb-2">
          {title}
          {locked && (
            <span className="ml-2 inline-flex items-center">
              <Lock size={16} className="text-muted-foreground" />
            </span>
          )}
        </h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        
        {locked ? (
          <div className="flex items-center justify-center w-full p-2 bg-learnzy-amber-light text-learnzy-amber-dark rounded-md font-medium">
            <Lock size={16} className="mr-2" /> Coming Soon
          </div>
        ) : attempted ? (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium text-learnzy-dark/70">Test Completed</span>
            <Link 
              to={`/results/${subject}`}
              className="flex items-center text-learnzy-amber-dark font-medium text-sm hover:underline"
            >
              View Results <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <Link 
            to={`/pre-test/${subject}`}
            className="button-primary inline-flex items-center justify-center w-full mt-auto"
          >
            Start Test <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
