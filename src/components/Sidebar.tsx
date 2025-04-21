
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const menuItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Book, label: "My Learning", href: "/learning" },
  { icon: Heart, label: "Favourites", href: "/favorites" },
  { icon: Users, label: "My Mentors", href: "/mentors" },
  { icon: Calendar, label: "My Sessions", href: "/sessions" },
  { icon: Activity, label: "Progress Tracker", href: "/progress" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: LogOut, label: "Logout", href: "#logout" },
  { icon: StretchHorizontal, label: "Switch Role", href: "/switch-role" },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">User Name</h2>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
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

export default AppSidebar;
