import { motion } from 'framer-motion';
import { Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const milestones = [
  {
    step: 1,
    title: 'Foundation',
    description: 'Master the basics of stock markets, trading platforms, and investment fundamentals.',
    certificate: 'Market Fundamentals Certificate',
  },
  {
    step: 2,
    title: 'Technical Analysis',
    description: 'Learn chart patterns, indicators, and technical analysis for informed trading decisions.',
    certificate: 'Technical Analyst Certificate',
  },
  {
    step: 3,
    title: 'Strategy Development',
    description: 'Develop and backtest your own trading strategies with proper risk management.',
    certificate: 'Certified Trading Strategist',
  },
  {
    step: 4,
    title: 'Professional Trading',
    description: 'Advanced concepts, portfolio management, and professional trading psychology.',
    certificate: 'Professional Trader Certificate',
  },
];

export default function CertificatePath() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Certification Pathway
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Your Roadmap to{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Financial Freedom
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Follow our structured certification pathway to transform from a beginner to a professional trader. Each milestone builds on the previous, ensuring comprehensive knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/certificates">
                <Button variant="hero" size="lg">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Talk to Advisor
                </Button>
              </Link>
            </div>

            {/* Achievement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex items-center gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold">Industry Recognized</p>
                <p className="text-sm text-muted-foreground">
                  Our certificates are valued by leading financial institutions
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-muted hidden md:block" />

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Step number */}
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-gold">
                    <span className="text-lg font-bold text-slate-900">{milestone.step}</span>
                  </div>

                  {/* Card */}
                  <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-medium">
                    <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {milestone.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      <Award className="w-4 h-4" />
                      {milestone.certificate}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Final achievement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 ml-16 md:ml-20 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-accent/30"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-semibold">Complete Pathway</p>
                  <p className="text-sm text-muted-foreground">
                    Earn your "First Million Trader" certification
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
