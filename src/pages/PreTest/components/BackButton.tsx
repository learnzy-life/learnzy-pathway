
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BackButton: React.FC = () => {
  return (
    <Link
      to="/subjects"
      className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-8 transition-colors duration-200"
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
    </Link>
  )
}

export default BackButton
