
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Store session for persistence
      localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
      
      // Check if user has a profile and retrieve role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      if (profileData && !profileError) {
        localStorage.setItem('userRole', profileData.role);
      } else {
        // Default to student if no role is found
        localStorage.setItem('userRole', 'student');
        
        // Create a profile if one doesn't exist
        await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            role: 'student',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      
      onOpenChange(false);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTP = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to receive an OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsOtpLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (error) {
        toast({
          title: "OTP sending failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "OTP sent",
        description: "Check your email for the verification code",
      });

      // Close modal and navigate to verification page
      onOpenChange(false);
      navigate(`/verify?type=email`);
    } catch (error) {
      console.error("OTP error:", error);
      toast({
        title: "OTP sending failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Log In</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2 bg-mentor-500 hover:bg-mentor-600" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleOTP}
            disabled={isOtpLoading || !email}
          >
            {isOtpLoading ? "Sending..." : "Sign in with OTP"}
          </Button>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={onSignUpClick}
                className="text-mentor-500 hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
