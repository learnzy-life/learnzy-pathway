
import { toast } from 'sonner';
import { MockTest } from '../../types/mock-test';
import { canStartDynamicTest } from './utils';

/**
 * Hook for handling test navigation and clicks
 * @param mockTests Array of mock tests
 * @param completedTests Array of completed test IDs
 * @param onShowPayment Callback to show payment dialog
 * @returns Function to handle mock test click
 */
export const useTestNavigation = (
  mockTests: MockTest[],
  completedTests: string[],
  onShowPayment: (test: MockTest) => void
) => {
  const handleMockTestClick = (test: MockTest) => {
    if (test.isLocked) {
      if (test.requiresPayment) {
        onShowPayment(test);
      } else {
        toast.error("This test is currently locked.");
      }
      return;
    }
    
    const isCompleted = completedTests.includes(test.id);
    test.isCompleted = isCompleted;
    
    if (test.isDynamic) {
      if (!canStartDynamicTest(test.cycle, mockTests, completedTests)) {
        toast.error("Complete all tests in this cycle to unlock the AI-powered test.");
        return;
      }
      
      window.location.href = `/pre-dynamic-test/${test.cycle}`;
    } else {
      const testNumber = test.id.split('-').pop() || '1';
      
      if (isCompleted) {
        window.location.href = `/results/mixed?sessionId=${test.id}`;
      } else {
        window.location.href = `/pre-mock-test/${test.cycle}/${testNumber}`;
      }
    }
  };

  return { handleMockTestClick };
};
