import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  PieChart, 
  Target, 
  Building2, 
  BookOpen, 
  Briefcase, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const opportunities = [
  {
    icon: TrendingUp,
    title: 'Self Trader & Investor',
    description: 'Learn to independently participate in the stock market by building, managing, and reviewing your own trades and investment portfolios with discipline and risk awareness.',
  },
  {
    icon: Search,
    title: 'Equity Research & Market Analyst',
    description: 'Analyze market trends, company fundamentals, and technical patterns to support data-driven market decisions in research and analytical roles.',
  },
  {
    icon: PieChart,
    title: 'Portfolio Management (Self / Support Roles)',
    description: 'Understand asset allocation, diversification, and portfolio review techniques to manage personal portfolios or assist professionals in wealth management firms.',
  },
  {
    icon: Target,
    title: 'Financial Planning Awareness',
    description: 'Apply market knowledge to goal-based financial planning such as retirement planning, wealth creation, and long-term financial stability (advisory roles require SEBI registration).',
  },
  {
    icon: Building2,
    title: 'Capital Market Careers',
    description: 'Explore opportunities in stock broking firms, investment companies, and financial institutions in roles such as operations, analysis support, risk management, and client servicing.',
  },
  {
    icon: BookOpen,
    title: 'Market Education & Training (Non-Advisory)',
    description: 'Work as a market educator, trainer, or content creator focused on financial literacy, market awareness, and skill development—without providing investment advice or tips.',
  },
  {
    icon: Briefcase,
    title: 'Business & Entrepreneurial Application',
    description: 'Use market knowledge to make informed financial decisions for businesses, manage surplus funds responsibly, and understand economic and market cycles.',
  },
  {
    icon: Award,
    title: 'Professional Certifications & Growth',
    description: 'Prepare for recognized certifications such as NISM / NSE / BSE, opening pathways to higher credibility and long-term career growth in the financial ecosystem.',
  },
];

export default function Opportunities() {
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
              Career Pathways
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Opportunities After Learning the{' '}
              <span className="text-accent">Stock Market</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your market education opens doors to multiple career paths and financial opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-8 group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-300">
                  <opp.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {opp.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{opp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              All opportunities are subject to individual skill, learning, market risk, and applicable regulatory requirements. FIRST MILLION TRADE provides education only and does not offer investment advice.
            </p>
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
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Unlock These Opportunities?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start your learning journey today and open doors to a rewarding career in the financial markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-accent text-accent-foreground font-bold hover:brightness-110">
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
