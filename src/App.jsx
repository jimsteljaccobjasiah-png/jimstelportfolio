import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation"; 
import NameNav from "./components/NameNav"; // Macha, importing the new Identity Blade
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* TOP LEVEL CINEMATIC UI COMPONENTS */}
        <NameNav />     {/* Left-side Vertical Identity */}
        <Navigation />  {/* Bottom-right Biometric HUD */}
        
        <main className="bg-black min-h-screen selection:bg-blue-500/30">
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Catch-all route for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;