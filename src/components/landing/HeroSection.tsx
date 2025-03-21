
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  // Calculate days until NEET 2025 (assuming May 5, 2025)
  const neetDate = new Date(2025, 4, 5); // May 5, 2025
  const today = new Date();
  const daysUntilNeet = Math.ceil((neetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <section className="py-10 md:py-24 flex flex-col items-center text-center relative">
      {/* Background Element */}
      <div className="absolute top-20 right-0 md:right-10 opacity-5 w-48 md:w-64 h-48 md:h-64 rotate-12">
        <Brain className="w-full h-full text-learnzy-purple" />
      </div>
      
      <div className="w-14 md:w-16 h-14 md:h-16 bg-learnzy-purple/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 animate-float">
        <BookOpen className="w-7 md:w-8 h-7 md:h-8 text-learnzy-purple" />
      </div>
      
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-3 sm:mb-6 max-w-3xl leading-tight z-10 px-3 sm:px-0">
        Ace <span className="text-gradient">NEET 2025</span> with Learnzy: <span className="text-amber-500">Smart Tests</span> + <span className="text-amber-500">Calm Mind</span> = Success
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0">
        Discover your strengths, fix your weaknesses, and stay calm with Learnzy's personalized approach for NEET success.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <Link to="/subjects" className="button-primary w-full sm:w-auto">
          Start Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link to="/learn-more" className="button-secondary w-full sm:w-auto">
          Learn More
        </Link>
      </div>
      
      {/* NEET 2025 Countdown Alert */}
      <div className="mt-8 md:mt-10 bg-amber-50 p-3 md:p-4 rounded-lg border border-amber-100 max-w-2xl mx-auto animate-pulse-soft px-4 sm:px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Clock className="h-5 w-5 text-amber-600" />
          <h3 className="font-semibold text-amber-800">{daysUntilNeet} days until NEET 2025</h3>
        </div>
        <p className="text-amber-700 text-sm">
          Start your preparation today with our specialized diagnostic tests and mental wellness tools designed specifically for NEET 2025!
        </p>
      </div>
      
      {/* USP Statement */}
      <div className="mt-8 text-center max-w-2xl mx-auto px-4">
        <p className="font-medium text-learnzy-dark">
          Learnzy is the <span className="font-bold underline decoration-amber-400">only app</span> that combines diagnostic testing with mental wellness tracking for NEET 2025 success.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
