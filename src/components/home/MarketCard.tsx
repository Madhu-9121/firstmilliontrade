import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';
import { type MarketItem } from '@/hooks/useMarketData';
import { cn } from '@/lib/utils';

interface MarketCardProps {
  item: MarketItem;
  exchange: string;
  delay?: number;
}

function AnimatedNumber({ value, decimals = 2 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const steps = 20;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDisplay(start + (diff * step) / steps);
      if (step >= steps) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [value]);

  return <>{display.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

const MarketCard = memo(({ item, exchange, delay = 0 }: MarketCardProps) => {
  const isPositive = item.change > 0;
  const isNegative = item.change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-5 w-full hover:shadow-medium transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">{exchange}</p>
          <h3 className="text-sm font-bold text-foreground mt-0.5">{item.name}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle className={cn(
            "w-2 h-2 fill-current",
            item.isOpen ? "text-[#16a34a]" : "text-muted-foreground"
          )} />
          <span className="text-[10px] font-medium text-muted-foreground">
            {item.isOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <p className="text-2xl font-mono font-bold text-foreground tracking-tight">
          <AnimatedNumber value={item.price} />
        </p>
      </div>

      {/* Change */}
      <div className="flex items-center gap-2 mb-3">
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold",
          isPositive && "bg-[#16a34a]/10 text-[#16a34a]",
          isNegative && "bg-[#dc2626]/10 text-[#dc2626]",
          !isPositive && !isNegative && "bg-muted text-muted-foreground"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : null}
          <span>{isPositive ? '+' : ''}{item.change.toFixed(2)}</span>
          <span>({isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/30 pt-2">
        <span>Prev Close: {item.previousClose.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        <span>{item.lastUpdated}</span>
      </div>
    </motion.div>
  );
});
MarketCard.displayName = 'MarketCard';

export default MarketCard;
