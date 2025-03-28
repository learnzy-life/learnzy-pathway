
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { CycleData } from '../landing/cycles/cyclesData';
import CycleInfo from './CycleInfo';
import MockTestsGrid from './MockTestsGrid';
import { MockTest } from '../../types/mock-test';

interface CycleContentProps {
  cycle: CycleData;
  isUnlocked: boolean;
  mockTests: MockTest[];
  isLoading: boolean;
  onMockTestClick: (test: MockTest) => void;
  onUnlockCycleClick: (cycleNumber: number) => void;
}

const CycleContent: React.FC<CycleContentProps> = ({
  cycle,
  isUnlocked,
  mockTests,
  isLoading,
  onMockTestClick,
  onUnlockCycleClick
}) => {
  return (
    <TabsContent key={cycle.number} value={`cycle-${cycle.number}`} className="space-y-4">
      <CycleInfo 
        cycle={cycle} 
        isUnlocked={isUnlocked || cycle.number === 1} 
        onUnlockClick={() => onUnlockCycleClick(cycle.number)} 
      />
      
      <MockTestsGrid 
        isLoading={isLoading}
        mockTests={mockTests}
        cycleNumber={cycle.number}
        onMockTestClick={onMockTestClick}
      />
    </TabsContent>
  );
};

export default CycleContent;
