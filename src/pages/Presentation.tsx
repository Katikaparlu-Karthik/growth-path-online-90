
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  bgClass: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to GrowthPath",
    subtitle: "Your Journey to Professional Excellence",
    content: (
      <div className="space-y-6">
        <p className="text-xl">
          Connect with expert mentors and accelerate your career growth through personalized guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {['10,000+ Mentors', '50,000+ Sessions', '95% Satisfaction'].map((stat, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="text-2xl font-bold">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    bgClass: "bg-gradient-to-br from-mentor-500 to-learner-500",
  },
  {
    id: 2,
    title: "For Learners",
    subtitle: "Accelerate Your Growth",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p>Access industry professionals with proven expertise</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p>Schedule sessions that fit your calendar</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p>Monitor your growth with detailed analytics</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
            <p>Access curated learning materials</p>
          </div>
        </div>
      </div>
    ),
    bgClass: "bg-gradient-to-br from-blue-600 to-purple-600",
  },
  {
    id: 3,
    title: "For Mentors",
    subtitle: "Share Your Expertise",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
            <p>Mentor on your own terms</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Fair Compensation</h3>
            <p>Set your own rates</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Impact Lives</h3>
            <p>Help others grow and succeed</p>
          </div>
        </div>
      </div>
    ),
    bgClass: "bg-gradient-to-br from-green-600 to-teal-600",
  },
  {
    id: 4,
    title: "How It Works",
    subtitle: "Simple and Effective",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Find a Mentor", desc: "Browse profiles and reviews" },
            { step: "2", title: "Book a Session", desc: "Schedule at your convenience" },
            { step: "3", title: "Connect & Learn", desc: "Meet via video call" },
            { step: "4", title: "Track Progress", desc: "Monitor your growth" },
          ].map((item) => (
            <div key={item.step} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    bgClass: "bg-gradient-to-br from-orange-600 to-pink-600",
  },
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className={cn(
        "flex-1 transition-colors duration-500",
        slides[currentSlide].bgClass
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-white">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/20 mb-8 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>

            {/* Slide content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-white/90">
                {slides[currentSlide].subtitle}
              </p>
              <div className="animate-scale-in">
                {slides[currentSlide].content}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12">
              <Button
                variant="outline"
                onClick={prevSlide}
                className="border-white text-white hover:bg-white/10"
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="mr-2" />
                Previous
              </Button>
              <div className="text-white/90">
                {currentSlide + 1} / {slides.length}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                className="border-white text-white hover:bg-white/10"
                disabled={currentSlide === slides.length - 1}
              >
                Next
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
