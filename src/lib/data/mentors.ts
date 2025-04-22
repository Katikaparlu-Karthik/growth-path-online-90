
// Mock mentor data for demo purposes
export interface MentorData {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  sessions: number;
  topics: string[];
  price: number;
  availability: string[];
  experienceLevel: string;
}

export const mentors: MentorData[] = [
  {
    id: "1",
    name: 'Dr. Emily Chen',
    title: 'Senior Data Scientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    sessions: 152,
    topics: ['Machine Learning', 'Data Visualization', 'Python'],
    price: 85,
    availability: ['weekdays', 'evenings'],
    experienceLevel: 'expert'
  },
  {
    id: "2",
    name: 'Michael Thompson',
    title: 'Product Manager at TechCorp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 98,
    topics: ['Product Strategy', 'UX Design', 'Agile'],
    price: 75,
    availability: ['weekends', 'evenings'],
    experienceLevel: 'advanced'
  },
  {
    id: "3",
    name: 'Sophia Rodriguez',
    title: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 5.0,
    sessions: 210,
    topics: ['Digital Marketing', 'SEO', 'Content Strategy'],
    price: 90,
    availability: ['weekdays', 'mornings'],
    experienceLevel: 'expert'
  },
  {
    id: "4",
    name: 'James Wilson',
    title: 'Software Engineering Lead',
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.7,
    sessions: 124,
    topics: ['Web Development', 'System Architecture', 'Career Growth'],
    price: 80,
    availability: ['weekends'],
    experienceLevel: 'intermediate'
  },
  {
    id: "5",
    name: 'Aisha Johnson',
    title: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 87,
    topics: ['UI Design', 'User Research', 'Design Systems'],
    price: 70,
    availability: ['weekdays', 'evenings'],
    experienceLevel: 'intermediate'
  },
  {
    id: "6",
    name: 'Robert Chen',
    title: 'Financial Advisor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    sessions: 156,
    topics: ['Investment Strategy', 'Retirement Planning', 'Personal Finance'],
    price: 95,
    availability: ['weekends', 'mornings'],
    experienceLevel: 'beginner'
  },
  {
    id: "7",
    name: 'Lisa Patel',
    title: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.6,
    sessions: 63,
    topics: ['React', 'JavaScript', 'CSS'],
    price: 65,
    availability: ['weekdays', 'evenings'],
    experienceLevel: 'beginner'
  },
  {
    id: "8",
    name: 'David Kim',
    title: 'Growth Marketer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    sessions: 112,
    topics: ['Growth Strategies', 'Conversion Optimization', 'Analytics'],
    price: 85,
    availability: ['weekends', 'evenings'],
    experienceLevel: 'advanced'
  }
];

// Search functionality
export const searchMentors = (
  query: string = '',
  availability: string = '',
  experienceLevel: string = ''
): MentorData[] => {
  return mentors.filter((mentor) => {
    // Filter by search query (skills, name, or title)
    const queryMatch = !query || 
      mentor.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase())) ||
      mentor.name.toLowerCase().includes(query.toLowerCase()) ||
      mentor.title.toLowerCase().includes(query.toLowerCase());
    
    // Filter by availability
    const availabilityMatch = !availability || mentor.availability.includes(availability);
    
    // Filter by experience level
    const experienceLevelMatch = !experienceLevel || mentor.experienceLevel === experienceLevel;
    
    return queryMatch && availabilityMatch && experienceLevelMatch;
  });
};
