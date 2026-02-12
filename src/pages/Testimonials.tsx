import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Software Engineer turned Trader',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'First Million Trade transformed my understanding of the markets. The structured approach and mentorship helped me go from complete beginner to consistent profits in just 6 months. The live trading sessions were invaluable.',
    rating: 5,
    course: 'Trading Strategies',
    profit: '₹4.5L profit in 8 months',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'The algo trading course was exceptional. I can now automate my trading strategies and focus on my business while my portfolio grows systematically. The mentors are patient and explain complex concepts simply.',
    rating: 5,
    course: 'Algo Trading',
    profit: '35% annual returns',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Retired Professional',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Post-retirement, I wanted to grow my savings safely. The Smart Investing course taught me exactly that. Now I manage my own portfolio confidently. The PMS service has been excellent for my larger holdings.',
    rating: 5,
    course: 'Smart Investing',
    profit: 'Secured retirement income',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Full-time Trader',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'From struggling with losses to becoming a full-time trader - this journey would not have been possible without the mentorship program. The one-on-one sessions helped me fix my psychology and trading habits.',
    rating: 5,
    course: 'Mentorship',
    profit: 'Full-time trading career',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Finance Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Despite my finance background, I lacked practical trading skills. The Market Analysis course filled that gap perfectly. The technical analysis training is world-class.',
    rating: 5,
    course: 'Market Analysis',
    profit: '28% portfolio growth',
  },
  {
    id: 6,
    name: 'Meera Joshi',
    role: 'Homemaker & Investor',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    content: 'As someone with no prior market knowledge, I was intimidated at first. But the structured curriculum and supportive community made learning enjoyable. Now I confidently manage our family investments.',
    rating: 5,
    course: 'Smart Investing',
    profit: 'Financial independence',
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Success Stories
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Results from{' '}
               <span className="text-accent">
                 Real Students
               </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Hear from our community of successful traders who transformed their financial lives with First Million Trade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full glass-card rounded-2xl p-6 relative">
                  {/* Quote icon */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-gold">
                    <Quote className="w-5 h-5 text-accent-foreground" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4 pt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/90 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Course badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      {testimonial.course}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
                      {testimonial.profit}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Happy Students' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '85%', label: 'Success Rate' },
              { value: '50+', label: 'Expert Mentors' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Watch Their Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Video testimonials from our successful students sharing their trading transformation stories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-video glass-card rounded-2xl flex items-center justify-center cursor-pointer group hover:shadow-large transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
