
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center py-20">
        <h1 className="text-9xl font-bold text-mentor-500">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-2">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
