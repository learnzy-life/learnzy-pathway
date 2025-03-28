
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { Loader2, Brain, Book } from 'lucide-react';
import { toast } from 'sonner';

const PreDynamicTest: React.FC = () => {
  const { cycle } = useParams<{ cycle: string }>();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(10);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    // Increment progress for visual feedback
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 5;
      });
    }, 1000);
    
    const generateDynamicTest = async () => {
      try {
        // Get user ID
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("You need to be logged in to take this test");
          navigate('/auth');
          return;
        }
        
        // Get completed tests from this cycle to analyze weakness
        const { data: completedTests, error: testsError } = await supabase
          .from('test_sessions')
          .select('*')
          .eq('user_id', user.id)
          .containsAny('id', [`mock-${cycle}-1`, `mock-${cycle}-2`, `mock-${cycle}-3`, `mock-${cycle}-4`])
          .not('end_time', 'is', null);
          
        if (testsError) {
          console.error('Error fetching completed tests:', testsError);
          toast.error("Failed to generate your personalized test");
          navigate('/subjects');
          return;
        }
        
        // If not enough tests completed, redirect back
        if (!completedTests || completedTests.length < 4) {
          toast.error("You need to complete all 4 tests in this cycle first");
          navigate('/subjects');
          return;
        }
        
        // Analyze weakness areas (chapters with lowest scores)
        const weaknessMap = new Map<string, { total: number, correct: number }>();
        
        // Process each test's questions
        completedTests.forEach(test => {
          if (test.questions_data && Array.isArray(test.questions_data)) {
            test.questions_data.forEach(question => {
              const chapter = question.Chapter_name || question.chapter_name || 'Unknown';
              const isCorrect = question.isCorrect === true;
              
              if (!weaknessMap.has(chapter)) {
                weaknessMap.set(chapter, { total: 0, correct: 0 });
              }
              
              const chapterData = weaknessMap.get(chapter)!;
              chapterData.total += 1;
              if (isCorrect) chapterData.correct += 1;
              weaknessMap.set(chapter, chapterData);
            });
          }
        });
        
        // Calculate accuracy for each chapter
        const chapterAccuracy: { chapter: string, accuracy: number, subject: string }[] = [];
        for (const [chapter, data] of weaknessMap.entries()) {
          const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
          
          // Determine subject based on chapter name (this is a simplification)
          let subject = 'unknown';
          const chapterLower = chapter.toLowerCase();
          if (chapterLower.includes('physics') || 
              chapterLower.includes('mechanics') || 
              chapterLower.includes('electro') || 
              chapterLower.includes('optics')) {
            subject = 'physics';
          } else if (chapterLower.includes('chem') || 
                     chapterLower.includes('organic') || 
                     chapterLower.includes('inorganic') || 
                     chapterLower.includes('periodic')) {
            subject = 'chemistry';
          } else {
            subject = 'biology'; // Default to biology for other chapters
          }
          
          chapterAccuracy.push({ chapter, accuracy, subject });
        }
        
        // Sort by accuracy (lowest first)
        chapterAccuracy.sort((a, b) => a.accuracy - b.accuracy);
        
        // Create a session for the dynamic test
        const sessionData = {
          user_id: user.id,
          subject: 'mixed',
          start_time: new Date().toISOString(),
          end_time: null,
          score: null,
          total_questions: 180,
          id: `mock-${cycle}-5-${Date.now()}`, // Unique ID for the dynamic test
          questions_data: [], // Will be populated with questions
        };
        
        const { data: session, error: sessionError } = await supabase
          .from('test_sessions')
          .insert(sessionData)
          .select('id')
          .single();
          
        if (sessionError) {
          console.error('Error creating test session:', sessionError);
          toast.error("Failed to create your test session");
          navigate('/subjects');
          return;
        }
        
        setSessionId(session.id);
        setProgress(100);
        
        // Simulate test generation completion
        setTimeout(() => {
          setIsGenerating(false);
          navigate(`/mock-test/${session.id}`);
        }, 2000);
      } catch (error) {
        console.error('Error generating dynamic test:', error);
        toast.error("An unexpected error occurred");
        navigate('/subjects');
      }
    };
    
    generateDynamicTest();
    
    return () => clearInterval(progressInterval);
  }, [cycle, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-xl mx-auto mt-12 text-center">
          <div className="mb-8">
            <Brain className="w-16 h-16 text-learnzy-amber mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold mb-3">
              Cooking up your personalized test
            </h1>
            <p className="text-muted-foreground">
              We're analyzing your weak areas from previous tests and creating a personalized test just for you.
            </p>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
            <div 
              className="bg-learnzy-amber h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>
                {progress < 30 ? "Analyzing your test history..." : 
                 progress < 60 ? "Identifying areas for improvement..." : 
                 progress < 90 ? "Creating personalized questions..." :
                 "Finalizing your test..."}
              </span>
            </div>
          </div>
          
          <div className="mt-16 p-6 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex">
              <Book className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-amber-800 mb-2">About AI-Powered Tests</h3>
                <p className="text-amber-700 text-sm">
                  This specially crafted test focuses on your weak areas from the previous 4 tests in this cycle.
                  It contains 45 questions each from Physics and Chemistry, and 90 from Biology, just like your
                  regular tests, but targeted to help you improve where you need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreDynamicTest;
