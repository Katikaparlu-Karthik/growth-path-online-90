
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Calendar, CheckCircle, MessageSquare, Search, UserCheck } from 'lucide-react';

const steps = [
  {
    title: "Find the Right Mentor",
    description: "Browse our curated list of expert mentors and filter by expertise, availability, and price to find your perfect match.",
    icon: Search,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Book a Session",
    description: "Choose a time that works for you using our easy scheduling tool and make a secure payment.",
    icon: Calendar,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Connect and Learn",
    description: "Meet your mentor virtually and get personalized guidance, feedback, and support tailored to your needs.",
    icon: MessageSquare, 
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Grow and Succeed",
    description: "Apply what you've learned, track your progress, and continue your growth journey with ongoing sessions.",
    icon: CheckCircle,
    color: "bg-orange-100 text-orange-600"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-mentor-500 to-learner-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How GrowthPath Works</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            We make it easy to connect with expert mentors who can help you achieve your professional goals.
          </p>
        </div>
      </div>
      
      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className={`${step.color} h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Mentorship session" 
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "How do I know which mentor is right for me?",
                a: "You can browse mentor profiles, read reviews from other mentees, and even book an initial consultation call to determine if there's a good fit before committing to regular sessions."
              },
              {
                q: "What happens if I'm not satisfied with a session?",
                a: "We offer a satisfaction guarantee. If you're not happy with a session, contact us within 24 hours and we'll work to resolve the issue or provide a refund."
              },
              {
                q: "How much does mentorship cost?",
                a: "Pricing varies by mentor based on their experience and expertise. You can filter mentors by price range to find options that fit your budget."
              },
              {
                q: "Can I change mentors if I'm not satisfied?",
                a: "Yes, you're free to work with multiple mentors or switch at any time. Our goal is to help you find the right match for your needs."
              },
              {
                q: "How are the mentoring sessions conducted?",
                a: "Sessions are typically held via video call through our integrated platform, though some mentors may offer phone or text-based options as well."
              },
              {
                q: "How long are mentoring sessions?",
                a: "Most sessions are 60 minutes, but mentors may offer different session lengths. You can see the available options on each mentor's profile."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your growth journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who are accelerating their careers with personalized mentorship.
          </p>
          <a 
            href="/browse" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-mentor-500 hover:bg-mentor-600"
          >
            Find Your Mentor 
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
