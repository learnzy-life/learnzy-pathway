
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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

export default App;
