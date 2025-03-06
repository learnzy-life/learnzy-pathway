
import React from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  // Authentication is disabled, so we'll just render the children
  return <>{children}</>
}

export default ProtectedRoute
