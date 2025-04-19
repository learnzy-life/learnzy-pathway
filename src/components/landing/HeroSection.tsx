
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
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
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 max-w-3xl leading-tight z-10 px-3 sm:px-0 text-[#003366]">
        Crack{' '}
        <span className="text-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          NEET 2025
        </span>{' '}
        in{' '}
        <span className="text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          20 Days
        </span>{' '}
        with Learnzy
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-learnzy-amber-dark max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0 font-medium">
        Smart Prep + Calm Mind = Medical Seat
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0">
        <Link
          to="/subjects"
          className="button-primary w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F4841B] hover:bg-[#E67816]"
          onClick={handleStartTestClick}
        >
          Let's Make a Comeback <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/learn-more"
          className="button-secondary w-full sm:w-auto text-sm"
          onClick={handleLearnMoreClick}
        >
          Know More
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

