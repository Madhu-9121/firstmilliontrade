
-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  duration_hours INTEGER DEFAULT 0,
  total_classes INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can read courses" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Mentors can manage own courses" ON public.courses FOR ALL TO authenticated USING (auth.uid() = created_by);

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Link batches to courses
ALTER TABLE public.batches ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL;

-- Course progress tracking
CREATE TABLE public.course_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
  classes_attended INTEGER NOT NULL DEFAULT 0,
  total_classes INTEGER NOT NULL DEFAULT 0,
  completion_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  last_class_attended_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id)
);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read own progress" ON public.course_progress FOR SELECT TO authenticated USING (auth.uid() = student_id);
CREATE POLICY "Students can update own progress" ON public.course_progress FOR UPDATE TO authenticated USING (auth.uid() = student_id);
CREATE POLICY "Admins can manage all progress" ON public.course_progress FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Mentors can read batch progress" ON public.course_progress FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'mentor'));
CREATE POLICY "System can insert progress" ON public.course_progress FOR INSERT TO authenticated WITH CHECK (true);

CREATE TRIGGER update_course_progress_updated_at BEFORE UPDATE ON public.course_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can manage all notifications" ON public.notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Class attendance tracking
CREATE TABLE public.class_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  attended BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read own attendance" ON public.class_attendance FOR SELECT TO authenticated USING (auth.uid() = student_id);
CREATE POLICY "Mentors can manage attendance" ON public.class_attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'mentor'));
CREATE POLICY "Admins can manage attendance" ON public.class_attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert attendance" ON public.class_attendance FOR INSERT TO authenticated WITH CHECK (true);

-- Function to send notification to batch students
CREATE OR REPLACE FUNCTION public.notify_batch_students()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When a class is created or updated
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.notifications (user_id, title, message, type, link)
    SELECT bs.student_id, 
           'New Class Scheduled: ' || NEW.title,
           'A new class has been scheduled. Check your schedule for details.',
           'class',
           '/dashboard/schedule'
    FROM public.batch_students bs WHERE bs.batch_id = NEW.batch_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.recording_url IS DISTINCT FROM NEW.recording_url AND NEW.recording_url IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, title, message, type, link)
    SELECT bs.student_id,
           'Recording Available: ' || NEW.title,
           'The recording for this class is now available.',
           'recording',
           '/dashboard/recordings'
    FROM public.batch_students bs WHERE bs.batch_id = NEW.batch_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_on_class_change
AFTER INSERT OR UPDATE ON public.classes
FOR EACH ROW EXECUTE FUNCTION public.notify_batch_students();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
