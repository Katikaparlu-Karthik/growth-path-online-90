
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const PricingTier: React.FC<{
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}> = ({ name, price, description, features, highlighted = false, buttonText }) => (
  <div className={`rounded-xl p-6 shadow-lg flex flex-col h-full ${
    highlighted 
      ? 'border-2 border-learner-500 bg-white relative' 
      : 'border border-gray-200 bg-white'
  }`}>
    {highlighted && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-learner-500 text-white px-4 py-1 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}
    <div className="mb-5">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="mb-2">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-gray-500">/month</span>}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
    
    <div className="flex-grow">
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-mentor-500 shrink-0 mr-2 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <Button 
      className={`w-full ${
        highlighted 
          ? 'bg-gradient-to-r from-mentor-500 to-learner-500 hover:opacity-90' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {buttonText}
    </Button>
  </div>
);

const Pricing: React.FC = () => {
  const pricingTiers = [
    {
      name: "Free Plan",
      price: "Free",
      description: "Perfect for exploring mentorship opportunities",
      buttonText: "Get Started",
      features: [
        "Browse mentor profiles",
        "Access to public resources",
        "Join community forums",
        "Read testimonials",
        "Basic filtering options"
      ]
    },
    {
      name: "Growth Plan",
      price: "$29",
      description: "Ideal for active career development",
      buttonText: "Choose Growth",
      highlighted: true,
      features: [
        "Everything in Free Plan",
        "Connect with up to 3 mentors",
        "4 sessions per month",
        "Advanced matching algorithm",
        "Access to exclusive workshops",
        "Priority support"
      ]
    },
    {
      name: "Professional Plan",
      price: "$99",
      description: "For accelerated career advancement",
      buttonText: "Choose Professional",
      features: [
        "Everything in Growth Plan",
        "Unlimited mentor connections",
        "8 sessions per month",
        "Custom career roadmap",
        "1-on-1 career coaching",
        "Resume & portfolio reviews",
        "Private networking events"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-mentor-500 to-learner-500">Mentorship Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Invest in your professional growth with our flexible mentorship plans. 
              Choose the option that best fits your career goals and budget.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {pricingTiers.map((tier, index) => (
                <PricingTier
                  key={index}
                  name={tier.name}
                  price={tier.price}
                  description={tier.description}
                  features={tier.features}
                  highlighted={tier.highlighted}
                  buttonText={tier.buttonText}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {[
                {
                  question: "How do I get matched with a mentor?",
                  answer: "Our algorithm matches you with mentors based on your career goals, skills, industry, and personality. You can also browse and filter mentors manually."
                },
                {
                  question: "Can I change my subscription plan?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Do you offer enterprise plans?",
                  answer: "Yes, we offer custom plans for companies looking to provide mentorship programs to their employees. Contact our sales team for details."
                },
                {
                  question: "What if I'm not satisfied with my mentor?",
                  answer: "We offer a mentor reassignment option. If you're not connecting well with your current mentor, you can request a change."
                },
                {
                  question: "How are the sessions conducted?",
                  answer: "Sessions are typically held via video call, but can also be conducted through messaging or voice calls based on your preference and mentor availability."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
