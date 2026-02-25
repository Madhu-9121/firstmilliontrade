import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function StudentProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallStats, setOverallStats] = useState({ totalCourses: 0, avgCompletion: 0, classesAttended: 0, totalClasses: 0 });

  useEffect(() => { loadProgress(); }, [user]);

  const loadProgress = async () => {
    if (!user) return;

    // Get enrolled batches
    const { data: enrollments } = await supabase.from('batch_students').select('batch_id, batches(id, name, course_id, courses(title, total_classes, duration_hours, category))').eq('student_id', user.id);

    // Get class counts per batch
    const batchIds = (enrollments || []).map(e => e.batch_id);
    let classData: any[] = [];
    if (batchIds.length > 0) {
      const { data } = await supabase.from('classes').select('id, batch_id, status').in('batch_id', batchIds);
      classData = data || [];
    }

    // Get attendance
    const { data: attendance } = await supabase.from('class_attendance').select('class_id, attended').eq('student_id', user.id);
    const attendedSet = new Set((attendance || []).filter(a => a.attended).map(a => a.class_id));

    // Build progress per batch/course
    const progressList = (enrollments || []).map(enrollment => {
      const batchClasses = classData.filter(c => c.batch_id === enrollment.batch_id);
      const completedClasses = batchClasses.filter(c => c.status === 'completed');
      const attendedCount = batchClasses.filter(c => attendedSet.has(c.id)).length;
      const totalClasses = batchClasses.length || (enrollment.batches?.courses?.total_classes || 0);
      const completion = totalClasses > 0 ? Math.round((completedClasses.length / totalClasses) * 100) : 0;

      return {
        id: enrollment.batch_id,
        batchName: enrollment.batches?.name || 'Unknown',
        courseName: enrollment.batches?.courses?.title || enrollment.batches?.name || 'Unknown',
        category: enrollment.batches?.courses?.category || 'general',
        totalClasses,
        completedClasses: completedClasses.length,
        attendedCount,
        completion,
        durationHours: enrollment.batches?.courses?.duration_hours || 0,
      };
    });

    setProgress(progressList);

    const totalAttended = progressList.reduce((s, p) => s + p.attendedCount, 0);
    const totalAll = progressList.reduce((s, p) => s + p.totalClasses, 0);
    const avgComp = progressList.length > 0 ? Math.round(progressList.reduce((s, p) => s + p.completion, 0) / progressList.length) : 0;
    setOverallStats({ totalCourses: progressList.length, avgCompletion: avgComp, classesAttended: totalAttended, totalClasses: totalAll });
    setLoading(false);
  };

  const categoryColors: Record<string, string> = {
    trading: 'bg-blue-500/10 text-blue-600', algo: 'bg-purple-500/10 text-purple-600',
    crypto: 'bg-amber-500/10 text-amber-600', general: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">My Progress</h1>
          <p className="text-muted-foreground">Track your learning journey</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Enrolled Courses', value: overallStats.totalCourses, icon: BookOpen, color: 'text-blue-500' },
            { label: 'Avg Completion', value: `${overallStats.avgCompletion}%`, icon: TrendingUp, color: 'text-green-500' },
            { label: 'Classes Attended', value: overallStats.classesAttended, icon: CheckCircle, color: 'text-purple-500' },
            { label: 'Total Classes', value: overallStats.totalClasses, icon: Clock, color: 'text-amber-500' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Course Progress */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : progress.length === 0 ? (
          <Card className="glass-card"><CardContent className="py-12 text-center">
            <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No courses enrolled yet. Start your learning journey!</p>
          </CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {progress.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-card hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.courseName}</h3>
                        <p className="text-sm text-muted-foreground">{item.batchName}</p>
                      </div>
                      <Badge className={categoryColors[item.category] || categoryColors.general}>{item.category}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="font-medium">{item.completion}%</span>
                      </div>
                      <Progress value={item.completion} className="h-2" />
                      <div className="flex gap-6 text-sm text-muted-foreground pt-1">
                        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />{item.completedClasses}/{item.totalClasses} classes completed</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.durationHours}h total</span>
                        <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-accent" />{item.attendedCount} attended</span>
                      </div>
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
