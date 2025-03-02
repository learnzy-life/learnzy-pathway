
import React from 'react';
import { Medal, BrainCircuit, HeartPulse, CheckCircle } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative">
      <div className="text-center mb-10 md:mb-16">
        <SectionHeader icon={Medal} title="Why Students Love Learnzy" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
          Our special approach combines test-taking with mental wellness to help you do your best.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-4">
            <BrainCircuit className="w-6 h-6 text-learnzy-purple" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Complete Testing</h3>
          <p className="text-muted-foreground">
            Subject-specific tests that show exactly what you need to work on.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-4">
            <HeartPulse className="w-6 h-6 text-learnzy-blue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Mind Care</h3>
          <p className="text-muted-foreground">
            Activities before tests to make sure you're in the right mindset to do well.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-learnzy-teal/10 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-learnzy-teal" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Personal Tips</h3>
          <p className="text-muted-foreground">
            Custom study plans based on your test results to guide what to study next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
