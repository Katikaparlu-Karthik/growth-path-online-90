import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Calendar, Clock, Award, Book, Globe, CheckCircle, ChevronRight } from 'lucide-react';
import ScheduleSessionButton from '@/components/session/ScheduleSessionButton';
import MessageButton from '@/components/session/MessageButton';

// Mock data for a sample mentor
const mentorData = {
  id: 1,
  name: 'Dr. Emily Chen',
  title: 'Senior Data Scientist',
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  rating: 4.8,
  sessions: 152,
  topics: ['Machine Learning', 'Data Visualization', 'Python', 'Career Development', 'Interview Prep'],
  price: 85,
  about: "With over 10 years of experience in data science and machine learning, I help professionals develop practical skills in AI and data analytics. I've worked with Fortune 500 companies and startups alike, and I'm passionate about making complex technical concepts accessible to everyone. My approach focuses on hands-on learning through real-world projects and personalized feedback.",
  experience: [
    {
      title: 'Senior Data Scientist',
      company: 'TechCorp Inc.',
      period: '2019 - Present',
      description: 'Leading a team of data scientists in developing ML models for predictive analytics.'
    },
    {
      title: 'Data Scientist',
      company: 'AI Solutions',
      period: '2016 - 2019',
      description: 'Developed and deployed machine learning models for various business applications.'
    },
    {
      title: 'Research Assistant',
      company: 'University of Technology',
      period: '2014 - 2016',
      description: 'Conducted research in deep learning and computer vision.'
    }
  ],
  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'University of Technology',
      year: '2014'
    },
    {
      degree: 'M.S. in Applied Mathematics',
      institution: 'State University',
      year: '2010'
    }
  ],
  testimonials: [
    {
      name: 'Alex Johnson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      rating: 5,
      text: 'Emily is an exceptional mentor. She helped me understand complex ML concepts and guided me through implementing a project that landed me my dream job.'
    },
    {
      name: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      rating: 5,
      text: 'I came to Emily as a complete beginner in data science. Her patient teaching style and practical approach helped me build confidence and real skills.'
    },
    {
      name: 'Michael Torres',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      rating: 4,
      text: 'Dr. Chen provided valuable insights for my career transition into data science. Her industry experience was particularly helpful in navigating job interviews.'
    }
  ],
  availability: {
    timezone: 'Pacific Time (PT)',
    schedule: [
      { day: 'Monday', slots: ['9:00 AM - 11:00 AM', '2:00 PM - 5:00 PM'] },
      { day: 'Tuesday', slots: ['8:00 AM - 12:00 PM'] },
      { day: 'Wednesday', slots: ['1:00 PM - 4:00 PM'] },
      { day: 'Thursday', slots: ['9:00 AM - 11:00 AM', '3:00 PM - 5:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM - 2:00 PM'] },
    ]
  }
};

const MentorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mentor = mentorData; // In a real app, fetch the mentor data based on the ID
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back navigation */}
        <div className="mb-6">
          <a href="/browse" className="text-gray-600 hover:text-mentor-500 flex items-center gap-1">
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back to Browse</span>
          </a>
        </div>
        
        {/* Profile header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-mentor-500 to-learner-500 h-32"></div>
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row">
              {/* Profile image */}
              <div className="absolute -top-16 left-8">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="sm:pl-40 mt-20 sm:mt-0 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{mentor.name}</h1>
                    <p className="text-gray-600">{mentor.title}</p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{mentor.rating}</span>
                      <span className="ml-1 text-gray-500">({mentor.testimonials.length} reviews)</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="ml-1 text-gray-600">{mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.topics.map((topic, i) => (
                    <span 
                      key={i} 
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-2xl font-bold text-mentor-500">
                ${mentor.price}<span className="text-base font-normal text-gray-600">/hour</span>
              </div>
              
              <div className="flex gap-3">
                <MessageButton 
                  mentorId={id || "1"} 
                  mentorName={mentor.name}
                />
                <ScheduleSessionButton 
                  mentorId={id || "1"} 
                  mentorName={mentor.name}
                  className="bg-mentor-500 hover:bg-mentor-600"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile content */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-700 whitespace-pre-line mb-8">{mentor.about}</p>
                
                <h3 className="text-lg font-medium mb-4">Education</h3>
                <div className="space-y-4 mb-8">
                  {mentor.education.map((edu, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-mentor-100 flex items-center justify-center">
                          <Book className="h-5 w-5 text-mentor-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}, {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-medium mb-4">Areas of Expertise</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {mentor.topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-mentor-500 mr-2" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="experience" className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
                <div className="space-y-8">
                  {mentor.experience.map((exp, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 rounded-full bg-mentor-100 flex items-center justify-center">
                          <Award className="h-5 w-5 text-mentor-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-mentor-600">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="testimonials" className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{mentor.rating}</span>
                    <span className="ml-1 text-gray-500">({mentor.testimonials.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {mentor.testimonials.map((testimonial, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{testimonial.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="font-semibold text-lg mb-4">Availability</h3>
              <div className="flex items-center mb-6">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <span>Timezone: {mentor.availability.timezone}</span>
              </div>
              
              <div className="space-y-4">
                {mentor.availability.schedule.map((day, i) => (
                  <div key={i}>
                    <h4 className="font-medium text-gray-900 mb-2">{day.day}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {day.slots.map((slot, j) => (
                        <div key={j} className="text-sm p-2 bg-mentor-50 text-mentor-700 rounded-md flex items-center">
                          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{slot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <ScheduleSessionButton
                mentorId={id || "1"}
                mentorName={mentor.name}
                className="w-full mt-8 bg-mentor-500 hover:bg-mentor-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
