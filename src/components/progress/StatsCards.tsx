
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Sessions</CardTitle>
          <CardDescription>All mentor sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-mentor-500">24</div>
          <p className="text-sm text-gray-500 mt-1">+3 from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Goals Completed</CardTitle>
          <CardDescription>Career milestones achieved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-learner-500">12</div>
          <p className="text-sm text-gray-500 mt-1">75% completion rate</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Hours</CardTitle>
          <CardDescription>Total time invested</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-indigo-500">48</div>
          <p className="text-sm text-gray-500 mt-1">+8 from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
