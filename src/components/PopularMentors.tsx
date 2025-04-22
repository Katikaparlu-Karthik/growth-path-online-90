
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight } from 'lucide-react';

const mentors = [
  {
    name: 'Dr. Emily Chen',
    title: 'Senior Data Scientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    sessions: 152,
    topics: ['Machine Learning', 'Data Visualization', 'Python'],
    price: 85
  },
  {
    name: 'Michael Thompson',
    title: 'Product Manager at TechCorp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 98,
    topics: ['Product Strategy', 'UX Design', 'Agile'],
    price: 75
  },
  {
    name: 'Sophia Rodriguez',
    title: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 5.0,
    sessions: 210,
    topics: ['Digital Marketing', 'SEO', 'Content Strategy'],
    price: 90
  },
  {
    name: 'James Wilson',
    title: 'Software Engineering Lead',
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.7,
    sessions: 124,
    topics: ['Web Development', 'System Architecture', 'Career Growth'],
    price: 80
  }
];

const PopularMentors: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Mentors</h2>
            <p className="text-xl text-gray-600">
              Our top-rated mentors ready to help you succeed
            </p>
          </div>
          <a href="#" className="text-mentor-500 hover:text-mentor-600 inline-flex items-center font-medium mt-4 md:mt-0">
            View all mentors
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white"
            >
              <div className="p-1">
                <img 
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium ml-1 text-gray-900">{mentor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{mentor.title}</p>
                
                <div className="mb-4 flex flex-wrap gap-1">
                  {mentor.topics.map((topic, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-mentor-500">
                    ${mentor.price}<span className="text-sm text-gray-500 font-normal">/hour</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-mentor-500 text-mentor-500 hover:bg-mentor-50"
                    onClick={() => window.location.href = `/mentor/${index + 1}`}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMentors;
