
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a session with a mentor?",
    answer: "To book a session, navigate to the mentor's profile, select an available time slot, and complete the booking process. You'll receive a confirmation email with the session details and a calendar invitation."
  },
  {
    question: "How do I reschedule or cancel a session?",
    answer: "You can reschedule or cancel a session up to 24 hours before the scheduled time. Go to 'My Sessions', find the session you want to change, and click on the reschedule or cancel button."
  },
  {
    question: "What happens if I miss a session?",
    answer: "If you miss a scheduled session without cancellation, it will count as completed in your session allowance. We recommend rescheduling if you know you can't make it at least 24 hours in advance."
  },
  {
    question: "How do I become a mentor?",
    answer: "To become a mentor, go to your profile settings and select 'Apply to be a Mentor'. Fill out the application form with your expertise, experience, and availability. Our team will review your application and get back to you within 5-7 business days."
  },
  {
    question: "How do I change my subscription plan?",
    answer: "You can change your subscription plan at any time from the Settings > Billing section. Select 'Change Plan' and choose your new subscription option. Changes will be effective at the start of your next billing cycle."
  },
  {
    question: "How do I get a refund?",
    answer: "Refund policies vary depending on your subscription plan. Please contact our support team with your refund request, and we'll guide you through the process based on your specific situation."
  },
];

const guides = [
  {
    title: "Getting Started Guide",
    description: "A complete walkthrough for new users",
    icon: "📚",
    link: "#"
  },
  {
    title: "Mentorship Best Practices",
    description: "How to get the most out of your sessions",
    icon: "🚀",
    link: "#"
  },
  {
    title: "Setting Career Goals",
    description: "Framework for effective goal setting",
    icon: "🎯",
    link: "#"
  },
  {
    title: "Platform Features",
    description: "Detailed overview of all available features",
    icon: "✨",
    link: "#"
  }
];

const Help: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <div className="mb-8">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold mb-4">How can we help you?</h2>
          <div className="flex">
            <Input 
              className="flex-1" 
              placeholder="Search for help articles, FAQs, guides..." 
            />
            <Button className="ml-2 bg-mentor-500 hover:bg-mentor-600">
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="faqs">
        <TabsList className="mb-8">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="text-3xl mb-2">{guide.icon}</div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-learner-500 hover:bg-learner-600" asChild>
                    <a href={guide.link}>Read Guide</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="What is your question about?" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full min-h-[120px] p-3 border rounded-md"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-mentor-500 hover:bg-mentor-600">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
