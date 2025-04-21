
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

const formSchema = z.object({
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

const BecomeMentor: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to become a mentor",
          variant: "destructive",
        });
        return;
      }
      
      // First update the user's role in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: 'mentor',
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);
      
      if (profileError) {
        throw profileError;
      }
      
      // Use our custom RPC function to insert mentor profile
      // We need to use a type assertion to work with the custom RPC function
      // TypeScript doesn't know about this function since it's defined in SQL
      interface MentorProfileParams {
        user_id: string;
        bio: string;
        experience_years: string;
        hourly_rate: string;
        expertise: string[];
        availability: string[];
      }
      
      const mentorParams: MentorProfileParams = {
        user_id: session.user.id,
        bio: values.bio,
        experience_years: values.experience,
        hourly_rate: values.hourlyRate,
        expertise: values.expertise,
        availability: values.availability
      };
      
      const { error: mentorError } = await supabase.rpc(
        'insert_mentor_profile',
        mentorParams
      ) as { error: any };
      
      if (mentorError) {
        throw mentorError;
      }
      
      // Update role in localStorage for client-side persistence
      localStorage.setItem('userRole', 'mentor');
      
      toast({
        title: "Congratulations!",
        description: "You are now a mentor on GrowthPath",
      });
      
      // Redirect to mentor dashboard
      navigate('/mentor-dashboard');
      
    } catch (error: any) {
      console.error('Error upgrading to mentor:', error);
      toast({
        title: "Failed to become a mentor",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Become a Mentor</CardTitle>
          <CardDescription className="text-center">
            Share your expertise and help others grow while building your professional reputation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
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
              
              <div className="grid md:grid-cols-2 gap-6">
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
              
              <FormField
                control={form.control}
                name="expertise"
                render={() => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <FormDescription>
                      Select all areas where you can provide mentorship
                    </FormDescription>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
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
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate('/profile')}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-mentor-500 hover:bg-mentor-600" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeMentor;
