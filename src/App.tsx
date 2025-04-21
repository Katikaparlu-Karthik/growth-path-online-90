
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import BrowseMentors from "./pages/BrowseMentors";
import MentorProfile from "./pages/MentorProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Profile from "./pages/profile";
import MyLearning from "./pages/learning";
import Favorites from "./pages/favorites";
import MyMentors from "./pages/mentors";
import MySessions from "./pages/sessions";
import ProgressTracker from "./pages/progress";
import Settings from "./pages/settings";
import Help from "./pages/help";
import SwitchRole from "./pages/switch-role";
import Chat from "./components/chat/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <Navbar />
            <div className="p-4 flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/browse" element={<BrowseMentors />} />
                <Route path="/mentor/:id" element={<MentorProfile />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify" element={<VerifyAccount />} />
                <Route path="/pricing" element={<Pricing />} />
                
                {/* Sidebar routes */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/learning" element={<MyLearning />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/mentors" element={<MyMentors />} />
                <Route path="/sessions" element={<MySessions />} />
                <Route path="/progress" element={<ProgressTracker />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/switch-role" element={<SwitchRole />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Chat />
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
