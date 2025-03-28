
import React from 'react';
import { Loader2 } from 'lucide-react';
import MockTestCard from './MockTestCard';
import { MockTest } from '../../types/mock-test';

interface MockTestsGridProps {
  isLoading: boolean;
  mockTests: MockTest[];
  cycleNumber: number;
  onMockTestClick: (test: MockTest) => void;
}

const MockTestsGrid: React.FC<MockTestsGridProps> = ({ 
  isLoading, 
  mockTests, 
  cycleNumber, 
  onMockTestClick 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-learnzy-amber" />
      </div>
    );
  }

  const cycleTests = mockTests.filter(test => test.cycle === cycleNumber);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cycleTests.map((test) => (
        <MockTestCard
          key={test.id}
          test={test}
          onClick={onMockTestClick}
        />
      ))}
    </div>
  );
};

export default MockTestsGrid;
