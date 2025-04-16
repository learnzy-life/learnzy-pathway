import { useEffect } from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { MockTest } from '../../types/mock-test'

/**
 * Hook to handle payment-related functionality (now primarily for global payment status)
 * @param userId User ID
 * @param unlockedCycles Current unlocked cycles
 * @param updateUnlockedCycles Function to update unlocked cycles
 * @param mockTests Array of mock tests
 * @param setMockTests Function to update mock tests
 * @returns Payment-related state and functions (simplified)
 */
export const usePayment = (
  userId: string | undefined,
  unlockedCycles: number[],
  updateUnlockedCycles: (cycles: number[]) => void,
  mockTests: MockTest[],
  setMockTests: React.Dispatch<React.SetStateAction<MockTest[]>>
) => {
  const { initiateSinglePayment, hasPaid } = useGlobalPayment()

  const handleShowPayment = (test: MockTest) => {
    // Directly initiate the global payment flow
    initiateSinglePayment()
  }

  // This effect now solely relies on the global `hasPaid` status
  useEffect(() => {
    if (hasPaid) {
      // If user has paid, unlock all tests
      setMockTests((prev) =>
        prev.map((t) => ({
          ...t,
          isLocked: false,
        }))
      )
      // Set all cycles as unlocked
      const allCycles = Array.from(new Set(mockTests.map((test) => test.cycle)))
      // Only update if mockTests has loaded to prevent setting empty array
      if (allCycles.length > 0) {
        updateUnlockedCycles(allCycles)
      }
    } else {
      // Otherwise, initialize with potentially some locked tests (utils handles initial lock state)
      // If needed, re-apply initial lock state based on cycle number
      // setMockTests(prev => prev.map(t => ({ ...t, isLocked: !unlockedCycles.includes(t.cycle) })));
      // Keep unlockedCycles as loaded from storage/default (empty)
    }
    // Only run when hasPaid changes or when mockTests are first loaded
  }, [hasPaid, mockTests.length > 0]) // Added mockTests.length dependency

  return {
    handleShowPayment,
  }
}
