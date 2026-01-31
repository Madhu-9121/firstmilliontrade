import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, TrendingUp, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const directors = [
  {
    name: 'Vikram Sharma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    message: 'Our mission is to democratize stock market education and empower every individual to achieve financial independence through knowledge and disciplined trading.',
  },
  {
    name: 'Anita Desai',
    role: 'Co-Founder & Head of Education',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    message: 'We believe that with the right guidance and structured learning, anyone can master the art of trading. Our courses are designed to transform beginners into confident traders.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We are committed to providing world-class financial education accessible to everyone.',
  },
  {
    icon: Shield,
    title: 'Integrity First',
    description: 'Transparency and honesty are the foundations of our relationship with every student.',
  },
  {
    icon: Users,
    title: 'Student Success',
    description: 'Your success is our success. We measure ourselves by the achievements of our students.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    description: 'Markets evolve, and so do we. Our curriculum is constantly updated with the latest strategies.',
  },
];

const milestones = [
  { year: '2018', title: 'Founded', description: 'Started with a vision to educate retail traders' },
  { year: '2019', title: '1,000 Students', description: 'Crossed first major student milestone' },
  { year: '2020', title: 'Online Launch', description: 'Expanded reach with online courses' },
  { year: '2022', title: '10,000+ Students', description: 'Became one of India\'s leading trading academies' },
  { year: '2024', title: 'PMS Launch', description: 'Launched Portfolio Management Services' },
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
              Empowering Your{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              First Million Trade is dedicated to transforming individuals into confident, successful traders through comprehensive education and expert mentorship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-accent" />
                <h2 className="font-serif text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be India's most trusted stock market education platform, creating a community of financially literate individuals who can confidently navigate the markets and build lasting wealth for themselves and their families.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={value.title} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-xs text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Meet Our Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {directors.map((director, index) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-accent/20"
                />
                <h3 className="text-xl font-semibold mb-1">{director.name}</h3>
                <p className="text-accent text-sm mb-4">{director.role}</p>
                <p className="text-muted-foreground italic">"{director.message}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">Key milestones in our growth story</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-muted -translate-x-1/2 hidden md:block" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card rounded-xl p-6 inline-block">
                      <span className="text-accent font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-semibold mt-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-accent shadow-gold shrink-0" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
