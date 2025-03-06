
import React from 'react'

interface PreTestHeaderProps {
  subjectTitle: string
}

const PreTestHeader: React.FC<PreTestHeaderProps> = ({ subjectTitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
        Prepare for Your {subjectTitle} Test
      </h1>
      <p className="text-muted-foreground">
        Take a moment to check in with yourself and prepare your mind for
        optimal performance.
      </p>
    </div>
  )
}

export default PreTestHeader
