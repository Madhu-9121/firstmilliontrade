import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact Us', path: '/contact' },
];

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/176CuPCNyn/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@FirstMillionTrade' },
  { name: 'Instagram', href: 'https://www.instagram.com/first_million_trade?igsh=MWdqd2xvODV5c2pkeA==' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/50 pt-20 pb-8">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 mb-16 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-accent">Trading Journey</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of successful learners who have transformed their financial future with First Million Trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-accent text-accent-foreground font-bold hover:brightness-110">
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Talk to Us</Button>
            </Link>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo scale={1.5} />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering individuals with comprehensive stock market education, mentorship, and the tools needed for financial literacy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-all duration-300"
                >
                  {social.name}
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
                  <Link to={link.path} className="text-muted-foreground hover:text-accent transition-colors">
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
              <li>
                <a href="https://wa.me/919032046008" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  +91 90320 46008
                </a>
              </li>
              <li>
                <a href="mailto:firstmilliontrade@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  firstmilliontrade@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} First Million Trade. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link>
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
