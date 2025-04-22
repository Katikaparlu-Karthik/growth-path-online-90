
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Learn and Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-mentor-500 to-learner-500">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            Connect with experienced mentors who can guide your professional journey. 
            Personalized mentorship to help you achieve your career goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-mentor-500 hover:bg-mentor-600 text-white px-8">
              Find a Mentor
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-mentor-500 text-mentor-500 hover:bg-mentor-50"
              onClick={() => navigate('/mentor-signup')}
            >
              Become a Mentor
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute -bottom-24 -right-24 lg:-right-10 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-tl from-learner-200/70 to-mentor-200/70 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
