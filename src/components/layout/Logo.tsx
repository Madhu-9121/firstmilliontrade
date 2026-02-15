import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  scale?: number;
}

export default function Logo({ className, scale = 2 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      <svg viewBox="0 0 200 40" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Chart icon */}
        <g>
          <rect x="2" y="20" width="5" height="18" rx="1" className="fill-accent" />
          <rect x="10" y="12" width="5" height="26" rx="1" className="fill-accent" />
          <rect x="18" y="6" width="5" height="32" rx="1" className="fill-accent" />
          <polyline points="2,22 10,14 18,8 26,4" strokeWidth="2" className="stroke-accent" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="4" r="2.5" className="fill-accent" />
        </g>
        {/* Text */}
        <text x="34" y="18" className="fill-foreground" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5">
          FIRST MILLION
        </text>
        <text x="34" y="33" className="fill-foreground" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="10" letterSpacing="3">
          TRADE
        </text>
      </svg>
    </div>
  );
}
