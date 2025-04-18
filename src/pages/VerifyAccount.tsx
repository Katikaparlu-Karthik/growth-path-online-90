
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from 'lucide-react';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'email';
  const userId = searchParams.get('userId') || '';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>(type as 'email' | 'phone');

  useEffect(() => {
    // Fetch user details if userId is provided
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        const { data, error } = await supabase
          .from('profiles')
          .select('phone')
          .eq('id', user.id)
          .single();
          
        if (data && data.phone) {
          setPhone(data.phone);
        }

        if (error) {
          console.error('Error fetching profile:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSendOTP = async (verificationType: 'email' | 'phone') => {
    try {
      setIsLoading(true);

      // Get the current user if not provided in URL
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please log in to verify your account",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }
        currentUserId = user.id;
      }

      // Generate a random 6-digit code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the code in the database
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes expiry
      
      const { error: insertError } = await supabase
        .from('verification_codes')
        .insert({
          user_id: currentUserId,
          code: generatedCode,
          type: verificationType,
          expires_at: expiresAt.toISOString(),
        });
        
      if (insertError) {
        throw insertError;
      }
      
      // Send the OTP
      if (verificationType === 'email') {
        // Call the edge function to send email OTP
        const response = await fetch('https://zbifenuizimkqugjgyom.supabase.co/functions/v1/send-email-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({
            email,
            code: generatedCode,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send email OTP');
        }
      } else {
        // Call the edge function to send SMS OTP
        const response = await fetch('https://zbifenuizimkqugjgyom.supabase.co/functions/v1/send-sms-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({
            phone,
            code: generatedCode,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send SMS OTP');
        }
      }
      
      toast({
        title: "OTP sent",
        description: `Verification code has been sent to your ${verificationType === 'email' ? 'email' : 'phone'}`,
      });
    } catch (error: any) {
      console.error(`Error sending ${activeTab} OTP:`, error);
      toast({
        title: "Failed to send OTP",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      
      // Get the current user if not provided in URL
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please log in to verify your account",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }
        currentUserId = user.id;
      }
      
      // Check if the code exists and is valid
      const { data, error } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('user_id', currentUserId)
        .eq('type', activeTab)
        .eq('code', otpCode)
        .gt('expires_at', new Date().toISOString())
        .eq('verified', false)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (error) {
        throw error;
      }
      
      if (!data || data.length === 0) {
        toast({
          title: "Invalid code",
          description: "The verification code is invalid or has expired",
          variant: "destructive",
        });
        return;
      }
      
      // Mark the code as verified
      const { error: updateError } = await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', data[0].id);
        
      if (updateError) {
        throw updateError;
      }
      
      // Update the user's profile to mark verification
      const updateData: Record<string, any> = {};
      if (activeTab === 'email') {
        updateData.email_verified = true;
      } else {
        updateData.phone_verified = true;
      }
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', currentUserId);
        
      if (profileError) {
        throw profileError;
      }
      
      toast({
        title: "Verification successful",
        description: `Your ${activeTab} has been verified successfully`,
      });
      
      // Redirect to homepage after successful verification
      navigate('/', { replace: true });
      
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10">
      <Card className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </button>
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Account</CardTitle>
          <CardDescription>
            Enter the verification code sent to your {activeTab}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'email' | 'phone')} 
            className="w-full"
          >
            <TabsList className="flex justify-center space-x-4 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  We'll send a verification code to your email:
                </p>
                <p className="font-medium">{email || "No email available"}</p>
              </div>
              
              <Button 
                onClick={() => handleSendOTP('email')}
                disabled={isLoading || !email}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  We'll send a verification code to your phone:
                </p>
                <p className="font-medium">{phone || "No phone number available"}</p>
              </div>
              
              <Button 
                onClick={() => handleSendOTP('phone')}
                disabled={isLoading || !phone}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-center font-medium">Enter verification code</p>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6}
                  value={otpCode}
                  onChange={(value) => setOtpCode(value)}
                  pattern="[0-9]*"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            
            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otpCode.length !== 6}
              className="w-full"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyAccount;
