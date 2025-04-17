
import React from 'react'

interface AuthHeaderProps {
  isLogin: boolean
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-learnzy-amber/20 mb-4">
        <div className="w-10 h-10 rounded-full bg-learnzy-amber flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-learnzy-dark">
        {isLogin ? 'Welcome Back!' : 'Join Learnzy'}
      </h1>
      <p className="text-muted-foreground">
        {isLogin 
          ? 'Sign in to continue your learning journey' 
          : 'Create an account to start your NEET prep with us'}
      </p>
    </div>
  )
}

export default AuthHeader
