import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Opportunities from "./pages/Opportunities";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/lms/ProtectedRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import MentorBatches from "./pages/dashboard/MentorBatches";
import MentorClasses from "./pages/dashboard/MentorClasses";
import MentorStudents from "./pages/dashboard/MentorStudents";
import StudentCourses from "./pages/dashboard/StudentCourses";
import StudentSchedule from "./pages/dashboard/StudentSchedule";
import Recordings from "./pages/dashboard/Recordings";
import AdminUsers from "./pages/dashboard/AdminUsers";
import CourseManagement from "./pages/dashboard/CourseManagement";
import StudentProgress from "./pages/dashboard/StudentProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<Courses />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/login" element={<Login />} />

          {/* LMS Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/dashboard/batches" element={<ProtectedRoute allowedRoles={['admin', 'mentor']}><MentorBatches /></ProtectedRoute>} />
          <Route path="/dashboard/classes" element={<ProtectedRoute allowedRoles={['admin', 'mentor']}><MentorClasses /></ProtectedRoute>} />
          <Route path="/dashboard/students" element={<ProtectedRoute allowedRoles={['admin', 'mentor']}><MentorStudents /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/dashboard/course-management" element={<ProtectedRoute allowedRoles={['admin', 'mentor']}><CourseManagement /></ProtectedRoute>} />
          <Route path="/dashboard/courses" element={<ProtectedRoute allowedRoles={['student']}><StudentCourses /></ProtectedRoute>} />
          <Route path="/dashboard/progress" element={<ProtectedRoute allowedRoles={['student']}><StudentProgress /></ProtectedRoute>} />
          <Route path="/dashboard/schedule" element={<ProtectedRoute allowedRoles={['student']}><StudentSchedule /></ProtectedRoute>} />
          <Route path="/dashboard/recordings" element={<ProtectedRoute><Recordings /></ProtectedRoute>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
