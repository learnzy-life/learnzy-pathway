
import React from 'react';
import { BookOpenCheck } from 'lucide-react';
import SessionCard from './SessionCard';
import { TestSession, TestPreparation } from '../../types/dashboard';

interface SessionsListProps {
  sessions: TestSession[];
  preparations: Record<string, TestPreparation>;
}

const SessionsList: React.FC<SessionsListProps> = ({ sessions, preparations }) => {
  return (
    <>
      <div className="flex items-center mb-6">
        <BookOpenCheck className="w-6 h-6 text-learnzy-purple mr-2" />
        <h2 className="text-xl font-semibold text-learnzy-dark">Recent Test Sessions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            id={session.id}
            subject={session.subject}
            score={session.score}
            totalQuestions={session.total_questions}
            completedAt={session.end_time}
            mood={preparations[session.id]?.mood}
            ritual={preparations[session.id]?.ritual}
          />
        ))}
      </div>
    </>
  );
};

export default SessionsList;
