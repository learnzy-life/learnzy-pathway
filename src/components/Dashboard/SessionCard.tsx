
import React from 'react';
import { formatDistance } from 'date-fns';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SessionCardProps {
  id: string;
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  mood?: string;
  ritual?: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
  id,
  subject,
  score,
  totalQuestions,
  completedAt,
  mood,
  ritual
}) => {
  const scorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const formattedDate = formatDistance(new Date(completedAt), new Date(), { addSuffix: true });
  
  // Determine score color
  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-600 bg-green-50';
    if (scorePercentage >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };
  
  // Format test title
  const getTestTitle = () => {
    // Check if this is a mock test
    if (id.startsWith('mock-')) {
      const parts = id.split('-');
      if (parts.length >= 3) {
        const cycle = parts[1];
        const testNumber = parts[2];
        return `Mock Test ${testNumber}`;
      }
      return 'Mock Test';
    }
    
    // Regular subject test
    return `${subject.charAt(0).toUpperCase() + subject.slice(1)} Test`;
  };
  
  // Format test subtitle
  const getTestSubtitle = () => {
    if (id.startsWith('mock-')) {
      const parts = id.split('-');
      if (parts.length >= 3) {
        return `Cycle ${parts[1]}`;
      }
    }
    return 'Diagnostic Test';
  };

  // Generate results link based on test type
  const getResultsLink = () => {
    if (id.startsWith('mock-')) {
      // For mock tests
      const parts = id.split('-');
      const cycle = parts.length >= 2 ? parts[1] : '1';
      const testNumber = parts.length >= 3 ? parts[2] : '1';
      return `/results/mixed?sessionId=${id}&mock=true&cycle=${cycle}&testNumber=${testNumber}`;
    }
    // For regular tests
    return `/results/${subject}?sessionId=${id}`;
  };

  return (
    <div className="card-glass p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full mb-2 inline-block">
            {getTestTitle()}
          </span>
          <h3 className="text-lg font-medium text-learnzy-dark">{getTestSubtitle()}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full font-medium ${getScoreColor()}`}>
          {scorePercentage}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
          <span className="text-sm text-muted-foreground">
            {Math.round((score / totalQuestions) * totalQuestions)} correct
          </span>
        </div>
        <div className="flex items-center">
          <XCircle className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-sm text-muted-foreground">
            {totalQuestions - Math.round((score / totalQuestions) * totalQuestions)} incorrect
          </span>
        </div>
      </div>
      
      {(mood || ritual) && (
        <div className="bg-learnzy-purple/5 rounded-lg p-3 mb-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Test Preparation</div>
          <div className="flex flex-wrap gap-2">
            {mood && (
              <span className="text-xs bg-white px-2 py-1 rounded-full border border-gray-100">
                Mood: {mood}
              </span>
            )}
            {ritual && (
              <span className="text-xs bg-white px-2 py-1 rounded-full border border-gray-100">
                Ritual: {ritual === 'none' ? 'Skipped' : ritual}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center text-xs text-muted-foreground mb-4">
        <Clock className="w-3 h-3 mr-1" />
        <span>{formattedDate}</span>
      </div>
      
      <Link 
        to={getResultsLink()} 
        className="button-secondary text-sm w-full flex items-center justify-center"
      >
        <FileText className="w-4 h-4 mr-2" />
        View Results
      </Link>
    </div>
  );
};

export default SessionCard;
