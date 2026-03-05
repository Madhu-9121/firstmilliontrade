import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import CourseDetailModal from '@/components/courses/CourseDetailModal';

export interface Course {
  id: number;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  highlights: string[];
  price: string;
  level: string;
  slug: string;
  images: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Wealth Foundations Program',
    tagline: 'Build Your Financial Base',
    description: 'Perfect for absolute beginners. Learn market fundamentals, basic analysis, and risk management principles to build a solid foundation.',
    overview: 'The Wealth Foundations Program is designed for individuals who want to enter financial markets with clarity, structure, and confidence. This program builds a strong base in market fundamentals, technical analysis, and disciplined risk management — ensuring you don\'t approach trading randomly but with a professional framework.\n\nWe focus on practical understanding, capital protection, and decision-making discipline so you can participate in markets with confidence rather than emotion.',
    highlights: ['Market Structure & Participants', 'Equity, Debt, Derivatives Overview', 'Fundamental Analysis Basics', 'Planning & Entry–Exit Framework', 'Financial Statements Simplified', 'Structured Approach to Consistent Growth'],
    price: '₹4,999 + GST',
    level: 'Beginner',
    slug: 'wealth-foundations',
    images: [
      '/images/courses/wealth-1.jpg',
      '/images/courses/wealth-2.jpg',
      '/images/courses/wealth-3.jpg',
      '/images/courses/wealth-4.jpg',
      '/images/courses/wealth-5.jpg',
    ],
  },
  {
    id: 2,
    title: 'Institutional Trading Framework',
    tagline: 'Trade with Precision',
    description: 'Advanced program covering professional trading strategies, technical analysis, and institutional-level decision-making frameworks.',
    overview: 'The Institutional Trading Framework is designed for traders who want to operate with structure and strategic precision. This program moves beyond retail-level strategies and introduces professional market concepts such as liquidity mapping, advanced price action, and systematic capital deployment.\n\nThe focus is on disciplined execution, controlled risk exposure, and performance optimization — helping traders think and act with an institutional mindset.',
    highlights: ['Market Structure (HH/HL & LH/LL)', 'Advanced Support & Resistance', 'Trendlines & Breakout Strategies', 'Advanced Price Action & Confirmation Models', 'Multi-Timeframe Trading Approach', 'Structured Risk Allocation Techniques', 'Trade Management & Scaling Strategies', 'Performance Tracking & Strategy Refinement'],
    price: '₹19,999 + GST',
    level: 'Intermediate',
    slug: 'institutional-trading',
    images: [
      '/images/courses/institutional-1.jpg',
      '/images/courses/institutional-2.jpg',
      '/images/courses/institutional-3.jpg',
      '/images/courses/institutional-4.jpg',
      '/images/courses/institutional-5.jpg',
    ],
  },
  {
    id: 3,
    title: 'Algorithmic & Derivatives Mastery',
    tagline: 'Automate Your Edge',
    description: 'Master algorithmic trading concepts and derivatives strategies used by professional trading desks and hedge funds.',
    overview: 'Algorithmic & Derivatives Mastery is built for traders who want to deepen their expertise in Futures and Options while developing structured trading systems. This program combines derivatives knowledge with systematic strategy design to help traders operate with precision and consistency.\n\nYou will gain clarity on options structures, volatility behavior, and risk-adjusted execution — enabling you to manage leveraged instruments responsibly and strategically.',
    highlights: ['Comprehensive Futures & Options Framework', 'Options Strategies, Spreads & Income Models', 'Option Greeks & Volatility Application', 'Option Chain Reading', 'Structured Risk Management in F&O', 'Strategy Logic Development & Backtesting Concepts', 'Professional-Level Trade Execution Models', 'Automation Concepts & API Trading', 'Pine Script Strategy Building'],
    price: '₹24,999 + GST',
    level: 'Advanced',
    slug: 'algo-derivatives',
    images: [
      '/images/courses/algo-1.jpg',
      '/images/courses/algo-2.jpg',
      '/images/courses/algo-3.jpg',
      '/images/courses/algo-4.jpg',
      '/images/courses/algo-5.jpg',
    ],
  },
  {
    id: 4,
    title: 'Global Alpha Program',
    tagline: 'Invest Beyond Borders',
    description: 'Understand global markets, international investing strategies, and how to diversify your portfolio across geographies.',
    overview: 'The Global Alpha Program is designed for traders and investors seeking exposure beyond domestic markets. This course introduces global financial systems, macroeconomic drivers, and diversification strategies to help you build resilient portfolios across geographies.\n\nThe emphasis is on strategic asset allocation, macro analysis, and risk balancing — enabling participants to approach global investing with informed decision-making and long-term vision.',
    highlights: ['Global Market Structures & Major Indices', 'Commodities and Crypto Market', 'Macroeconomic Cycles & Central Bank Policies', 'Major And Minor Currencies', 'International Diversification Strategies', 'ETF & Multi-Asset Allocation Models', 'Long-Term Wealth Structuring Framework'],
    price: '₹19,999 + GST',
    level: 'Intermediate',
    slug: 'global-alpha',
    images: [
      '/images/courses/global-1.jpg',
      '/images/courses/global-2.jpg',
      '/images/courses/global-3.jpg',
      '/images/courses/global-4.jpg',
      '/images/courses/global-5.jpg',
    ],
  },
  {
    id: 5,
    title: 'NISM Certifications',
    tagline: 'Get Professionally Certified',
    description: 'Preparation courses for NISM certification exams, essential for anyone seeking professional roles in the Indian capital markets.',
    overview: 'The NISM Certification Program provides structured and exam-focused preparation for professional certifications required in the Indian capital markets. This course is ideal for individuals pursuing careers in research, advisory, derivatives, or securities operations.\n\nBeyond exam preparation, the program strengthens your regulatory understanding and practical market knowledge, positioning you for professional growth in the financial industry.',
    highlights: ['Complete Syllabus Coverage with Concept Clarity', 'Exam-Oriented Training & Mock Assessments', 'Case-Based Practical Understanding', 'Regulatory & Compliance Framework', 'Real-World Application of Market Concepts', 'Career-Oriented Knowledge Development'],
    price: '₹9,999 + GST',
    level: 'Certification',
    slug: 'nism-certifications',
    images: [
      '/images/courses/nism-1.jpg',
      '/images/courses/nism-2.jpg',
      '/images/courses/nism-3.jpg',
      '/images/courses/nism-4.jpg',
      '/images/courses/nism-5.jpg',
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Certification: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

function CourseImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-64 md:h-auto overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt="Course"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-5' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
              <span className="text-accent">Confidence</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Structured programs designed by market experts to take you from beginner to professional trader.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses List */}
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
                  {/* Image Carousel */}
                  <div className="relative h-64 md:h-auto min-h-[280px]">
                    <CourseImageCarousel images={course.images} />
                    {/* Level & Price overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
                        {course.level}
                      </span>
                      <div className="text-right bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                        <span className="block text-xl font-bold text-white">{course.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col">
                    <div className="mb-4">
                      <p className="text-accent text-sm font-medium mb-1">{course.tagline}</p>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold">{course.title}</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {course.highlights.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-4">
                      <Button variant="hero" className="flex-1" onClick={() => setSelectedCourse(course)}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Link to="/contact">
                        <Button variant="outline">Enquire</Button>
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

      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </Layout>
  );
}
