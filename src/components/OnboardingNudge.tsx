
import React from 'react'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

const OnboardingNudge = () => {
  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <FileText className="h-5 w-5 text-amber-500" />
      <div>
        <AlertTitle className="text-amber-700">Complete Your Profile</AlertTitle>
        <AlertDescription className="text-amber-600">
          Please complete your profile to enhance your learning experience.{' '}
          <Link to="/onboarding" className="font-medium text-learnzy-purple underline-offset-4 hover:underline">
            Complete now →
          </Link>
        </AlertDescription>
      </div>
    </Alert>
  )
}

export default OnboardingNudge
