
import React from 'react';
import { Code, Briefcase, LineChart, Palette, Mic, BookOpen, Brain, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Technology',
    icon: Code,
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    count: 1245,
  },
  {
    title: 'Business',
    icon: Briefcase,
    color: 'bg-green-100 text-green-600 border-green-200',
    count: 987,
  },
  {
    title: 'Marketing',
    icon: LineChart,
    color: 'bg-purple-100 text-purple-600 border-purple-200',
    count: 762,
  },
  {
    title: 'Design',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600 border-pink-200',
    count: 651,
  },
  {
    title: 'Communication',
    icon: Mic,
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    count: 520,
  },
  {
    title: 'Education',
    icon: BookOpen,
    color: 'bg-orange-100 text-orange-600 border-orange-200',
    count: 483,
  },
  {
    title: 'Personal Growth',
    icon: Brain,
    color: 'bg-teal-100 text-teal-600 border-teal-200',
    count: 398,
  },
  {
    title: 'International',
    icon: Globe,
    color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    count: 321,
  },
];

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Mentorship Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find mentors specializing in your area of interest
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link 
              to="/browse" 
              key={index}
              className="group bg-white p-4 sm:p-6 rounded-xl border border-gray-100 hover:shadow-md hover:border-mentor-200 transition-all flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-mentor-500 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500">{category.count} mentors</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
