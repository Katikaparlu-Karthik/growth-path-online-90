import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import FeaturesSection from '@/components/FeaturesSection';
import CategoriesSection from '@/components/CategoriesSection';
import HowItWorksPreview from '@/components/HowItWorksPreview';
import StatsSection from '@/components/StatsSection';
import PopularMentors from '@/components/PopularMentors';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SignupModal from '@/components/SignupModal';
import { supabase } from '@/integrations/supabase/client';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupRole, setSignupRole] = useState<'learner' | 'mentor'>('learner');

  // Callback to open the modal for given role
  const handleOpenSignupModal = useCallback(async (role: 'mentor' | 'learner') => {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData.session) {
      // If user is logged in and wants to become a mentor, redirect to become-mentor page
      if (role === 'mentor') {
        navigate('/become-mentor');
        return;
      }
    }
    
    // Otherwise open signup modal
    setSignupRole(role);
    setSignupOpen(true);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onOpenSignupModal={handleOpenSignupModal} />
      <SearchBar />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksPreview />
      <StatsSection />
      <PopularMentors />
      <TestimonialsSection />
      <CTASection onOpenSignupModal={handleOpenSignupModal} />
      <Footer />

      {/* Signup Modal always present, controlled */}
      <SignupModal
        isOpen={signupOpen}
        onOpenChange={setSignupOpen}
        onLoginClick={() => {}}
        defaultRole={signupRole}
      />
    </div>
  );
};

export default Index;
