-- Fix the recursive RLS policy on batches table
DROP POLICY IF EXISTS "Students can read enrolled batches" ON public.batches;

CREATE POLICY "Students can read enrolled batches"
ON public.batches
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.batch_students bs
    WHERE bs.batch_id = batches.id
    AND bs.student_id = auth.uid()
  )
);

-- Fix the classes student read policy which also has recursion issues
DROP POLICY IF EXISTS "Students can read enrolled classes" ON public.classes;

CREATE POLICY "Students can read enrolled classes"
ON public.classes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.batch_students bs
    WHERE bs.batch_id = classes.batch_id
    AND bs.student_id = auth.uid()
  )
);
