import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import CourseDetailModal from '@/components/courses/CourseDetailModal';

const courseImages = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop',
];

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
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Wealth Foundations Program',
    tagline: 'Build Your Financial Base',
    description: 'Perfect for absolute beginners. Learn market fundamentals, basic analysis, and risk management principles to build a solid foundation.',
    overview: 'The Wealth Foundations Program is designed for individuals who want to enter financial markets with clarity, structure, and confidence. This program builds a strong base in market fundamentals, technical analysis, and disciplined risk management — ensuring you don\'t approach trading randomly but with a professional framework.\n\nWe focus on practical understanding, capital protection, and decision-making discipline so you can participate in markets with confidence rather than emotion. This module lays the groundwork required before moving into advanced trading strategies.',
    highlights: [
      'Market Structure & Participants',
      'Equity, Debt, Derivatives Overview',
      'Fundamental Analysis Basics',
      'Planning & Entry–Exit Framework',
      'Financial Statements Simplified',
      'Structured Approach to Consistent Growth',
    ],
    price: '₹4,999 + GST',
    level: 'Beginner',
    slug: 'wealth-foundations',
  },
  {
    id: 2,
    title: 'Institutional Trading Framework',
    tagline: 'Trade with Precision',
    description: 'Advanced program covering professional trading strategies, technical analysis, and institutional-level decision-making frameworks.',
    overview: 'The Institutional Trading Framework is designed for traders who want to operate with structure and strategic precision. This program moves beyond retail-level strategies and introduces professional market concepts such as liquidity mapping, advanced price action, and systematic capital deployment.\n\nThe focus is on disciplined execution, controlled risk exposure, and performance optimization — helping traders think and act with an institutional mindset.',
    highlights: [
      'Market Structure (HH/HL & LH/LL)',
      'Advanced Support & Resistance',
      'Trendlines & Breakout Strategies',
      'Advanced Price Action & Confirmation Models',
      'Multi-Timeframe Trading Approach',
      'Structured Risk Allocation Techniques',
      'Trade Management & Scaling Strategies',
      'Performance Tracking & Strategy Refinement',
    ],
    price: '₹19,999 + GST',
    level: 'Intermediate',
    slug: 'institutional-trading',
  },
  {
    id: 3,
    title: 'Algorithmic & Derivatives Mastery',
    tagline: 'Automate Your Edge',
    description: 'Master algorithmic trading concepts and derivatives strategies used by professional trading desks and hedge funds.',
    overview: 'Algorithmic & Derivatives Mastery is built for traders who want to deepen their expertise in Futures and Options while developing structured trading systems. This program combines derivatives knowledge with systematic strategy design to help traders operate with precision and consistency.\n\nYou will gain clarity on options structures, volatility behavior, and risk-adjusted execution — enabling you to manage leveraged instruments responsibly and strategically.',
    highlights: [
      'Comprehensive Futures & Options Framework',
      'Options Strategies, Spreads & Income Models',
      'Option Greeks & Volatility Application',
      'Option Chain Reading',
      'Structured Risk Management in F&O',
      'Strategy Logic Development & Backtesting Concepts',
      'Professional-Level Trade Execution Models',
      'Automation Concepts & API Trading',
      'Pine Script Strategy Building',
    ],
    price: '₹24,999 + GST',
    level: 'Advanced',
    slug: 'algo-derivatives',
  },
  {
    id: 4,
    title: 'Global Alpha Program',
    tagline: 'Invest Beyond Borders',
    description: 'Understand global markets, international investing strategies, and how to diversify your portfolio across geographies.',
    overview: 'The Global Alpha Program is designed for traders and investors seeking exposure beyond domestic markets. This course introduces global financial systems, macroeconomic drivers, and diversification strategies to help you build resilient portfolios across geographies.\n\nThe emphasis is on strategic asset allocation, macro analysis, and risk balancing — enabling participants to approach global investing with informed decision-making and long-term vision.',
    highlights: [
      'Global Market Structures & Major Indices',
      'Commodities and Crypto Market',
      'Macroeconomic Cycles & Central Bank Policies',
      'Major And Minor Currencies',
      'International Diversification Strategies',
      'ETF & Multi-Asset Allocation Models',
      'Long-Term Wealth Structuring Framework',
    ],
    price: '₹19,999 + GST',
    level: 'Intermediate',
    slug: 'global-alpha',
  },
  {
    id: 5,
    title: 'NISM Certifications',
    tagline: 'Get Professionally Certified',
    description: 'Preparation courses for NISM certification exams, essential for anyone seeking professional roles in the Indian capital markets.',
    overview: 'The NISM Certification Program provides structured and exam-focused preparation for professional certifications required in the Indian capital markets. This course is ideal for individuals pursuing careers in research, advisory, derivatives, or securities operations.\n\nBeyond exam preparation, the program strengthens your regulatory understanding and practical market knowledge, positioning you for professional growth in the financial industry.',
    highlights: [
      'Complete Syllabus Coverage with Concept Clarity',
      'Exam-Oriented Training & Mock Assessments',
      'Case-Based Practical Understanding',
      'Regulatory & Compliance Framework',
      'Real-World Application of Market Concepts',
      'Career-Oriented Knowledge Development',
    ],
    price: '₹9,999 + GST',
    level: 'Certification',
    slug: 'nism-certifications',
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Certification: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courseImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={courseImages[current]}
          alt="Trading & Finance"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {courseImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-accent w-6' : 'bg-white/50'}`}
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
      {/* Hero with Image Carousel */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-72 lg:h-80"
            >
              <ImageCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <span className="text-lg font-bold text-accent">{course.price}</span>
                  </div>

                  <h2 className="font-serif text-xl font-bold mb-1">{course.title}</h2>
                  <p className="text-accent text-sm font-medium mb-3">{course.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">{course.description}</p>

                  <div className="space-y-2 mb-6">
                    {course.highlights.slice(0, 4).map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-muted-foreground">{h}</span>
                      </div>
                    ))}
                    {course.highlights.length > 4 && (
                      <p className="text-xs text-muted-foreground pl-6">
                        +{course.highlights.length - 4} more topics
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Link to="/contact">
                      <Button variant="outline">Enquire</Button>
                    </Link>
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

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </Layout>
  );
}
