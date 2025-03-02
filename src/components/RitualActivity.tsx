
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import BreathingExercise from './rituals/BreathingExercise';
import Meditation from './rituals/Meditation';
import Affirmation from './rituals/Affirmation';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { formatTime, getRitualDuration } from '../utils/ritualUtils';
import { saveRitualActivity } from '../utils/ritualService';

interface RitualActivityProps {
  ritual: 'breathing' | 'meditation' | 'affirmation';
  mood: string;
  subject: string;
  onComplete: () => void;
}

const RitualActivity: React.FC<RitualActivityProps> = ({ ritual, mood, subject, onComplete }) => {
  const initialTime = getRitualDuration(ritual);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [audioError, setAudioError] = useState<boolean>(false);
  
  const {
    isSpeaking,
    affirmationSpoken,
    currentAffirmationIndex,
    audioError: speechRecognitionError,
    startSpeechRecognition,
    setAffirmationSpoken
  } = useSpeechRecognition();
  
  useEffect(() => {
    if (speechRecognitionError) {
      setAudioError(true);
    }
  }, [speechRecognitionError]);
  
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
  
  const handleComplete = async () => {
    // Calculate duration (how long they actually took)
    const actualDuration = initialTime - timeLeft;
    
    // Save the ritual activity data
    await saveRitualActivity({
      subject,
      ritual,
      mood,
      completedAt: new Date().toISOString(),
      duration: actualDuration
    });
    
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
  
  const renderRitualContent = () => {
    switch (ritual) {
      case 'breathing':
        return <BreathingExercise step={step} isActive={isActive} />;
      case 'meditation':
        return <Meditation isActive={isActive} timeLeft={timeLeft} audioError={audioError} />;
      case 'affirmation':
        return (
          <Affirmation 
            currentAffirmationIndex={currentAffirmationIndex}
            affirmationSpoken={affirmationSpoken}
            isSpeaking={isSpeaking}
            isActive={isActive}
            audioError={audioError}
            startSpeechRecognition={startSpeechRecognition}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="card-glass p-8 animate-fade-in">
      <h2 className="text-xl font-medium text-learnzy-dark mb-6 text-center">
        {ritual === 'breathing' ? 'Deep Breathing Exercise' : 
         ritual === 'meditation' ? 'Quick Mindfulness Meditation' : 
         'Positive Affirmations'}
      </h2>
      
      <div className="mb-8">
        {renderRitualContent()}
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
