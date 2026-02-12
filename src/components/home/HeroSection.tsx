import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Users, value: '10,000+', label: 'Students Trained' },
  { icon: TrendingUp, value: '85%', label: 'Success Rate' },
  { icon: Award, value: '50+', label: 'Certifications' },
  { icon: BarChart3, value: '₹500Cr+', label: 'Assets Managed' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Your Journey to Financial Freedom Starts Here
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-primary-foreground"
          >
            Master the Markets,{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Build Your First Million
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -z-10 origin-left"
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto mb-10"
          >
            Comprehensive stock market education, expert mentorship, and proven strategies to transform your financial future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/courses">
              <Button variant="hero" size="xl">
                Read More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Book Free Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
