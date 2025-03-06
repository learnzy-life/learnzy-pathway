
import React from 'react';

interface ResultsLoadingStateProps {
  loading: boolean;
  errorMessage: string | null;
}

const ResultsLoadingState: React.FC<ResultsLoadingStateProps> = ({ loading, errorMessage }) => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">Error Loading Results</h2>
          <p className="text-muted-foreground mb-6">{errorMessage || "Could not load test results"}</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default ResultsLoadingState;
