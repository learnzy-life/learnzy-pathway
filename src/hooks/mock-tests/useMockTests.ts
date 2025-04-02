import { useEffect, useState } from 'react'
import { MockTest } from '../../types/mock-test'
import { UseMockTestsReturn } from './types'
import { useCompletedTests } from './useCompletedTests'
import { usePayment } from './usePayment'
import { useTestNavigation } from './useTestNavigation'
import { useUnlockedCycles } from './useUnlockedCycles'
import { initializeMockTests } from './utils'

/**
 * Main hook for managing mock tests
 * @param userId The current user's ID
 * @returns State and functions for mock tests
 */
export const useMockTests = (
  userId: string | undefined
): UseMockTestsReturn => {
  const [mockTests, setMockTests] = useState<MockTest[]>([])
  const { unlockedCycles, updateUnlockedCycles } = useUnlockedCycles(userId)
  const { completedTests, isLoading: isLoadingCompleted } =
    useCompletedTests(userId)

  const {
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    handleShowPayment,
    handleUnlockCycleClick,
    handlePaymentComplete,
  } = usePayment(
    userId,
    unlockedCycles,
    updateUnlockedCycles,
    mockTests,
    setMockTests
  )

  const { handleMockTestClick } = useTestNavigation(
    mockTests,
    completedTests,
    handleShowPayment
  )

  // Initialize mock tests when unlockedCycles or completedTests change
  useEffect(() => {
    const tests = initializeMockTests(unlockedCycles)

    // Update completion status for each test
    const updatedTests = tests.map((test) => ({
      ...test,
      isCompleted: completedTests.includes(test.id),
    }))

    setMockTests(updatedTests)
  }, [unlockedCycles, completedTests])

  return {
    mockTests,
    isLoading: isLoadingCompleted,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    unlockedCycles,
    handleMockTestClick,
    handlePaymentComplete,
    handleUnlockCycleClick,
  }
}
