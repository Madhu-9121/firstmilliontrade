import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MarketCard from './MarketCard';
import { useMarketData } from '@/hooks/useMarketData';

export default function HeroSection() {
  const whatsappNumber = '919032046008';
  const whatsappMessage = encodeURIComponent('Hi! I would like to book a free consultation with First Million Trade.');
  const { indices } = useMarketData(60000);

  const nifty = indices[0];
  const sensex = indices[1];
  const bankNifty = indices[2];

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-24 pb-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
                First Million Trade
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] text-foreground">
                "The Stock Market is a Device for Transferring Money from the{' '}
                <span className="text-accent">Impatient</span> to the{' '}
                <span className="text-accent">Patient</span>"
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-3"
            >
              We empower you with the knowledge, discipline, and strategies needed to navigate the markets with confidence. Our structured programs transform beginners into informed participants — building financial literacy, not just trades.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-muted-foreground/60 italic mb-8 tracking-wide"
            >
              Your Journey to the First Million
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/courses">
                <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted/50">
                  <MessageCircle className="w-4 h-4" />
                  Book Free Consultation
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right side - Market Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Live Market Data</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nifty && <MarketCard item={nifty} exchange="NSE" delay={0.4} />}
              {sensex && <MarketCard item={sensex} exchange="BSE" delay={0.5} />}
            </div>
            {bankNifty && (
              <MarketCard item={bankNifty} exchange="NSE" delay={0.6} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
