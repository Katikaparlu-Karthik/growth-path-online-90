
-- Create a function to safely insert a mentor profile
CREATE OR REPLACE FUNCTION public.insert_mentor_profile(
  user_id UUID,
  bio TEXT,
  experience_years TEXT,
  hourly_rate TEXT,
  expertise TEXT[],
  availability TEXT[]
) RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  INSERT INTO public.mentor_profiles (
    user_id,
    bio,
    experience_years,
    hourly_rate,
    expertise,
    availability,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    bio,
    experience_years,
    hourly_rate,
    expertise,
    availability,
    NOW(),
    NOW()
  )
  RETURNING id INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.insert_mentor_profile TO authenticated;
