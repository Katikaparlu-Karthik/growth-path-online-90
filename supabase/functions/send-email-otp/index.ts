
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
};

// Main request handler
serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the request body
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({
          error: "Email and verification code are required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // In a real implementation, you would use an email service like SendGrid, 
    // Resend, or Amazon SES to send the actual email
    // For this demo, we'll simulate sending an email
    console.log(`Sending email to ${email} with code: ${code}`);

    // Simulate email sending success
    // In a real implementation, you would call your email service API here
    const emailSent = true;

    if (!emailSent) {
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Verification code sent successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
