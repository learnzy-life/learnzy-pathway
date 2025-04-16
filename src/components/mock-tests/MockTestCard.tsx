import { format } from 'date-fns'
import { CheckCircle, Lock, Sparkles } from 'lucide-react'
import React, { useEffect } from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { MockTest } from '../../types/mock-test'

interface MockTestCardProps {
  test: MockTest
  onClick: (test: MockTest) => void
}

const MockTestCard: React.FC<MockTestCardProps> = ({ test, onClick }) => {
  const { hasPaid } = useGlobalPayment()

  // Determine the lock state for display purposes
  // - Non-dynamic tests are locked if user hasn't paid.
  // - Dynamic tests are locked if prerequisites aren't met (test.isLocked from utils)
  //   OR if the user hasn't paid (since payment is required for all cycles now).
  const isLockedForDisplay = test.isDynamic
    ? test.isLocked || !hasPaid
    : !hasPaid

  // A test is clickable if it's not completed AND not locked for display
  const isClickable = !test.isCompleted && !isLockedForDisplay

  useEffect(() => {
    console.log('Test:', test.title, {
      isLockedForDisplay: isLockedForDisplay,
      isCompleted: test.isCompleted,
      isDynamic: test.isDynamic,
      hasPaid: hasPaid,
      testIsLockedFromUtils: test.isLocked, // Show the prerequisite lock status
      isClickable: isClickable,
      condition: isLockedForDisplay
        ? test.isDynamic && !hasPaid
          ? 'Showing: Unlock All Cycles to Access' // Dynamic but not paid
          : test.isDynamic && test.isLocked
          ? 'Showing: Complete previous tests to unlock' // Dynamic, paid, but prerequisites met
          : 'Showing: Unlock All Cycles to Access' // Non-dynamic and not paid
        : test.isCompleted
        ? 'Showing: Completed'
        : 'Showing: Available Now',
    })
  }, [test, hasPaid, isLockedForDisplay, isClickable])

  // This function should be called in your parent component to automatically unlock
  // the dynamic test when all regular tests are completed
  const shouldDynamicTestBeUnlocked = () => {
    // This is a placeholder - the actual check would happen in the parent component
    console.log(
      'Note: Parent component should unlock dynamic test when all tests completed'
    )
    return false
  }

  const handleClick = () => {
    if (isClickable) {
      onClick(test)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg p-4 border ${
        test.isDynamic ? 'border-learnzy-amber' : 'border-gray-100'
      } ${
        isClickable
          ? 'hover:border-learnzy-amber/60 cursor-pointer'
          : 'opacity-60 cursor-not-allowed' // Apply lock style if not clickable
      } transition-all duration-200 relative ${
        test.isCompleted ? 'opacity-80' : '' // Slightly dim completed tests
      }`}
    >
      {test.isDynamic && (
        <span className="absolute -top-2 -right-2 bg-learnzy-amber text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <Sparkles className="w-3 h-3 mr-1" />
          Personalized
        </span>
      )}
      <h3 className="font-medium text-learnzy-dark mb-2">{test.title}</h3>
      {test.unlockDate ? (
        <p className="text-sm text-amber-600">
          Unlocks on {format(new Date(test.unlockDate), 'MMM dd, yyyy')}
        </p>
      ) : isLockedForDisplay ? (
        // Locked state text
        <p className="text-sm text-gray-500">
          <span className="inline-flex items-center">
            <Lock className="w-3 h-3 mr-1" />
            {
              test.isDynamic && !hasPaid
                ? 'Unlock All Cycles to Access' // Dynamic but not paid
                : test.isDynamic && test.isLocked
                ? 'Complete previous tests' // Dynamic, paid, but prerequisites not met
                : 'Unlock All Cycles to Access' // Non-dynamic and not paid
            }
          </span>
        </p>
      ) : test.isCompleted ? (
        // Completed state text
        <p className="text-sm text-green-600 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          Completed
        </p>
      ) : (
        // Available state text
        <p className="text-sm text-learnzy-amber">Available Now</p>
      )}
    </div>
  )
}

export default MockTestCard
