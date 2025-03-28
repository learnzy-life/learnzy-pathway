
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SubjectCard from '../components/SubjectCard';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getCyclesData } from '../components/landing/cycles/cyclesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MockTest {
  id: string;
  title: string;
  cycle: number;
  isLocked: boolean;
  unlockDate: string | null;
  isDynamic: boolean;
  isCompleted: boolean;
}

const SubjectSelection: React.FC = () => {
  const { user } = useAuth();
  const cycles = getCyclesData();
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

    const initializeMockTests = () => {
      // Create mock test data structure with 5 tests per cycle (4 regular + 1 dynamic)
      const tests: MockTest[] = [];
      
      // Cycle 1 - All unlocked by default
      for (let i = 1; i <= 4; i++) {
        tests.push({
          id: `mock-1-${i}`,
          title: `Mock Test ${i}`,
          cycle: 1,
          isLocked: false,
          unlockDate: null,
          isDynamic: false,
          isCompleted: false
        });
      }
      
      // Add dynamic test for cycle 1
      tests.push({
        id: `mock-1-5`,
        title: `AI-Powered Review Test`,
        cycle: 1,
        isLocked: true, // Locked until previous tests are completed
        unlockDate: null,
        isDynamic: true,
        isCompleted: false
      });
      
      // Cycle 2 - Locked with future dates
      const cycle2StartDate = new Date('2025-04-05');
      for (let i = 1; i <= 4; i++) {
        tests.push({
          id: `mock-2-${i}`,
          title: `Mock Test ${i + 4}`,
          cycle: 2,
          isLocked: true,
          unlockDate: new Date(cycle2StartDate.getTime() + (i - 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
          isDynamic: false,
          isCompleted: false
        });
      }
      
      // Add dynamic test for cycle 2
      tests.push({
        id: `mock-2-5`,
        title: `AI-Powered Review Test`,
        cycle: 2,
        isLocked: true,
        unlockDate: null,
        isDynamic: true,
        isCompleted: false
      });
      
      // Cycle 3 - Locked with future dates
      const cycle3StartDate = new Date('2025-04-15');
      for (let i = 1; i <= 4; i++) {
        tests.push({
          id: `mock-3-${i}`,
          title: `Mock Test ${i + 8}`,
          cycle: 3,
          isLocked: true,
          unlockDate: new Date(cycle3StartDate.getTime() + (i - 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
          isDynamic: false,
          isCompleted: false
        });
      }
      
      // Add dynamic test for cycle 3
      tests.push({
        id: `mock-3-5`,
        title: `AI-Powered Review Test`,
        cycle: 3,
        isLocked: true,
        unlockDate: null,
        isDynamic: true,
        isCompleted: false
      });
      
      // Cycle 4 - Locked with future dates
      const cycle4StartDate = new Date('2025-04-25');
      for (let i = 1; i <= 4; i++) {
        tests.push({
          id: `mock-4-${i}`,
          title: `Mock Test ${i + 12}`,
          cycle: 4,
          isLocked: true,
          unlockDate: new Date(cycle4StartDate.getTime() + (i - 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
          isDynamic: false,
          isCompleted: false
        });
      }
      
      // Add dynamic test for cycle 4
      tests.push({
        id: `mock-4-5`,
        title: `AI-Powered Review Test`,
        cycle: 4,
        isLocked: true,
        unlockDate: null,
        isDynamic: true,
        isCompleted: false
      });
      
      setMockTests(tests);
      setIsLoading(false);
    };

    fetchCompletedTests();
    initializeMockTests();
  }, [user]);

  const canStartDynamicTest = (cycle: number) => {
    // Check if all 4 regular tests in this cycle are completed
    const cycleTests = mockTests.filter(test => test.cycle === cycle && !test.isDynamic);
    return cycleTests.every(test => test.isCompleted);
  };

  const handleMockTestClick = (test: MockTest) => {
    if (test.isLocked) return;
    
    if (test.isDynamic) {
      // Check if user has completed all previous tests in this cycle
      if (!canStartDynamicTest(test.cycle)) {
        toast.error("Complete all tests in this cycle to unlock the AI-powered test.");
        return;
      }
      
      // Navigate to dynamic test preparation
      window.location.href = `/pre-dynamic-test/${test.cycle}`;
    } else {
      // Navigate to regular mock test
      window.location.href = `/pre-mock-test/${test.cycle}/${test.id.split('-').pop()}`;
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
                              test.isDynamic 
                                ? 'border-learnzy-amber' 
                                : 'border-gray-100'
                            } ${
                              !test.isLocked 
                                ? 'hover:border-learnzy-amber/60 cursor-pointer' 
                                : 'opacity-60 cursor-not-allowed'
                            } transition-all duration-200 relative`}
                          >
                            {test.isDynamic && (
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
                                  {test.isDynamic 
                                    ? "Complete previous tests to unlock"
                                    : "🔒 Locked"}
                                </span>
                              </p>
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
    </div>
  );
};

export default SubjectSelection;
