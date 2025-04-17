
import React from 'react';
import { Book, Brain, Target } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import CycleCard from './cycles/CycleCard';
import { DesktopVisualPathway, MobileVisualPathway } from './cycles/VisualPathway';
import { getCyclesData } from './cycles/cyclesData';
import { trackEvent } from '../../utils/analytics/googleAnalytics';

const MockTestCyclesSection: React.FC = () => {
  const cycles = getCyclesData();

  React.useEffect(() => {
    trackEvent('section_view', { section: 'mock_test_cycles' });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#FFF9E6] rounded-xl overflow-hidden my-8 md:my-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionHeader 
            icon={Book} 
            title="Your Path to NEET Success: 4 Mock Test Cycles" 
          />
          <p className="text-[#333333] max-w-3xl mx-auto mt-3 px-2 sm:px-0 font-medium">
            Get NEET 2025-ready with 20 mock tests split into 4 cycles. Each builds your skills, step by step.
          </p>
        </div>

        {/* Cycle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {cycles.map((cycle) => (
            <CycleCard 
              key={cycle.number}
              number={cycle.number}
              title={`Cycle ${cycle.number}: ${cycle.title}`}
              focus={cycle.focus}
              testDescription={cycle.testDescription}
              icon={cycle.icon}
              goal={cycle.goal}
            />
          ))}
        </div>

        {/* Visual Pathways */}
        <DesktopVisualPathway cycles={cycles} />
        <MobileVisualPathway cycles={cycles} />

        {/* Enhanced USP Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-50 p-5 rounded-lg border border-learnzy-amber shadow-sm mb-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-learnzy-amber/20 p-2 rounded-full">
                <Target className="w-5 h-5 text-learnzy-amber" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-learnzy-dark mb-2">Our Key Advantage</h4>
                <p className="text-[#333333] font-medium mb-2">
                  Every cycle ends with a test tailored to your weak areas—so you improve fast.
                </p>
                <div className="bg-white p-3 rounded-md border border-learnzy-amber/20 mt-3">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <Brain className="w-5 h-5 text-learnzy-amber" />
                    </div>
                    <div>
                      <p className="text-sm text-learnzy-dark">
                        <span className="font-semibold">How it works:</span> Our AI analyzes your performance on the first 4 tests in each cycle and creates a personalized 5th test that focuses precisely on the topics where you need the most help.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div className="text-center">
            <p className="text-[#333333] font-semibold text-lg">
              This simple plan gets you ready for NEET 2025!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockTestCyclesSection;
