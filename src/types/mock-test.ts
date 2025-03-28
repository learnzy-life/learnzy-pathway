
export interface MockTest {
  id: string;
  title: string;
  cycle: number;
  isLocked: boolean;
  unlockDate: string | null;
  isDynamic: boolean;
  isCompleted: boolean;
  isPremium: boolean;
  requiresPayment: boolean;
}
