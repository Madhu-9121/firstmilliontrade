import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

const courses = [
  { name: 'Smart Investing', path: '/courses/smart-investing' },
  { name: 'Market Analysis', path: '/courses/market-analysis' },
  { name: 'Trading Strategies', path: '/courses/trading-strategies' },
  { name: 'Algo Trading', path: '/courses/algo-trading' },
];

const services = [
  { name: 'Mentorship', path: '/services#mentorship' },
  { name: 'Live Trading', path: '/services#live-trading' },
  { name: 'PMS', path: '/services#pms' },
  { name: 'Research', path: '/services#research' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/50 pt-20 pb-8">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 mb-16 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-amber-500">Trading Journey</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of successful traders who have transformed their financial future with First Million Trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button variant="hero" size="lg">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Talk to Us
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-gold">
                <span className="text-xl font-bold text-slate-900">FM</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">First Million Trade</h3>
                <p className="text-xs text-muted-foreground">Your Journey to the First Million</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering individuals with comprehensive stock market education, mentorship, and the tools needed for financial freedom.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-amber-500 hover:text-slate-900 flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Courses</h4>
            <ul className="space-y-3">
              {courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Trading Plaza, Financial District, Mumbai 400001</span>
              </li>
              <li>
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-500" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@firstmilliontrade.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-500" />
                  info@firstmilliontrade.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} First Million Trade. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> Stock market investments are subject to market risks. First Million Trade provides educational content only and does not offer guaranteed returns or investment advice. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
