import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Video, Calendar, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function DashboardHome() {
  const { role, profile, user } = useAuth();
  const [stats, setStats] = useState({ batches: 0, classes: 0, students: 0, recordings: 0 });
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !role) return;
    loadData();
  }, [user, role]);

  const loadData = async () => {
    if (role === 'mentor') {
      const [{ count: batchCount }, { count: classCount }, { data: enrollments }, { data: upcoming }] = await Promise.all([
        supabase.from('batches').select('*', { count: 'exact', head: true }).eq('mentor_id', user!.id),
        supabase.from('classes').select('*, batches!inner(mentor_id)', { count: 'exact', head: true }).eq('batches.mentor_id', user!.id),
        supabase.from('batch_students').select('*, batches!inner(mentor_id)').eq('batches.mentor_id', user!.id),
        supabase.from('classes').select('*, batches!inner(name, mentor_id)').eq('batches.mentor_id', user!.id).gte('scheduled_at', new Date().toISOString()).order('scheduled_at').limit(5),
      ]);
      setStats({ batches: batchCount || 0, classes: classCount || 0, students: new Set(enrollments?.map(e => e.student_id)).size, recordings: 0 });
      setUpcomingClasses(upcoming || []);
    } else if (role === 'student') {
      const [{ data: enrolled }, { data: upcoming }] = await Promise.all([
        supabase.from('batch_students').select('batch_id').eq('student_id', user!.id),
        supabase.from('classes').select('*, batches!inner(name)').in('batch_id', (await supabase.from('batch_students').select('batch_id').eq('student_id', user!.id)).data?.map(e => e.batch_id) || []).gte('scheduled_at', new Date().toISOString()).order('scheduled_at').limit(5),
      ]);
      setStats({ batches: enrolled?.length || 0, classes: 0, students: 0, recordings: 0 });
      setUpcomingClasses(upcoming || []);
    } else if (role === 'admin') {
      const [{ count: batchCount }, { count: classCount }, { count: userCount }] = await Promise.all([
        supabase.from('batches').select('*', { count: 'exact', head: true }),
        supabase.from('classes').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ batches: batchCount || 0, classes: classCount || 0, students: userCount || 0, recordings: 0 });
      const { data: upcoming } = await supabase.from('classes').select('*, batches!inner(name)').gte('scheduled_at', new Date().toISOString()).order('scheduled_at').limit(5);
      setUpcomingClasses(upcoming || []);
    }
  };

  const statCards = role === 'student'
    ? [
        { label: 'Enrolled Courses', value: stats.batches, icon: BookOpen, color: 'text-blue-500' },
        { label: 'Upcoming Classes', value: upcomingClasses.length, icon: Calendar, color: 'text-green-500' },
      ]
    : role === 'mentor'
    ? [
        { label: 'My Batches', value: stats.batches, icon: BookOpen, color: 'text-blue-500' },
        { label: 'Total Classes', value: stats.classes, icon: Calendar, color: 'text-green-500' },
        { label: 'Total Students', value: stats.students, icon: Users, color: 'text-purple-500' },
      ]
    : [
        { label: 'Total Batches', value: stats.batches, icon: BookOpen, color: 'text-blue-500' },
        { label: 'Total Classes', value: stats.classes, icon: Calendar, color: 'text-green-500' },
        { label: 'Total Users', value: stats.students, icon: Users, color: 'text-purple-500' },
      ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'User'} 👋</h1>
          <p className="text-muted-foreground mt-1 capitalize">{role} Dashboard</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Classes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingClasses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No upcoming classes scheduled</p>
              ) : (
                <div className="space-y-3">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{cls.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {cls.batches?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(cls.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={cls.status === 'live' ? 'default' : 'secondary'} className={cls.status === 'live' ? 'bg-green-500' : ''}>
                          {cls.status}
                        </Badge>
                        {cls.zoom_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={cls.zoom_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" /> Join
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
