
import { MockTest } from '../../types/mock-test'

export interface UseMockTestsReturn {
  mockTests: MockTest[]
  isLoading: boolean
  selectedTest: MockTest | null  // Adding this property
  unlockedCycles: number[]
  handleMockTestClick: (test: MockTest) => void
}

export interface MockTestsState {
  mockTests: MockTest[]
  completedTests: string[]
  isLoading: boolean
  showPaymentDialog: boolean
  selectedTest: MockTest | null
  unlockedCycles: number[]
}
