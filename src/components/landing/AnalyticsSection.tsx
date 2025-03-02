
import React from 'react';
import { BarChart, BrainCircuit, Sparkles, CheckCircle } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const AnalyticsSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      {/* Background Element */}
      <div className="absolute top-40 right-0 opacity-5 w-48 md:w-72 h-48 md:h-72">
        <BarChart className="w-full h-full text-blue-400" />
      </div>
      
      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={BarChart} title="Smart Analysis Made Simple" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          We break down your test results into easy-to-understand charts and suggestions to help you improve.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-blue-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Subject Breakdown</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            See which topics you're good at and which ones need more work with simple, colorful charts.
          </p>
        </div>
        
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-green-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Mind Check</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Understand how your confidence, stress, and focus affect your test results and learn to improve.
          </p>
        </div>
        
        <div className="card-glass p-5 md:p-6 card-hover sm:col-span-2 md:col-span-1">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-amber-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Study Plan</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Get a simple list of what to study next based on your test results, with links to helpful resources.
          </p>
        </div>
      </div>
      
      <div className="mt-8 md:mt-10 p-5 md:p-6 card-glass bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">See How Your Brain Works</h3>
            <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
              Our smart tools don't just check your answers. They also show you:
            </p>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>How fast you solve different types of problems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Which concepts you connect well and which you struggle with</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>How your confidence affects your performance</span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-subtle mb-4 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Student using analytics dashboard" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
