
import { Navigate } from 'react-router-dom'
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-learnzy-purple/30 border-t-learnzy-purple rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium ml-4">Loading...</h2>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
