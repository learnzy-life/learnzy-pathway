
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCyclesData } from '../landing/cycles/cyclesData';
import CycleContent from './CycleContent';
import { MockTest } from '../../types/mock-test';

interface MockTestCyclesProps {
  mockTests: MockTest[];
  isLoading: boolean;
  unlockedCycles: number[];
  onMockTestClick: (test: MockTest) => void;
  onUnlockCycleClick: (cycleNumber: number) => void;
}

const MockTestCycles: React.FC<MockTestCyclesProps> = ({
  mockTests,
  isLoading,
  unlockedCycles,
  onMockTestClick,
  onUnlockCycleClick
}) => {
  const cycles = getCyclesData();

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-display font-bold text-center mb-8">
        Mock Test Cycles
      </h2>
      
      <Tabs defaultValue="cycle-1" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 w-full md:w-3/4 mx-auto">
          {cycles.map((cycle) => (
            <TabsTrigger key={cycle.number} value={`cycle-${cycle.number}`} className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-learnzy-amber/20 mr-2">
                {cycle.icon}
              </span>
              <span className="hidden md:inline">Cycle {cycle.number}</span>
              <span className="md:hidden">C{cycle.number}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {cycles.map((cycle) => (
          <CycleContent
            key={cycle.number}
            cycle={cycle}
            isUnlocked={unlockedCycles.includes(cycle.number)}
            mockTests={mockTests}
            isLoading={isLoading}
            onMockTestClick={onMockTestClick}
            onUnlockCycleClick={onUnlockCycleClick}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default MockTestCycles;
