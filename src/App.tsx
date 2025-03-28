
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { TooltipProvider } from "./components/ui/tooltip"
import Index from './pages/Index';
import Auth from './pages/Auth';
import LearnMore from './pages/LearnMore';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SubjectSelection from './pages/SubjectSelection';
import PreTest from './pages/PreTest';
import Test from './pages/Test';
import PreAnalysis from './pages/PreAnalysis';
import Results from './pages/Results';
import TestReview from './pages/TestReview';
import NotFound from './pages/NotFound';
import PreDynamicTest from './pages/PreDynamicTest';
import ProtectedRoute from './components/ProtectedRoute';
import PreMockTest from './pages/PreMockTest';
import MockTest from './pages/MockTest';
import { useAuth } from './context/AuthContext';

function App() {
  const { isDevelopmentBypass } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthPage, setIsAuthPage] = useState(location.pathname === '/auth');

  useEffect(() => {
    setIsAuthPage(location.pathname === '/auth');
  }, [location]);

  // Conditionally bypass authentication in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isDevelopmentBypass) {
      console.log('Authentication bypass enabled in development.');
      if (location.pathname === '/auth') {
        navigate('/subjects', { replace: true });
      }
    }
  }, [isDevelopmentBypass, location, navigate]);

  return (
    <div className="App">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/subjects" element={<SubjectSelection />} />
            <Route path="/pre-test/:subject" element={<PreTest />} />
            <Route path="/pre-mock-test/:cycle/:testNumber" element={<PreMockTest />} />
            <Route path="/test/:subject" element={<Test />} />
            <Route path="/mock-test/:cycle/:testNumber" element={<MockTest />} />
            <Route path="/analysis/:subject" element={<PreAnalysis />} />
            <Route path="/results/:subject" element={<Results />} />
            <Route path="/review/:subject" element={<TestReview />} />
            <Route path="/pre-dynamic-test/:cycle" element={<PreDynamicTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
