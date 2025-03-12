
import { BarChart, Book, CheckCircle2, Clock, PieChart } from 'lucide-react'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import ImprovementResources from '../components/ImprovementResources'
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
import { Subject } from '../services/questionService'
import { processTimeAnalysisData } from '../services/testSession'

const Results: React.FC = () => {
  const { subject } = useParams<{ subject: Subject }>()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')

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
      <ResultsLoadingState loading={false} errorMessage="No data available" />
    )
  }

  if (!subject) {
    return <div>Invalid subject</div>
  }

  const subjectTitle = getSubjectTitle(subject as Subject)

  const improvementResources = resultsData.topics.map((topic) => {
    const resources = [
      {
        type: 'NCERT',
        title: `${topic.name} NCERT Highlights`,
        url: `https://learnzy.com/resources/${subject}/ncert/${topic.name
          .toLowerCase()
          .replace(/\s+/g, '-')}`,
        description: 'Toppers-highlighted NCERT pages for this topic',
      },
      {
        type: 'Video',
        title: `${topic.name} Video Lecture`,
        url: `https://learnzy.com/resources/${subject}/video/${topic.name
          .toLowerCase()
          .replace(/\s+/g, '-')}`,
        description: 'Expert video tutorial for this topic',
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
          timeAnalysis={{
            ...resultsData.timeAnalysis,
            ...processTimeAnalysisData(resultsData.questions || []),
          }}
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
          overallDifficultyPerformance={resultsData.subjectScores.overallDifficultyPerformance}
        />
      </div>

      <div className="mb-12">
        <SectionHeader icon={Book} title="Improve Before Your Next Mock" />
        <ImprovementResources resources={improvementResources} />
      </div>

      <NextStepsSection />
    </ResultsLayout>
  )
}

export default Results
