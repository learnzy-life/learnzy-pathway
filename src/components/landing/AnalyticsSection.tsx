
import React from 'react';
import { BarChart, BrainCircuit, Sparkles, CheckCircle } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const AnalyticsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative">
      {/* Background Element */}
      <div className="absolute top-40 right-0 opacity-5 w-72 h-72">
        <BarChart className="w-full h-full text-blue-400" />
      </div>
      
      <div className="text-center mb-10 md:mb-16">
        <SectionHeader icon={BarChart} title="Smart Analysis Made Simple" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
          We break down your test results into easy-to-understand charts and suggestions to help you improve.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <BrainCircuit className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Subject Breakdown</h3>
          <p className="text-muted-foreground">
            See which topics you're good at and which ones need more work with simple, colorful charts.
          </p>
        </div>
        
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Mind Check</h3>
          <p className="text-muted-foreground">
            Understand how your confidence, stress, and focus affect your test results and learn to improve.
          </p>
        </div>
        
        <div className="card-glass p-6 card-hover">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Study Plan</h3>
          <p className="text-muted-foreground">
            Get a simple list of what to study next based on your test results, with links to helpful resources.
          </p>
        </div>
      </div>
      
      <div className="mt-10 p-6 card-glass bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-3">See How Your Brain Works</h3>
            <p className="text-muted-foreground mb-4">
              Our smart tools don't just check your answers. They also show you:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>How fast you solve different types of problems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Which concepts you connect well and which you struggle with</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>How your confidence affects your performance</span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 bg-white p-4 rounded-xl border border-gray-100 shadow-subtle">
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
