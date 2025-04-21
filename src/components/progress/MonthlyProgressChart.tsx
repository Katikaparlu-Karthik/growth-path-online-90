
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { name: 'Jan', sessions: 2, goals: 1 },
  { name: 'Feb', sessions: 4, goals: 2 },
  { name: 'Mar', sessions: 3, goals: 3 },
  { name: 'Apr', sessions: 5, goals: 4 },
  { name: 'May', sessions: 6, goals: 4 },
  { name: 'Jun', sessions: 8, goals: 5 },
];

const MonthlyProgressChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Progress</CardTitle>
        <CardDescription>Sessions and goals over time</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="sessions" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="goals" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyProgressChart;
