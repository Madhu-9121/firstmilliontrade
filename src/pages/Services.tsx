import { motion } from 'framer-motion';
import { Users, LineChart, Briefcase, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'mentorship',
    icon: Users,
    title: 'Expert Mentorship',
    tagline: 'Personalized Guidance',
    description: 'Get one-on-one mentorship from experienced traders who have navigated all market conditions. Our mentors provide personalized strategies tailored to your goals and risk appetite.',
    features: [
      'Weekly 1-on-1 sessions with expert mentors',
      'Personalized trading plan development',
      'Real-time trade review and feedback',
      'Direct WhatsApp support',
      'Portfolio review and optimization',
      'Trading psychology coaching',
    ],
    cta: 'Apply for Mentorship',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'live-trading',
    icon: LineChart,
    title: 'Live Trading Sessions',
    tagline: 'Learn by Watching',
    description: 'Join our expert traders in live market sessions. Watch real trades being executed with full explanation of entry, exit, and risk management decisions.',
    features: [
      'Daily live market sessions (9:15 AM - 3:30 PM)',
      'Real-time trade signals',
      'Entry, stop-loss & target levels',
      'Recorded sessions for review',
      'Trading room community access',
      'Weekly market outlook sessions',
    ],
    cta: 'Join Live Trading',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'pms',
    icon: Briefcase,
    title: 'Portfolio Management',
    tagline: 'Wealth Management Services',
    description: 'Let our expert fund managers grow your wealth with professional portfolio management services. SEBI registered, transparent, and focused on long-term wealth creation.',
    features: [
      'SEBI registered PMS',
      'Minimum investment: ₹50 Lakhs',
      'Diversified portfolio strategies',
      'Monthly performance reports',
      'Quarterly review meetings',
      'Tax-efficient investing',
    ],
    cta: 'Enquire About PMS',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'research',
    icon: BookOpen,
    title: 'Research & Analysis',
    tagline: 'Data-Driven Insights',
    description: 'Access comprehensive market research, stock recommendations, and technical analysis reports prepared by our team of certified analysts.',
    features: [
      'Daily market reports',
      'Stock research with target prices',
      'Sector analysis & outlook',
      'Technical analysis charts',
      'Quarterly earnings analysis',
      'IPO reviews & recommendations',
    ],
    cta: 'Subscribe to Research',
    gradient: 'from-red-500 to-rose-500',
  },
];

export default function Services() {
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
              Our Services
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Beyond Education:{' '}
               <span className="text-accent">
                 Complete Trading Solutions
               </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From mentorship to portfolio management, we offer comprehensive services to support your trading journey at every stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <p className="text-accent text-sm font-medium mb-2">{service.tagline}</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <Button variant="hero" size="lg">
                      {service.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square max-w-md mx-auto"
                  >
                    {/* Background decoration */}
                    <div className={`absolute inset-8 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-20 blur-2xl`} />
                    
                    {/* Card */}
                    <div className="relative glass-card rounded-3xl p-8 h-full flex flex-col justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-center mb-4">{service.title}</h3>
                      <div className="space-y-2">
                        {service.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
