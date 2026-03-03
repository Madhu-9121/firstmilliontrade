import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Course } from '@/pages/Courses';

interface Props {
  course: Course | null;
  onClose: () => void;
}

export default function CourseDetailModal({ course, onClose }: Props) {
  if (!course) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-accent text-sm font-medium mb-1">{course.tagline}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold">{course.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-accent">{course.price}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                {course.level}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Overview</h3>
              {course.overview.split('\n\n').map((para, i) => (
                <p key={i} className="text-muted-foreground mb-3 leading-relaxed">{para}</p>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Key Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/contact" className="flex-1">
                <Button variant="hero" className="w-full">
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
