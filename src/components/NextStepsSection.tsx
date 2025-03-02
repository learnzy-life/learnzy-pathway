
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NextStepsSection: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 text-center">
      <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Ready for Your Next Challenge?</h3>
      <p className="text-muted-foreground mb-5 sm:mb-6 max-w-2xl mx-auto">
        Continue your diagnostic journey by testing your knowledge in another subject area.
      </p>
      <Link to="/subjects" className="button-primary inline-flex w-full sm:w-auto justify-center">
        Back to Subject Selection <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  );
};

export default NextStepsSection;
