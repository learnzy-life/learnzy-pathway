
import { useState } from 'react';
import { toast } from 'sonner';
import { MockTest } from '../../types/mock-test';
import { processPaymentForCycle } from '../../utils/razorpayPayment';

/**
 * Hook to handle payment-related functionality
 * @param userId User ID
 * @param unlockedCycles Current unlocked cycles
 * @param updateUnlockedCycles Function to update unlocked cycles
 * @param mockTests Array of mock tests
 * @param setMockTests Function to update mock tests
 * @returns Payment-related state and functions
 */
export const usePayment = (
  userId: string | undefined,
  unlockedCycles: number[],
  updateUnlockedCycles: (cycles: number[]) => void,
  mockTests: MockTest[],
  setMockTests: React.Dispatch<React.SetStateAction<MockTest[]>>
) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);

  const handleShowPayment = (test: MockTest) => {
    setSelectedTest(test);
    setShowPaymentDialog(true);
  };

  const handleUnlockCycleClick = (cycleNumber: number) => {
    const dummyTest = {
      id: `cycle-${cycleNumber}`,
      title: `Cycle ${cycleNumber}`,
      cycle: cycleNumber,
      isLocked: true,
      unlockDate: null,
      isDynamic: false,
      isCompleted: false,
      isPremium: false,
      requiresPayment: true
    };
    setSelectedTest(dummyTest);
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = async (test: MockTest) => {
    if (!userId) {
      toast.error("You need to be logged in to make a payment");
      return;
    }
    
    try {
      // Use the user's email if available
      const userEmail = "user@example.com"; // In a real app, get this from your auth context
      
      // Process payment using Razorpay
      if (test.cycle > 1) {
        const newUnlockedCycles = [...unlockedCycles, test.cycle];
        updateUnlockedCycles(newUnlockedCycles);
        
        // Update the locked status of all tests in this cycle
        setMockTests(prev => prev.map(t => {
          if (t.cycle === test.cycle) {
            return {
              ...t,
              isLocked: false
            };
          }
          return t;
        }));
        
        toast.success(`Cycle ${test.cycle} has been unlocked! You now have access to all tests in this cycle.`);
        setShowPaymentDialog(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment processing");
    }
  };

  return {
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    handleShowPayment,
    handleUnlockCycleClick,
    handlePaymentComplete
  };
};
