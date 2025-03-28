import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SubjectCard from '../components/SubjectCard';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getCyclesData } from '../components/landing/cycles/cyclesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { processPaymentForCycle } from '../utils/razorpayPayment';

interface MockTest {
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

const SubjectSelection: React.FC = () => {
  const { user } = useAuth();
  const cycles = getCyclesData();
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
  const [unlockedCycles, setUnlockedCycles] = useState<number[]>([1]);

  const subjects = [
    {
      id: 'biology',
      title: 'Biology',
      description: 'Test your knowledge in cell biology, genetics, human physiology, ecology, and evolution.',
      icon: '🧬',
      color: 'bg-learnzy-amber',
      attempted: false,
      locked: false
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Assess your understanding of mechanics, thermodynamics, electromagnetism, and modern physics.',
      icon: '⚛️',
      color: 'bg-learnzy-amber/80',
      attempted: false,
      locked: false
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Evaluate your mastery in organic chemistry, inorganic chemistry, physical chemistry, and biochemistry.',
      icon: '⚗️',
      color: 'bg-learnzy-amber/90',
      attempted: false,
      locked: false
    }
  ];

  useEffect(() => {
    const fetchCompletedTests = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('test_sessions')
            .select('id')
            .eq('user_id', user.id)
            .not('end_time', 'is', null);
          
          if (error) throw error;
          setCompletedTests(data.map(session => session.id));
        } catch (error) {
          console.error('Error fetching completed tests:', error);
        }
      }
    };

    const fetchUnlockedCycles = async () => {
      if (user) {
        try {
          const storedUnlockedCycles = localStorage.getItem('unlockedCycles');
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
        id: `mock-1-6`,
        title: `Premium Mock Test`,
        cycle: 1,
        isLocked: false,
        unlockDate: null,
        isDynamic: false,
        isCompleted: false,
        isPremium: true,
        requiresPayment: true
      });
      
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
  }, [user, unlockedCycles]);

  const canStartDynamicTest = (cycle: number) => {
    const cycleTests = mockTests.filter(test => test.cycle === cycle && !test.isDynamic);
    const cycleCompletedTestIds = completedTests.filter(id => id.startsWith(`mock-${cycle}-`) && !id.endsWith('-5'));
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
    
    if (test.isPremium && !isCompleted) {
      setSelectedTest(test);
      setShowPaymentDialog(true);
      return;
    }
    
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
    if (!user) {
      toast.error("You need to be logged in to make a payment");
      return;
    }
    
    try {
      const result = await processPaymentForCycle(
        test.cycle,
        user.email
      );
      
      if (result.success) {
        if (test.cycle > 1) {
          const newUnlockedCycles = [...unlockedCycles, test.cycle];
          setUnlockedCycles(newUnlockedCycles);
          localStorage.setItem('unlockedCycles', JSON.stringify(newUnlockedCycles));
          
          setMockTests(prev => prev.map(t => ({
            ...t,
            isLocked: t.cycle === test.cycle ? false : t.isLocked
          })));
          
          toast.success(`Cycle ${test.cycle} has been unlocked!`);
        } else if (test.isPremium) {
          const testNumber = test.id.split('-').pop() || '1';
          window.location.href = `/pre-mock-test/${test.cycle}/${testNumber}`;
        }
        
        setShowPaymentDialog(false);
      } else {
        toast.error(result.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment processing");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Select a Subject for Your Diagnostic Test
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a subject to begin your diagnostic journey. Each test contains 180 questions and takes approximately 180 minutes to complete.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject.id as 'biology' | 'physics' | 'chemistry'}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                color={subject.color}
                attempted={subject.attempted}
                locked={subject.locked}
              />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Mock Test Cycles
            </h2>
            
            <Tabs defaultValue="cycle-1" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 w-full md:w-3/4 mx-auto">
                {cycles.map((cycle) => (
                  <TabsTrigger key={cycle.number} value={`cycle-${cycle.number}`} className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-learnzy-amber/20 mr-2">
                      {cycle.icon}
                    </span>
                    <span className="hidden md:inline">Cycle {cycle.number}</span>
                    <span className="md:hidden">C{cycle.number}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {cycles.map((cycle) => (
                <TabsContent key={cycle.number} value={`cycle-${cycle.number}`} className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-learnzy-amber/10 mb-6">
                    <h3 className="font-semibold text-lg text-learnzy-dark mb-1">Cycle {cycle.number}: {cycle.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cycle.focus}</p>
                    <p className="text-xs text-muted-foreground">{cycle.info}</p>
                    
                    {cycle.number > 1 && !unlockedCycles.includes(cycle.number) && (
                      <div className="mt-3 pt-3 border-t border-dashed border-amber-200">
                        <Button 
                          onClick={() => {
                            const dummyTest = {
                              id: `cycle-${cycle.number}`,
                              title: `Cycle ${cycle.number}`,
                              cycle: cycle.number,
                              isLocked: true,
                              unlockDate: null,
                              isDynamic: false,
                              isCompleted: false,
                              isPremium: false,
                              requiresPayment: true
                            };
                            setSelectedTest(dummyTest);
                            setShowPaymentDialog(true);
                          }}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          Unlock Cycle {cycle.number} (₹499)
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-learnzy-amber" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {mockTests
                        .filter(test => test.cycle === cycle.number)
                        .map((test) => (
                          <div
                            key={test.id}
                            onClick={() => handleMockTestClick(test)}
                            className={`bg-white rounded-lg p-4 border ${
                              test.isPremium 
                                ? 'border-amber-400' 
                                : test.isDynamic 
                                  ? 'border-learnzy-amber' 
                                  : 'border-gray-100'
                            } ${
                              !test.isLocked 
                                ? 'hover:border-learnzy-amber/60 cursor-pointer' 
                                : 'opacity-60 cursor-not-allowed'
                            } transition-all duration-200 relative`}
                          >
                            {test.isPremium && (
                              <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Lock className="w-3 h-3 mr-1" />Premium
                              </span>
                            )}
                            {test.isDynamic && !test.isPremium && (
                              <span className="absolute -top-2 -right-2 bg-learnzy-amber text-white text-xs px-2 py-0.5 rounded-full">
                                AI
                              </span>
                            )}
                            <h3 className="font-medium text-learnzy-dark mb-2">{test.title}</h3>
                            {test.unlockDate ? (
                              <p className="text-sm text-amber-600">
                                Unlocks on {format(new Date(test.unlockDate), 'MMM dd, yyyy')}
                              </p>
                            ) : test.isLocked ? (
                              <p className="text-sm text-gray-500">
                                <span className="inline-flex items-center">
                                  {test.requiresPayment 
                                    ? "Unlock Cycle to Access" 
                                    : test.isDynamic 
                                      ? "Complete previous tests to unlock"
                                      : "🔒 Locked"}
                                </span>
                              </p>
                            ) : test.isPremium ? (
                              <p className="text-sm text-amber-600">Premium Content</p>
                            ) : (
                              <p className="text-sm text-learnzy-amber">Available Now</p>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedTest?.cycle > 1 && selectedTest?.requiresPayment 
                ? `Unlock Cycle ${selectedTest?.cycle}` 
                : 'Unlock Premium Mock Test'}
            </DialogTitle>
            <DialogDescription>
              {selectedTest?.cycle > 1 && selectedTest?.requiresPayment
                ? `Get access to all mock tests in Cycle ${selectedTest?.cycle}. This is a one-time payment.`
                : 'Get access to our premium mock test with exclusive questions and insights.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-amber-800 mb-2">
                {selectedTest?.cycle > 1 && selectedTest?.requiresPayment
                  ? `Cycle ${selectedTest?.cycle} Benefits:`
                  : 'Premium Mock Test Benefits:'}
              </h3>
              <ul className="list-disc pl-5 text-amber-700 space-y-1">
                {selectedTest?.cycle > 1 && selectedTest?.requiresPayment ? (
                  <>
                    <li>Access to all 4 mock tests in this cycle</li>
                    <li>Access to the AI-powered review test</li>
                    <li>Detailed analytics and insights</li>
                    <li>Personalized improvement recommendations</li>
                  </>
                ) : (
                  <>
                    <li>Advanced difficulty level questions</li>
                    <li>Detailed analytics on your performance</li>
                    <li>Compare your score with top performers</li>
                    <li>Extended explanation for each question</li>
                  </>
                )}
              </ul>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">₹499</p>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-white w-full"
                onClick={() => {
                  if (selectedTest) {
                    handlePaymentComplete(selectedTest);
                  }
                }}
              >
                Pay with Razorpay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectSelection;
