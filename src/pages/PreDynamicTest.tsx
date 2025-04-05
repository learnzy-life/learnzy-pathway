import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Header from '../components/Header'
import DynamicTestGeneratingState from '../components/pretest/DynamicTestGeneratingState'
import DynamicTestInfoCard from '../components/pretest/DynamicTestInfoCard'
import { useAuth } from '../context/AuthContext'
import { useDynamicTestGenerator } from '../hooks/useDynamicTestGenerator'

const PreDynamicTest: React.FC = () => {
  const { cycle } = useParams<{ cycle: string }>()
  const { user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { progress, isGenerating } = useDynamicTestGenerator(cycle || '1')

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please log in to access the dynamic test')
      navigate('/auth', { state: { from: `/pre-dynamic-test/${cycle}` } })
    }
  }, [user, authLoading, navigate, cycle])

  // If the test generation is complete, navigate to the test
  useEffect(() => {
    if (!isGenerating && progress === 100) {
      navigate(`/mock-test/${cycle}/5`)
    }
  }, [isGenerating, progress, navigate, cycle])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <DynamicTestGeneratingState progress={progress} />
        <DynamicTestInfoCard />
      </main>
    </div>
  )
}

export default PreDynamicTest
