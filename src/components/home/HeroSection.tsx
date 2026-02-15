import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, TrendingUp, BarChart3, BookOpen, Award, LineChart, Briefcase, Coins, Zap, Globe, Shield, PieChart, CandlestickChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MarketCard from './MarketCard';
import { useMarketData } from '@/hooks/useMarketData';

const topics = [
  { label: 'Stock Market', icon: TrendingUp },
  { label: 'Debt Market', icon: Briefcase },
  { label: 'F&O', icon: BarChart3 },
  { label: 'Hedging', icon: Shield },
  { label: 'Forex', icon: Globe },
  { label: 'Commodity', icon: Coins },
  { label: 'Cryptocurrency', icon: Zap },
  { label: 'Mutual Funds', icon: PieChart },
  { label: 'Trading', icon: CandlestickChart },
  { label: 'Investment', icon: LineChart },
  { label: 'Scalping', icon: Zap },
  { label: 'Intraday Trading', icon: BarChart3 },
];

function StockChartSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="relative bg-card border border-border/60 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Portfolio Growth</span>
          <span className="text-[10px] font-mono text-accent">LIVE</span>
        </div>
        <svg viewBox="0 0 400 200" className="w-full h-auto">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} className="stroke-border/30" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(219 100% 44%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(219 100% 44%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,160 L40,140 L80,150 L120,100 L160,110 L200,60 L240,80 L280,40 L320,55 L360,20 L400,30 L400,200 L0,200 Z"
            fill="url(#chartGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d="M0,160 L40,140 L80,150 L120,100 L160,110 L200,60 L240,80 L280,40 L320,55 L360,20 L400,30"
            fill="none"
            className="stroke-accent"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          {/* Data points */}
          {[
            { x: 120, y: 100, label: '+23.4%' },
            { x: 200, y: 60, label: '+37.05' },
            { x: 280, y: 40, label: '+45.2%' },
            { x: 360, y: 20, label: '+52.8%' },
          ].map((pt, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
            >
              <circle cx={pt.x} cy={pt.y} r="4" className="fill-accent" />
              <circle cx={pt.x} cy={pt.y} r="7" className="fill-accent/20" />
              <text x={pt.x} y={pt.y - 12} textAnchor="middle" className="fill-[#16a34a]" fontSize="10" fontFamily="Inter" fontWeight="600">
                {pt.label}
              </text>
            </motion.g>
          ))}
        </svg>
        <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
          <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
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

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background pt-24 pb-8 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        {/* Main hero grid */}
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
              className="font-serif text-3xl md:text-4xl lg:text-[3.2rem] font-bold mb-6 leading-[1.12] text-foreground"
            >
              India's Premier{' '}
              <span className="text-accent">Financial Market</span>{' '}
              Learning Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              Master the art of trading & investing with structured programs, expert mentorship, and institutional-level analysis. From stocks to crypto — we cover it all.
            </motion.p>

            {/* Topic badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {topics.map((topic, i) => (
                <motion.span
                  key={topic.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs font-medium text-foreground/80 hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                >
                  <topic.icon className="w-3.5 h-3.5" />
                  {topic.label}
                </motion.span>
              ))}
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

          {/* Right - Stock Chart */}
          <StockChartSVG />
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
