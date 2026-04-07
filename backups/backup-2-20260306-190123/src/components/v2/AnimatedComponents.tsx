import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const FadeIn = ({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) => {
  const dirs = { up: { y: 20 }, down: { y: -20 }, left: { x: 20 }, right: { x: -20 } };
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCounter = ({ target, prefix = '', suffix = '', duration = 1.8, className = '' }: {
  target: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return <span ref={ref} className={className}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export const GlassCard = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={cn('glass-card', className)} style={style}>{children}</div>
);

export const SlideLabel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={cn('text-xs uppercase tracking-[0.2em] font-medium text-pres-gray mb-2', className)}>{children}</p>
);

export const SlideTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={cn('text-2xl md:text-4xl font-bold text-pres-dark leading-tight', className)}>{children}</h2>
);

export const MetricCard = ({ label, value, prefix = '', suffix = '', color = '' }: {
  label: string; value: number; prefix?: string; suffix?: string; color?: string;
}) => (
  <GlassCard className="p-4 md:p-5">
    <p className="text-xs text-pres-gray mb-1">{label}</p>
    <p className={cn('text-xl md:text-2xl font-bold', color || 'text-pres-dark')}>
      <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
    </p>
  </GlassCard>
);

export const AnimatedBar = ({ value, max, color, label, suffix = '' }: {
  value: number; max: number; color: string; label: string; suffix?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-2">
      <div className="flex justify-between text-xs md:text-sm mb-1">
        <span className="text-pres-gray">{label}</span>
        <span className="font-semibold text-pres-dark">{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="h-2.5 rounded-full bg-pres-light overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};
