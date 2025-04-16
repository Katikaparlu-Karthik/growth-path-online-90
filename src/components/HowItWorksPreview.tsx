
import React from 'react';
import { Search, Calendar, Video, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Find a Mentor',
    description: 'Search for mentors by skills, experience, or availability to find your perfect match.',
    icon: Search,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Book a Session',
    description: 'Schedule a session at a time that works for both you and your mentor.',
    icon: Calendar,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Connect & Learn',
    description: 'Meet via video call to discuss your goals and receive personalized guidance.',
    icon: Video,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Grow Your Skills',
    description: 'Apply what you've learned and track your progress with your mentor's help.',
    icon: Award,
    color: 'bg-orange-100 text-orange-600'
  }
];

const HowItWorksPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How GrowthPath Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple process connects you with the right mentors to achieve your goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-4`}>
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute top-4 right-4 text-gray-200 font-bold text-xl">{index + 1}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-mentor-500 hover:bg-mentor-600">
            <Link to="/how-it-works">Learn More About Our Process</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPreview;
