import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { useAuth } from './context/AuthContext'
import { GlobalPaymentProvider } from './context/GlobalPaymentContext'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Index from './pages/Index'
import LearnMore from './pages/LearnMore'
import MockTest from './pages/MockTest'
import NotFound from './pages/NotFound'
import PaymentSuccess from './pages/PaymentSuccess'
import PreAnalysis from './pages/PreAnalysis'
import PreDynamicTest from './pages/PreDynamicTest'
import PreMockTest from './pages/PreMockTest'
import PreTest from './pages/PreTest'
import Profile from './pages/Profile'
import Results from './pages/Results'
import SubjectSelection from './pages/SubjectSelection'
import Test from './pages/Test'
import TestReview from './pages/TestReview'
import Onboarding from './pages/Onboarding'
import { loadRazorpayScript } from './utils/loadScript'

function AppContent() {
  const { isDevelopmentBypass } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthPage, setIsAuthPage] = useState(location.pathname === '/auth')

  useEffect(() => {
    setIsAuthPage(location.pathname === '/auth')
  }, [location])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isDevelopmentBypass) {
      console.log('Authentication bypass enabled in development.')
      if (location.pathname === '/auth') {
        navigate('/subjects', { replace: true })
      }
    }
  }, [isDevelopmentBypass, location, navigate])

  useEffect(() => {
    loadRazorpayScript().catch((err) => {
      console.error('Failed to load Razorpay script:', err)
    })
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <SubjectSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pre-test/:subject"
          element={
            <ProtectedRoute>
              <PreTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pre-mock-test/:cycle/:testNumber"
          element={
            <ProtectedRoute>
              <PreMockTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:subject"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-test/:cycle/:testNumber"
          element={
            <ProtectedRoute>
              <MockTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis/:subject"
          element={
            <ProtectedRoute>
              <PreAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:subject"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review/:subject"
          element={
            <ProtectedRoute>
              <TestReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pre-dynamic-test/:cycle"
          element={
            <ProtectedRoute>
              <PreDynamicTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <GlobalPaymentProvider>
            <AppContent />
          </GlobalPaymentProvider>
        </TooltipProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
