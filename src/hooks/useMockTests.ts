
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { processPaymentForCycle } from '../utils/razorpayPayment';
import { MockTest } from '../types/mock-test';

export const useMockTests = (userId: string | undefined) => {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
  const [unlockedCycles, setUnlockedCycles] = useState<number[]>([1]);

  useEffect(() => {
    const fetchCompletedTests = async () => {
      if (userId) {
        try {
          const { data, error } = await supabase
            .from('test_sessions')
            .select('id')
            .eq('user_id', userId)
            .not('end_time', 'is', null);
          
          if (error) throw error;
          setCompletedTests(data.map(session => session.id));
        } catch (error) {
          console.error('Error fetching completed tests:', error);
        }
      }
    };

    const fetchUnlockedCycles = async () => {
      if (userId) {
        try {
          const storedUnlockedCycles = localStorage.getItem(`unlockedCycles_${userId}`);
          if (storedUnlockedCycles) {
            setUnlockedCycles(JSON.parse(storedUnlockedCycles));
          }
        } catch (error) {
          console.error('Error fetching unlocked cycles:', error);
        }
      }
    };

    const initializeMockTests = () => {
      const tests: MockTest[] = [];
      
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
          requiresPayment: false
        });
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
        requiresPayment: false
      });
      
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
          requiresPayment: true
        });
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
        requiresPayment: true
      });
      
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
          requiresPayment: true
        });
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
        requiresPayment: true
      });
      
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
          requiresPayment: true
        });
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
        requiresPayment: true
      });
      
      setMockTests(tests);
      setIsLoading(false);
    };

    fetchCompletedTests();
    fetchUnlockedCycles();
    initializeMockTests();
  }, [userId, unlockedCycles]);

  const canStartDynamicTest = (cycle: number) => {
    const cycleTests = mockTests.filter(test => test.cycle === cycle && !test.isDynamic);
    return cycleTests.every(test => completedTests.includes(test.id));
  };

  const handleMockTestClick = (test: MockTest) => {
    if (test.isLocked) {
      if (test.requiresPayment) {
        setSelectedTest(test);
        setShowPaymentDialog(true);
      } else {
        toast.error("This test is currently locked.");
      }
      return;
    }
    
    const isCompleted = completedTests.includes(test.id);
    test.isCompleted = isCompleted;
    
    if (test.isDynamic) {
      if (!canStartDynamicTest(test.cycle)) {
        toast.error("Complete all tests in this cycle to unlock the AI-powered test.");
        return;
      }
      
      window.location.href = `/pre-dynamic-test/${test.cycle}`;
    } else {
      const testNumber = test.id.split('-').pop() || '1';
      
      if (isCompleted) {
        window.location.href = `/results/mixed?sessionId=${test.id}`;
      } else {
        window.location.href = `/pre-mock-test/${test.cycle}/${testNumber}`;
      }
    }
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
        setUnlockedCycles(newUnlockedCycles);
        
        // Store in localStorage with user ID to prevent sharing between accounts
        localStorage.setItem(`unlockedCycles_${userId}`, JSON.stringify(newUnlockedCycles));
        
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

  return {
    mockTests,
    isLoading,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedTest,
    unlockedCycles,
    handleMockTestClick,
    handlePaymentComplete,
    handleUnlockCycleClick
  };
};
