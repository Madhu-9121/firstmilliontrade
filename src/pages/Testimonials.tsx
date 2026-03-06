import { motion } from 'framer-motion';
import { Quote, Star, Play } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Reddy',
    role: 'Software Engineer turned Trader',
    image: '/images/testimonials/indian-1.jpg',
    content: 'First Million Trade gave me a complete execution framework. In six months, I moved from random entries to disciplined setup-based trading with measurable consistency.',
    rating: 5,
    course: 'Trading Strategies',
    profit: '₹4.5L growth in 8 months',
  },
  {
    id: 2,
    name: 'Sravani Kulkarni',
    role: 'Business Owner',
    image: '/images/testimonials/indian-2.jpg',
    content: 'The algo sessions were practical and easy to apply. I can now run a rules-based approach while focusing on my business operations.',
    rating: 5,
    course: 'Algo Trading',
    profit: '34% annual returns',
  },
  {
    id: 3,
    name: 'Ramesh Varma',
    role: 'Retired Professional',
    image: '/images/testimonials/indian-3.jpg',
    content: 'Post-retirement, I needed stable and low-stress portfolio decisions. This course helped me build confidence and maintain a safer allocation model.',
    rating: 5,
    course: 'Smart Investing',
    profit: 'Reliable retirement income',
  },
  {
    id: 4,
    name: 'Keerthi Nair',
    role: 'Full-time Trader',
    image: '/images/testimonials/indian-4.jpg',
    content: 'Na discipline ki chala help ayyindi. Weekly review process and psychology coaching helped me reduce overtrading and improve win quality.',
    rating: 5,
    course: 'Mentorship',
    profit: 'Full-time trading career',
  },
  {
    id: 5,
    name: 'Vivek Sharma',
    role: 'Finance Professional',
    image: '/images/testimonials/indian-5.jpg',
    content: 'Even with a finance background, this program improved my practical execution. The structure around risk and scaling positions was a game changer.',
    rating: 5,
    course: 'Market Analysis',
    profit: '29% portfolio growth',
  },
  {
    id: 6,
    name: 'Anitha Rao',
    role: 'Homemaker & Investor',
    image: '/images/testimonials/indian-6.jpg',
    content: 'Market ante bhayam undedi, but now I invest with clarity. The teaching style is simple, supportive, and very practical for beginners.',
    rating: 5,
    course: 'Smart Investing',
    profit: 'Financial confidence achieved',
  },
];

export default function Testimonials() {
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
