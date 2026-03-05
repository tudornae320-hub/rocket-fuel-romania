import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Partners from "./pages/Partners";
import Mentors from "./pages/Mentors";
import Contact from "./pages/Contact";
import PastEditions from "./pages/PastEditions";
import PastEditionDetail from "./pages/PastEditionDetail";
import NotFound from "./pages/NotFound";
import { useSmoothScroll } from "./hooks/use-smooth-scroll";

const queryClient = new QueryClient();

const AppContent = () => {
  useSmoothScroll();
  
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/past-editions" element={<PastEditions />} />
        <Route path="/past-editions/:year" element={<PastEditionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
