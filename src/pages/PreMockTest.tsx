
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { Book, AlertTriangle, Clock3 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const PreMockTest: React.FC = () => {
  const { cycle, testNumber } = useParams<{ cycle: string; testNumber: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStartTest = async () => {
    setIsLoading(true);
    
    try {
      if (!user) {
        toast.error("You need to be logged in to take this test");
        navigate('/auth');
        return;
      }
      
      // Navigate to the mock test page
      navigate(`/mock-test/${cycle}/${testNumber}`);
    } catch (error) {
      console.error('Error starting mock test:', error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };
  
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
              disabled={isLoading}
              className="button-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                  <span>Loading...</span>
                </>
              ) : (
                'Start Mock Test'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreMockTest;
