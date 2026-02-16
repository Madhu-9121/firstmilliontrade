import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, TrendingUp, BarChart3, BookOpen, Award, LineChart, Briefcase, Coins, Zap, Globe, Shield, PieChart, CandlestickChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MarketCard from './MarketCard';
import { useMarketData } from '@/hooks/useMarketData';

const topics = [
  { label: 'Stock Market', icon: TrendingUp, color: '#16a34a' },
  { label: 'Debt Market', icon: Briefcase, color: '#0891b2' },
  { label: 'F&O', icon: BarChart3, color: '#dc2626' },
  { label: 'Hedging', icon: Shield, color: '#7c3aed' },
  { label: 'Forex', icon: Globe, color: '#2563eb' },
  { label: 'Commodity', icon: Coins, color: '#d97706' },
  { label: 'Cryptocurrency', icon: Zap, color: '#f59e0b' },
  { label: 'Mutual Funds', icon: PieChart, color: '#059669' },
  { label: 'Trading', icon: CandlestickChart, color: '#e11d48' },
  { label: 'Investment', icon: LineChart, color: '#4f46e5' },
  { label: 'Scalping', icon: Zap, color: '#9333ea' },
  { label: 'Intraday Trading', icon: BarChart3, color: '#0ea5e9' },
];

// Unique animated visualizations per topic
const topicAnimations: Record<string, { paths: string[]; dots: { x: number; y: number }[]; label: string }> = {
  'Stock Market': {
    paths: ['M0,160 L40,140 L80,120 L120,90 L160,100 L200,60 L240,70 L280,30 L320,50 L360,20 L400,35'],
    dots: [{ x: 120, y: 90 }, { x: 200, y: 60 }, { x: 280, y: 30 }, { x: 360, y: 20 }],
    label: 'NIFTY 50',
  },
  'Debt Market': {
    paths: ['M0,120 L50,115 L100,110 L150,108 L200,100 L250,95 L300,90 L350,85 L400,80'],
    dots: [{ x: 100, y: 110 }, { x: 200, y: 100 }, { x: 300, y: 90 }, { x: 400, y: 80 }],
    label: 'BOND YIELD',
  },
  'F&O': {
    paths: ['M0,100 L40,130 L80,60 L120,150 L160,40 L200,120 L240,70 L280,140 L320,50 L360,110 L400,80'],
    dots: [{ x: 80, y: 60 }, { x: 160, y: 40 }, { x: 280, y: 140 }, { x: 360, y: 110 }],
    label: 'OPTIONS P&L',
  },
  'Hedging': {
    paths: ['M0,100 L80,90 L160,110 L240,95 L320,105 L400,100', 'M0,140 L80,120 L160,160 L240,130 L320,150 L400,135'],
    dots: [{ x: 160, y: 110 }, { x: 320, y: 105 }],
    label: 'HEDGE RATIO',
  },
  'Forex': {
    paths: ['M0,130 L50,100 L100,140 L150,80 L200,120 L250,60 L300,110 L350,70 L400,90'],
    dots: [{ x: 150, y: 80 }, { x: 250, y: 60 }, { x: 350, y: 70 }],
    label: 'USD/INR',
  },
  'Commodity': {
    paths: ['M0,150 L60,130 L120,140 L180,90 L240,110 L300,60 L360,80 L400,50'],
    dots: [{ x: 180, y: 90 }, { x: 300, y: 60 }, { x: 400, y: 50 }],
    label: 'GOLD',
  },
  'Cryptocurrency': {
    paths: ['M0,180 L40,150 L80,170 L120,60 L160,100 L200,30 L240,80 L280,20 L320,60 L360,40 L400,50'],
    dots: [{ x: 120, y: 60 }, { x: 200, y: 30 }, { x: 280, y: 20 }],
    label: 'BTC/USDT',
  },
  'Mutual Funds': {
    paths: ['M0,170 L60,150 L120,140 L180,120 L240,100 L300,80 L360,60 L400,45'],
    dots: [{ x: 120, y: 140 }, { x: 240, y: 100 }, { x: 360, y: 60 }],
    label: 'NAV GROWTH',
  },
  'Trading': {
    paths: ['M0,100 L30,130 L60,70 L90,140 L120,50 L150,120 L180,40 L210,110 L240,60 L270,130 L300,45 L330,100 L360,55 L400,80'],
    dots: [{ x: 120, y: 50 }, { x: 180, y: 40 }, { x: 300, y: 45 }],
    label: 'DAY P&L',
  },
  'Investment': {
    paths: ['M0,180 L60,160 L120,150 L180,130 L240,100 L300,70 L360,45 L400,30'],
    dots: [{ x: 180, y: 130 }, { x: 300, y: 70 }, { x: 400, y: 30 }],
    label: 'PORTFOLIO',
  },
  'Scalping': {
    paths: ['M0,100 L20,90 L40,110 L60,85 L80,105 L100,80 L120,100 L140,75 L160,95 L180,70 L200,90 L220,65 L240,85 L260,60 L280,80 L300,55 L320,75 L340,50 L360,70 L380,45 L400,60'],
    dots: [{ x: 180, y: 70 }, { x: 260, y: 60 }, { x: 340, y: 50 }],
    label: 'SCALP TICKS',
  },
  'Intraday Trading': {
    paths: ['M0,100 L40,60 L80,130 L120,40 L160,110 L200,50 L240,120 L280,35 L320,100 L360,55 L400,70'],
    dots: [{ x: 120, y: 40 }, { x: 200, y: 50 }, { x: 280, y: 35 }],
    label: 'INTRADAY',
  },
};

function AnimatedChart({ topicLabel, color }: { topicLabel: string; color: string }) {
  const anim = topicAnimations[topicLabel] || topicAnimations['Stock Market'];

  return (
    <motion.div
      key={topicLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="relative bg-card border border-border/60 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{anim.label}</span>
          <span className="text-[10px] font-mono" style={{ color }}>LIVE</span>
        </div>
        <svg viewBox="0 0 400 200" className="w-full h-auto">
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} className="stroke-border/30" strokeWidth="0.5" />
          ))}
          <defs>
            <linearGradient id={`grad-${topicLabel.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {anim.paths.map((path, idx) => (
            <g key={idx}>
              <motion.path
                d={`${path} L400,200 L0,200 Z`}
                fill={idx === 0 ? `url(#grad-${topicLabel.replace(/\s/g, '')})` : 'none'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={idx === 0 ? 1 : 0.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: "easeInOut" }}
              />
            </g>
          ))}
          {anim.dots.map((pt, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.12 }}
            >
              <circle cx={pt.x} cy={pt.y} r="3.5" fill={color} />
              <circle cx={pt.x} cy={pt.y} r="7" fill={color} fillOpacity="0.15" />
            </motion.g>
          ))}
        </svg>
        <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
          <span>9:15</span><span>11:00</span><span>13:00</span><span>14:30</span><span>15:30</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const whatsappNumber = '919032046008';
  const whatsappMessage = encodeURIComponent('Hi! I would like to book a free consultation with First Million Trade.');
  const { indices } = useMarketData(60000);

  const nifty = indices[0];
  const sensex = indices[1];
  const bankNifty = indices[2];

  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-cycle topics when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveTopicIdx(prev => (prev + 1) % topics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const activeTopic = topics[activeTopicIdx];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5"
            >
              First Million Trade
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-[3.2rem] font-bold mb-8 leading-[1.2] text-foreground"
            >
              India's Premier{' '}
              <span className="text-accent block mt-2">Financial Market</span>{' '}
              <span className="block mt-2">Learning Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              Master the art of trading & investing with structured programs, expert mentorship, and institutional-level analysis. From stocks to crypto — we cover it all.
            </motion.p>

            {/* Topic badges - redesigned as pill grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8"
            >
              {topics.map((topic, i) => {
                const isActive = i === activeTopicIdx;
                return (
                  <motion.button
                    key={topic.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                    onMouseEnter={() => {
                      setActiveTopicIdx(i);
                      setIsHovering(true);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`
                      relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer text-left
                      ${isActive
                        ? 'bg-accent/10 text-accent border border-accent/30 shadow-sm'
                        : 'bg-card border border-border/40 text-foreground/70 hover:border-accent/20 hover:text-foreground'
                      }
                    `}
                  >
                    <topic.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{topic.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/courses">
                <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all">
                  Get Started
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

          {/* Right - Animated Chart */}
          <AnimatePresence mode="wait">
            <AnimatedChart key={activeTopic.label} topicLabel={activeTopic.label} color={activeTopic.color} />
          </AnimatePresence>
        </div>

        {/* Bottom - Live Market Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Live Market Data</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nifty && <MarketCard item={nifty} exchange="NSE" delay={0.7} />}
            {sensex && <MarketCard item={sensex} exchange="BSE" delay={0.8} />}
            {bankNifty && <MarketCard item={bankNifty} exchange="NSE" delay={0.9} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
