
import React from 'react';
import Navbar from '@/components/Navbar';
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

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksPreview />
      <StatsSection />
      <PopularMentors />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
