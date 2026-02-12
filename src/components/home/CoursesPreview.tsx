import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const courses = [
  {
    id: 1,
    title: 'Smart Investing Fundamentals',
    description: 'Learn the basics of smart investing, portfolio building, and long-term wealth creation strategies.',
    duration: '8 Weeks',
    students: '2,500+',
    rating: 4.9,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    slug: 'smart-investing',
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    description: 'Master chart patterns, indicators, and technical analysis tools used by professional traders.',
    duration: '10 Weeks',
    students: '3,200+',
    rating: 4.8,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    slug: 'market-analysis',
  },
  {
    id: 3,
    title: 'Advanced Trading Strategies',
    description: 'Proven trading strategies, risk management, and psychology for consistent profits.',
    duration: '12 Weeks',
    students: '1,800+',
    rating: 4.9,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    slug: 'trading-strategies',
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function CoursesPreview() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Featured Courses
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Transform Your Trading{' '}
             <span className="text-accent">
               Skills
             </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Structured learning paths designed by market experts with years of successful trading experience.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Level Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent" fill="currentColor" />
                      {course.rating}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/courses/${course.slug}`}>
                    <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
                      View Course
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button variant="hero" size="lg">
              Explore All Courses
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
