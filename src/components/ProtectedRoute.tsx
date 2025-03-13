
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
  const { user, isLoading, isDevelopmentBypass } = useAuth()
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

  // Allow access if dev bypass is active or user is authenticated
  if (isDevelopmentBypass || user) {
    return <>{children}</>
  }

  // Redirect to login if not authenticated and not bypassed
  return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
}

export default ProtectedRoute
