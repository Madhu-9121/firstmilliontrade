import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import teamHarsha from '@/assets/team-harsha.jpg';
import teamMadhusudan from '@/assets/team-madhusudan.jpg';
import teamYaswanth from '@/assets/team-yaswanth.jpg';

const teamMembers = [
  { name: 'Y. Harsha Vardhan', role: 'CEO & Co-Founder', image: teamHarsha },
  { name: 'Madhusudan Reddy', role: 'Co-Founder & Head of Strategy', image: teamMadhusudan },
  { name: 'Yaswanth Sai Bille', role: 'Co-Founder & Technical Lead', image: teamYaswanth },
];

const offerings = [
  'Structured training programs and classes',
  'Expert mentorship with practical market insights',
  'Recorded access to live sessions for continued learning',
  'Exposure to institutional-style market analysis',
  'Guidance to build and manage personal portfolios responsibly',
  'Certificates of completion upon successful program participation',
];

const philosophy = [
  'Discipline over tips',
  'Risk management before returns',
  'Mindset before money',
  'Education before profits',
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Story – <span className="text-accent">First Million Trade</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              <strong className="text-foreground">FIRST MILLION TRADE</strong> was officially founded in 2026, but the thought behind it was born much earlier. Long before the institute came into existence, we closely observed the challenges faced by retail participants in the Indian stock markets—lack of proper guidance, misleading tip-based culture, and repeated losses faced by beginners due to poor education and risk management.
            </p>
            <p>
              We noticed that many individuals entered the markets with ambition, but without structure, discipline, or a long-term financial plan. Trading was often treated as a shortcut to quick profits rather than a serious business requiring education, planning, and mindset. This gap between expectation and reality inspired us to build something meaningful.
            </p>
            <p>
              At <strong className="text-foreground">FIRST MILLION TRADE</strong>, our mission is to promote financial literacy, structured learning, and responsible market participation. We believe that stock market involvement should be approached as a professional skill and a part of long-term financial planning—not gambling or speculation based on unverified tips.
            </p>
            <p>
              Today, FIRST MILLION TRADE functions as a stock market education and training institute, focused on empowering individuals through knowledge rather than promises. Our programs are designed to help learners understand market behavior, develop analytical skills, and build their own portfolios using institutional-level analysis and disciplined strategies.
            </p>

            {/* What We Offer */}
            <div className="pt-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What We Offer</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {offerings.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Our learning ecosystem is built for anyone serious about understanding the markets—including students, working professionals, entrepreneurs, homemakers, and retired individuals—irrespective of age or background.
            </p>

            {/* Philosophy */}
            <div className="pt-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Our Philosophy</h2>
              <p className="mb-4">We firmly stand by:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {philosophy.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="glass-card rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="font-semibold text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="pt-4">
              Our objective is not to predict markets, but to prepare individuals. We aim to help our learners build financial stability, structured financial planning, and clarity around long-term life goals, while strictly adhering to SEBI regulations and government guidelines. We do not provide assured returns or investment tips; instead, we focus on education, awareness, and skill development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* People Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our People</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind First Million Trade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl p-8 text-center group"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-accent text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
