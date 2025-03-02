
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface RitualActivityProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  onComplete: () => void;
}

const RitualActivity: React.FC<RitualActivityProps> = ({ ritual, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(getRitualDuration(ritual));
  const [isActive, setIsActive] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [audioError, setAudioError] = useState<boolean>(false);
  
  useEffect(() => {
    // Start automatically after a short delay
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [ritual]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // For breathing exercise, change instructions every few seconds
          if (ritual === 'breathing') {
            if (newTime % 4 === 0) {
              setStep(prevStep => (prevStep % 3) + 1);
            }
          }
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, ritual]);
  
  const handleComplete = () => {
    toast({
      title: "Ritual Complete",
      description: "You're now prepared for your test. Good luck!",
    });
    onComplete();
  };
  
  const toggleActivity = () => {
    setIsActive(!isActive);
  };
  
  const resetActivity = () => {
    setTimeLeft(getRitualDuration(ritual));
    setIsActive(false);
    setStep(1);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  function getRitualDuration(ritual: string): number {
    switch (ritual) {
      case 'breathing': return 120; // 2 minutes
      case 'meditation': return 180; // 3 minutes
      case 'affirmation': return 60; // 1 minute
      default: return 60;
    }
  }
  
  const renderBreathingExercise = () => {
    const instructions = [
      "Breathe in slowly through your nose...",
      "Hold your breath...",
      "Exhale slowly through your mouth..."
    ];
    
    return (
      <div className="text-center">
        <div className="text-4xl font-light mb-8">{instructions[step - 1]}</div>
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div 
            className={`absolute inset-0 bg-learnzy-purple/20 rounded-full 
              ${step === 1 ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}
              ${step === 2 ? 'bg-learnzy-purple/40' : ''}
              ${step === 3 ? 'animate-[pulse_4s_ease-out_infinite]' : ''}`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xl font-medium">
            {step === 1 ? "Inhale" : step === 2 ? "Hold" : "Exhale"}
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Focus on your breath and clear your mind. This exercise will help reduce anxiety and improve concentration.
        </p>
        
        {/* Text-to-speech instructions for breathing */}
        {isActive && (
          <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
            <p className="text-sm text-center">
              {step === 1 ? "Inhale deeply for 4 seconds" : 
               step === 2 ? "Hold your breath for 4 seconds" : 
                           "Exhale slowly for 4 seconds"}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  const renderMeditation = () => {
    return (
      <div className="text-center">
        <div className="text-3xl font-light mb-8">Find a comfortable position and clear your mind</div>
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-learnzy-purple/20 rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">🧘</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Focus on the present moment. Notice your thoughts without judgment, then let them pass by.
        </p>
        
        {audioError ? (
          <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4">
            <p className="text-sm">
              Audio playback is not supported in your browser. Please continue with visual guidance.
            </p>
          </div>
        ) : (
          <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
            <p className="text-sm text-center">
              Guided meditation: Close your eyes. Take deep breaths. Focus on your breath.
              {isActive && timeLeft % 15 === 0 && " Feel the tension leaving your body."}
              {isActive && timeLeft % 30 === 0 && " You are calm and focused."}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  const renderAffirmation = () => {
    const affirmations = [
      "I am well-prepared and confident in my abilities.",
      "I can solve any problem that comes my way.",
      "My mind is clear, focused, and ready.",
      "I trust my knowledge and intelligence.",
      "I will perform at my best today."
    ];
    
    // Select affirmation based on time
    const currentAffirmation = affirmations[Math.floor((timeLeft / 12) % affirmations.length)];
    
    return (
      <div className="text-center">
        <div className="text-3xl font-light mb-8">Repeat these affirmations</div>
        <div className="bg-white/80 rounded-xl p-6 shadow-md mb-8 animate-pulse">
          <p className="text-2xl font-medium text-learnzy-dark">
            {currentAffirmation}
          </p>
        </div>
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-learnzy-purple/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">💭</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Say each affirmation out loud or in your mind. Feel the confidence building with each statement.
        </p>
        
        {audioError ? (
          <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4">
            <p className="text-sm">
              Audio playback is not supported in your browser. Please repeat the affirmations yourself.
            </p>
          </div>
        ) : (
          <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
            <p className="text-sm text-center">
              Speak this affirmation out loud: "{currentAffirmation}"
            </p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="card-glass p-8 animate-fade-in">
      <h2 className="text-xl font-medium text-learnzy-dark mb-6 text-center">
        {ritual === 'breathing' ? 'Deep Breathing Exercise' : 
         ritual === 'meditation' ? 'Quick Mindfulness Meditation' : 
         'Positive Affirmations'}
      </h2>
      
      <div className="mb-8">
        {ritual === 'breathing' && renderBreathingExercise()}
        {ritual === 'meditation' && renderMeditation()}
        {ritual === 'affirmation' && renderAffirmation()}
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-medium">{formatTime(timeLeft)}</div>
        <div className="flex gap-2">
          <button 
            onClick={toggleActivity}
            className="p-2 rounded-full bg-learnzy-purple/10 hover:bg-learnzy-purple/20 transition-colors"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button 
            onClick={resetActivity}
            className="p-2 rounded-full bg-learnzy-purple/10 hover:bg-learnzy-purple/20 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-learnzy-purple h-2.5 rounded-full transition-all duration-1000" 
          style={{ width: `${(timeLeft / getRitualDuration(ritual)) * 100}%` }}
        ></div>
      </div>
      
      <button 
        onClick={handleComplete}
        className="button-secondary w-full flex justify-center items-center"
      >
        Skip to Test <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );
};

export default RitualActivity;
