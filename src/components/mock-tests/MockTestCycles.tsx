import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { MockTest } from '../../types/mock-test'
import { getCyclesData } from '../landing/cycles/cyclesData'
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

  // --- Start Calculation for Cycle Completion ---
  const cycleCompletionStatus = cycles.reduce((acc, cycle) => {
    const testsInCycle = mockTests.filter(
      (test) => test.cycle === cycle.number && !test.isDynamic
    );
    acc[cycle.number] = testsInCycle.length > 0 && testsInCycle.every((test) => test.isCompleted);
    return acc;
  }, {} as Record<number, boolean>);
  // --- End Calculation ---

  return (
    <div className="">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-learnzy-dark">
          Mock Test Cycles
        </h2>
        <p className="text-muted-foreground mt-1">
          Complete practice tests to assess your knowledge
        </p>
      </div>

      {/* {!hasPaid && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-8 border border-amber-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-start space-x-3 mb-4 md:mb-0">
              <div className="bg-amber-200 rounded-full p-2 mt-1">
                <LockKeyhole className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-semibold text-learnzy-dark">
                  Unlock All Test Cycles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get unlimited access to all mock test cycles and boost your
                  exam preparation
                </p>
              </div>
            </div>
            <UnlockAllButton
              variant="prominent"
              size="md"
              className="shadow-lg w-full md:w-auto transform hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      )} */}

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

        {cycles.map((cycle) => {
          // Determine if the *previous* cycle is completed (Cycle 1 doesn't have a previous)
          const isPreviousCycleCompleted = cycle.number === 1 ? true : cycleCompletionStatus[cycle.number - 1] ?? false;

          // Base unlock status: included in unlockedCycles array or user has paid globally
          let baseUnlocked = unlockedCycles.includes(cycle.number) || hasPaid;

          // Final unlock status: base unlock AND previous cycle completed
          const isCycleEffectivelyUnlocked = baseUnlocked && isPreviousCycleCompleted;

          return (
            <CycleContent
              key={cycle.number}
              cycle={cycle}
              isUnlocked={isCycleEffectivelyUnlocked} // Use calculated unlock status
              mockTests={mockTests}
              isLoading={isLoading}
              onMockTestClick={onMockTestClick}
            />
          );
        })}
      </Tabs>
    </div>
  )
}

export default MockTestCycles
