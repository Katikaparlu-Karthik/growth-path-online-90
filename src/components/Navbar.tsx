
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-mentor-500">
            Growth<span className="text-learner-500">Path</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Find Mentors
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            How It Works
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Resources
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-mentor-500 font-medium transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button className="bg-gradient-to-r from-mentor-500 to-learner-500 text-white hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
