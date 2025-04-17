
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SignupModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onOpenChange, onLoginClick }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create an Account</DialogTitle>
          <DialogDescription>
            Join GrowthPath to connect with mentors and accelerate your growth
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number (optional)</Label>
            <Input id="phone" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">I want to join as</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="learner">Learner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-2 bg-mentor-500 hover:bg-mentor-600">
            Create Account
          </Button>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button 
                onClick={onLoginClick}
                className="text-mentor-500 hover:underline font-medium"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
