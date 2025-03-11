
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Subject } from '../../services/questionService';
import { getSubjectTitle } from '../../data/mockResultsData';

interface ReviewHeaderProps {
  subject: Subject | undefined;
  sessionId: string | null;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ subject, sessionId }) => {
  const subjectTitle = subject ? getSubjectTitle(subject) : 'Test';
  
  return (
    <>
      <Link 
        to={`/results/${subject}${sessionId ? `?sessionId=${sessionId}` : ''}`}
        className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
      </Link>
      
      <h1 className="text-2xl font-bold text-learnzy-dark mb-6">{subjectTitle} Test Review</h1>
    </>
  );
};

export default ReviewHeader;
