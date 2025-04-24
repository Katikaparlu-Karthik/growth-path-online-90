import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import AppSidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import BrowseMentors from "./pages/BrowseMentors";
import MentorProfile from "./pages/MentorProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MentorSignup from "./pages/MentorSignup";
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
import BecomeMentor from "./pages/become-mentor";
import MentorDashboard from "./pages/mentor-dashboard";
import MyStudents from "./pages/students";
import MyCourses from "./pages/courses";
import SessionSchedule from "./pages/schedule";
import Chat from "./components/chat/Chat";
import { supabase } from "./integrations/supabase/client";
import Layout from "./components/Layout";
import Presentation from "./pages/Presentation";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      // Check for session with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setAuthenticated(true);
      } else {
        // Check if we have a persisted session in localStorage
        const persistedSession = localStorage.getItem('supabase.auth.token');
        if (persistedSession) {
          try {
            // Try to restore the session
            const parsedSession = JSON.parse(persistedSession);
            const { data, error } = await supabase.auth.setSession({
              access_token: parsedSession.access_token,
              refresh_token: parsedSession.refresh_token,
            });
            
            if (data.session) {
              setAuthenticated(true);
            } else {
              // Invalid or expired session
              localStorage.removeItem('supabase.auth.token');
              localStorage.removeItem('userRole');
              setAuthenticated(false);
            }
          } catch (e) {
            console.error("Failed to restore session:", e);
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('userRole');
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Role-based route component
const RoleRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode, 
  requiredRole: 'student' | 'mentor' 
}) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    const checkRole = async () => {
      // First check session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user role from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (data && data.role === requiredRole) {
          setHasAccess(true);
        } else {
          // Check localStorage as fallback
          const persistedRole = localStorage.getItem('userRole');
          setHasAccess(persistedRole === requiredRole);
        }
      } else {
        // Check localStorage as fallback
        const persistedRole = localStorage.getItem('userRole');
        setHasAccess(persistedRole === requiredRole);
      }
      
      setLoading(false);
    };
    
    checkRole();
  }, [requiredRole]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return hasAccess ? <>{children}</> : <Navigate to="/switch-role" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-full bg-background">
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Auth routes outside Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<VerifyAccount />} />
              
              {/* All other routes nested under Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/presentation" element={<Presentation />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/browse" element={<BrowseMentors />} />
                <Route path="/mentor/:id" element={<MentorProfile />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/pricing" element={<Pricing />} />
                
                {/* Protected routes */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
                <Route path="/switch-role" element={<ProtectedRoute><SwitchRole /></ProtectedRoute>} />
                <Route path="/become-mentor" element={<ProtectedRoute><BecomeMentor /></ProtectedRoute>} />
                
                {/* Student-specific routes */}
                <Route path="/learning" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="student">
                      <MyLearning />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/mentors" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="student">
                      <MyMentors />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/sessions" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="student">
                      <MySessions />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/progress" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="student">
                      <ProgressTracker />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                
                {/* Mentor-specific routes */}
                <Route path="/mentor-dashboard" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="mentor">
                      <MentorDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/students" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="mentor">
                      <MyStudents />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="mentor">
                      <MyCourses />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
                <Route path="/schedule" element={
                  <ProtectedRoute>
                    <RoleRoute requiredRole="mentor">
                      <SessionSchedule />
                    </RoleRoute>
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chat />
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
