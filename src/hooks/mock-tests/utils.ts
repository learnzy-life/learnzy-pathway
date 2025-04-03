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
    title: `AI-Powered Review Test`,
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
    title: `AI-Powered Review Test`,
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
    title: `AI-Powered Review Test`,
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
    title: `AI-Powered Review Test`,
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
  const cycleTests = mockTests.filter(
    (test) => test.cycle === cycle && !test.isDynamic
  )
  return cycleTests.every((test) => completedTests.includes(test.id))
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
