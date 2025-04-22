
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Footer from '@/components/Footer';
import { ArrowRight, Clock, Calendar, CreditCard } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  bio: z.string().min(50, {
    message: "Bio must be at least 50 characters.",
  }),
  experience: z.string().min(1, {
    message: "Please indicate your years of experience.",
  }),
  hourlyRate: z.string().min(1, {
    message: "Please set your hourly rate.",
  }),
  expertise: z.array(z.string()).min(1, {
    message: "Please select at least one area of expertise.",
  }),
  availability: z.array(z.string()).min(1, {
    message: "Please select at least one day you are available.",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the mentor terms and conditions."
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const expertiseOptions = [
  { id: "software-dev", label: "Software Development" },
  { id: "data-science", label: "Data Science" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "product-management", label: "Product Management" },
  { id: "marketing", label: "Digital Marketing" },
  { id: "business", label: "Business Strategy" },
  { id: "leadership", label: "Leadership & Management" },
  { id: "career", label: "Career Development" },
];

const daysOfWeek = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const MentorSignup: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      bio: "",
      experience: "",
      hourlyRate: "",
      expertise: [],
      availability: [],
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
            phone: values.phone || null,
            role: "mentor",
            bio: values.bio,
            experience: values.experience,
            hourly_rate: values.hourlyRate,
            expertise: values.expertise,
            availability: values.availability,
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Create mentor profile in the database
      if (data.user) {
        // Use a more accurate approach to call RPC functions
        const { data: mentorData, error: mentorError } = await (supabase.rpc as unknown as (
          fn: string,
          params?: any
        ) => Promise<{ data: any; error: any }>)(
          'insert_mentor_profile', 
          {
            user_id: data.user.id,
            bio: values.bio,
            experience_years: values.experience,
            hourly_rate: values.hourlyRate,
            expertise: values.expertise,
            availability: values.availability
          }
        );
        
        if (mentorError) {
          throw mentorError;
        }

        toast({
          title: "Account created",
          description: "Your mentor account has been created successfully!",
        });
        
        // Redirect to verification page if user was created
        navigate(`/verify?userId=${data.user.id}&type=email`, { replace: true });
      } else {
        navigate("/");
      }
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Become a Mentor</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your expertise, build your profile, and help others reach their potential
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-mentor-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-mentor-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Set your own hours and choose when you want to mentor others.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-mentor-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-mentor-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Set Your Rates</h3>
              <p className="text-gray-600">Choose your own hourly rate and get paid for sharing your knowledge.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-mentor-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-mentor-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Build Your Network</h3>
              <p className="text-gray-600">Connect with motivated learners and expand your professional network.</p>
            </div>
          </div>
          
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up as a Mentor</CardTitle>
              <CardDescription>
                Create your mentor profile and start helping others grow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} />
                              </FormControl>
                              <FormDescription>
                                We'll verify this number for OTP authentication
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <h2 className="text-xl font-semibold mb-4">Mentor Profile</h2>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel>Professional Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your professional background, achievements, and what you can offer as a mentor..." 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This will be displayed on your mentor profile.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Rate (USD)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <h2 className="text-xl font-semibold mb-4">Expertise & Availability</h2>
                      
                      <FormField
                        control={form.control}
                        name="expertise"
                        render={() => (
                          <FormItem className="mb-6">
                            <FormLabel>Areas of Expertise</FormLabel>
                            <FormDescription>
                              Select all areas where you can provide mentorship
                            </FormDescription>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                              {expertiseOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="expertise"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={option.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== option.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="availability"
                        render={() => (
                          <FormItem>
                            <FormLabel>Availability</FormLabel>
                            <FormDescription>
                              Select days when you're typically available for mentoring sessions
                            </FormDescription>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                              {daysOfWeek.map((day) => (
                                <FormField
                                  key={day.id}
                                  control={form.control}
                                  name="availability"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={day.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(day.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, day.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== day.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {day.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Mentor Terms & Conditions
                            </FormLabel>
                            <FormDescription>
                              I agree to the GrowthPath mentor terms and conditions, including quality standards and commitment to helping mentees grow.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <CardFooter className="flex justify-end space-x-4 px-0">
                    <Button variant="outline" type="button" onClick={() => navigate('/')}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-mentor-500 hover:bg-mentor-600" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Account..." : "Create Mentor Account"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorSignup;
