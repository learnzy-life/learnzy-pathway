'use client'

import { AlertCircle, BookOpen } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Mock5NotificationProps {
  sessionId: string | null
  cycle: number
  isMock4: boolean
}

const Mock5Notification: React.FC<Mock5NotificationProps> = ({
  sessionId,
  cycle,
  isMock4,
}) => {
  if (!sessionId || !isMock4) return null

  return (
    <div className="bg-learnzy-purple/10 rounded-lg p-5 mb-8 border border-learnzy-purple/20">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-learnzy-purple mt-1 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-learnzy-dark">
            AI-Powered Review Test Generated
          </h3>
          <p className="text-muted-foreground mt-1 mb-3">
            We've automatically generated a personalized AI-Powered Review Test
            based on your performance across all the mock tests in this cycle.
            This test targets your weak areas to help improve your performance.
          </p>
          <div className="flex items-center">
            <Link
              to={`/mock-tests?cycle=${cycle}`}
              className="text-sm text-learnzy-purple font-medium inline-flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Go to AI-Powered Review Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mock5Notification
