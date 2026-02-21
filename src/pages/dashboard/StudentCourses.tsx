import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function StudentCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCourses(); }, [user]);

  const loadCourses = async () => {
    if (!user) return;
    const { data: enrollments } = await supabase
      .from('batch_students')
      .select('*, batches(*, classes(count), profiles!batches_mentor_id_fkey(full_name))')
      .eq('student_id', user.id);
    setCourses(enrollments || []);
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Your enrolled batches</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : courses.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You're not enrolled in any courses yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((enrollment, i) => (
              <motion.div key={enrollment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-accent" />
                      </div>
                      <Badge variant={enrollment.batches?.status === 'active' ? 'default' : 'secondary'}
                        className={enrollment.batches?.status === 'active' ? 'bg-green-500/10 text-green-600' : ''}>
                        {enrollment.batches?.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{enrollment.batches?.name}</h3>
                    {enrollment.batches?.description && (
                      <p className="text-sm text-muted-foreground mb-3">{enrollment.batches.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Mentor: {enrollment.batches?.profiles?.full_name}</span>
                      <span>{enrollment.batches?.classes?.[0]?.count || 0} classes</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
