import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Partners from "./pages/Partners";
import Mentors from "./pages/Mentors";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll>
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
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
