import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { MockTest } from '../../types/mock-test'
import { CycleData } from '../landing/cycles/cyclesData'
import CycleInfo from './CycleInfo'
import MockTestsGrid from './MockTestsGrid'

interface CycleContentProps {
  cycle: CycleData
  isUnlocked: boolean
  mockTests: MockTest[]
  isLoading: boolean
  onMockTestClick: (test: MockTest) => void
}

const CycleContent: React.FC<CycleContentProps> = ({
  cycle,
  isUnlocked,
  mockTests,
  isLoading,
  onMockTestClick,
}) => {
  return (
    <TabsContent
      key={cycle.number}
      value={`cycle-${cycle.number}`}
      className="space-y-4"
    >
      <CycleInfo
        cycle={cycle}
        isUnlocked={isUnlocked}
        onUnlockClick={() => {}}
      />

      <MockTestsGrid
        isLoading={isLoading}
        mockTests={mockTests}
        cycleNumber={cycle.number}
        onMockTestClick={onMockTestClick}
      />
    </TabsContent>
  )
}

export default CycleContent
