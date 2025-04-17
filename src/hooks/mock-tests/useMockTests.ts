
import { useEffect, useState } from 'react'
import { MockTest } from '../../types/mock-test'
import { UseMockTestsReturn } from './types'
import { useCompletedTests } from './useCompletedTests'
import { usePayment } from './usePayment'
import { useTestNavigation } from './useTestNavigation'
import { useUnlockedCycles } from './useUnlockedCycles'
import { initializeMockTests, updateMockTestStatus } from './utils'

/**
 * Main hook for managing mock tests
 * @param userId The current user's ID
 * @returns State and functions for mock tests
 */
export const useMockTests = (
  userId: string | undefined
): UseMockTestsReturn => {
  const [mockTests, setMockTests] = useState<MockTest[]>([])
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null)
  const { unlockedCycles, updateUnlockedCycles } = useUnlockedCycles(userId)
  const { completedTests, isLoading: isLoadingCompleted } =
    useCompletedTests(userId)

  const { handleShowPayment } = usePayment(
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
    // Initialize basic test structure with cycle unlocks
    const initialTests = initializeMockTests(unlockedCycles)

    // Update test status based on completed tests and dynamic test availability
    const updatedTests = updateMockTestStatus(initialTests, completedTests)

    setMockTests(updatedTests)
  }, [unlockedCycles, completedTests])

  return {
    mockTests,
    isLoading: isLoadingCompleted,
    selectedTest,
    unlockedCycles,
    handleMockTestClick,
  }
}
