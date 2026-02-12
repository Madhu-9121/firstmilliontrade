import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  LineChart, 
  Briefcase, 
  BookOpen, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: GraduationCap,
    title: 'Training & Courses',
    description: 'Comprehensive programs from beginner to advanced level, covering all aspects of stock market trading.',
    link: '/courses',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'One-on-one guidance from seasoned traders with decades of market experience.',
    link: '/services#mentorship',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: LineChart,
    title: 'Live Trading',
    description: 'Real-time trading sessions with expert signals and market analysis.',
    link: '/services#live-trading',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Management',
    description: 'Professional PMS services to grow your wealth with expert management.',
    link: '/services#pms',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: BookOpen,
    title: 'Research & Analysis',
    description: 'In-depth market research, stock picks, and technical analysis reports.',
    link: '/services#research',
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Industry-recognized certifications to validate your trading expertise.',
    link: '/certificates',
    gradient: 'from-accent to-secondary',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Offerings
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
             <span className="text-accent">
               Succeed
             </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From foundational education to advanced strategies, we provide comprehensive solutions for your trading journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link to={service.link}>
                <div className="h-full glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-large border border-transparent hover:border-accent/20">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button variant="hero" size="lg">
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
