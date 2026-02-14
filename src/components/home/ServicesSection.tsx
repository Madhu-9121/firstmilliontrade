import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Video, 
  BarChart3, 
  Briefcase, 
  Award,
} from 'lucide-react';

const offerings = [
  {
    icon: GraduationCap,
    title: 'Training & Classes',
    description: 'Structured programs from beginner to advanced, covering every aspect of stock market participation.',
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'One-on-one guidance from seasoned market professionals with years of real-world experience.',
  },
  {
    icon: Video,
    title: 'Recording of Live Classes',
    description: 'Never miss a session. All live classes are auto-recorded and available for review anytime.',
  },
  {
    icon: BarChart3,
    title: 'Institutional Level Analysis',
    description: 'Access the same caliber of market analysis used by professional institutions and fund managers.',
  },
  {
    icon: Briefcase,
    title: 'Create Your Own Portfolio',
    description: 'Learn to build, manage, and review your own investment portfolio like an expert.',
  },
  {
    icon: Award,
    title: 'Certificate of Completion',
    description: 'Earn recognized certificates upon successfully completing each program module.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Offerings
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="text-accent">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From foundational education to professional-grade tools, we equip you for every stage of your market journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offerings.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-large border border-transparent hover:border-accent/20">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <item.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
