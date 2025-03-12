
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, User } from 'lucide-react'

interface ProfileHeaderProps {
  userName: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName }) => {
  return (
    <>
      <Link to="/" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-6 transition-colors duration-200">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 bg-learnzy-amber rounded-full flex items-center justify-center mr-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-learnzy-dark">{userName}'s Profile</h1>
          <p className="text-muted-foreground">View your test history and performance</p>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
