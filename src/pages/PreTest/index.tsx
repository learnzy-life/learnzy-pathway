
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import BackButton from './components/BackButton'
import PreTestHeader from './components/PreTestHeader'
import { Subject, getSubjectTitle } from './utils/subjectUtils'
import PreTestContent from './components/PreTestContent'
import { useAuth } from '../../context/AuthContext'

const PreTest: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth', { state: { from: `/pre-test/${subject}` } })
    }
  }, [user, isLoading, navigate, subject])

  if (!subject) {
    return <div>Invalid subject</div>
  }

  const subjectTitle = getSubjectTitle(subject as Subject)

  const handleStartTest = () => {
    navigate(`/test/${subject}`)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-4"></div>
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-3xl mx-auto">
          <BackButton />

          <PreTestHeader subjectTitle={subjectTitle} />

          <PreTestContent 
            subject={subject as Subject} 
            subjectTitle={subjectTitle} 
            onStartTest={handleStartTest} 
          />
        </section>
      </main>
    </div>
  )
}

export default PreTest
