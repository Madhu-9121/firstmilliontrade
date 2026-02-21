import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Users, Video, Calendar,
  LogOut, Menu, X, ChevronRight, User, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth, type AppRole } from '@/hooks/useAuth';
import Logo from '@/components/layout/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems: Record<AppRole, { name: string; path: string; icon: any }[]> = {
  admin: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/dashboard/users', icon: Users },
    { name: 'Batches', path: '/dashboard/batches', icon: BookOpen },
    { name: 'Classes', path: '/dashboard/classes', icon: Calendar },
    { name: 'Recordings', path: '/dashboard/recordings', icon: Video },
  ],
  mentor: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Batches', path: '/dashboard/batches', icon: BookOpen },
    { name: 'My Classes', path: '/dashboard/classes', icon: Calendar },
    { name: 'Students', path: '/dashboard/students', icon: Users },
    { name: 'Recordings', path: '/dashboard/recordings', icon: Video },
  ],
  student: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
    { name: 'Schedule', path: '/dashboard/schedule', icon: Calendar },
    { name: 'Recordings', path: '/dashboard/recordings', icon: Video },
  ],
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, role, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = role ? menuItems[role] : [];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card min-h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-border">
          <Link to="/">
            <Logo scale={1.5} />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive mt-2"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Logo scale={1.2} />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent capitalize">{role}</span>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-border">
                <Logo scale={1.5} />
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={handleSignOut}>
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
