
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-10 md:py-24 flex flex-col items-center text-center relative">
      {/* Background Element */}
      <div className="absolute top-20 right-0 md:right-10 opacity-5 w-48 md:w-64 h-48 md:h-64 rotate-12" aria-hidden="true">
        <Brain className="w-full h-full text-learnzy-purple" />
      </div>
      
      <div className="w-14 md:w-16 h-14 md:h-16 bg-learnzy-purple/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 animate-float">
        <BookOpen className="w-7 md:w-8 h-7 md:h-8 text-learnzy-purple" />
      </div>
      
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-2 sm:mb-3 max-w-3xl leading-tight z-10 px-3 sm:px-0">
        Crack <span className="text-gradient">NEET 2025</span> in <span className="text-amber-500">40 Days</span> Guaranteed*
      </h1>
      
      <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mb-3 sm:mb-5 z-10 px-4 sm:px-0 italic">
        *If you are currently scoring 450+ and follow our structured program and complete all recommended activities.
      </p>
      
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0 font-medium">
        Smart Prep + Calm Mind = Medical Seat
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <Link to="/subjects" className="button-primary">
          Start Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link to="/learn-more" className="button-secondary">
          Learn More
        </Link>
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
