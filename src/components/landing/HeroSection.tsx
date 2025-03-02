
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain } from 'lucide-react';

const HeroSection: React.FC = () => {
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
        Learning <span className="text-gradient">Made Simple</span> for Your Success
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0">
        Find out your strong and weak points while taking care of your mental health. Our easy approach helps you do your best in studies.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <Link to="/subjects" className="button-primary w-full sm:w-auto">
          Start Test Now <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link to="/learn-more" className="button-secondary w-full sm:w-auto">
          Learn More
        </Link>
      </div>
      
      {/* NEET 2025 Alert */}
      <div className="mt-8 md:mt-10 bg-amber-50 p-3 md:p-4 rounded-lg border border-amber-100 max-w-2xl mx-auto animate-pulse-soft px-4 sm:px-4">
        <h3 className="font-semibold text-amber-800">NEET 2025 Update!</h3>
        <p className="text-amber-700 text-sm mt-1">
          Get ready for NEET 2025 with our specialized tests! Start early to improve your chances of success. Prep with our smart tools today.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
