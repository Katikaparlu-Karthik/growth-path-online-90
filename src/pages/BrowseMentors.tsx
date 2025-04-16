
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronDown, Filter, Star, X } from 'lucide-react';

// Sample data for mentors
const mentors = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    title: 'Senior Data Scientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    sessions: 152,
    topics: ['Machine Learning', 'Data Visualization', 'Python'],
    price: 85,
    about: "With over 10 years of experience in data science and machine learning, I help professionals develop practical skills in AI and data analytics."
  },
  {
    id: 2,
    name: 'Michael Thompson',
    title: 'Product Manager at TechCorp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 98,
    topics: ['Product Strategy', 'UX Design', 'Agile'],
    price: 75,
    about: "I guide aspiring product managers through the complexities of building successful tech products and navigating career growth."
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    title: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 5.0,
    sessions: 210,
    topics: ['Digital Marketing', 'SEO', 'Content Strategy'],
    price: 90,
    about: "I help businesses and professionals master digital marketing strategies that drive real results in today's competitive landscape."
  },
  {
    id: 4,
    name: 'James Wilson',
    title: 'Software Engineering Lead',
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.7,
    sessions: 124,
    topics: ['Web Development', 'System Architecture', 'Career Growth'],
    price: 80,
    about: "I provide guidance on coding best practices, system design, and navigating the tech industry to help developers level up their skills."
  },
  {
    id: 5,
    name: 'Aisha Patel',
    title: 'UX Research Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 87,
    topics: ['User Research', 'Design Thinking', 'Usability Testing'],
    price: 95,
    about: "I help designers and researchers build user-centered products through effective research methodologies and insights analysis."
  },
  {
    id: 6,
    name: 'Robert Kim',
    title: 'Startup Founder & Advisor',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    sessions: 156,
    topics: ['Entrepreneurship', 'Fundraising', 'Business Strategy'],
    price: 120,
    about: "Having founded and exited two tech startups, I provide practical advice to entrepreneurs looking to start or scale their businesses."
  },
  {
    id: 7,
    name: 'Julia Martinez',
    title: 'Frontend Engineering Lead',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 112,
    topics: ['React', 'JavaScript', 'UI Architecture'],
    price: 85,
    about: "I specialize in modern frontend development, helping developers build scalable and performant web applications with React and related technologies."
  },
  {
    id: 8,
    name: 'Daniel Johnson',
    title: 'Career Coach',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.7,
    sessions: 320,
    topics: ['Interview Prep', 'Resume Building', 'Career Transitions'],
    price: 70,
    about: "I help professionals navigate career transitions, improve their interview skills, and land their dream jobs in competitive industries."
  }
];

// Sample data for filters
const skills = ['Machine Learning', 'Web Development', 'Digital Marketing', 'Product Management', 'UX Design', 'Data Science', 'Career Development', 'Business Strategy'];

const BrowseMentors: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    // Price filter
    if (mentor.price < priceRange[0] || mentor.price > priceRange[1]) {
      return false;
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      const mentorSkills = mentor.topics;
      const hasMatchingSkill = selectedSkills.some(skill => 
        mentorSkills.some(mentorSkill => 
          mentorSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) {
        return false;
      }
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return mentor.name.toLowerCase().includes(query) || 
             mentor.title.toLowerCase().includes(query) || 
             mentor.topics.some(topic => topic.toLowerCase().includes(query)) ||
             mentor.about.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Mentors</h1>
          <p className="mt-2 text-gray-600">Find the perfect mentor to help you achieve your goals</p>
          
          {/* Search bar */}
          <div className="mt-6 flex gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by name, expertise, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => {
                  setPriceRange([0, 150]);
                  setSelectedSkills([]);
                }}>
                  Reset
                </Button>
              </div>
              
              {/* Price range filter */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, 150]}
                  min={0}
                  max={150}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              {/* Skills filter */}
              <div>
                <h3 className="text-sm font-medium mb-4">Expertise</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <button
                        onClick={() => toggleSkill(skill)}
                        className={`flex items-center justify-between w-full px-2 py-1.5 rounded text-sm ${
                          selectedSkills.includes(skill)
                            ? 'bg-mentor-50 text-mentor-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{skill}</span>
                        {selectedSkills.includes(skill) && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mentors grid */}
          <div className="flex-grow">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing {filteredMentors.length} mentors</p>
              <select className="border rounded-md text-sm px-3 py-2">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <div 
                    key={mentor.id}
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
                        <span className="text-gray-500 text-sm">{mentor.sessions} sessions</span>
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
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.about}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-mentor-500">
                          ${mentor.price}<span className="text-sm text-gray-500 font-normal">/hour</span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="border-mentor-500 text-mentor-500 hover:bg-mentor-50">
                          <a href={`/mentor/${mentor.id}`}>View Profile</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No mentors found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowseMentors;
