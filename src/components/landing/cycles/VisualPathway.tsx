
import React from 'react';
import CycleInfo from './CycleInfo';
import { CycleData } from './cyclesData';

interface VisualPathwayProps {
  cycles: CycleData[];
}

export const DesktopVisualPathway: React.FC<VisualPathwayProps> = ({ cycles }) => {
  return (
    <div className="hidden md:block relative max-w-4xl mx-auto mb-8 pt-4">
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-learnzy-amber/30 transform -translate-y-1/2"></div>
      
      <div className="flex justify-between relative">
        {cycles.map((cycle, index) => (
          <CycleInfo 
            key={index}
            number={cycle.number}
            title={`Cycle ${cycle.number}: ${cycle.title}`}
            description={cycle.info}
            goal={cycle.goal}
          />
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
          <div key={index} className="flex items-center relative z-10">
            <CycleInfo 
              number={cycle.number}
              title={`Cycle ${cycle.number}: ${cycle.title}`}
              description={cycle.info}
              goal={cycle.goal}
            />
            <span className="text-sm font-medium text-[#003366] ml-2">Cycle {cycle.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
