
import React from 'react';
import { Medal, BrainCircuit, HeartPulse, CheckCircle } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={Medal} title="Why Students Love Learnzy" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          Our special approach combines test-taking with mental wellness to help you do your best.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* Feature 1 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-learnzy-purple" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Complete Testing</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Subject-specific tests that show exactly what you need to work on.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <HeartPulse className="w-5 md:w-6 h-5 md:h-6 text-learnzy-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Mind Care</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Activities before tests to make sure you're in the right mindset to do well.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="card-glass p-5 md:p-6 card-hover sm:col-span-2 md:col-span-1">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-teal/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-learnzy-teal" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Personal Tips</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Custom study plans based on your test results to guide what to study next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
