import { MockTest } from '../../types/mock-test'

/**
 * Initializes the mock tests data structure
 * @param unlockedCycles Array of cycle numbers that are unlocked
 * @returns Array of mock tests
 */
export const initializeMockTests = (unlockedCycles: number[]): MockTest[] => {
  const tests: MockTest[] = []

  // Cycle 1
  for (let i = 1; i <= 4; i++) {
    tests.push({
      id: `mock-1-${i}`,
      title: `Mock Test ${i}`,
      cycle: 1,
      isLocked: false,
      unlockDate: null,
      isDynamic: false,
      isCompleted: false,
      isPremium: false,
      requiresPayment: false,
    })
  }

  tests.push({
    id: `mock-1-5`,
    title: `Personalized Mock Test`,
    cycle: 1,
    isLocked: true,
    unlockDate: null,
    isDynamic: true,
    isCompleted: false,
    isPremium: false,
    requiresPayment: false,
  })

  // Cycle 2
  for (let i = 1; i <= 4; i++) {
    tests.push({
      id: `mock-2-${i}`,
      title: `Mock Test ${i + 4}`,
      cycle: 2,
      isLocked: !unlockedCycles.includes(2),
      unlockDate: null,
      isDynamic: false,
      isCompleted: false,
      isPremium: false,
      requiresPayment: true,
    })
  }

  tests.push({
    id: `mock-2-5`,
    title: `Personalized Mock Test`,
    cycle: 2,
    isLocked: !unlockedCycles.includes(2),
    unlockDate: null,
    isDynamic: true,
    isCompleted: false,
    isPremium: false,
    requiresPayment: true,
  })

  // Cycle 3
  for (let i = 1; i <= 4; i++) {
    tests.push({
      id: `mock-3-${i}`,
      title: `Mock Test ${i + 8}`,
      cycle: 3,
      isLocked: !unlockedCycles.includes(3),
      unlockDate: null,
      isDynamic: false,
      isCompleted: false,
      isPremium: false,
      requiresPayment: true,
    })
  }

  tests.push({
    id: `mock-3-5`,
    title: `Personalized Mock Test`,
    cycle: 3,
    isLocked: !unlockedCycles.includes(3),
    unlockDate: null,
    isDynamic: true,
    isCompleted: false,
    isPremium: false,
    requiresPayment: true,
  })

  // Cycle 4
  for (let i = 1; i <= 4; i++) {
    tests.push({
      id: `mock-4-${i}`,
      title: `Mock Test ${i + 12}`,
      cycle: 4,
      isLocked: !unlockedCycles.includes(4),
      unlockDate: null,
      isDynamic: false,
      isCompleted: false,
      isPremium: false,
      requiresPayment: true,
    })
  }

  tests.push({
    id: `mock-4-5`,
    title: `Personalized Mock Test`,
    cycle: 4,
    isLocked: !unlockedCycles.includes(4),
    unlockDate: null,
    isDynamic: true,
    isCompleted: false,
    isPremium: false,
    requiresPayment: true,
  })

  return tests
}

/**
 * Checks if a user can start a dynamic test in a given cycle
 * @param cycle Cycle number
 * @param mockTests Array of mock tests
 * @param completedTests Array of completed test IDs
 * @returns Boolean indicating if user can start dynamic test
 */
export const canStartDynamicTest = (
  cycle: number,
  mockTests: MockTest[],
  completedTests: string[]
): boolean => {
  // Get all regular tests for this cycle (non-dynamic)
  const regularTests = mockTests.filter(
    (test) => test.cycle === cycle && !test.isDynamic
  )

  // Check if all regular tests in this cycle are completed
  return regularTests.every((test) => completedTests.includes(test.id))
}

/**
 * Checks if a dynamic test should be marked as completed
 * @param cycle Cycle number
 * @param completedTests Array of completed test session IDs
 * @returns Boolean indicating if the dynamic test is completed
 */
export const isDynamicTestCompleted = (
  cycle: number,
  completedTests: string[]
): boolean => {
  // Check if any completed test matches a dynamic test session pattern
  return completedTests.some((sessionId) => {
    // Look for pattern: 'mock-{cycle}-5-{timestamp}' or if the source_session_id was 'mock-{cycle}-5'
    return (
      sessionId.startsWith(`mock-${cycle}-5-`) ||
      sessionId === `mock-${cycle}-5`
    )
  })
}

/**
 * Updates the mock tests with completion status and dynamic test availability
 * @param mockTests Array of mock tests
 * @param completedTests Array of completed test IDs
 * @returns Updated array of mock tests
 */
export const updateMockTestStatus = (
  mockTests: MockTest[],
  completedTests: string[]
): MockTest[] => {
  return mockTests.map((test) => {
    // Mark tests as completed if they're in completedTests
    const isCompleted = completedTests.includes(test.id)

    // Special handling for dynamic tests
    if (test.isDynamic) {
      // Check if this dynamic test is completed
      const dynamicTestCompleted = isDynamicTestCompleted(
        test.cycle,
        completedTests
      )

      // Check if all regular tests in this cycle are completed
      const canStart = canStartDynamicTest(
        test.cycle,
        mockTests,
        completedTests
      )

      return {
        ...test,
        isCompleted: dynamicTestCompleted,
        isLocked: !canStart && !test.requiresPayment, // Only lock based on completion status if it's not a premium test
      }
    }

    return {
      ...test,
      isCompleted,
    }
  })
}

/**
 * Store unlocked cycles in localStorage
 * @param userId User ID
 * @param unlockedCycles Array of unlocked cycle numbers
 */
export const storeUnlockedCycles = (
  userId: string,
  unlockedCycles: number[]
): void => {
  if (!userId) return
  try {
    localStorage.setItem(
      `unlockedCycles_${userId}`,
      JSON.stringify(unlockedCycles)
    )
  } catch (error) {
    console.error('Error storing unlocked cycles:', error)
  }
}

/**
 * Load unlocked cycles from localStorage
 * @param userId User ID
 * @returns Array of unlocked cycle numbers
 */
export const loadUnlockedCycles = (userId: string): number[] => {
  if (!userId) return [1]
  try {
    const storedUnlockedCycles = localStorage.getItem(
      `unlockedCycles_${userId}`
    )
    if (storedUnlockedCycles) {
      return JSON.parse(storedUnlockedCycles)
    }
  } catch (error) {
    console.error('Error loading unlocked cycles:', error)
  }
  return [1] // Default to cycle 1 unlocked
}
