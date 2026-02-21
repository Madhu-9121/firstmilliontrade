import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Clock, BookOpen, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function StudentSchedule() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadClasses(); }, [user]);

  const loadClasses = async () => {
    if (!user) return;
    const { data: enrollments } = await supabase.from('batch_students').select('batch_id').eq('student_id', user.id);
    const batchIds = (enrollments || []).map(e => e.batch_id);
    if (batchIds.length > 0) {
      const { data } = await supabase.from('classes').select('*, batches!inner(name)').in('batch_id', batchIds).order('scheduled_at', { ascending: true });
      setClasses(data || []);
    }
    setLoading(false);
  };

  const upcoming = classes.filter(c => new Date(c.scheduled_at) >= new Date() && c.status !== 'cancelled');
  const past = classes.filter(c => new Date(c.scheduled_at) < new Date() || c.status === 'completed');

  const statusColor: Record<string, string> = {
    scheduled: 'bg-blue-500/10 text-blue-600',
    live: 'bg-green-500/10 text-green-600',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  const ClassCard = ({ cls, index }: { cls: any; index: number }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
      <Card className="glass-card hover:shadow-lg transition-all">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold">{cls.title}</h3>
              <Badge className={statusColor[cls.status]}>{cls.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{cls.batches?.name}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />
                {new Date(cls.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
              <span>{cls.duration_minutes}min</span>
            </p>
          </div>
          <div className="flex gap-2">
            {cls.zoom_link && cls.status !== 'completed' && (
              <Button size="sm" className="bg-accent text-accent-foreground" asChild>
                <a href={cls.zoom_link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-1" />Join Zoom</a>
              </Button>
            )}
            {cls.recording_url && (
              <Button size="sm" variant="outline" asChild>
                <a href={cls.recording_url} target="_blank" rel="noopener noreferrer"><Video className="w-4 h-4 mr-1" />Watch</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Your upcoming and past classes</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Calendar className="w-5 h-5 text-accent" />Upcoming ({upcoming.length})</h2>
              {upcoming.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No upcoming classes</p>
              ) : (
                <div className="space-y-3">{upcoming.map((cls, i) => <ClassCard key={cls.id} cls={cls} index={i} />)}</div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-muted-foreground" />Past Classes ({past.length})</h2>
              {past.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No past classes</p>
              ) : (
                <div className="space-y-3">{past.map((cls, i) => <ClassCard key={cls.id} cls={cls} index={i} />)}</div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
