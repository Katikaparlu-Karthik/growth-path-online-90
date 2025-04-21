import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, GraduationCap } from 'lucide-react';

interface RoleCardProps {
  role: 'mentee' | 'mentor';
  title: string;
  description: string;
  features: string[];
  active: boolean;
  onSelect: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ 
  role, 
  title, 
  description, 
  features, 
  active, 
  onSelect 
}) => {
  return (
    <Card className={`border-2 ${active ? 'border-mentor-500' : 'border-transparent'}`}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {title}
          {active && (
            <span className="ml-2 text-xs bg-mentor-500 text-white px-2 py-1 rounded-full">
              Current Role
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Features:</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg 
                  className={`h-5 w-5 mr-2 ${role === 'mentee' ? 'text-learner-500' : 'text-mentor-500'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <ToggleGroup type="single" value={active ? role : undefined} onValueChange={(value) => {
            if (value) onSelect();
          }}>
            <ToggleGroupItem value="mentee" aria-label="Toggle mentee role" className="w-full data-[state=on]:bg-learner-500 data-[state=on]:text-white">
              <Users className="mr-2 h-4 w-4" />
              Student Role
            </ToggleGroupItem>
            <ToggleGroupItem value="mentor" aria-label="Toggle mentor role" className="w-full data-[state=on]:bg-mentor-500 data-[state=on]:text-white">
              <GraduationCap className="mr-2 h-4 w-4" />
              Mentor Role
            </ToggleGroupItem>
          </ToggleGroup>
          <Button 
            className={`w-full ${
              role === 'mentee' 
                ? 'bg-learner-500 hover:bg-learner-600' 
                : 'bg-mentor-500 hover:bg-mentor-600'
            }`}
            disabled={active}
            onClick={onSelect}
          >
            {active ? 'Current Role' : 'Switch to this Role'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SwitchRole: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<'mentee' | 'mentor'>('mentee');
  const navigate = useNavigate();
  
  const handleRoleSwitch = (role: 'mentee' | 'mentor') => {
    setCurrentRole(role);
    
    toast({
      title: "Role Switched",
      description: `You are now using GrowthPath as a ${role === 'mentee' ? 'Learner' : 'Mentor'}`,
    });
    
    // In a real app, this would update user state and possibly redirect
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Switch Role</h1>
      <p className="text-gray-600 mb-8">
        Choose how you want to use GrowthPath. You can switch between roles anytime.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <RoleCard
          role="mentee"
          title="Learner Role"
          description="Access mentorship, guidance, and resources to accelerate your career growth."
          features={[
            "Book sessions with expert mentors",
            "Track your learning progress",
            "Access learning resources & courses",
            "Receive personalized career guidance",
            "Join group mentorship sessions"
          ]}
          active={currentRole === 'mentee'}
          onSelect={() => handleRoleSwitch('mentee')}
        />
        
        <RoleCard
          role="mentor"
          title="Mentor Role"
          description="Share your expertise, guide others, and build your professional reputation."
          features={[
            "Create your mentor profile",
            "Set your availability & rates",
            "Track mentee progress",
            "Create custom learning paths",
            "Access mentor resources & support"
          ]}
          active={currentRole === 'mentor'}
          onSelect={() => handleRoleSwitch('mentor')}
        />
      </div>
    </div>
  );
};

export default SwitchRole;
