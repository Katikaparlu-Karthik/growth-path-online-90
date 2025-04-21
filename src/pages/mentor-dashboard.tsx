
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, Clock, Users, TrendingUp, BookOpen, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const MentorDashboard: React.FC = () => {
  const [userName, setUserName] = useState('Mentor');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSessions: 0,
    upcomingSessions: 0,
    totalEarnings: 0,
  });
  
  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      studentName: "Alex Johnson",
      date: "2025-04-22T14:00:00",
      duration: 60,
      topic: "Career Transition Guidance",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      studentName: "Samantha Lee",
      date: "2025-04-23T10:00:00",
      duration: 45,
      topic: "Technical Interview Preparation",
      image: "/placeholder.svg"
    }
  ]);
  
  const [recentRequests, setRecentRequests] = useState([
    {
      id: 1,
      studentName: "Jordan Smith",
      date: "2025-04-21T09:30:00",
      topic: "Machine Learning Fundamentals",
      status: "pending",
      image: "/placeholder.svg"
    }
  ]);
  
  useEffect(() => {
    const getUserDetails = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', session.user.id)
            .single();
            
          if (profileData && profileData.first_name && profileData.last_name) {
            setUserName(`${profileData.first_name} ${profileData.last_name}`);
          } else {
            // Fallback to email username
            const userEmail = session.user.email || '';
            setUserName(userEmail.split('@')[0]);
          }
          
          // In a real app, you'd fetch actual stats and session data here
          // For this demo, we'll use the mock data
        }
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUserDetails();
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mentor-100 text-mentor-500 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-1">{stats.totalStudents}</CardTitle>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mentor-100 text-mentor-500 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-1">{stats.totalSessions}</CardTitle>
              <p className="text-sm text-gray-500">Total Sessions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mentor-100 text-mentor-500 mb-4">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-1">{stats.upcomingSessions}</CardTitle>
              <p className="text-sm text-gray-500">Upcoming Sessions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mentor-100 text-mentor-500 mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl mb-1">${stats.totalEarnings}</CardTitle>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="requests">New Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingSessions.map(session => (
                        <div key={session.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                          <Avatar>
                            <AvatarImage src={session.image} alt={session.studentName} />
                            <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{session.studentName}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>{formatDate(session.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{session.duration} minutes</span>
                            </div>
                            <p className="text-sm text-gray-700">{session.topic}</p>
                          </div>
                          <Button>Join</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No upcoming sessions
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Session Requests</CardTitle>
                  <CardDescription>Students requesting mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentRequests.length > 0 ? (
                    <div className="space-y-6">
                      {recentRequests.map(request => (
                        <div key={request.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                          <Avatar>
                            <AvatarImage src={request.image} alt={request.studentName} />
                            <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{request.studentName}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>Requested for {formatDate(request.date)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{request.topic}</p>
                          </div>
                          <div className="space-y-2">
                            <Button className="w-full" size="sm">Accept</Button>
                            <Button variant="outline" className="w-full" size="sm">Decline</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No pending requests
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Mentor presence and visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg" alt="Mentor Avatar" />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{userName}</h3>
                <p className="text-sm text-gray-500 mb-4">Mentor</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>Profile views: 124 this month</span>
                </div>
                <Button variant="outline" className="w-full mb-2">
                  View Public Profile
                </Button>
                <Button className="w-full bg-mentor-500 hover:bg-mentor-600">
                  Update Availability
                </Button>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">Add Course</Button>
                  <Button variant="outline" size="sm" className="w-full">View Reviews</Button>
                  <Button variant="outline" size="sm" className="w-full">Update Skills</Button>
                  <Button variant="outline" size="sm" className="w-full">Earnings Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
