import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Partners from "./pages/Partners";
import Mentors from "./pages/Mentors";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SmoothScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScrollWrapper>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SmoothScrollWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
