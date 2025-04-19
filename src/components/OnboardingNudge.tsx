import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

const OnboardingNudge = () => {
  return (
    <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-start gap-3 relative">
        <div className="p-2 bg-amber-100 rounded-lg">
          <FileText className="h-5 w-5 text-amber-500" />
        </div>

        <div className="flex-1">
          <AlertTitle className="text-amber-700 font-semibold text-base">Complete Your Profile</AlertTitle>
          <AlertDescription className="text-amber-600 mt-1">
            Please complete your profile to enhance your learning experience.{' '}
            <Link
              to="/onboarding"
              className="font-medium text-amber-600 underline-offset-4 hover:underline inline-flex items-center group"
            >
              Complete now
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </AlertDescription>
        </div>

        {/* Decorative element */}
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-200/30 rounded-full"></div>
      </div>
    </Alert>
  )
}

export default OnboardingNudge
