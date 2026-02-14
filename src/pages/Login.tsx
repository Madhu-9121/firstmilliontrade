import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: isLogin ? 'Login Successful!' : 'Account Created!',
      description: isLogin 
        ? 'Welcome back! Redirecting to your dashboard...' 
        : 'Your account has been created. Please check your email to verify.',
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-block">
                  <img src={logo} alt="First Million Trade" className="h-12 w-auto mx-auto" />
                </Link>
              </div>

              {/* Toggle */}
              <div className="flex bg-muted rounded-lg p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    !isLogin ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign Up
                </button>
              </div>

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

                {isLogin && (
                  <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">Forgot password?</Link>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground font-bold hover:brightness-110" disabled={isSubmitting}>
                  {isSubmitting ? 'Please wait...' : isLogin ? (<>Login <ArrowRight className="w-5 h-5" /></>) : (<>Create Account <ArrowRight className="w-5 h-5" /></>)}
                </Button>
              </form>

              {!isLogin && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By creating an account, you agree to our <Link to="/terms" className="text-accent hover:underline">Terms</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
