import { Mic, MicOff } from 'lucide-react'
import React from 'react'
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

  return (
    <div className="text-center">
      <div className="text-3xl font-light mb-8">
        Speak these affirmations out loud
      </div>
      <div
        className={`bg-white/80 rounded-xl p-6 shadow-md mb-8 ${
          affirmationSpoken ? 'bg-green-100' : 'animate-pulse'
        }`}
      >
        <p className="text-2xl font-medium text-learnzy-dark">
          {currentAffirmation}
        </p>
      </div>
      <div className="flex justify-center mb-8">
        <button
          onClick={startSpeechRecognition}
          className={`flex items-center gap-2 px-4 py-2 rounded-full
            ${
              isSpeaking
                ? 'bg-red-500 text-white'
                : 'bg-learnzy-purple text-white'
            }
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
        Say each affirmation out loud. Speaking them helps reinforce positive
        thoughts and build confidence.
      </p>

      {audioError ? (
        <div className="bg-orange-100 text-orange-800 p-4 rounded-xl mb-4">
          <p className="text-sm">
            Speech recognition is not supported in your browser. Please say the
            affirmations out loud on your own.
          </p>
        </div>
      ) : (
        <div className="bg-learnzy-purple/10 p-4 rounded-xl mb-4">
          <p className="text-sm text-center">
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
