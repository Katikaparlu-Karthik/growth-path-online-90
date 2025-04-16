
import React from 'react';
import { Calendar, Users, CreditCard, ArrowUpRight } from 'lucide-react';

const features = [
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your calendar. Our platform adapts to your availability.',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Expert Mentors',
    description: 'Connect with verified professionals with proven expertise in their fields.',
    icon: Users,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Seamless Payments',
    description: 'Secure and hassle-free payment system. Pay only for the time you need.',
    icon: CreditCard,
    color: 'bg-green-100 text-green-600'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose GrowthPath</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides everything you need for successful mentorship relationships
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white relative overflow-hidden group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-mentor-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              <ArrowUpRight className="absolute bottom-4 right-4 h-5 w-5 text-gray-300 group-hover:text-mentor-500 transition-colors" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="text-mentor-500 hover:text-mentor-600 inline-flex items-center font-medium">
            Learn more about our features
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
