import { motion } from 'framer-motion';
import { Award, CheckCircle2, ArrowRight, Sparkles, Download, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const certificates = [
  {
    id: 1,
    title: 'Market Fundamentals Certificate',
    description: 'Demonstrates mastery of stock market basics, trading platforms, and investment fundamentals.',
    level: 'Foundation',
    duration: '4 weeks',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    title: 'Technical Analyst Certificate',
    description: 'Certifies expertise in chart patterns, technical indicators, and price action analysis.',
    level: 'Intermediate',
    duration: '6 weeks',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Certified Trading Strategist',
    description: 'Validates advanced trading strategy development and risk management skills.',
    level: 'Advanced',
    duration: '8 weeks',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Professional Trader Certificate',
    description: 'The highest certification recognizing complete mastery of professional trading.',
    level: 'Expert',
    duration: '10 weeks',
    color: 'from-amber-500 to-orange-500',
  },
];

const milestones = [
  {
    step: 1,
    title: 'Foundation Phase',
    description: 'Master market basics, learn trading platforms, understand different asset classes.',
    skills: ['Market Structure', 'Order Types', 'Basic Analysis', 'Risk Basics'],
    certificate: 'Market Fundamentals Certificate',
  },
  {
    step: 2,
    title: 'Technical Mastery',
    description: 'Deep dive into charts, patterns, indicators, and technical analysis methodologies.',
    skills: ['Chart Patterns', 'Indicators', 'Volume Analysis', 'Price Action'],
    certificate: 'Technical Analyst Certificate',
  },
  {
    step: 3,
    title: 'Strategy Development',
    description: 'Build and test your own strategies with proper backtesting and optimization.',
    skills: ['Strategy Design', 'Backtesting', 'Position Sizing', 'Risk Management'],
    certificate: 'Certified Trading Strategist',
  },
  {
    step: 4,
    title: 'Professional Excellence',
    description: 'Master advanced concepts, psychology, and professional portfolio management.',
    skills: ['Trading Psychology', 'Portfolio Management', 'Advanced Strategies', 'Market Mastery'],
    certificate: 'Professional Trader Certificate',
  },
];

export default function Certificates() {
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
              Certification Pathway
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Roadmap to{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Trading Excellence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Earn industry-recognized certifications that validate your trading expertise and open doors to professional opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-large">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium mb-3">
                    {cert.level}
                  </span>
                  <h3 className="font-semibold mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                  <p className="text-xs text-accent font-medium">{cert.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Your Learning Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our structured pathway to transform from beginner to professional trader.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-muted -translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative mb-12 last:mb-0"
                >
                  <div className={`md:flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Step number */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-gold z-10">
                      <span className="text-2xl font-bold text-slate-900">{milestone.step}</span>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground mb-4">{milestone.description}</p>
                        
                        {/* Skills */}
                        <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          {milestone.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 rounded-full bg-accent/10 text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Certificate */}
                        <div className={`flex items-center gap-2 text-accent font-medium text-sm ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Award className="w-4 h-4" />
                          {milestone.certificate}
                        </div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </motion.div>
              ))}

              {/* Final achievement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative"
              >
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-gold z-10">
                  <Sparkles className="w-10 h-10 text-slate-900" />
                </div>

                <div className="pl-24 md:pl-0 md:max-w-lg md:mx-auto md:text-center md:pt-6">
                  <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-accent/30">
                    <h3 className="text-2xl font-bold mb-2">First Million Trader</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete all certifications and join the elite community of professional traders.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                      <span className="font-medium">Lifetime Achievement Badge</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Industry Recognized</h3>
              <p className="text-sm text-muted-foreground">
                Our certifications are valued by leading financial institutions and trading firms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Digital & Verifiable</h3>
              <p className="text-sm text-muted-foreground">
                Receive digital certificates with unique verification codes that employers can validate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Career Advancement</h3>
              <p className="text-sm text-muted-foreground">
                Open doors to trading careers, prop firms, and financial advisory roles.
              </p>
            </motion.div>
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
              Ready to Start Your Certification Journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Begin with our foundation course and work your way up to becoming a certified professional trader.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button variant="hero" size="lg">
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Talk to Advisor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
