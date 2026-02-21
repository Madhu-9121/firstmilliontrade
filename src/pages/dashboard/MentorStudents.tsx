import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Trash2, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function MentorStudents() {
  const { user, role } = useAuth();
  const [batches, setBatches] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

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
      const { data: enrollData } = await supabase
        .from('batch_students')
        .select('*, batches(name), profiles!batch_students_student_id_fkey(full_name, email)')
        .in('batch_id', batchIds);
      setEnrollments(enrollData || []);
    }

    // Load all students for enrollment
    const { data: roles } = await supabase.from('user_roles').select('user_id').eq('role', 'student');
    if (roles && roles.length > 0) {
      const { data: students } = await supabase.from('profiles').select('id, full_name, email').in('id', roles.map(r => r.user_id));
      setAllStudents(students || []);
    }
    setLoading(false);
  };

  const handleEnroll = async () => {
    if (!selectedBatch || !selectedStudent) return;
    const { error } = await supabase.from('batch_students').insert({ batch_id: selectedBatch, student_id: selectedStudent });
    if (error) {
      toast({ title: error.message.includes('duplicate') ? 'Student already enrolled' : 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Student enrolled!' });
    setDialogOpen(false);
    setSelectedBatch('');
    setSelectedStudent('');
    loadData();
  };

  const handleRemove = async (enrollmentId: string) => {
    if (!confirm('Remove this student from the batch?')) return;
    await supabase.from('batch_students').delete().eq('id', enrollmentId);
    toast({ title: 'Student removed' });
    loadData();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-muted-foreground">Manage batch enrollments</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground"><UserPlus className="w-4 h-4 mr-2" />Enroll Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Enroll Student in Batch</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Select Batch</Label>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger><SelectValue placeholder="Choose batch" /></SelectTrigger>
                    <SelectContent>
                      {batches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Student</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger><SelectValue placeholder="Choose student" /></SelectTrigger>
                    <SelectContent>
                      {allStudents.map(s => <SelectItem key={s.id} value={s.id}>{s.full_name} ({s.email})</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleEnroll} className="w-full bg-accent text-accent-foreground">Enroll</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : enrollments.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No students enrolled yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {enrollments.map((enrollment, i) => (
              <motion.div key={enrollment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-card">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{enrollment.profiles?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{enrollment.profiles?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{enrollment.batches?.name}</Badge>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleRemove(enrollment.id)}><Trash2 className="w-4 h-4" /></Button>
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
