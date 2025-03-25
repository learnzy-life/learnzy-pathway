
import React from 'react';

interface RecommendationsSectionProps {
  isFirstTest: boolean;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ isFirstTest }) => {
  return (
    <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100">
      <h4 className="font-medium text-amber-800 mb-2">Recommendations</h4>
      <p className="text-amber-700">
        {isFirstTest 
          ? "This is your first test. Complete more tests to track your progress over time."
          : "Focus on improving chapters that show a 'Needs Improvement' mastery level."}
      </p>
    </div>
  );
};

export default RecommendationsSection;
