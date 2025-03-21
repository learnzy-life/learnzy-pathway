
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, Award, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { ChapterPerformance } from '../utils/analytics/types';
import { ScrollArea } from './ui/scroll-area';

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
        <div className="bg-white p-2 sm:p-3 border border-gray-200 shadow-lg rounded-md text-xs sm:text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-600">Accuracy: {data.score}%</p>
          <p className="text-gray-600">
            {data.total} questions: {data.correct} correct, {data.incorrect} incorrect
          </p>
        </div>
      );
    }
    
    return null;
  };

  // Calculate chart width based on number of chapters
  const getChartWidth = () => {
    if (!subjectScores || subjectScores.length === 0) return '100%';
    // Allocate at least 100px per chapter for better readability
    const minWidth = subjectScores.length * 100;
    return Math.max(minWidth, 300);
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

  // Process chapter data for better mobile display
  const processChapterDataForMobile = () => {
    // If we have more than 4 chapters, only show top and bottom performing chapters on mobile
    if (subjectScores.length > 4) {
      const sortedScores = [...subjectScores].sort((a, b) => b.score - a.score);
      const topChapters = sortedScores.slice(0, 2);
      const bottomChapters = sortedScores.slice(-2);
      
      // Generate shortened names for mobile
      return [...topChapters, ...bottomChapters].map(chapter => ({
        ...chapter,
        mobileName: chapter.name.length > 10 ? `${chapter.name.substring(0, 8)}...` : chapter.name
      }));
    }
    
    // Otherwise just add shortened names
    return subjectScores.map(chapter => ({
      ...chapter,
      mobileName: chapter.name.length > 10 ? `${chapter.name.substring(0, 8)}...` : chapter.name
    }));
  };

  const mobileChapterData = processChapterDataForMobile();

  return (
    <div className="card-glass p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-learnzy-dark mb-4 sm:mb-6">Performance Overview</h3>
      
      {/* High Performance Card */}
      {showHighPerformanceCard && (
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-3 sm:p-5 rounded-xl border border-amber-300 shadow-md mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="flex items-center mb-3 sm:mb-0">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mr-2 sm:mr-3" />
              <div>
                <h4 className="text-base sm:text-lg font-bold text-amber-900">{getRandomMessage(bestTopic.name)}</h4>
                <p className="text-sm text-amber-800">You achieved an outstanding {accuracy}% accuracy!</p>
              </div>
            </div>
            <button 
              onClick={shareOnWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center text-xs sm:text-sm transition-colors duration-200 mt-2 sm:mt-0"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Share
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Total Score</h4>
          <div className="flex items-end">
            <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{totalScore}</span>
            <span className="text-sm sm:text-base text-muted-foreground ml-1 mb-0.5">/ {maxScore}</span>
          </div>
        </div>
        
        <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Accuracy</h4>
          <div className="flex items-end">
            <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{accuracy}%</span>
          </div>
        </div>
        
        <div className="p-3 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">Time Spent</h4>
          <div className="flex items-end">
            <span className="text-xl sm:text-3xl font-semibold text-learnzy-dark">{timeSpent}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm sm:text-base font-medium text-learnzy-dark mb-3 sm:mb-4">Response Breakdown</h4>
        <div className="flex space-x-2 sm:space-x-4">
          <div className="flex-1 p-2 sm:p-4 bg-green-100/50 rounded-lg">
            <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Correct</h5>
            <span className="text-lg sm:text-xl font-semibold text-green-600">{correctAnswers}</span>
          </div>
          <div className="flex-1 p-2 sm:p-4 bg-red-100/50 rounded-lg">
            <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Incorrect</h5>
            <span className="text-lg sm:text-xl font-semibold text-red-600">{incorrectAnswers}</span>
          </div>
          <div className="flex-1 p-2 sm:p-4 bg-gray-100/50 rounded-lg">
            <h5 className="text-xs sm:text-sm text-muted-foreground mb-1">Unattempted</h5>
            <span className="text-lg sm:text-xl font-semibold text-gray-600">{unattempted}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm sm:text-base font-medium text-learnzy-dark mb-3 sm:mb-4">Chapter Performance</h4>
        <div className="h-56 sm:h-64">
          {subjectScores.length > 0 ? (
            <ScrollArea className="w-full h-full">
              <div style={{ width: getChartWidth(), height: '100%', minWidth: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectScores}
                    margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip content={renderTooltip} />
                    <Bar dataKey="score" fill="#FFBD59" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollArea>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs sm:text-sm text-muted-foreground">No chapter data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;
