import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type AppRole = 'admin' | 'mentor' | 'student';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  profile: { full_name: string; email: string; avatar_url: string | null } | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    loading: true,
    profile: null,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Fetch role and profile using setTimeout to avoid deadlock
        setTimeout(async () => {
          const [{ data: roleData }, { data: profileData }] = await Promise.all([
            supabase.from('user_roles').select('role').eq('user_id', session.user.id).single(),
            supabase.from('profiles').select('full_name, email, avatar_url').eq('id', session.user.id).single(),
          ]);

          setState({
            user: session.user,
            session,
            role: (roleData?.role as AppRole) || null,
            loading: false,
            profile: profileData || null,
          });
        }, 0);
      } else {
        setState({ user: null, session: null, role: null, loading: false, profile: null });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signIn, signUp, signOut };
}
