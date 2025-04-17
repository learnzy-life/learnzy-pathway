
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain } from 'lucide-react';
import { trackButtonClick } from '../../utils/analytics/googleAnalytics';

const HeroSection: React.FC = () => {
  const handleStartTestClick = () => {
    trackButtonClick('start_free_test', 'hero_section');
  };

  const handleLearnMoreClick = () => {
    trackButtonClick('not_sure_of_score', 'hero_section');
  };

  return (
    <section className="py-10 md:py-24 flex flex-col items-center text-center relative">
      {/* Background Element */}
      <div className="absolute top-20 right-0 md:right-10 opacity-5 w-48 md:w-64 h-48 md:h-64 rotate-12" aria-hidden="true">
        <Brain className="w-full h-full text-learnzy-purple" />
      </div>
      
      <div className="w-14 md:w-16 h-14 md:h-16 bg-learnzy-purple/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 animate-float">
        <BookOpen className="w-7 md:w-8 h-7 md:h-8 text-learnzy-purple" />
      </div>
      
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-2 sm:mb-3 max-w-3xl leading-tight z-10 px-3 sm:px-0 text-[#003366]">
        Crack <span className="text-gradient">NEET 2025</span> in <span className="text-amber-500">20 Days</span> with Learnzy*
      </h1>
      
      <p className="text-xs sm:text-sm text-[#666666] max-w-2xl mb-3 sm:mb-5 z-10 px-4 sm:px-0 italic">
        *For students scoring 450+ who follow our structured program.
      </p>
      
      <p className="text-base sm:text-lg md:text-xl text-learnzy-amber-dark max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0 font-medium">
        Smart Prep + Calm Mind = Medical Seat
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0">
        <Link 
          to="/subjects" 
          className="button-primary w-full sm:w-auto" 
          onClick={handleStartTestClick}
        >
          Let's Make a Comeback <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link 
          to="/learn-more" 
          className="button-secondary w-full sm:w-auto text-sm"
          onClick={handleLearnMoreClick}
        >
          Know More
        </Link>
      </div>
      
      {/* Free Resources Section */}
      <div className="mt-8 sm:mt-12 w-full max-w-2xl bg-gradient-to-r from-amber-50 to-white p-4 sm:p-6 rounded-lg border border-amber-100 shadow-sm">
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Free Resources Worth ₹5000</h3>
          <p className="text-sm text-amber-700">Click to unlock premium study materials</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link 
            to="/learn-more" 
            className="flex items-start p-3 bg-white rounded-md border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-2 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-learnzy-dark text-sm">Toppers' Highlighted NCERT</h4>
              <p className="text-muted-foreground text-xs">Class 11 & 12 annotated</p>
            </div>
          </Link>
          
          <Link 
            to="/learn-more" 
            className="flex items-start p-3 bg-white rounded-md border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-2 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-learnzy-dark text-sm">Physics Derived PYQs</h4>
              <p className="text-muted-foreground text-xs">10 similar NEET 2024 questions</p>
            </div>
          </Link>
          
          <Link 
            to="/learn-more" 
            className="flex items-start p-3 bg-white rounded-md border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-2 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-learnzy-dark text-sm">Physics Formula Book</h4>
              <p className="text-muted-foreground text-xs">Complete formula guide</p>
            </div>
          </Link>
          
          <Link 
            to="/learn-more" 
            className="flex items-start p-3 bg-white rounded-md border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-2 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-learnzy-dark text-sm">Chemistry One-Page Notes</h4>
              <p className="text-muted-foreground text-xs">Quick revision guide</p>
            </div>
          </Link>
          
          <Link 
            to="/learn-more" 
            className="flex items-start p-3 bg-white rounded-md border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm col-span-1 sm:col-span-2"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-2 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-learnzy-dark text-sm">Top 50 Important Topics</h4>
              <p className="text-muted-foreground text-xs">For Botany, Zoology, Physics & Chemistry</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
