import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, UserPlus, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/lms/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadUsers(); }, [user]);

  const loadUsers = async () => {
    if (!user) return;
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: roles } = await supabase.from('user_roles').select('*');

    const merged = (profiles || []).map(p => ({
      ...p,
      role: roles?.find(r => r.user_id === p.id)?.role || 'none',
      role_id: roles?.find(r => r.user_id === p.id)?.id,
    }));
    setUsers(merged);
    setLoading(false);
  };

  const updateRole = async (userId: string, newRole: string, existingRoleId?: string) => {
    const roleValue = newRole as 'admin' | 'mentor' | 'student';
    if (existingRoleId) {
      await supabase.from('user_roles').update({ role: roleValue }).eq('id', existingRoleId);
    } else {
      await supabase.from('user_roles').insert({ user_id: userId, role: roleValue });
    }
    toast({ title: 'Role updated!' });
    loadUsers();
  };

  const roleColor: Record<string, string> = {
    admin: 'bg-red-500/10 text-red-600 border-red-500/20',
    mentor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    student: 'bg-green-500/10 text-green-600 border-green-500/20',
    none: 'bg-muted text-muted-foreground',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all users and their roles</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid gap-3">
            {users.map((u, i) => (
              <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="glass-card">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{u.full_name || 'Unnamed'}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={roleColor[u.role]}>{u.role}</Badge>
                      <Select value={u.role} onValueChange={(v) => updateRole(u.id, v, u.role_id)}>
                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
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
