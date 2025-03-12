
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, Award, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { ChapterPerformance } from '../utils/analytics/types';

interface ResultsOverviewProps {
  subject: string;
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpent: string; // in format "2h 15m"
  subjectScores: ChapterPerformance[];
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({
  subject,
  totalScore,
  maxScore,
  correctAnswers,
  incorrectAnswers,
  unattempted,
  accuracy,
  timeSpent,
  subjectScores,
}) => {
  // Format the tooltip for the chapter performance chart
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">Accuracy: {data.score}%</p>
          <p className="text-sm text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
        </div>
      );
    }
    
    return null;
  };

  // Array of celebratory messages for high performers
  const highPerformanceMessages = [
    (topic: string) => `You were the GOAT of ${topic}! 🔥`,
    (topic: string) => `Top performer in ${topic}! 👑`,
    (topic: string) => `Master of ${topic}! 🏆`,
    (topic: string) => `Unstoppable in ${topic}! 💯`,
    (topic: string) => `Champion of ${topic}! 🌟`
  ];

  // Get the best performing topic
  const bestTopic = subjectScores.length > 0 
    ? subjectScores.reduce((best, current) => current.score > best.score ? current : best, subjectScores[0])
    : null;

  // Get random message for the high performer
  const getRandomMessage = (topic: string) => {
    const randomIndex = Math.floor(Math.random() * highPerformanceMessages.length);
    return highPerformanceMessages[randomIndex](topic);
  };

  // Share achievement on WhatsApp
  const shareOnWhatsApp = () => {
    if (!bestTopic) return;
    
    const message = `${getRandomMessage(bestTopic.name)} I scored ${accuracy}% on my ${subject} test! 🎓 #Learnzy #AcademicSuccess`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success("Opening WhatsApp to share your achievement!");
  };

  // Only show high performance card if accuracy is above 95% and we have topic data
  const showHighPerformanceCard = accuracy > 95 && bestTopic !== null;

  return (
    <div className="card-glass p-6 mb-8">
      <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Performance Overview</h3>
      
      {/* High Performance Card */}
      {showHighPerformanceCard && (
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-5 rounded-xl border border-amber-300 shadow-md mb-8 animate-fade-in">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-amber-500 mr-3" />
              <div>
                <h4 className="text-lg font-bold text-amber-900">{getRandomMessage(bestTopic.name)}</h4>
                <p className="text-amber-800">You achieved an outstanding {accuracy}% accuracy!</p>
              </div>
            </div>
            <button 
              onClick={shareOnWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center text-sm transition-colors duration-200"
            >
              <Share2 className="w-4 h-4 mr-1" /> Share
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Total Score</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{totalScore}</span>
            <span className="text-base text-muted-foreground ml-1 mb-0.5">/ {maxScore}</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Accuracy</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{accuracy}%</span>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-sm text-muted-foreground mb-1">Time Spent</h4>
          <div className="flex items-end">
            <span className="text-3xl font-semibold text-learnzy-dark">{timeSpent}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Response Breakdown</h4>
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-green-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Correct</h5>
            <span className="text-xl font-semibold text-green-600">{correctAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-red-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Incorrect</h5>
            <span className="text-xl font-semibold text-red-600">{incorrectAnswers}</span>
          </div>
          <div className="flex-1 p-4 bg-gray-100/50 rounded-lg">
            <h5 className="text-sm text-muted-foreground mb-1">Unattempted</h5>
            <span className="text-xl font-semibold text-gray-600">{unattempted}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-base font-medium text-learnzy-dark mb-4">Chapter Performance</h4>
        <div className="h-64">
          {subjectScores.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectScores}
                margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip content={renderTooltip} />
                <Bar dataKey="score" fill="#FFBD59" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No chapter data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;
