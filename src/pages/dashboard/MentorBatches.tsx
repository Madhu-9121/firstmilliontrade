import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function MentorBatches() {
  const { user, role } = useAuth();
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBatch, setEditBatch] = useState<any>(null);
  const [form, setForm] = useState({ name: '', description: '', status: 'active' });

  useEffect(() => { loadBatches(); }, [user]);

  const loadBatches = async () => {
    if (!user) return;
    const query = role === 'admin'
      ? supabase.from('batches').select('*, batch_students(count), profiles!batches_mentor_id_fkey(full_name)')
      : supabase.from('batches').select('*, batch_students(count)').eq('mentor_id', user.id);
    const { data } = await query.order('created_at', { ascending: false });
    setBatches(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editBatch) {
      const { error } = await supabase.from('batches').update({ name: form.name, description: form.description, status: form.status }).eq('id', editBatch.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Batch updated!' });
    } else {
      const { error } = await supabase.from('batches').insert({ name: form.name, description: form.description, mentor_id: user!.id });
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Batch created!' });
    }
    setDialogOpen(false);
    setEditBatch(null);
    setForm({ name: '', description: '', status: 'active' });
    loadBatches();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this batch? All classes and enrollments will be removed.')) return;
    await supabase.from('batches').delete().eq('id', id);
    toast({ title: 'Batch deleted' });
    loadBatches();
  };

  const openEdit = (batch: any) => {
    setEditBatch(batch);
    setForm({ name: batch.name, description: batch.description || '', status: batch.status });
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{role === 'admin' ? 'All Batches' : 'My Batches'}</h1>
            <p className="text-muted-foreground">Manage your course batches</p>
          </div>
          {role !== 'student' && (
            <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditBatch(null); setForm({ name: '', description: '', status: 'active' }); } }}>
              <DialogTrigger asChild>
                <Button className="bg-accent text-accent-foreground"><Plus className="w-4 h-4 mr-2" />New Batch</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editBatch ? 'Edit Batch' : 'Create New Batch'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Batch Name</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Stock Market Basics - Batch 2" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Course description..." />
                  </div>
                  <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground">{editBatch ? 'Update' : 'Create'} Batch</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : batches.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No batches yet. Create your first one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {batches.map((batch, i) => (
              <motion.div key={batch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-card hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{batch.name}</h3>
                        <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}
                          className={batch.status === 'active' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}>
                          {batch.status}
                        </Badge>
                      </div>
                      {batch.description && <p className="text-sm text-muted-foreground mt-1">{batch.description}</p>}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" />{batch.batch_students?.[0]?.count || 0} students</span>
                        {role === 'admin' && batch.profiles && <span>Mentor: {batch.profiles.full_name}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(batch)}><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(batch.id)}><Trash2 className="w-4 h-4" /></Button>
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
