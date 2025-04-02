import { Beaker } from 'lucide-react'
import React from 'react'
import SectionHeader from '../SectionHeader'
import SubjectsList from './SubjectsList'

interface SubjectsSectionProps {
  subjects: {
    id: string
    title: string
    description: string
    icon: string
    color: string
    attempted: boolean
    locked: boolean
  }[]
}

const SubjectsSection: React.FC<SubjectsSectionProps> = ({ subjects }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Select a Subject for Your Diagnostic Test
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose a subject to begin your diagnostic journey. Each test contains
          180 questions and takes approximately 180 minutes to complete.
        </p>
      </div>

      <SectionHeader icon={Beaker} title="Diagnostic Subject Tests" />

      <SubjectsList subjects={subjects} />
    </section>
  )
}

export default SubjectsSection
