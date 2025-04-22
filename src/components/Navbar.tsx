
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';
import { Menu } from 'lucide-react';
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'mentor'>('student');
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          // Fetch user role from profiles table
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();
            
          if (data && !error) {
            setUserRole(data.role as 'student' | 'mentor');
            // Store role in localStorage for persistence
            localStorage.setItem('userRole', data.role);
          } else {
            // Default to student if no role found
            setUserRole('student');
            localStorage.setItem('userRole', 'student');
          }
          
          // Store session for persistence
          localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        }
        
        // If this is a sign in event, show a welcome toast
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You are now signed in",
          });
        }
        
        // If this is a sign out event, show a goodbye toast
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Goodbye!",
            description: "You have been signed out",
          });
          // Clear persisted data
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('userRole');
        }
      }
    );

    // Check for existing session
    const checkExistingSession = async () => {
      // First try to get session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        
        // Fetch user role
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (data && !error) {
          setUserRole(data.role as 'student' | 'mentor');
        } else {
          setUserRole('student');
        }
      } else {
        // If no active session, check localStorage as fallback
        const persistedSession = localStorage.getItem('supabase.auth.token');
        const persistedRole = localStorage.getItem('userRole');
        
        if (persistedSession) {
          try {
            const parsedSession = JSON.parse(persistedSession);
            // Attempt to restore session
            await supabase.auth.setSession({
              access_token: parsedSession.access_token,
              refresh_token: parsedSession.refresh_token,
            });
            // Session will be picked up by the onAuthStateChange listener
          } catch (e) {
            console.error("Failed to restore session:", e);
            localStorage.removeItem('supabase.auth.token');
            localStorage.removeItem('userRole');
          }
        }
        
        if (persistedRole) {
          setUserRole(persistedRole as 'student' | 'mentor');
        }
      }
    };
    
    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openLoginModal = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    navigate('/');
  };

  // Helper function to get first name
  const getFirstName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <nav className="w-full py-4 px-4 md:px-8 border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-mentor-500">
              Growth<span className="text-learner-500">Path</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/browse" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Find Mentors
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            How It Works
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Resources
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center gap-6">
              {userRole === 'student' && (
                <Button
                  variant="outline" 
                  className="hidden md:inline-flex border-mentor-500 text-mentor-500 hover:bg-mentor-50"
                  onClick={() => navigate('/mentor-signup')}
                >
                  Become a Mentor
                </Button>
              )}
              <span className="hidden md:inline-block text-sm">
                {getFirstName(user.email || '')}
              </span>
              <SidebarTrigger className="inline-flex">
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:inline-flex"
                onClick={openLoginModal}
              >
                Log In
              </Button>
              <Button 
                className="bg-gradient-to-r from-mentor-500 to-learner-500 text-white hover:opacity-90"
                onClick={openSignupModal}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
        onSignUpClick={openSignupModal}
      />

      <SignupModal 
        isOpen={signupModalOpen} 
        onOpenChange={setSignupModalOpen} 
        onLoginClick={openLoginModal}
      />
    </nav>
  );
};

export default Navbar;
