import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const SlideWrapper = ({ children, className = '', gradient = false }: {
  children: ReactNode; className?: string; gradient?: boolean;
}) => (
  <div className={cn(
    'min-h-[100dvh] flex flex-col justify-center px-5 py-8 md:px-12 md:py-10',
    gradient && 'bg-gradient-to-br from-pres-light via-background to-blue-50/40',
    className
  )}>
    <div className="w-full max-w-5xl mx-auto">{children}</div>
  </div>
);
