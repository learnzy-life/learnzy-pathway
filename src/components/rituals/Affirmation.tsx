
import { Mic, MicOff } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { getAffirmations } from '../../utils/ritualUtils'

interface AffirmationProps {
  currentAffirmationIndex: number
  affirmationSpoken: boolean
  isSpeaking: boolean
  isActive: boolean
  audioError: boolean
  startSpeechRecognition: () => void
}

const Affirmation: React.FC<AffirmationProps> = ({
  currentAffirmationIndex,
  affirmationSpoken,
  isSpeaking,
  isActive,
  audioError,
  startSpeechRecognition,
}) => {
  // Get only the first 4 affirmations
  const affirmations = getAffirmations().slice(0, 4);
  const currentAffirmation = affirmations[currentAffirmationIndex];
  const [showGuidance, setShowGuidance] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Guide user with voice
  useEffect(() => {
    if (isActive && !isSpeaking && !affirmationSpoken && !audioError && window.speechSynthesis) {
      try {
        // Create timeout to allow a pause between affirmations
        const timer = setTimeout(() => {
          // Cancel any ongoing speech first
          window.speechSynthesis.cancel();
          
          // Create a new utterance for the affirmation
          const affirmationUtterance = new SpeechSynthesisUtterance(currentAffirmation);
          affirmationUtterance.rate = 0.85;
          affirmationUtterance.pitch = 1.05; // Slightly higher pitch for positivity
          affirmationUtterance.volume = 1.0; // Higher volume for mobile
          
          // Workaround for mobile browsers that pause synthesis in background
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
          
          window.speechSynthesis.speak(affirmationUtterance);
          utteranceRef.current = affirmationUtterance;
        }, 1000);
        
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Speech synthesis error in affirmations:", err);
      }
    }
    
    return () => {
      if (window.speechSynthesis && utteranceRef.current) {
        window.speechSynthesis.cancel();
        utteranceRef.current = null;
      }
    };
  }, [currentAffirmationIndex, isActive, isSpeaking, affirmationSpoken, audioError, currentAffirmation]);

  // Toggle guidance visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuidance(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentAffirmationIndex]);

  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-learnzy-dark">
        Say these affirmations out loud
      </div>
      <div
        className={`bg-white/90 rounded-xl p-4 md:p-6 shadow-md mb-6 md:mb-8 transition-all duration-500 ease-in-out
          ${affirmationSpoken ? 'bg-green-50 border border-green-100' : 'border border-learnzy-purple/10'}`}
      >
        <div className="text-sm text-gray-500 mb-2">Affirmation {currentAffirmationIndex + 1} of {affirmations.length}</div>
        <p className="text-xl md:text-2xl font-medium text-learnzy-dark">
          {currentAffirmation}
        </p>
      </div>
      <div className="flex justify-center mb-6 md:mb-8">
        <button
          onClick={startSpeechRecognition}
          className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300
            ${
              isSpeaking
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-learnzy-purple text-white shadow-sm hover:shadow-md'
            }
            `}
          disabled={!isActive}
        >
          {isSpeaking ? (
            <>
              <MicOff className="w-4 h-4 md:w-5 md:h-5" /> Stop Speaking
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 md:w-5 md:h-5" /> Say It Out Loud
            </>
          )}
        </button>
      </div>
      <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 md:mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-learnzy-purple/20 to-indigo-300/30 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl">💭</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base px-4">
        Say each affirmation loudly and clearly. Speaking affirmations with conviction helps reinforce positive
        thoughts and builds confidence.
      </p>

      {audioError ? (
        <div className="bg-orange-100 text-orange-800 p-3 md:p-4 rounded-xl mb-4 max-w-md mx-auto text-xs md:text-sm px-4">
          <p>
            Speech recognition is not supported in your browser. Please say the
            affirmations out loud on your own.
          </p>
        </div>
      ) : (
        <div className={`bg-learnzy-purple/10 p-3 md:p-4 rounded-xl mb-4 shadow-sm max-w-md mx-auto
          transition-all duration-500 ${showGuidance ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-xs md:text-sm text-center text-gray-700">
            <strong>Instructions:</strong> Press the "Say It Out Loud" button and speak
            the affirmation displayed above.
            {affirmationSpoken
              ? ' Great job! Try the next one.'
              : " Say it with confidence and conviction!"}
          </p>
        </div>
      )}
    </div>
  )
}

export default Affirmation
