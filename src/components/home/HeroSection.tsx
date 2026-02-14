import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const whatsappNumber = '919032046008';
  const whatsappMessage = encodeURIComponent('Hi! I would like to book a free consultation with First Million Trade.');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Motivation Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-primary-foreground">
              "The Stock Market is a Device for Transferring Money from the{' '}
              <span className="text-accent">Impatient</span> to the{' '}
              <span className="text-accent">Patient</span>"
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-4"
          >
            At <strong className="text-accent">First Million Trade</strong>, we empower you with the knowledge, discipline, and strategies needed to navigate the markets with confidence. Our structured programs transform beginners into informed participants — building financial literacy, not just trades.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-primary-foreground/60 italic mb-10"
          >
            Your Journey to the First Million
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/courses">
              <Button size="xl" className="bg-accent text-accent-foreground font-bold shadow-blue hover:brightness-110 hover:scale-105 transform transition-all">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <MessageCircle className="w-5 h-5" />
                Book Free Consultation
              </Button>
            </a>
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
