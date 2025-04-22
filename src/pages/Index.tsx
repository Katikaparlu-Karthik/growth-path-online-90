
import React, { useState, useCallback } from 'react';
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

const Index: React.FC = () => {
  // control the signup modal and track which role we want
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupRole, setSignupRole] = useState<'learner' | 'mentor'>('learner');

  // Callback to open the modal for given role
  const handleOpenSignupModal = useCallback((role: 'mentor' | 'learner') => {
    setSignupRole(role);
    setSignupOpen(true);
  }, []);

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
