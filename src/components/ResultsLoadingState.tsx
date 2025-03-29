
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface ResultsLoadingStateProps {
  loading: boolean;
  errorMessage: string | null;
  sessionId?: string | null;
}

const ResultsLoadingState: React.FC<ResultsLoadingStateProps> = ({ 
  loading, 
  errorMessage,
  sessionId 
}) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Analyzing your results...</h2>
      </div>
    );
  }
  
  if (errorMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-medium mb-4">Error Loading Results</h2>
          <p className="text-muted-foreground mb-6">{errorMessage || "Could not load test results"}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/subjects" 
              className="button-primary py-2 px-6"
            >
              Start a New Test
            </Link>
            <Link 
              to="/" 
              className="button-secondary py-2 px-6"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default ResultsLoadingState;
