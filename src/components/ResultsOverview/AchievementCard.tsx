
import React from 'react';
import { Share2, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { ChapterPerformance } from '../../utils/analytics/types';

interface AchievementCardProps {
  subject: string;
  accuracy: number;
  subjectScores: ChapterPerformance[];
  showCard: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  subject,
  accuracy,
  subjectScores,
  showCard,
}) => {
  if (!showCard) return null;

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

  return (
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
  );
};

export default AchievementCard;
