import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  scale?: number;
}

export default function Logo({ className, scale = 2 }: LogoProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("flex items-center", className)} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      <img
        src={isDark ? logoLight : logoDark}
        alt="First Million Trade"
        className="h-5 w-auto"
      />
    </div>
  );
}
