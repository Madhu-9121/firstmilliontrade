import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Logo from '@/components/layout/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, role, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && role) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, role, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Welcome back!' });
      }
    } else {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      if (error) {
        toast({ title: 'Signup Failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Account Created!', description: 'You can now log in.' });
        setIsLogin(true);
      }
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card rounded-2xl p-8">
              <div className="text-center mb-8">
                <Link to="/" className="inline-block"><Logo scale={2} /></Link>
              </div>

              {/* Toggle */}
              <div className="flex bg-muted rounded-lg p-1 mb-8">
                <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Login</button>
                <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${!isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Sign Up</button>
              </div>

              {/* Sample Credentials */}
              {isLogin && (
                <div className="mb-6 p-4 rounded-xl bg-accent/5 border border-accent/20 text-sm space-y-2">
                  <p className="font-semibold text-accent text-xs uppercase tracking-wide">Sample Credentials</p>
                  <div className="grid gap-1.5 text-muted-foreground">
                    <p><span className="font-medium text-foreground">Admin:</span> admin@firstmilliontrade.com / Admin@123</p>
                    <p><span className="font-medium text-foreground">Mentor:</span> mentor@firstmilliontrade.com / Mentor@123</p>
                    <p><span className="font-medium text-foreground">Student:</span> student@firstmilliontrade.com / Student@123</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="pl-11" required={!isLogin} />
                  </motion.div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="pl-11" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={handleChange} className="pl-11 pr-11" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="pl-11" required={!isLogin} />
                  </motion.div>
                )}
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground font-bold hover:brightness-110" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />Please wait...</> : isLogin ? <>Login <ArrowRight className="w-5 h-5" /></> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
