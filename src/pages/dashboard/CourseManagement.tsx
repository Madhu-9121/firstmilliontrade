import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, BookOpen, Clock, Users } from 'lucide-react';
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

export default function CourseManagement() {
  const { user, role } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<any>(null);
  const [form, setForm] = useState({
    title: '', description: '', category: 'trading', duration_hours: '40',
    total_classes: '20', status: 'active', thumbnail_url: ''
  });

  useEffect(() => { loadCourses(); }, [user]);

  const loadCourses = async () => {
    if (!user) return;
    const query = role === 'admin'
      ? supabase.from('courses').select('*, profiles:created_by(full_name)')
      : supabase.from('courses').select('*').eq('created_by', user.id);
    const { data } = await query.order('created_at', { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' }); return;
    }
    const payload = {
      title: form.title, description: form.description, category: form.category,
      duration_hours: parseInt(form.duration_hours), total_classes: parseInt(form.total_classes),
      status: form.status, thumbnail_url: form.thumbnail_url, created_by: user!.id,
    };
    if (editCourse) {
      const { error } = await supabase.from('courses').update(payload).eq('id', editCourse.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Course updated!' });
    } else {
      const { error } = await supabase.from('courses').insert(payload);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Course created!' });
    }
    setDialogOpen(false);
    resetForm();
    loadCourses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    await supabase.from('courses').delete().eq('id', id);
    toast({ title: 'Course deleted' });
    loadCourses();
  };

  const resetForm = () => {
    setEditCourse(null);
    setForm({ title: '', description: '', category: 'trading', duration_hours: '40', total_classes: '20', status: 'active', thumbnail_url: '' });
  };

  const openEdit = (course: any) => {
    setEditCourse(course);
    setForm({
      title: course.title, description: course.description || '', category: course.category,
      duration_hours: String(course.duration_hours), total_classes: String(course.total_classes),
      status: course.status, thumbnail_url: course.thumbnail_url || '',
    });
    setDialogOpen(true);
  };

  const categoryColors: Record<string, string> = {
    trading: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    algo: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    crypto: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    general: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Courses</h1>
            <p className="text-muted-foreground">Manage course catalog</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground"><Plus className="w-4 h-4 mr-2" />New Course</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editCourse ? 'Edit Course' : 'Create Course'}</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Stock Market Mastery" /></div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trading">Trading</SelectItem>
                        <SelectItem value="algo">Algo Trading</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Duration (hours)</Label><Input type="number" value={form.duration_hours} onChange={e => setForm({ ...form, duration_hours: e.target.value })} /></div>
                  <div><Label>Total Classes</Label><Input type="number" value={form.total_classes} onChange={e => setForm({ ...form, total_classes: e.target.value })} /></div>
                </div>
                <div><Label>Thumbnail URL</Label><Input value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} placeholder="https://..." /></div>
                <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground">{editCourse ? 'Update' : 'Create'} Course</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : courses.length === 0 ? (
          <Card className="glass-card"><CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No courses yet. Create your first one!</p>
          </CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-card hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-accent" />
                      </div>
                      <Badge className={categoryColors[course.category] || categoryColors.general}>{course.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    {course.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-3 border-t border-border/50">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration_hours}h</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.total_classes} classes</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(course)}><Edit className="w-4 h-4 mr-1" />Edit</Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(course.id)}><Trash2 className="w-4 h-4" /></Button>
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
