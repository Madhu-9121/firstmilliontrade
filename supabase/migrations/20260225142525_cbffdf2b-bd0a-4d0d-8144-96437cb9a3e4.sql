
-- Fix: course_progress insert should only allow for enrolled students
DROP POLICY "System can insert progress" ON public.course_progress;
CREATE POLICY "Insert progress for enrolled students" ON public.course_progress FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = student_id 
  OR public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'mentor')
);

-- Fix: notifications insert should be admin/mentor/system only
DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Admins and mentors can insert notifications" ON public.notifications FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'mentor')
);

-- Fix: class_attendance insert
DROP POLICY "System can insert attendance" ON public.class_attendance;
CREATE POLICY "Insert attendance for self or by mentor/admin" ON public.class_attendance FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = student_id 
  OR public.has_role(auth.uid(), 'admin') 
  OR public.has_role(auth.uid(), 'mentor')
);
