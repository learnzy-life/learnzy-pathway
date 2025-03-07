
import { Mic, MicOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
  const affirmations = getAffirmations()
  const currentAffirmation = affirmations[currentAffirmationIndex]
  const [showGuidance, setShowGuidance] = useState(true);

  // Guide user with voice
  useEffect(() => {
    if (isActive && !isSpeaking && !affirmationSpoken && !audioError && window.speechSynthesis) {
      // Create timeout to allow a pause between affirmations
      const timer = setTimeout(() => {
        // Create a new utterance for guiding the user
        const utterance = new SpeechSynthesisUtterance('Please repeat the following affirmation:');
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        // After the guide completes, speak the actual affirmation
        utterance.onend = () => {
          if (window.speechSynthesis) {
            const affirmationUtterance = new SpeechSynthesisUtterance(currentAffirmation);
            affirmationUtterance.rate = 0.85;
            affirmationUtterance.pitch = 1.05; // Slightly higher pitch for positivity
            affirmationUtterance.volume = 0.9;
            window.speechSynthesis.speak(affirmationUtterance);
          }
        };
        
        // Play the guide instruction
        window.speechSynthesis.speak(utterance);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
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
      <div className="text-3xl font-light mb-8 text-learnzy-dark">
        Speak these affirmations out loud
      </div>
      <div
        className={`bg-white/90 rounded-xl p-6 shadow-md mb-8 transition-all duration-500 ease-in-out
          ${affirmationSpoken ? 'bg-green-50 border border-green-100' : 'border border-learnzy-purple/10'}`}
      >
        <p className="text-2xl font-medium text-learnzy-dark">
          {currentAffirmation}
        </p>
      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={startSpeechRecognition}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300
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
              <MicOff className="w-5 h-5" /> Stop Speaking
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" /> Speak Now
            </>
          )}
        </button>
      </div>
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-learnzy-purple/20 to-indigo-300/30 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">💭</span>
        </div>
      </div>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Say each affirmation out loud. Speaking them helps reinforce positive
        thoughts and build confidence.
      </p>

      {audioError ? (
        <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4 max-w-md mx-auto">
          <p className="text-sm">
            Speech recognition is not supported in your browser. Please say the
            affirmations out loud on your own.
          </p>
        </div>
      ) : (
        <div className={`bg-learnzy-purple/10 p-4 rounded-xl mb-4 shadow-sm max-w-md mx-auto
          transition-all duration-500 ${showGuidance ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-sm text-center text-gray-700">
            <strong>Instructions:</strong> Press the "Speak Now" button and say
            the affirmation displayed above.
            {affirmationSpoken
              ? ' Great job! Try the next one.'
              : " Your voice will be recorded to check if you've spoken the affirmation."}
          </p>
        </div>
      )}
    </div>
  )
}

export default Affirmation
