
import { useRef, useState, useEffect } from 'react';
import { toast } from './use-toast';
import { getAffirmations } from '../utils/ritualUtils';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const useSpeechRecognition = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [affirmationSpoken, setAffirmationSpoken] = useState<boolean>(false);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState<number>(0);
  const [audioError, setAudioError] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const currentAffirmation = getAffirmations()[currentAffirmationIndex].toLowerCase();
        
        // Check if the spoken text contains key parts of the affirmation
        const affirmationWords = currentAffirmation.split(' ').filter(word => word.length > 3);
        const matchedWords = affirmationWords.filter(word => transcript.includes(word));
        
        // If at least 40% of key words match, consider it spoken correctly
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
  }, [currentAffirmationIndex]);
  
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
  
  return {
    isSpeaking,
    affirmationSpoken,
    currentAffirmationIndex,
    audioError,
    startSpeechRecognition,
    setAffirmationSpoken
  };
};

export default useSpeechRecognition;
