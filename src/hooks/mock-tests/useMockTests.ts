
import { useState, useEffect } from 'react';
import { MockTest } from '../../types/mock-test';
import { UseMockTestsReturn } from './types';
import { useUnlockedCycles } from './useUnlockedCycles';
import { useCompletedTests } from './useCompletedTests';
import { useTestNavigation } from './useTestNavigation';
import { usePayment } from './usePayment';
import { initializeMockTests } from './utils';

/**
 * Main hook for managing mock tests
 * @param userId The current user's ID
 * @returns State and functions for mock tests
 */
export const useMockTests = (userId: string | undefined): UseMockTestsReturn => {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const { unlockedCycles, updateUnlockedCycles } = useUnlockedCycles(userId);
  const { completedTests, isLoading: isLoadingCompleted } = useCompletedTests(userId);
  
  const {
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    handleShowPayment,
    handleUnlockCycleClick,
    handlePaymentComplete
  } = usePayment(userId, unlockedCycles, updateUnlockedCycles, mockTests, setMockTests);
  
  const { handleMockTestClick } = useTestNavigation(
    mockTests, 
    completedTests, 
    handleShowPayment
  );

  // Initialize mock tests when unlockedCycles change
  useEffect(() => {
    const tests = initializeMockTests(unlockedCycles);
    setMockTests(tests);
  }, [unlockedCycles]);

  return {
    mockTests,
    isLoading: isLoadingCompleted,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    unlockedCycles,
    handleMockTestClick,
    handlePaymentComplete,
    handleUnlockCycleClick
  };
};
