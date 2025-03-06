
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
  
  // Format subject name
  const formatSubject = (subj: string) => {
    return subj.charAt(0).toUpperCase() + subj.slice(1);
  };

  return (
    <div className="card-glass p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-sm font-medium px-3 py-1 bg-learnzy-purple/10 text-learnzy-purple rounded-full mb-2 inline-block">
            {formatSubject(subject)} Test
          </span>
          <h3 className="text-lg font-medium text-learnzy-dark">Test Session</h3>
        </div>
        <div className={`px-3 py-1 rounded-full font-medium ${getScoreColor()}`}>
          {scorePercentage}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
          <span className="text-sm text-muted-foreground">
            {score} correct
          </span>
        </div>
        <div className="flex items-center">
          <XCircle className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-sm text-muted-foreground">
            {totalQuestions - score} incorrect
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
        to={`/results/${subject}?sessionId=${id}`} 
        className="button-secondary text-sm w-full flex items-center justify-center"
      >
        <FileText className="w-4 h-4 mr-2" />
        View Results
      </Link>
    </div>
  );
};

export default SessionCard;
