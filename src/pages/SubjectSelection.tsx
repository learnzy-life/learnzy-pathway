
import React, { useEffect } from 'react'
import Header from '../components/Header'
import MockTestCycles from '../components/mock-tests/MockTestCycles'
import SubjectsSection from '../components/subjects/SubjectsSection'
import { useAuth } from '../context/AuthContext'
import { useMockTests } from '../hooks/mock-tests/useMockTests'
import { usePostLoginForm } from '../hooks/usePostLoginForm'
import { toast } from 'sonner'

const SubjectSelection: React.FC = () => {
  const { user } = useAuth()
  const {
    mockTests,
    isLoading,
    unlockedCycles,
    handleMockTestClick,
  } = useMockTests(user?.id)

  const { hasUserDetails, setShowForm } = usePostLoginForm()

  useEffect(() => {
    const checkUserDetails = async () => {
      const hasDetails = await hasUserDetails()
      if (!hasDetails) {
        toast("Complete your profile to enhance your learning experience", {
          action: {
            label: "Complete Profile",
            onClick: () => setShowForm(true)
          },
          duration: 10000, // Show for 10 seconds
        })
      }
    }
    
    if (user) {
      checkUserDetails()
    }
  }, [user])

  const subjects = [
    {
      id: 'biology',
      title: 'Biology',
      description:
        'Test your knowledge in cell biology, genetics, human physiology, ecology, and evolution.',
      icon: '🧬',
      color: 'bg-learnzy-amber',
      attempted: false,
      locked: false,
    },
    {
      id: 'physics',
      title: 'Physics',
      description:
        'Assess your understanding of mechanics, thermodynamics, electromagnetism, and modern physics.',
      icon: '⚛️',
      color: 'bg-learnzy-amber/80',
      attempted: false,
      locked: false,
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      description:
        'Evaluate your mastery in organic chemistry, inorganic chemistry, physical chemistry, and biochemistry.',
      icon: '⚗️',
      color: 'bg-learnzy-amber/90',
      attempted: false,
      locked: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <SubjectsSection subjects={subjects} />

        <MockTestCycles
          mockTests={mockTests}
          isLoading={isLoading}
          unlockedCycles={unlockedCycles}
          onMockTestClick={handleMockTestClick}
        />
      </main>
    </div>
  )
}

export default SubjectSelection
