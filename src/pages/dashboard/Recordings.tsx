import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function Recordings() {
  const { user, role } = useAuth();
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRecordings(); }, [user, role]);

  const loadRecordings = async () => {
    if (!user) return;
    let data: any[] = [];

    if (role === 'admin') {
      const { data: all } = await supabase.from('classes').select('*, batches!inner(name)').not('recording_url', 'is', null).order('scheduled_at', { ascending: false });
      data = all || [];
    } else if (role === 'mentor') {
      const { data: mentorClasses } = await supabase.from('classes').select('*, batches!inner(name, mentor_id)').eq('batches.mentor_id', user.id).not('recording_url', 'is', null).order('scheduled_at', { ascending: false });
      data = mentorClasses || [];
    } else {
      const { data: enrollments } = await supabase.from('batch_students').select('batch_id').eq('student_id', user.id);
      const batchIds = (enrollments || []).map(e => e.batch_id);
      if (batchIds.length > 0) {
        const { data: studentClasses } = await supabase.from('classes').select('*, batches!inner(name)').in('batch_id', batchIds).not('recording_url', 'is', null).order('scheduled_at', { ascending: false });
        data = studentClasses || [];
      }
    }
    setRecordings(data);
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Recordings</h1>
          <p className="text-muted-foreground">Watch past session recordings</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : recordings.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No recordings available yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recordings.map((rec, i) => (
              <motion.div key={rec.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-card hover:shadow-lg transition-all group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted/50 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20" />
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-accent ml-1" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" />{rec.batches?.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(rec.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <Button size="sm" className="w-full mt-3 bg-accent text-accent-foreground" asChild>
                        <a href={rec.recording_url} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-1" />Watch Recording
                        </a>
                      </Button>
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
