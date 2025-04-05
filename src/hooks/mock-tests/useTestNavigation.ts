import { toast } from 'sonner'
import { MockTest } from '../../types/mock-test'
import { canStartDynamicTest } from './utils'

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
    // For dynamic tests, always allow clicking unless completed
    if (test.isDynamic) {
      // If already completed, show results
      if (test.isCompleted) {
        window.location.href = `/results/mixed?sessionId=${test.id}`
        return
      }

      // Check if all previous tests in the cycle are completed before allowing generation
      if (!canStartDynamicTest(test.cycle, mockTests, completedTests)) {
        toast.error(
          'Complete all regular tests in this cycle first to unlock the AI-powered test.'
        )
        return
      }

      // Navigate to the dynamic test generation page
      window.location.href = `/pre-dynamic-test/${test.cycle}`
      return
    }

    // Handle regular (non-dynamic) tests
    if (test.isLocked) {
      if (test.requiresPayment) {
        onShowPayment(test)
      } else {
        toast.error('This test is currently locked.')
      }
      return
    }

    const isCompleted = completedTests.includes(test.id)
    test.isCompleted = isCompleted

    const testNumber = test.id.split('-').pop() || '1'

    if (isCompleted) {
      window.location.href = `/results/mixed?sessionId=${test.id}`
    } else {
      window.location.href = `/pre-mock-test/${test.cycle}/${testNumber}`
    }
  }

  return { handleMockTestClick }
}
