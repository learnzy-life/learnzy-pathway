
export type Subject = 'biology' | 'physics' | 'chemistry'
export type Mood = 'great' | 'good' | 'okay' | 'stressed' | 'anxious'
export type PreRitual = 'breathing' | 'meditation' | 'affirmation' | 'none'

export const getSubjectTitle = (subject: Subject): string => {
  switch (subject) {
    case 'biology':
      return 'Biology'
    case 'physics':
      return 'Physics'
    case 'chemistry':
      return 'Chemistry'
    default:
      return ''
  }
}

export const getRitualOptions = () => [
  {
    id: 'breathing',
    title: 'Deep Breathing Exercise',
    description:
      'A simple breathing technique to reduce stress and increase focus.',
    icon: '🌬️',
    duration: '2 mins',
  },
  {
    id: 'meditation',
    title: 'Quick Mindfulness Meditation',
    description:
      'A short guided meditation to center your thoughts and calm your mind.',
    icon: '🧘',
    duration: '3 mins',
  },
  {
    id: 'affirmation',
    title: 'Positive Affirmations',
    description:
      'Repeat confidence-building statements to boost your mindset.',
    icon: '💭',
    duration: '1 min',
  },
  {
    id: 'none',
    title: 'Skip Pre-Test Ritual',
    description:
      'Proceed directly to the test without any preparation activity.',
    icon: '⏭️',
    duration: '0 mins',
  },
]
