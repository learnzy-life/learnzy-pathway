
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  // Set NEET 2025 date (May 5, 2025)
  const neetDate = new Date(2025, 4, 5, 10, 0, 0); // May 5, 2025, 10:00 AM
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = neetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Set up interval to update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-learnzy-purple to-learnzy-blue py-1.5 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center text-white text-sm md:text-base font-medium">
          <Clock className="w-4 h-4 mr-2" />
          <span className="mr-3">NEET 2025 Countdown:</span>
          
          <div className="flex space-x-1 md:space-x-2">
            <div className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-md flex flex-col items-center min-w-[2.5rem]">
              <span className="text-base md:text-xl font-bold leading-tight">{timeLeft.days.toString().padStart(2, '0')}</span>
              <span className="text-[10px] leading-tight">Days</span>
            </div>
            <span className="text-white self-center">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-md flex flex-col items-center min-w-[2.5rem]">
              <span className="text-base md:text-xl font-bold leading-tight">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] leading-tight">Hours</span>
            </div>
            <span className="text-white self-center">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-md flex flex-col items-center min-w-[2.5rem]">
              <span className="text-base md:text-xl font-bold leading-tight">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-[10px] leading-tight">Mins</span>
            </div>
            <span className="text-white self-center">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-md flex flex-col items-center min-w-[2.5rem]">
              <span className="text-base md:text-xl font-bold leading-tight">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-[10px] leading-tight">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
