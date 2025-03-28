
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { Book, AlertTriangle, Clock3 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import PreTestContent from './PreTest/components/PreTestContent';

const PreMockTest: React.FC = () => {
  const { cycle, testNumber } = useParams<{ cycle: string; testNumber: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPreTest, setShowPreTest] = useState(false);
  
  // Get subject based on the mock test number
  const getMockSubject = () => {
    // For now, let's assume all mock tests are mixed subjects
    return 'mixed';
  };
  
  const handleStartTest = () => {
    setShowPreTest(true);
  };
  
  const handleStartMockTest = () => {
    navigate(`/mock-test/${cycle}/${testNumber}`);
  };

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please log in to take mock tests");
      navigate('/auth', { state: { from: `/pre-mock-test/${cycle}/${testNumber}` } });
    }
  }, [user, isLoading, navigate, cycle, testNumber]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading...</h2>
      </div>
    );
  }
  
  // Show pre-test ritual content if user clicked "Start Test"
  if (showPreTest) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-6 pt-24 pb-16">
          <section className="py-12 max-w-3xl mx-auto">
            <PreTestContent
              subject={getMockSubject()}
              subjectTitle={`Mock Test ${testNumber}`}
              onStartTest={handleStartMockTest}
            />
          </section>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl mx-auto mt-12">
          <div className="mb-8 text-center">
            <Book className="w-16 h-16 text-learnzy-amber mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold mb-3">
              Mock Test {testNumber}
            </h1>
            <p className="text-muted-foreground">
              You are about to start Cycle {cycle} - Mock Test {testNumber}. This test contains 180 questions and takes approximately 180 minutes to complete.
            </p>
          </div>
          
          <div className="card-glass p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Test Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <Clock3 className="w-5 h-5 text-learnzy-amber mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium">Time Limit</h3>
                  <p className="text-muted-foreground text-sm">180 minutes (3 hours)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Book className="w-5 h-5 text-learnzy-amber mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium">Questions</h3>
                  <p className="text-muted-foreground text-sm">180 multiple choice questions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-amber-800">Important Note</h3>
                  <p className="text-amber-700 text-sm">
                    Once you start the test, the timer will begin. You can't pause the test, but you can navigate between questions freely. Make sure you have a stable internet connection.
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleStartTest}
              className="button-primary w-full flex items-center justify-center"
            >
              Start Mock Test
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreMockTest;
