
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import BackButton from './components/BackButton'
import PreTestHeader from './components/PreTestHeader'
import { Subject, getSubjectTitle } from './utils/subjectUtils'
import PreTestContent from './components/PreTestContent'

const PreTest: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const navigate = useNavigate()

  if (!subject) {
    return <div>Invalid subject</div>
  }

  const subjectTitle = getSubjectTitle(subject as Subject)

  const handleStartTest = () => {
    navigate(`/test/${subject}`)
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
