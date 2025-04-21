
import React from 'react';
import { Link } from 'react-router-dom';
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
  StretchHorizontal,  // Changed from SwitchHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Book, label: "My Learning", href: "/learning" },
  { icon: Heart, label: "Favourites", href: "/favorites" },
  { icon: Users, label: "My Mentors", href: "/mentors" },
  { icon: Calendar, label: "My Sessions", href: "/sessions" },
  { icon: Activity, label: "Progress Tracker", href: "/progress" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: LogOut, label: "Logout", href: "/logout" },
  { icon: StretchHorizontal, label: "Switch Role", href: "/switch-role" }, // Updated icon
];

const AppSidebar = () => {
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
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className="w-full justify-start gap-2"
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default AppSidebar;
