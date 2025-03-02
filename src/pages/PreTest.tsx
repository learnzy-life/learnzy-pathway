
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import Header from '../components/Header';
import MoodSelector from '../components/MoodSelector';
import PreRitualCard from '../components/PreRitualCard';

type Mood = 'great' | 'good' | 'okay' | 'stressed' | 'anxious';
type PreRitual = 'breathing' | 'meditation' | 'affirmation' | 'none';
type Subject = 'biology' | 'physics' | 'chemistry';

const getSubjectTitle = (subject: Subject): string => {
  switch (subject) {
    case 'biology': return 'Biology';
    case 'physics': return 'Physics';
    case 'chemistry': return 'Chemistry';
    default: return '';
  }
};

const PreTest: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>();
  const navigate = useNavigate();
  const [mood, setMood] = useState<Mood | undefined>(undefined);
  const [ritual, setRitual] = useState<PreRitual | undefined>(undefined);
  const [ritualCompleted, setRitualCompleted] = useState(false);
  
  if (!subject) {
    return <div>Invalid subject</div>;
  }

  const subjectTitle = getSubjectTitle(subject as Subject);
  
  const rituals = [
    {
      id: 'breathing',
      title: 'Deep Breathing Exercise',
      description: 'A simple breathing technique to reduce stress and increase focus.',
      icon: '🌬️',
      duration: '2 mins'
    },
    {
      id: 'meditation',
      title: 'Quick Mindfulness Meditation',
      description: 'A short guided meditation to center your thoughts and calm your mind.',
      icon: '🧘',
      duration: '3 mins'
    },
    {
      id: 'affirmation',
      title: 'Positive Affirmations',
      description: 'Repeat confidence-building statements to boost your mindset.',
      icon: '💭',
      duration: '1 min'
    },
    {
      id: 'none',
      title: 'Skip Pre-Test Ritual',
      description: 'Proceed directly to the test without any preparation activity.',
      icon: '⏭️',
      duration: '0 mins'
    }
  ];

  const handleRitualSelect = (selectedRitual: PreRitual) => {
    setRitual(selectedRitual);
    
    if (selectedRitual === 'none') {
      setRitualCompleted(true);
      toast({
        title: "Ready to begin!",
        description: "You've chosen to skip the pre-test ritual.",
      });
    } else {
      // Simulate ritual completion after a short delay
      if (selectedRitual === 'breathing') {
        toast({
          title: "Breathing Exercise Selected",
          description: "Take deep breaths for 2 minutes to calm your mind.",
        });
        // In a real app, you would have actual breathing exercise UI here
      } else if (selectedRitual === 'meditation') {
        toast({
          title: "Meditation Selected",
          description: "Find a comfortable position and clear your mind for 3 minutes.",
        });
        // In a real app, you would have actual meditation UI here
      } else if (selectedRitual === 'affirmation') {
        toast({
          title: "Positive Affirmations Selected",
          description: "Repeat confidence-building statements to boost your mindset.",
        });
        // In a real app, you would have actual affirmation UI here
      }
      
      // For demo, we'll just set completed after 1.5 seconds
      setTimeout(() => {
        setRitualCompleted(true);
        toast({
          title: "Ritual Complete",
          description: "You're now prepared for your test. Good luck!",
        });
      }, 1500);
    }
  };

  const handleStartTest = () => {
    if (!mood) {
      toast({
        title: "Mood Required",
        description: "Please select your current mood",
        variant: "destructive",
      });
      return;
    }
    
    if (!ritual) {
      toast({
        title: "Ritual Selection Required",
        description: "Please select a pre-test ritual or choose to skip",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd save this info to your backend
    console.log('Starting test with:', { subject, mood, ritual });
    navigate(`/test/${subject}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-3xl mx-auto">
          <Link to="/subjects" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Prepare for Your {subjectTitle} Test
            </h1>
            <p className="text-muted-foreground">
              Take a moment to check in with yourself and prepare your mind for optimal performance.
            </p>
          </div>
          
          <div className="card-glass p-8 mb-10 animate-fade-in">
            <MoodSelector onSelect={setMood} selectedMood={mood} />
          </div>
          
          <div className="card-glass p-8 animate-fade-in">
            <h2 className="text-xl font-medium text-learnzy-dark mb-6 text-center">
              Choose a Pre-Test Ritual
            </h2>
            
            <div className="space-y-4 mb-8">
              {rituals.map((item) => (
                <PreRitualCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  duration={item.duration}
                  onClick={() => handleRitualSelect(item.id as PreRitual)}
                  selected={ritual === item.id}
                />
              ))}
            </div>
            
            {ritual && ritualCompleted && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-learnzy-dark mb-1">You're Ready!</h3>
                  <p className="text-sm text-muted-foreground">
                    {ritual === 'none' 
                      ? "You've chosen to proceed directly to the test. Good luck!"
                      : "You've completed your pre-test ritual and are now prepared for optimal performance."}
                  </p>
                </div>
              </div>
            )}
            
            <div className="bg-learnzy-purple/5 border border-learnzy-purple/20 rounded-xl p-4 mb-8 flex items-start">
              <AlertCircle className="w-5 h-5 text-learnzy-purple flex-shrink-0 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-learnzy-dark mb-1">Important Information</h3>
                <p className="text-sm text-muted-foreground">
                  This test contains 180 questions and has a time limit of 180 minutes. Once started, the timer cannot be paused. Ensure you have a stable internet connection and a distraction-free environment.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleStartTest}
              className={`button-primary w-full flex justify-center items-center ${ritual && ritualCompleted ? 'animate-pulse' : ''}`}
            >
              Start {subjectTitle} Test <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PreTest;
