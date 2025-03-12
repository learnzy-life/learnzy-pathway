
import React from 'react'

interface AuthHeaderProps {
  isLogin: boolean
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
        {isLogin ? 'Welcome Back!' : 'Join Learnzy'}
      </h1>
      <p className="text-muted-foreground">
        {isLogin ? 'Sign in to continue your learning journey' : 'Create an account to start learning'}
      </p>
    </div>
  )
}

export default AuthHeader
