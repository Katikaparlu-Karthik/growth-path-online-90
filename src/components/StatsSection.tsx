
import React from 'react';
import { Users, Calendar, Award } from 'lucide-react';

const stats = [
  {
    title: '10,000+',
    description: 'Active Mentors',
    icon: Users
  },
  {
    title: '50,000+',
    description: 'Successful Sessions',
    icon: Calendar
  },
  {
    title: '95%',
    description: 'Satisfaction Rate',
    icon: Award
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals advancing their careers through mentorship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-8 border border-gray-100 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-mentor-100 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-mentor-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-lg text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
