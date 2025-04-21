
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  User,
  Book,
  Heart,
  Users,
  Calendar,
  Activity,
  Settings,
  HelpCircle,
  LogOut,
  StretchHorizontal,
  Briefcase,
  GraduationCap,
  PanelTop,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'student' | 'mentor'>('student');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('User');
  
  useEffect(() => {
    // Check for existing session and get user role
    const getUserDetails = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserEmail(session.user.email || '');
        
        // Try to get first and last name from profiles table
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, role')
          .eq('id', session.user.id)
          .single();
        
        if (profileData && !error) {
          if (profileData.first_name && profileData.last_name) {
            setUserName(`${profileData.first_name} ${profileData.last_name}`);
          } else {
            // Fallback to email username
            setUserName(session.user.email?.split('@')[0] || 'User');
          }
          
          if (profileData.role) {
            setUserRole(profileData.role as 'student' | 'mentor');
          }
        } else {
          // Fallback to email username
          setUserName(session.user.email?.split('@')[0] || 'User');
        }
      } else {
        // Check localStorage as fallback
        const persistedRole = localStorage.getItem('userRole');
        if (persistedRole === 'mentor' || persistedRole === 'student') {
          setUserRole(persistedRole);
        }
      }
    };
    
    getUserDetails();
  }, [location.pathname]);
  
  // Define menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: Heart, label: "Favourites", href: "/favorites" },
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: HelpCircle, label: "Help", href: "/help" },
      { icon: LogOut, label: "Logout", href: "#logout" },
    ];
    
    const studentItems = [
      { icon: Book, label: "My Learning", href: "/learning" },
      { icon: Users, label: "My Mentors", href: "/mentors" },
      { icon: Calendar, label: "My Sessions", href: "/sessions" },
      { icon: Activity, label: "Progress Tracker", href: "/progress" },
    ];
    
    const mentorItems = [
      { icon: PanelTop, label: "Mentor Dashboard", href: "/mentor-dashboard" },
      { icon: GraduationCap, label: "My Students", href: "/students" },
      { icon: Briefcase, label: "My Courses", href: "/courses" },
      { icon: Calendar, label: "Session Schedule", href: "/schedule" },
    ];
    
    // Add switch role option at the end
    const switchRoleItem = [
      { icon: StretchHorizontal, label: "Switch Role", href: "/switch-role" },
    ];
    
    if (userRole === 'mentor') {
      return [...commonItems.slice(0, 1), ...mentorItems, ...commonItems.slice(1), ...switchRoleItem];
    } else {
      return [...commonItems.slice(0, 1), ...studentItems, ...commonItems.slice(1), ...switchRoleItem];
    }
  };
  
  // Handle logout functionality
  const handleItemClick = async (href: string, label: string) => {
    if (label === "Logout") {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Logged out",
        description: "You have been signed out successfully",
      });
      
      // Clear localStorage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('userRole');
      
      navigate('/');
      return;
    }
  };
  
  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt="User Avatar" />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{userName}</h2>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
            <span className="text-xs px-2 py-0.5 bg-mentor-100 text-mentor-700 rounded-full">
              {userRole === 'mentor' ? 'Mentor' : 'Student'}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {getMenuItems().map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  className={`w-full justify-start gap-2 transition-colors hover:bg-sidebar-accent/70 ${
                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''
                  }`}
                  onClick={() => handleItemClick(item.href, item.label)}
                >
                  {item.href !== "#logout" ? (
                    <Link to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button className="flex w-full items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
