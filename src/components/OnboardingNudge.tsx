
import React from 'react'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription } from './ui/alert'

const OnboardingNudge = () => {
  return (
    <Alert className="mb-4">
      <FileText className="h-4 w-4" />
      <AlertDescription>
        Please complete your profile to enhance your learning experience.{' '}
        <Link to="/onboarding" className="font-medium text-learnzy-purple underline-offset-4 hover:underline">
          Complete now
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default OnboardingNudge
