
import { Question } from './types'

export const generateMockQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    text: `This is a sample question about a topic in ${
      i % 3 === 0 ? 'cell biology' : i % 3 === 1 ? 'genetics' : 'physiology'
    }. It tests your understanding of key concepts and principles.`,
    options: [
      {
        id: 'A',
        text: 'Sample option A with some explanation text to make it longer.',
      },
      {
        id: 'B',
        text: 'Sample option B that provides an alternative answer to the question.',
      },
      { id: 'C', text: 'Sample option C which might be correct or incorrect.' },
      {
        id: 'D',
        text: 'Sample option D to complete the four possible answers.',
      },
    ],
    Subject: 'biology',
    Chapter_name: 'Sample Chapter',
    Topic: 'Sample Topic',
    Subtopic: 'Sample Subtopic',
    Difficulty_Level: 'Medium',
    Question_Structure: 'Multiple Choice',
    Bloom_Taxonomy: 'Comprehension',
    Priority_Level: 'Medium',
    Time_to_Solve: 1.0,
    Key_Concept_Tested: 'Sample concept',
    Common_Pitfalls: 'Common mistake',
  }))
}
