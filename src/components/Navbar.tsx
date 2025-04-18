
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

const Navbar: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
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
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

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

  return (
    <nav className="w-full py-4 px-4 md:px-8 border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-mentor-500">
            Growth<span className="text-learner-500">Path</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
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

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="hidden md:inline-block text-sm">
                {user.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:inline-flex"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
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
