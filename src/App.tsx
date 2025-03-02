
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubjectSelection from "./pages/SubjectSelection";
import PreTest from "./pages/PreTest";
import Test from "./pages/Test";
import PreAnalysis from "./pages/PreAnalysis";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subjects" element={<SubjectSelection />} />
          <Route path="/pre-test/:subject" element={<PreTest />} />
          <Route path="/test/:subject" element={<Test />} />
          <Route path="/analysis/:subject" element={<PreAnalysis />} />
          <Route path="/results/:subject" element={<Results />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
