
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Mic, MicOff } from 'lucide-react';
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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [affirmationSpoken, setAffirmationSpoken] = useState<boolean>(false);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState<number>(0);
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Start automatically after a short delay
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [ritual]);
  
  // Speech recognition setup for affirmations
  useEffect(() => {
    if (ritual === 'affirmation') {
      // Check if browser supports speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          const currentAffirmation = getAffirmations()[currentAffirmationIndex].toLowerCase();
          
          // Check if the spoken text contains key parts of the affirmation
          const affirmationWords = currentAffirmation.split(' ').filter(word => word.length > 3);
          const matchedWords = affirmationWords.filter(word => transcript.includes(word));
          
          // If at least 50% of key words match, consider it spoken correctly
          if (matchedWords.length >= Math.ceil(affirmationWords.length * 0.4)) {
            setAffirmationSpoken(true);
            toast({
              title: "Affirmation spoken!",
              description: "Well done! Keep going with the next one.",
            });
            
            // Move to next affirmation
            setCurrentAffirmationIndex(prevIndex => 
              (prevIndex + 1) % getAffirmations().length
            );
          } else {
            toast({
              title: "Try again",
              description: "Please speak the affirmation as shown on screen.",
              variant: "destructive"
            });
          }
          
          setIsSpeaking(false);
        };
        
        recognitionRef.current.onerror = () => {
          setIsSpeaking(false);
        };
        
        return () => {
          if (recognitionRef.current) {
            recognitionRef.current.abort();
          }
        };
      } else {
        // Speech recognition not supported
        setAudioError(true);
      }
    }
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
    setAffirmationSpoken(false);
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
  
  const getAffirmations = () => {
    return [
      "I am well-prepared and confident in my abilities.",
      "I can solve any problem that comes my way.",
      "My mind is clear, focused, and ready.",
      "I trust my knowledge and intelligence.",
      "I will perform at my best today."
    ];
  };
  
  const startSpeechRecognition = () => {
    if (recognitionRef.current && !isSpeaking) {
      try {
        recognitionRef.current.start();
        setIsSpeaking(true);
      } catch (error) {
        console.error("Speech recognition error:", error);
        setIsSpeaking(false);
      }
    }
  };
  
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
    const affirmations = getAffirmations();
    
    // Select affirmation based on current index
    const currentAffirmation = affirmations[currentAffirmationIndex];
    
    return (
      <div className="text-center">
        <div className="text-3xl font-light mb-8">Speak these affirmations out loud</div>
        <div className={`bg-white/80 rounded-xl p-6 shadow-md mb-8 ${affirmationSpoken ? 'bg-green-100' : 'animate-pulse'}`}>
          <p className="text-2xl font-medium text-learnzy-dark">
            {currentAffirmation}
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={startSpeechRecognition}
            className={`flex items-center gap-2 px-4 py-2 rounded-full 
              ${isSpeaking ? 'bg-red-500 text-white' : 'bg-learnzy-purple text-white'} 
              transition-colors`}
            disabled={!isActive}
          >
            {isSpeaking ? (
              <>
                <MicOff className="w-5 h-5" /> Stop Speaking
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" /> Speak Now
              </>
            )}
          </button>
        </div>
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-learnzy-purple/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">💭</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Say each affirmation out loud. Speaking them helps reinforce positive thoughts and build confidence.
        </p>
        
        {audioError ? (
          <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4">
            <p className="text-sm">
              Speech recognition is not supported in your browser. Please say the affirmations out loud on your own.
            </p>
          </div>
        ) : (
          <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
            <p className="text-sm text-center">
              <strong>Instructions:</strong> Press the "Speak Now" button and say the affirmation displayed above.
              {affirmationSpoken ? " Great job! Try the next one." : " Your voice will be recorded to check if you've spoken the affirmation."}
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
