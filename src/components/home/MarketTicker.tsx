import { useState, useRef, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMarketData, type MarketItem } from '@/hooks/useMarketData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const TickerItem = memo(({ item }: { item: MarketItem }) => {
  const isPositive = item.change > 0;
  const isNegative = item.change < 0;

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 cursor-default group">
      <span className="text-xs font-semibold text-foreground/90 tracking-wide whitespace-nowrap">
        {item.symbol}
      </span>
      <span className="text-xs font-mono font-medium text-foreground whitespace-nowrap">
        {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </span>
      <div className={cn(
        "flex items-center gap-0.5 text-[11px] font-mono font-medium whitespace-nowrap transition-colors",
        isPositive && "text-[#16a34a]",
        isNegative && "text-[#dc2626]",
        !isPositive && !isNegative && "text-muted-foreground"
      )}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
        <span>{isPositive ? '+' : ''}{item.change.toFixed(2)}</span>
        <span>({isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
      </div>
      <div className="w-px h-3 bg-border/50 ml-2" />
    </div>
  );
});
TickerItem.displayName = 'TickerItem';

export default function MarketTicker() {
  const { indices, gainers, losers, loading } = useMarketData(60000);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(() => [...indices, ...gainers, ...losers], [indices, gainers, losers]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-card/95 backdrop-blur-md border-b border-border/30 flex items-center gap-6 px-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-32 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-[60] h-8 bg-card/95 backdrop-blur-md border-b border-border/30 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 45,
            ease: 'linear',
          },
        }}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {/* Duplicate for seamless loop */}
        {[...allItems, ...allItems].map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
