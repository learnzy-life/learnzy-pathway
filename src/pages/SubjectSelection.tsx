
import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import SubjectsList from '../components/subjects/SubjectsList';
import MockTestCycles from '../components/mock-tests/MockTestCycles';
import PaymentDialog from '../components/mock-tests/PaymentDialog';
import { useMockTests } from '../hooks/useMockTests';

const SubjectSelection: React.FC = () => {
  const { user } = useAuth();
  const { 
    mockTests, 
    isLoading, 
    showPaymentDialog, 
    setShowPaymentDialog, 
    selectedTest, 
    unlockedCycles, 
    handleMockTestClick, 
    handlePaymentComplete, 
    handleUnlockCycleClick 
  } = useMockTests(user?.id);

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
          
          <SubjectsList subjects={subjects} />

          <MockTestCycles 
            mockTests={mockTests}
            isLoading={isLoading}
            unlockedCycles={unlockedCycles}
            onMockTestClick={handleMockTestClick}
            onUnlockCycleClick={handleUnlockCycleClick}
          />
        </section>
      </main>

      <PaymentDialog 
        open={showPaymentDialog} 
        onOpenChange={setShowPaymentDialog}
        selectedTest={selectedTest}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default SubjectSelection;
