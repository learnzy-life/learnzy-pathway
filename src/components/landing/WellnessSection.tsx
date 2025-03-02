
import React from 'react';
import { CheckCircle, Sparkles, BrainCircuit, HeartPulse } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const WellnessSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      {/* Background Element */}
      <div className="absolute bottom-20 left-0 opacity-5 w-48 md:w-72 h-48 md:h-72 -rotate-12">
        <HeartPulse className="w-full h-full text-red-400" />
      </div>
      
      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={HeartPulse} title="A Calm Mind Learns Better" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          We believe that you learn best when your mind is relaxed. Our simple approach makes sure you're mentally ready before testing what you know.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mb-10 md:mb-12">
        <div className="card-glass p-5 md:p-8 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-learnzy-purple" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Before Your Test</h3>
          <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
            Before every test, we help you calm your mind with simple activities to reduce worry and improve focus.
          </p>
          <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Easy breathing exercises to calm your nerves</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Positive statements to boost your confidence</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Short mindfulness to help you focus better</span>
            </li>
          </ul>
        </div>
        
        <div className="card-glass p-5 md:p-8 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-learnzy-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Complete Learning Check</h3>
          <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
            Our tests check both what you know and how you think to give you better insights.
          </p>
          <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Full subject knowledge testing</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Understanding of your learning style</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Tracking how you feel during tests</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WellnessSection;
