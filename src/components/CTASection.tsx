
import React from 'react';
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenSignupModal?: (role: 'mentor' | 'learner') => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenSignupModal }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-mentor-500 to-learner-500 opacity-90"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to accelerate your growth?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are advancing their careers through personalized mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-mentor-500 hover:bg-gray-100"
              onClick={() => onOpenSignupModal && onOpenSignupModal('learner')}
            >
              Find Your Mentor
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => onOpenSignupModal && onOpenSignupModal('mentor')}
            >
              Become a Mentor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
