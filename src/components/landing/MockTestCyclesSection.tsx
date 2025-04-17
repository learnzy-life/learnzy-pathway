
import React from 'react';
import { Book, Brain } from 'lucide-react';
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
            />
          ))}
        </div>

        {/* Visual Pathways */}
        <DesktopVisualPathway cycles={cycles} />
        <MobileVisualPathway cycles={cycles} />

        {/* Extra Clarity */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-lg border border-learnzy-amber/20 shadow-sm mb-6">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Brain className="w-5 h-5 text-learnzy-amber" />
              </div>
              <div>
                <p className="text-[#333333] font-medium">
                  Every cycle ends with a test tailored to your weak areas—so you improve fast.
                </p>
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
