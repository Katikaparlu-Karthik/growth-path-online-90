
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-10 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills or Expertise</label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="e.g., Web Development, Marketing, Design..." 
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              <option value="">Any Time</option>
              <option value="weekends">Weekends</option>
              <option value="weekdays">Weekdays</option>
              <option value="evenings">Evenings</option>
              <option value="mornings">Mornings</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div className="md:self-end md:pb-0 pb-1">
            <Button className="w-full bg-mentor-500 hover:bg-mentor-600 text-white h-10">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
