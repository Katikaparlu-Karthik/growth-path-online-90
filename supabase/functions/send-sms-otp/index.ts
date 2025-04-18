
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
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return new Response(
        JSON.stringify({
          error: "Phone number and verification code are required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // In a real implementation, you would use a service like Twilio, 
    // MessageBird, or Vonage to send the actual SMS
    // For this demo, we'll simulate sending an SMS
    console.log(`Sending SMS to ${phone} with code: ${code}`);

    // Simulate SMS sending success
    // In a real implementation, you would call your SMS service API here
    const smsSent = true;

    if (!smsSent) {
      return new Response(
        JSON.stringify({
          error: "Failed to send SMS",
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
