
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 px-3 sm:px-0">
      <div className="card-glass p-5 sm:p-6 md:p-10 lg:p-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-bold mb-3 md:mb-6">
          Ready to Find Your Strengths?
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 md:mb-10">
          Join thousands of students who use Learnzy to find what they need to work on and improve their exam scores.
        </p>
        <Link to="/subjects" className="button-primary inline-flex">
          Start Your Learning Journey <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
