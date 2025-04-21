
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    role: "Senior Product Manager at Tech Corp",
    expertise: ["Career Development", "Product Management"],
    rating: 4.9,
    sessions: 120,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Engineering Director at InnovateCo",
    expertise: ["Leadership", "Technical Growth"],
    rating: 4.8,
    sessions: 85,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "HR Executive at Global Inc",
    expertise: ["Interview Preparation", "Resume Building"],
    rating: 5.0,
    sessions: 210,
    image: "/placeholder.svg"
  }
];

const resources = [
  {
    id: 1,
    title: "Career Growth Strategies",
    type: "Article",
    author: "Emma Johnson",
    date: "Mar 15, 2023"
  },
  {
    id: 2,
    title: "Technical Interview Preparation",
    type: "Video",
    author: "Michael Chen",
    date: "Apr 22, 2023"
  },
  {
    id: 3,
    title: "Effective Communication in Workplace",
    type: "Webinar",
    author: "Sarah Williams",
    date: "May 10, 2023"
  }
];

const Favorites: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      
      <Tabs defaultValue="mentors">
        <TabsList className="mb-8">
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mentors">
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2 text-red-500 hover:text-red-600 hover:bg-transparent"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                  
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-center">{mentor.name}</CardTitle>
                    <CardDescription className="text-center">{mentor.role}</CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Expertise:</p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, i) => (
                          <span 
                            key={i}
                            className="bg-mentor-100 text-mentor-700 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Rating: {mentor.rating}/5</span>
                      <span>{mentor.sessions} Sessions</span>
                    </div>
                    
                    <Button className="w-full bg-mentor-500 hover:bg-mentor-600">Book a Session</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map(resource => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>By {resource.author} • {resource.date}</CardDescription>
                    </div>
                    <span className="bg-learner-100 text-learner-700 px-3 py-1 rounded-full text-xs">
                      {resource.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <Button variant="outline">View Resource</Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-600 hover:bg-transparent"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sessions">
          <div className="text-center py-12">
            <p className="text-gray-500">Your favorite sessions will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Favorites;
