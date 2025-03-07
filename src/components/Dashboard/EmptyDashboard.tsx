
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const EmptyDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="card-glass p-8 flex flex-col items-center justify-center text-center">
      <SearchX className="w-16 h-16 text-learnzy-purple/40 mb-4" />
      <h2 className="text-xl font-medium text-learnzy-dark mb-2">No Test Sessions Found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You haven't completed any tests yet. Take your first test to see your performance analytics.
      </p>
      <button
        onClick={() => navigate('/subjects')}
        className="button-primary"
      >
        Take Your First Test
      </button>
    </div>
  );
};

export default EmptyDashboard;
