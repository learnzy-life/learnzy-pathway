
import { MockTest } from '../../types/mock-test';

export interface UseMockTestsReturn {
  mockTests: MockTest[];
  isLoading: boolean;
  showPaymentDialog: boolean;
  setShowPaymentDialog: (show: boolean) => void;
  selectedTest: MockTest | null;
  unlockedCycles: number[];
  handleMockTestClick: (test: MockTest) => void;
  handlePaymentComplete: (test: MockTest) => Promise<void>;
  handleUnlockCycleClick: (cycleNumber: number) => void;
}

export interface MockTestsState {
  mockTests: MockTest[];
  completedTests: string[];
  isLoading: boolean;
  showPaymentDialog: boolean;
  selectedTest: MockTest | null;
  unlockedCycles: number[];
}
