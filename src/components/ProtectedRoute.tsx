
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/auth',
}) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // Wait for authentication to complete
    if (!isLoading) {
      setIsCheckingAuth(false)
    }
  }, [isLoading])

  // Show loading state while checking authentication
  if (isCheckingAuth || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-4"></div>
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // User is authenticated, render children
  return <>{children}</>
}

export default ProtectedRoute
