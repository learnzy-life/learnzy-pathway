
import React from 'react'
import Header from '../components/Header'
import ProfileHeader from '../components/profile/ProfileHeader'
import TestHistorySection from '../components/profile/TestHistorySection'
import SocialShareSection from '../components/profile/SocialShareSection'
import { useProfileData } from '../hooks/useProfileData'

const Profile: React.FC = () => {
  const { testSessions, loading, userName, sharedCount, incrementShareCount } = useProfileData()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader userName={userName} />
          <TestHistorySection loading={loading} testSessions={testSessions} />
          <SocialShareSection sharedCount={sharedCount} incrementShareCount={incrementShareCount} />
        </div>
      </main>
    </div>
  )
}

export default Profile
