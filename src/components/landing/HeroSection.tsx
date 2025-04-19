
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { trackButtonClick } from '../../utils/analytics/googleAnalytics';

const HeroSection: React.FC = () => {
  const handleStartTestClick = () => {
    trackButtonClick('start_free_test', 'hero_section');
  };

  return (
    <section className="py-6 md:py-12 flex flex-col items-center text-center relative">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 max-w-3xl leading-tight z-10 px-3 sm:px-0 text-[#003366]">
        Crack{' '}
        <span className="text-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          NEET 2025
        </span>{' '}
        in{' '}
        <span className="text-amber-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          20 Days*
        </span>{' '}
        with Learnzy
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-learnzy-amber-dark max-w-2xl mb-6 sm:mb-10 z-10 px-4 sm:px-0 font-medium">
        Smart Prep + Calm Mind = Medical Seat
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto px-4 sm:px-0">
        <Link
          to="/subjects"
          className="button-primary w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F4841B] hover:bg-[#E67816] text-center py-3 px-4 sm:px-5 rounded-xl font-medium text-sm sm:text-base whitespace-nowrap"
          onClick={handleStartTestClick}
        >
          Free Physics Formula Book <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
