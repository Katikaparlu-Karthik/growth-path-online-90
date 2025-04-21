
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="account">
        <div className="flex flex-col md:flex-row gap-8">
          <TabsList className="flex flex-row md:flex-col h-auto md:h-fit md:w-48 mb-6 md:mb-0">
            <TabsTrigger value="account" className="w-full justify-start">Account</TabsTrigger>
            <TabsTrigger value="profile" className="w-full justify-start">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="w-full justify-start">Privacy</TabsTrigger>
            <TabsTrigger value="billing" className="w-full justify-start">Billing</TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="account" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="User Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="user@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter your location" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div></div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-mentor-500 hover:bg-mentor-600">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your public profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-[120px] p-3 border rounded-md"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="profile-visibility" />
                        <Label htmlFor="profile-visibility">Make my profile public</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-mentor-500 hover:bg-mentor-600">Save Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how we notify you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Session Reminders</div>
                            <div className="text-sm text-gray-500">Get notified before your scheduled sessions</div>
                          </div>
                          <Switch id="email-sessions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">New Messages</div>
                            <div className="text-sm text-gray-500">Get notified when you receive new messages</div>
                          </div>
                          <Switch id="email-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Platform Updates</div>
                            <div className="text-sm text-gray-500">Stay updated on new features and improvements</div>
                          </div>
                          <Switch id="email-updates" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Session Alerts</div>
                            <div className="text-sm text-gray-500">Get alerts when your session is about to start</div>
                          </div>
                          <Switch id="push-sessions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">New Messages</div>
                            <div className="text-sm text-gray-500">Get alerted for new messages</div>
                          </div>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-mentor-500 hover:bg-mentor-600">Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your data and privacy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Online Status</div>
                          <div className="text-sm text-gray-500">Let others see when you're active</div>
                        </div>
                        <Switch id="online-status" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Share Activity</div>
                          <div className="text-sm text-gray-500">Share your learning progress with mentors</div>
                        </div>
                        <Switch id="share-activity" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Data Collection</div>
                          <div className="text-sm text-gray-500">Allow us to collect usage data to improve the platform</div>
                        </div>
                        <Switch id="data-collection" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Control</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50">
                          Download My Data
                        </Button>
                        <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50">
                          Delete My Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Professional Plan</p>
                            <p className="text-sm text-gray-500">$29/month, billed monthly</p>
                          </div>
                          <Button variant="outline">Change Plan</Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Your next payment is on May 15, 2025</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="24" rx="4" fill="#E9E9E9"/>
                                <path d="M15 7H25V17H15V7Z" fill="#FF5F00"/>
                                <path d="M16 12C16 9.8 17.1 7.9 18.8 7C17.6 6.4 16.3 6 15 6C11.1 6 8 8.7 8 12C8 15.3 11.1 18 15 18C16.3 18 17.6 17.6 18.8 17C17.1 16.1 16 14.2 16 12Z" fill="#EB001B"/>
                                <path d="M32 12C32 15.3 28.9 18 25 18C23.7 18 22.4 17.6 21.2 17C22.9 16 24 14.2 24 12C24 9.8 22.9 7.9 21.2 7C22.4 6.4 23.7 6 25 6C28.9 6 32 8.7 32 12Z" fill="#F79E1B"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Mastercard ending in 4242</p>
                              <p className="text-sm text-gray-500">Expires 04/2026</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      <Button variant="outline">Add Payment Method</Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Billing History</h3>
                      <div className="text-sm">
                        <div className="grid grid-cols-3 font-medium py-2 border-b">
                          <div>Date</div>
                          <div>Amount</div>
                          <div>Status</div>
                        </div>
                        <div className="grid grid-cols-3 py-3 border-b">
                          <div>Apr 15, 2025</div>
                          <div>$29.00</div>
                          <div className="text-green-600">Paid</div>
                        </div>
                        <div className="grid grid-cols-3 py-3 border-b">
                          <div>Mar 15, 2025</div>
                          <div>$29.00</div>
                          <div className="text-green-600">Paid</div>
                        </div>
                        <div className="grid grid-cols-3 py-3 border-b">
                          <div>Feb 15, 2025</div>
                          <div>$29.00</div>
                          <div className="text-green-600">Paid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
