
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import SubjectSelection from "./pages/SubjectSelection";
import PreTest from "./pages/PreTest";
import Test from "./pages/Test";
import PreAnalysis from "./pages/PreAnalysis";
import Results from "./pages/Results";
import TestReview from "./pages/TestReview";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { trackPageView } from "./utils/analytics/googleAnalytics";

// Analytics tracker component
const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get page title based on the current route
    const getPageTitle = (pathname: string) => {
      switch(pathname) {
        case '/': return 'Home';
        case '/subjects': return 'Subject Selection';
        case '/learn-more': return 'Learn More';
        case '/auth': return 'Authentication';
        case '/profile': return 'User Profile';
        default:
          if (pathname.includes('/pre-test')) return 'Pre-Test';
          if (pathname.includes('/test')) return 'Test';
          if (pathname.includes('/analysis')) return 'Pre-Analysis';
          if (pathname.includes('/results')) return 'Results';
          if (pathname.includes('/test-review')) return 'Test Review';
          return 'Page';
      }
    };
    
    // Track page view
    const pageTitle = getPageTitle(location.pathname);
    trackPageView(location.pathname, pageTitle);
  }, [location]);
  
  return null;
};

const App = () => {
  // Create the query client inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AnalyticsTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/subjects" element={<SubjectSelection />} />
              <Route path="/pre-test/:subject" element={<PreTest />} />
              <Route path="/test/:subject" element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              } />
              <Route path="/analysis/:subject" element={
                <ProtectedRoute>
                  <PreAnalysis />
                </ProtectedRoute>
              } />
              <Route path="/results/:subject" element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              } />
              <Route path="/test-review/:subject" element={
                <ProtectedRoute>
                  <TestReview />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
