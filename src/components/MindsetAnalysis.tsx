
import React from 'react';
import { Brain, TrendingUp, Lightbulb, ThumbsUp } from 'lucide-react';

interface MindsetAnalysisProps {
  mindset: {
    confidence: number;
    stress: number;
    focus: number;
    resilience: number;
    insights: string[];
    improvements: string[];
  };
}

const MindsetAnalysis: React.FC<MindsetAnalysisProps> = ({ mindset }) => {
  return (
    <div className="card-glass p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Confidence</h4>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold text-learnzy-dark mb-2">{mindset.confidence}%</span>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-500" 
                style={{ width: `${mindset.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Stress Management</h4>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold text-learnzy-dark mb-2">{100 - mindset.stress}%</span>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500" 
                style={{ width: `${100 - mindset.stress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Focus</h4>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold text-learnzy-dark mb-2">{mindset.focus}%</span>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-500" 
                style={{ width: `${mindset.focus}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Resilience</h4>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold text-learnzy-dark mb-2">{mindset.resilience}%</span>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-amber-500" 
                style={{ width: `${mindset.resilience}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-learnzy-purple/10 rounded-xl p-5">
          <div className="flex items-start mb-4">
            <Brain className="w-5 h-5 text-learnzy-purple mr-3 mt-0.5" />
            <h4 className="text-base font-medium text-learnzy-dark">Mindset Insights</h4>
          </div>
          <ul className="space-y-3 ml-8">
            {mindset.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-learnzy-purple mt-2 mr-2"></span>
                <span className="text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-start mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <h4 className="text-base font-medium text-blue-800">Areas for Improvement</h4>
          </div>
          <ul className="space-y-3 ml-8">
            {mindset.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                <span className="text-blue-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-learnzy-purple/20 to-blue-500/20 rounded-xl p-6 text-center">
        <ThumbsUp className="w-8 h-8 text-learnzy-purple mx-auto mb-3" />
        <h3 className="text-lg font-medium text-learnzy-dark mb-2">Your Mindset Is Your Superpower</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          By maintaining a positive mindset and implementing the techniques you've learned through your pre-test rituals, 
          you'll maximize your potential and achieve even better results on your next test.
        </p>
      </div>
    </div>
  );
};

export default MindsetAnalysis;
