
-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentor profiles table for mentor-specific information
CREATE TABLE IF NOT EXISTS public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  bio TEXT NOT NULL,
  experience_years TEXT NOT NULL,
  hourly_rate TEXT NOT NULL,
  expertise TEXT[] NOT NULL,
  availability TEXT[] NOT NULL,
  public_profile BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  average_rating NUMERIC(3,2) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES public.profiles(id) NOT NULL,
  student_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  session_type TEXT NOT NULL DEFAULT 'video',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  modules INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, active, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  student_id UUID REFERENCES public.profiles(id) NOT NULL,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- Create row level security (RLS) policies
-- Profiles: Users can read all profiles but only update their own
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Mentor profiles: Public can view, but only the mentor can update
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public mentor profiles are viewable by everyone"
  ON public.mentor_profiles FOR SELECT
  USING (public_profile = true);

CREATE POLICY "Mentors can update their own profile"
  ON public.mentor_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Mentors can insert their own profile"
  ON public.mentor_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Sessions: Participants can view their own sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON public.sessions FOR SELECT
  USING (auth.uid() = mentor_id OR auth.uid() = student_id);

CREATE POLICY "Mentors can insert sessions"
  ON public.sessions FOR INSERT
  WITH CHECK (auth.uid() = mentor_id);

CREATE POLICY "Participants can update sessions"
  ON public.sessions FOR UPDATE
  USING (auth.uid() = mentor_id OR auth.uid() = student_id);

-- Courses: Public can view active courses, mentors manage their own
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active courses"
  ON public.courses FOR SELECT
  USING (status = 'active');

CREATE POLICY "Mentors can manage their own courses"
  ON public.courses FOR ALL
  USING (auth.uid() = mentor_id);

-- Course enrollments: Students and mentors can view relevant enrollments
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their enrollments"
  ON public.course_enrollments FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Mentors can view enrollments in their courses"
  ON public.course_enrollments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = course_enrollments.course_id
    AND courses.mentor_id = auth.uid()
  ));

CREATE POLICY "Students can enroll in courses"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their enrollment progress"
  ON public.course_enrollments FOR UPDATE
  USING (auth.uid() = student_id);
