import { BarChart, Book, CheckCircle2, Clock, PieChart } from 'lucide-react'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import ImprovementResources from '../components/ImprovementResources'
import Mock5Notification from '../components/Mock5Notification'
import NextStepsSection from '../components/NextStepsSection'
import ResultsLayout from '../components/ResultsLayout'
import ResultsLoadingState from '../components/ResultsLoadingState'
import ResultsOverview from '../components/ResultsOverview'
import SectionHeader from '../components/SectionHeader'
import TagAnalysis from '../components/TagAnalysis'
import TimeAnalysis from '../components/TimeAnalysis'
import TopicBreakdown from '../components/TopicBreakdown'
import { getSubjectTitle } from '../data/mockResultsData'
import { useResultsData } from '../hooks/useResultsData'
import { Question, Subject } from '../services/question'

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const mock = searchParams.get('mock') === 'true'
  const cycle = parseInt(searchParams.get('cycle') || '0')
  const testNumber = searchParams.get('testNumber') || ''

  // Check if this is Mock 4 of a cycle
  const isMock4 = mock && testNumber === '4' && cycle > 0

  const { loading, resultsData, errorMessage, isFirstTest } = useResultsData(
    subject,
    sessionId
  )

  if (loading) {
    return <ResultsLoadingState loading={true} errorMessage={null} />
  }

  if (errorMessage) {
    return <ResultsLoadingState loading={false} errorMessage={errorMessage} />
  }

  if (!resultsData) {
    return (
      <ResultsLoadingState
        loading={false}
        errorMessage="No data available. Please try taking a test first."
      />
    )
  }

  if (!subject) {
    return (
      <ResultsLoadingState
        loading={false}
        errorMessage="Subject not specified. Please select a subject."
      />
    )
  }

  const subjectTitle = getSubjectTitle(subject as Subject)

  // Extract questions from resultsData
  const questions: Question[] = resultsData.questions || []

  // Create the questionTexts map
  const questionTextsMap: Record<number, string> = questions.reduce((acc, q) => {
    if (q.id !== undefined && q.text !== undefined) {
      acc[q.id] = q.text;
    }
    return acc;
  }, {} as Record<number, string>);

  const improvementResources = resultsData.topics.map((topic) => {
    // Find matching resource from bioResources if available
    const matchingResource = resultsData.bioResources?.find(
      (resource) =>
        resource.chapter_name &&
        topic.name.toLowerCase().includes(resource.chapter_name.toLowerCase())
    )

    const resources = [
      {
        type: 'NCERT',
        title: `${topic.name} NCERT Highlights`,
        url:
          matchingResource?.ncert_link && matchingResource.ncert_link !== 'NA'
            ? matchingResource.ncert_link
            : `https://learnzy.ai/resources/${subject}/ncert/${topic.name
                .toLowerCase()
                .replace(/\s+/g, '-')}`,
        description:
          matchingResource?.ncert_link === 'NA'
            ? 'Self-study recommended for this chapter'
            : 'Toppers-highlighted NCERT pages for this topic',
      },
      {
        type: 'Video',
        title: `${topic.name} Video Lecture`,
        url:
          matchingResource?.video_link && matchingResource.video_link !== 'NA'
            ? matchingResource.video_link
            : `https://learnzy.ai/resources/${subject}/video/${topic.name
                .toLowerCase()
                .replace(/\s+/g, '-')}`,
        description:
          matchingResource?.video_link === 'NA'
            ? 'Self-study recommended for this chapter'
            : 'Expert video tutorial for this topic',
      },
    ]

    return {
      topic: topic.name,
      accuracy: topic.percentage,
      resources,
      progress: 0,
      totalActions: 2,
      difficultyLevel: topic.difficultyLevel,
      priorityLevel: topic.priorityLevel,
    }
  })

  return (
    <ResultsLayout subjectTitle={subjectTitle}>
      {/* Show Mock 5 notification if this is Mock 4 */}
      {isMock4 && (
        <Mock5Notification
          sessionId={sessionId}
          cycle={cycle}
          isMock4={isMock4}
        />
      )}

      <div className="mb-12">
        <SectionHeader icon={CheckCircle2} title="Performance Overview" />
        <ResultsOverview
          subject={subjectTitle}
          totalScore={resultsData.totalScore}
          maxScore={resultsData.maxScore}
          correctAnswers={resultsData.correctAnswers}
          incorrectAnswers={resultsData.incorrectAnswers}
          unattempted={resultsData.unattempted}
          accuracy={resultsData.accuracy}
          timeSpent={resultsData.timeSpent}
          subjectScores={resultsData.subjectScores.chapters}
        />
      </div>

      <div className="mb-12">
        <SectionHeader icon={Clock} title="Time Management" />
        <TimeAnalysis
          timeAnalysis={resultsData.timeAnalysis}
          questionTexts={questionTextsMap}
        />
      </div>

      <div className="mb-12">
        <SectionHeader icon={PieChart} title="Mistake Pattern Analysis" />
        <TagAnalysis sessionId={sessionId} />
      </div>

      <div className="mb-12">
        <SectionHeader icon={BarChart} title="Chapter Performance" />
        <TopicBreakdown
          topics={resultsData.topics}
          isFirstTest={isFirstTest}
          overallDifficultyPerformance={
            resultsData.subjectScores.overallDifficultyPerformance
          }
        />
      </div>

      <div className="mb-12">
        <SectionHeader icon={Book} title="Improve Before Your Next Mock" />
        <ImprovementResources
          resources={improvementResources}
          bioResources={resultsData.bioResources}
        />
      </div>

      <NextStepsSection />
    </ResultsLayout>
  )
}

export default Results
