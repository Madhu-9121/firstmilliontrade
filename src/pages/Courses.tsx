import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const courses = [
  {
    id: 1,
    title: 'Smart Investing',
    tagline: 'Build Wealth Systematically',
    description: 'Learn the fundamentals of investing, portfolio construction, and long-term wealth building strategies. Perfect for beginners looking to grow their savings intelligently.',
    duration: '8 Weeks',
    students: '2,500+',
    rating: 4.9,
    level: 'Beginner',
    price: '₹9,999',
    originalPrice: '₹14,999',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    slug: 'smart-investing',
    features: [
      'Understanding market basics',
      'Portfolio diversification',
      'Risk management fundamentals',
      'Long-term investment strategies',
    ],
  },
  {
    id: 2,
    title: 'Market Analysis',
    tagline: 'Master Technical Analysis',
    description: 'Comprehensive technical analysis course covering chart patterns, indicators, volume analysis, and price action trading for informed decision making.',
    duration: '10 Weeks',
    students: '3,200+',
    rating: 4.8,
    level: 'Intermediate',
    price: '₹14,999',
    originalPrice: '₹24,999',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    slug: 'market-analysis',
    features: [
      'Chart pattern recognition',
      'Technical indicators mastery',
      'Volume & price action',
      'Trading view platform',
    ],
  },
  {
    id: 3,
    title: 'Trading Strategies',
    tagline: 'Trade Like a Pro',
    description: 'Advanced trading strategies, position sizing, risk-reward optimization, and trading psychology for consistent profitability in all market conditions.',
    duration: '12 Weeks',
    students: '1,800+',
    rating: 4.9,
    level: 'Advanced',
    price: '₹24,999',
    originalPrice: '₹39,999',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    slug: 'trading-strategies',
    features: [
      'Intraday & swing strategies',
      'Position sizing & risk management',
      'Trading psychology',
      'Live market practice',
    ],
  },
  {
    id: 4,
    title: 'Algo Trading',
    tagline: 'Automate Your Success',
    description: 'Learn to build, backtest, and deploy automated trading systems. Master Python for trading, API integration, and algorithmic strategy development.',
    duration: '14 Weeks',
    students: '900+',
    rating: 4.9,
    level: 'Expert',
    price: '₹39,999',
    originalPrice: '₹59,999',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    slug: 'algo-trading',
    features: [
      'Python for trading',
      'Strategy backtesting',
      'API integration',
      'Live algo deployment',
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Expert: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

export default function Courses() {
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
              Our Courses
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Learn to Trade with{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Structured programs designed by market experts to take you from beginner to professional trader.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto overflow-hidden group">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        <Play className="w-7 h-7 text-foreground ml-1" fill="currentColor" />
                      </motion.div>
                    </div>

                    {/* Level & Price */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
                        {course.level}
                      </span>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-white">{course.price}</span>
                        <span className="text-sm text-white/70 line-through">{course.originalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col">
                    <div className="mb-4">
                      <p className="text-accent text-sm font-medium mb-1">{course.tagline}</p>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold">{course.title}</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                        {course.rating}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {course.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto flex gap-4">
                      <Link to={`/courses/${course.slug}`} className="flex-1">
                        <Button variant="hero" className="w-full">
                          Enroll Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline">
                          Enquire
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Course is Right for You?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our education advisors can help you choose the perfect learning path based on your experience and goals.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
