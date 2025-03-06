
import React, { useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'
import MoodSelector from '../../../components/MoodSelector'
import PreRitualCard from '../../../components/PreRitualCard'
import RitualActivity from '../../../components/RitualActivity'
import PostRitualInfo from '../../../components/PostRitualInfo'
import { toast } from '../../../hooks/use-toast'
import { Mood, PreRitual, Subject, getRitualOptions } from '../utils/subjectUtils'

interface PreTestContentProps {
  subject: Subject
  subjectTitle: string
  onStartTest: () => void
}

const PreTestContent: React.FC<PreTestContentProps> = ({ 
  subject, 
  subjectTitle, 
  onStartTest 
}) => {
  const [mood, setMood] = useState<Mood | undefined>(undefined)
  const [ritual, setRitual] = useState<PreRitual | undefined>(undefined)
  const [ritualCompleted, setRitualCompleted] = useState(false)
  const [showRitualActivity, setShowRitualActivity] = useState(false)
  const [showPostRitualInfo, setShowPostRitualInfo] = useState(false)
  
  const rituals = getRitualOptions()

  const handleRitualSelect = (selectedRitual: PreRitual) => {
    setRitual(selectedRitual)

    if (selectedRitual === 'none') {
      setRitualCompleted(true)
      setShowPostRitualInfo(true)
      toast({
        title: 'Ready to begin!',
        description: "You've chosen to skip the pre-test ritual.",
      })
    } else {
      setShowRitualActivity(true)

      if (selectedRitual === 'breathing') {
        toast({
          title: 'Breathing Exercise Selected',
          description: 'Take deep breaths for 2 minutes to calm your mind.',
        })
      } else if (selectedRitual === 'meditation') {
        toast({
          title: 'Meditation Selected',
          description:
            'Find a comfortable position and clear your mind for 3 minutes.',
        })
      } else if (selectedRitual === 'affirmation') {
        toast({
          title: 'Positive Affirmations Selected',
          description:
            'Repeat confidence-building statements to boost your mindset.',
        })
      }
    }
  }

  const handleRitualComplete = () => {
    setShowRitualActivity(false)
    setRitualCompleted(true)
    setShowPostRitualInfo(true)
  }

  const handleStartTest = () => {
    if (!mood) {
      toast({
        title: 'Mood Required',
        description: 'Please select your current mood',
        variant: 'destructive',
      })
      return
    }

    if (!ritual) {
      toast({
        title: 'Ritual Selection Required',
        description: 'Please select a pre-test ritual or choose to skip',
        variant: 'destructive',
      })
      return
    }

    console.log('Starting test with:', { subject, mood, ritual })
    onStartTest()
  }

  return (
    <>
      <div className="card-glass p-8 mb-10 animate-fade-in">
        <MoodSelector onSelect={setMood} selectedMood={mood} />
      </div>

      {showRitualActivity ? (
        <RitualActivity
          ritual={ritual as 'breathing' | 'meditation' | 'affirmation'}
          mood={mood || 'unknown'}
          subject={subject}
          onComplete={handleRitualComplete}
        />
      ) : showPostRitualInfo ? (
        <>
          <PostRitualInfo
            ritual={
              ritual as 'breathing' | 'meditation' | 'affirmation' | 'none'
            }
            subject={subject}
          />

          <div className="mt-8">
            <div className="bg-learnzy-purple/5 border border-learnzy-purple/20 rounded-xl p-4 mb-8 flex items-start">
              <AlertCircle className="w-5 h-5 text-learnzy-purple flex-shrink-0 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-learnzy-dark mb-1">
                  Important Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  This test contains 180 questions and has a time limit of
                  180 minutes. Once started, the timer cannot be paused.
                  Ensure you have a stable internet connection and a
                  distraction-free environment.
                </p>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="button-primary w-full flex justify-center items-center animate-pulse"
            >
              Start {subjectTitle} Test{' '}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
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
                <h3 className="text-sm font-medium text-learnzy-dark mb-1">
                  You're Ready!
                </h3>
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
              <h3 className="text-sm font-medium text-learnzy-dark mb-1">
                Important Information
              </h3>
              <p className="text-sm text-muted-foreground">
                This test contains 180 questions and has a time limit of 180
                minutes. Once started, the timer cannot be paused. Ensure
                you have a stable internet connection and a distraction-free
                environment.
              </p>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className={`button-primary w-full flex justify-center items-center ${
              ritual && ritualCompleted ? 'animate-pulse' : ''
            }`}
          >
            Start {subjectTitle} Test{' '}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}

export default PreTestContent
