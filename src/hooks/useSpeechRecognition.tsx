
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
  const recognitionInitialized = useRef<boolean>(false);
  
  // Initialize with 3 random affirmations for this session
  useEffect(() => {
    const shuffleIndex = Math.floor(Math.random() * 3); 
    setCurrentAffirmationIndex(shuffleIndex);
  }, []);
  
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        if (!recognitionInitialized.current) {
          const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
          recognitionRef.current = new SpeechRecognitionAPI();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          recognitionInitialized.current = true;
        }
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          const currentAffirmation = getAffirmations()[currentAffirmationIndex].toLowerCase();
          
          // Less strict matching - check if the spoken text contains key parts of the affirmation
          const affirmationWords = currentAffirmation.split(' ').filter(word => word.length > 3);
          const matchedWords = affirmationWords.filter(word => transcript.includes(word));
          
          // If at least 30% of key words match, consider it spoken correctly - more lenient
          if (matchedWords.length >= Math.ceil(affirmationWords.length * 0.3)) {
            setAffirmationSpoken(true);
            toast({
              title: "Great job!",
              description: "You've spoken the affirmation. Well done!",
            });
            
            // After a short delay, move to next affirmation
            setTimeout(() => {
              setAffirmationSpoken(false);
              // Cycle through the first 3 affirmations from the array
              setCurrentAffirmationIndex(prevIndex => 
                (prevIndex + 1) % 3
              );
            }, 1500);
          } else {
            toast({
              title: "Let's try again",
              description: "Try speaking the affirmation as shown.",
              variant: "default"
            });
          }
          
          setIsSpeaking(false);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.log("Speech recognition error:", event.error);
          setIsSpeaking(false);
          
          if (event.error === 'no-speech') {
            toast({
              title: "No speech detected",
              description: "Please speak clearly into your microphone.",
              variant: "default"
            });
          } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            setAudioError(true);
            toast({
              title: "Microphone access denied",
              description: "Please allow microphone access to use this feature.",
              variant: "destructive"
            });
          } else if (event.error === 'network') {
            toast({
              title: "Network error",
              description: "Please check your internet connection.",
              variant: "destructive"
            });
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsSpeaking(false);
        };
      } catch (error) {
        console.error("Speech recognition initialization error:", error);
        setAudioError(true);
      }
      
      return () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch (e) {
            console.error("Error stopping speech recognition:", e);
          }
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
        // Cancel any ongoing speech before starting recognition
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        
        // For mobile, we need to handle permissions differently
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
              // Permission granted, start recognition
              recognitionRef.current.start();
              setIsSpeaking(true);
            })
            .catch((err) => {
              console.error("Microphone permission error:", err);
              setAudioError(true);
              toast({
                title: "Microphone access required",
                description: "Please allow microphone access in your browser settings.",
                variant: "destructive"
              });
            });
        } else {
          // Fallback for browsers without mediaDevices API
          recognitionRef.current.start();
          setIsSpeaking(true);
        }
      } catch (error) {
        console.error("Speech recognition error:", error);
        setIsSpeaking(false);
        setAudioError(true);
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
