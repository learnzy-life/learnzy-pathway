
import React from 'react';
import CycleInfo from './CycleInfo';
import { CycleData } from './cyclesData';
import { Brain } from 'lucide-react';

interface VisualPathwayProps {
  cycles: CycleData[];
}

export const DesktopVisualPathway: React.FC<VisualPathwayProps> = ({ cycles }) => {
  return (
    <div className="hidden md:block relative max-w-4xl mx-auto mb-8 pt-4">
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-learnzy-amber/30 transform -translate-y-1/2"></div>
      
      <div className="flex justify-between relative">
        {cycles.map((cycle, index) => (
          <div key={index} className="flex flex-col items-center">
            <CycleInfo 
              number={cycle.number}
              title={`Cycle ${cycle.number}: ${cycle.title}`}
              description={cycle.info || cycle.focus}
              goal={cycle.goal}
            />

            {/* Personalized 5th test indicator */}
            {index < cycles.length - 1 && (
              <div className="relative">
                <div className="absolute -right-4 top-[-15px]">
                  <div className="w-8 h-8 rounded-full bg-learnzy-amber-light border-2 border-learnzy-amber flex items-center justify-center">
                    <Brain className="w-4 h-4 text-learnzy-amber-dark" />
                  </div>
                </div>
                <div className="w-24 h-0.5 bg-learnzy-amber-light"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const MobileVisualPathway: React.FC<VisualPathwayProps> = ({ cycles }) => {
  return (
    <div className="md:hidden relative max-w-xs mx-auto mb-8">
      <div className="absolute top-0 bottom-0 left-6 w-1 bg-learnzy-amber/30"></div>
      
      <div className="flex flex-col space-y-8 relative">
        {cycles.map((cycle, index) => (
          <div key={index} className="flex items-start relative z-10">
            <div className="mr-3">
              <CycleInfo 
                number={cycle.number}
                title={`Cycle ${cycle.number}: ${cycle.title}`}
                description={cycle.info || cycle.focus}
                goal={cycle.goal}
              />
            </div>
            
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-[#003366] mb-1">Cycle {cycle.number}</span>
              
              {/* Personalized 5th test indicator */}
              <div className="flex items-center mt-2 bg-amber-50 rounded-full px-2 py-1 border border-learnzy-amber/30">
                <Brain className="w-3 h-3 text-learnzy-amber mr-1" />
                <span className="text-xs text-learnzy-amber-dark font-medium">Personalized 5th Test</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
