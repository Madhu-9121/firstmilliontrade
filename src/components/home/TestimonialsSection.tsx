import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Software Engineer turned Trader',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'First Million Trade transformed my understanding of the markets. The structured approach and mentorship helped me go from complete beginner to consistent profits in just 6 months.',
    rating: 5,
    profit: '₹4.5L profit in 8 months',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'The algo trading course was exceptional. I can now automate my trading strategies and focus on my business while my portfolio grows systematically.',
    rating: 5,
    profit: '35% annual returns',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Retired Professional',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Post-retirement, I wanted to grow my savings safely. The Smart Investing course taught me exactly that. The PMS service has been managing my portfolio excellently.',
    rating: 5,
    profit: 'Secured retirement income',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Full-time Trader',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'From struggling with losses to becoming a full-time trader - this journey would not have been possible without the mentorship program. Forever grateful!',
    rating: 5,
    profit: 'Full-time trading career',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

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
            Success Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Hear from Our{' '}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Successful Students
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real people who transformed their financial lives with First Million Trade.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-gold">
                <Quote className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>

            {/* Card */}
            <div className="glass-card rounded-3xl p-8 md:p-12 pt-12 overflow-hidden min-h-[350px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'tween', duration: 0.4 }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500" fill="currentColor" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed">
                    "{testimonials[current].content}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-accent/20"
                    />
                    <h4 className="text-lg font-semibold">{testimonials[current].name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
                    <span className="mt-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {testimonials[current].profit}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === current 
                        ? 'bg-accent w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
