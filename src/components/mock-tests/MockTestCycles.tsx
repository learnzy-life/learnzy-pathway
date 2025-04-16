import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { MockTest } from '../../types/mock-test'
import { getCyclesData } from '../landing/cycles/cyclesData'
import UnlockAllButton from '../payment/UnlockAllButton'
import CycleContent from './CycleContent'

interface MockTestCyclesProps {
  mockTests: MockTest[]
  isLoading: boolean
  unlockedCycles: number[]
  onMockTestClick: (test: MockTest) => void
}

const MockTestCycles: React.FC<MockTestCyclesProps> = ({
  mockTests,
  isLoading,
  unlockedCycles,
  onMockTestClick,
}) => {
  const cycles = getCyclesData()
  const { hasPaid } = useGlobalPayment()

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold text-learnzy-dark">
          Mock Test Cycles
        </h2>
        {!hasPaid && (
          <UnlockAllButton
            variant="prominent"
            size="md"
            className="shadow-lg transform hover:scale-105 transition-transform duration-200"
          />
        )}
      </div>

      <Tabs defaultValue="cycle-1" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 w-full md:w-3/4 mx-auto">
          {cycles.map((cycle) => (
            <TabsTrigger
              key={cycle.number}
              value={`cycle-${cycle.number}`}
              className="flex items-center"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-learnzy-amber/20 mr-2">
                {cycle.icon}
              </span>
              <span className="hidden md:inline">Cycle {cycle.number}</span>
              <span className="md:hidden">C{cycle.number}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {cycles.map((cycle) => (
          <CycleContent
            key={cycle.number}
            cycle={cycle}
            isUnlocked={unlockedCycles.includes(cycle.number) || hasPaid}
            mockTests={mockTests}
            isLoading={isLoading}
            onMockTestClick={onMockTestClick}
          />
        ))}
      </Tabs>
    </div>
  )
}

export default MockTestCycles
