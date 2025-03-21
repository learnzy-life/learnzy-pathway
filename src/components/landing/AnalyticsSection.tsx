
import React from 'react';
import { BarChart, BrainCircuit, Sparkles, CheckCircle, LineChart, PieChart } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const AnalyticsSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      {/* Background Element */}
      <div className="absolute top-40 right-0 opacity-5 w-48 md:w-72 h-48 md:h-72">
        <BarChart className="w-full h-full text-blue-400" />
      </div>
      
      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={BarChart} title="NEET Analytics Made Simple" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          Transform your test results into actionable insights with our NEET-focused analytics. Understand exactly what to study next to maximize your score.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <PieChart className="w-5 md:w-6 h-5 md:h-6 text-blue-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Subject Breakdown</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Detailed analysis of your performance across Biology, Physics, and Chemistry with topic-level insights for targeted improvement.
          </p>
        </div>
        
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-green-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Mental State Analysis</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Understand how your confidence, stress, and focus affect your NEET performance and learn techniques to optimize your mental state.
          </p>
        </div>
        
        <div className="card-glass p-5 md:p-6 card-hover sm:col-span-2 md:col-span-1">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <LineChart className="w-5 md:w-6 h-5 md:h-6 text-amber-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Personalized Study Plan</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Receive a customized NEET study roadmap based on your diagnostic results, with prioritized topics and recommended resources.
          </p>
        </div>
      </div>
      
      <div className="mt-8 md:mt-10 p-5 md:p-6 card-glass bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">NEET-Focused Analysis</h3>
            <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
              Our advanced analytics go beyond simple scores to give you NEET-specific insights:
            </p>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Time management analysis for each subject and topic</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Concept connection mapping showing where you need clarification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Question difficulty assessment to build your confidence strategically</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Bloom's taxonomy breakdown for deeper understanding</span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-subtle mb-4 md:mb-0">
            {/* Grid of result page screenshots */}
            <div className="grid grid-cols-2 gap-2">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src="/lovable-uploads/5727a0a5-76a0-4c56-bed5-b1b1df931182.png" 
                  alt="Mistake Pattern Analysis" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src="/lovable-uploads/451ffd40-0f9a-4ffc-af08-883bf433741e.png" 
                  alt="Chapter Performance" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-200 col-span-2">
                <img 
                  src="/assets/time-analysis.png" 
                  alt="Improvement Topics" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
