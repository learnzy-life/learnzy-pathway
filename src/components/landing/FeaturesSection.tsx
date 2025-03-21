
import React from 'react';
import { Medal, BrainCircuit, HeartPulse, CheckCircle, FileSearch, BarChart } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={Medal} title="Why NEET Aspirants Choose Learnzy" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          Our specialized approach combines NEET-focused diagnostics with mental wellness to help you excel in your exam.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Feature 1 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-amber/20 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <FileSearch className="w-5 md:w-6 h-5 md:h-6 text-learnzy-amber" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Smart Diagnostic Tests</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-3">
            Tailored tests to identify your exact strengths and weaknesses in Biology, Physics, and Chemistry.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>180 questions in 180 minutes per subject</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>+4/-1 scoring, mirroring actual NEET format</span>
            </li>
          </ul>
        </div>
        
        {/* Feature 2 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-blue/20 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <HeartPulse className="w-5 md:w-6 h-5 md:h-6 text-learnzy-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Mental Wellness Tools</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-3">
            Breathing exercises and mood tracking to keep you focused and calm throughout your NEET preparation.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Pre-test rituals like meditation and breathing exercises</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Emoji-based mood check-ins to monitor stress levels</span>
            </li>
          </ul>
        </div>
        
        {/* Feature 3 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-purple/20 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-learnzy-purple" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">AI-Powered Insights</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-3">
            Personalized study plans and recommendations based on your test performance.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>AI analysis identifying patterns of conceptual weaknesses</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Targeted recommendations for NEET syllabus mastery</span>
            </li>
          </ul>
        </div>
        
        {/* Feature 4 */}
        <div className="card-glass p-5 md:p-6 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-teal/20 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BarChart className="w-5 md:w-6 h-5 md:h-6 text-learnzy-teal" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Comprehensive Analytics</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-3">
            Detailed reports on topics, subtopics, and more to track your NEET preparation progress.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Topic-wise accuracy & time management graphs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Bloom's taxonomy analysis for deeper understanding</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Social Proof Section */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-amber-50/30 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">What NEET Aspirants Say About Us</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="italic text-gray-700 mb-3">"Learnzy helped me improve my NEET scores by 20% and reduced my test anxiety."</p>
            <p className="font-medium">- Ananya, NEET Aspirant</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="italic text-gray-700 mb-3">"The combination of analytics and mental wellness tools made all the difference in my preparation."</p>
            <p className="font-medium">- Rahul, NEET 2024 Qualifier</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="italic text-gray-700 mb-3">"I finally found an app that cares about both my scores and my mental health during NEET prep."</p>
            <p className="font-medium">- Priya, Medical Student</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg font-medium">Over 10,000 students have started their NEET journey with Learnzy</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
