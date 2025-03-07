
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface KeyInsightsProps {
  insights: string[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-learnzy-purple/10 rounded-xl p-5">
      <div className="flex items-start mb-2">
        <Lightbulb className="w-5 h-5 text-learnzy-purple mr-3 mt-0.5" />
        <h4 className="text-base font-medium text-learnzy-dark">Key Insights</h4>
      </div>
      <ul className="space-y-2 ml-8">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
            <span className="text-muted-foreground">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyInsights;
