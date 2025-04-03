import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import DynamicTestGeneratingState from '../components/pretest/DynamicTestGeneratingState'
import DynamicTestInfoCard from '../components/pretest/DynamicTestInfoCard'
import { useDynamicTestGenerator } from '../hooks/useDynamicTestGenerator'

const PreDynamicTest: React.FC = () => {
  const { cycle } = useParams<{ cycle: string }>()
  const { progress, isGenerating } = useDynamicTestGenerator(cycle || '1')

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
