import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Video, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function MentorClasses() {
  const { user, role } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editClass, setEditClass] = useState<any>(null);
  const [form, setForm] = useState({
    batch_id: '', title: '', description: '', scheduled_at: '',
    duration_minutes: '60', zoom_link: '', zoom_meeting_id: '', recording_url: '', status: 'scheduled'
  });

  useEffect(() => { loadData(); }, [user]);

  const loadData = async () => {
    if (!user) return;
    const batchQuery = role === 'admin'
      ? supabase.from('batches').select('id, name')
      : supabase.from('batches').select('id, name').eq('mentor_id', user.id);
    const { data: batchData } = await batchQuery;
    setBatches(batchData || []);

    const batchIds = (batchData || []).map(b => b.id);
    if (batchIds.length > 0) {
      const { data } = await supabase.from('classes').select('*, batches!inner(name)').in('batch_id', batchIds).order('scheduled_at', { ascending: false });
      setClasses(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.batch_id || !form.scheduled_at) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' }); return;
    }
    const payload = {
      batch_id: form.batch_id, title: form.title, description: form.description,
      scheduled_at: new Date(form.scheduled_at).toISOString(),
      duration_minutes: parseInt(form.duration_minutes),
      zoom_link: form.zoom_link, zoom_meeting_id: form.zoom_meeting_id,
      recording_url: form.recording_url, status: form.status,
    };
    if (editClass) {
      const { error } = await supabase.from('classes').update(payload).eq('id', editClass.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Class updated!' });
    } else {
      const { error } = await supabase.from('classes').insert(payload);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Class created!' });
    }
    setDialogOpen(false);
    resetForm();
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this class?')) return;
    await supabase.from('classes').delete().eq('id', id);
    toast({ title: 'Class deleted' });
    loadData();
  };

  const resetForm = () => {
    setEditClass(null);
    setForm({ batch_id: '', title: '', description: '', scheduled_at: '', duration_minutes: '60', zoom_link: '', zoom_meeting_id: '', recording_url: '', status: 'scheduled' });
  };

  const openEdit = (cls: any) => {
    setEditClass(cls);
    setForm({
      batch_id: cls.batch_id, title: cls.title, description: cls.description || '',
      scheduled_at: new Date(cls.scheduled_at).toISOString().slice(0, 16),
      duration_minutes: String(cls.duration_minutes), zoom_link: cls.zoom_link || '',
      zoom_meeting_id: cls.zoom_meeting_id || '', recording_url: cls.recording_url || '', status: cls.status,
    });
    setDialogOpen(true);
  };

  const statusColor: Record<string, string> = {
    scheduled: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    live: 'bg-green-500/10 text-green-600 border-green-500/20',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{role === 'admin' ? 'All Classes' : 'My Classes'}</h1>
            <p className="text-muted-foreground">Manage class sessions and Zoom links</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground"><Plus className="w-4 h-4 mr-2" />New Class</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editClass ? 'Edit Class' : 'Schedule New Class'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Batch *</Label>
                  <Select value={form.batch_id} onValueChange={(v) => setForm({ ...form, batch_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>
                      {batches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Class title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date & Time *</Label>
                    <Input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
                  </div>
                  <div>
                    <Label>Duration (min)</Label>
                    <Input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Zoom Link</Label>
                  <Input value={form.zoom_link} onChange={(e) => setForm({ ...form, zoom_link: e.target.value })} placeholder="https://zoom.us/j/..." />
                </div>
                <div>
                  <Label>Zoom Meeting ID</Label>
                  <Input value={form.zoom_meeting_id} onChange={(e) => setForm({ ...form, zoom_meeting_id: e.target.value })} placeholder="1234567890" />
                </div>
                <div>
                  <Label>Recording URL (after class)</Label>
                  <Input value={form.recording_url} onChange={(e) => setForm({ ...form, recording_url: e.target.value })} placeholder="https://zoom.us/rec/..." />
                </div>
                {editClass && (
                  <div>
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground">{editClass ? 'Update' : 'Schedule'} Class</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : classes.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No classes yet. Schedule your first one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {classes.map((cls, i) => (
              <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-card hover:shadow-lg transition-all">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{cls.title}</h3>
                        <Badge className={statusColor[cls.status]}>{cls.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cls.batches?.name} • {new Date(cls.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} • {cls.duration_minutes}min
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {cls.zoom_link && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={cls.zoom_link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-1" />Zoom</a>
                        </Button>
                      )}
                      {cls.recording_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={cls.recording_url} target="_blank" rel="noopener noreferrer"><Video className="w-4 h-4 mr-1" />Recording</a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => openEdit(cls)}><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(cls.id)}><Trash2 className="w-4 h-4" /></Button>
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
