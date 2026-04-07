import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Menu, X, Sun, Moon } from 'lucide-react';
import { slideNames } from '@/data/presentationData';
import { cn } from '@/lib/utils';

import { introSlides } from './slides/IntroSlides';
import { operationsSlides } from './slides/OperationsSlides';
import { productSlides } from './slides/ProductSlides';
import { economicsSlides } from './slides/EconomicsSlides';
import { strategyFinanceSlides } from './slides/StrategyFinanceSlides';

const allSlides = [...introSlides, ...operationsSlides, ...productSlides, ...economicsSlides, ...strategyFinanceSlides];
const LAST_SLIDE_KEY = 'presentation:lastSlideIndex:v1';
const THEME_KEY = 'presentation:theme:v1';

export const PresentationLayout = () => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore last viewed slide on load.
  useEffect(() => {
    const raw = window.localStorage.getItem(LAST_SLIDE_KEY);
    if (!raw) return;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.max(0, Math.min(parsed, allSlides.length - 1));
    setCurrent(clamped);
  }, []);

  // Persist current slide index.
  useEffect(() => {
    window.localStorage.setItem(LAST_SLIDE_KEY, String(current));
  }, [current]);

  // Restore/apply theme.
  useEffect(() => {
    const raw = window.localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    if (raw === 'light' || raw === 'dark') {
      setTheme(raw);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Keyboard nav
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent(c => Math.min(c + 1, allSlides.length - 1));
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isMobile]);

  // Mobile scroll tracking
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.min(p, 1));

    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    const viewportCenter = el.scrollTop + el.clientHeight / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childCenter = child.offsetTop + child.offsetHeight / 2;
      const distance = Math.abs(childCenter - viewportCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }

    setCurrent(prev => (prev === bestIndex ? prev : bestIndex));
  }, []);

  // On mobile, scroll to the restored/current slide after mount.
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[current] as HTMLElement | undefined;
    if (!child) return;
    child.scrollIntoView({ block: 'start' });
  }, [isMobile]);

  // MOBILE
  if (isMobile) {
    return (
      <div className="relative">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-pres-light z-50">
          <motion.div className="h-full bg-pres-blue" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="fixed bottom-[6px] right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className="glass-card p-2.5 rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-pres-dark" /> : <Moon className="w-4 h-4 text-pres-dark" />}
          </button>
          <div className="glass-card px-3 py-1.5 rounded-full text-xs font-medium text-pres-dark">
            {current + 1} / {allSlides.length}
          </div>
        </div>

        {/* Burger menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed top-3 right-3 z-50 glass-card p-2.5 rounded-full"
        >
          <Menu className="w-5 h-5 text-pres-dark" />
        </button>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl overflow-y-auto"
            >
              <div className="p-5 pt-16">
                <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 p-2">
                  <X className="w-5 h-5 text-pres-dark" />
                </button>
                <p className="text-xs uppercase tracking-wider text-pres-gray mb-4">Навигация</p>
                {slideNames.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMenuOpen(false);
                      setCurrent(i);
                      const el = scrollRef.current;
                      if (el) {
                        const slideEl = el.children[i] as HTMLElement;
                        slideEl?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      'w-full text-left text-sm py-2.5 px-3 rounded-lg mb-1 border transition-colors',
                      current === i
                        ? 'bg-pres-blue/15 border-pres-blue/40 text-pres-blue font-semibold shadow-sm'
                        : 'border-transparent text-pres-gray hover:bg-pres-light/50 hover:border-pres-light'
                    )}
                  >
                    <span className={cn('text-xs mr-2 tabular-nums', current === i ? 'opacity-80' : 'opacity-40')}>{i + 1}</span>{name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slides */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[100dvh] overflow-y-auto"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {allSlides.map((Slide, i) => (
            <div key={i} style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
              <Slide />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DESKTOP
  const Slide = allSlides[current];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r border-pres-light bg-background/80 backdrop-blur-xl overflow-y-auto flex-shrink-0">
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-pres-gray mb-4">Навигация</p>
          {slideNames.map((name, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'w-full text-left text-xs py-2 px-3 rounded-lg mb-0.5 transition-all duration-200',
                current === i
                  ? 'bg-pres-blue/10 text-pres-blue font-medium'
                  : 'text-pres-gray hover:bg-pres-light hover:text-pres-dark'
              )}
            >
              <span className="text-[10px] opacity-40 mr-1.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              {name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-y-auto"
          >
            <Slide />
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2">
          <button
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className="glass-card p-2 rounded-xl hover:bg-pres-light"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-pres-dark" /> : <Moon className="w-4 h-4 text-pres-dark" />}
          </button>
          <span className="text-xs text-pres-gray tabular-nums mr-1">{current + 1} / {allSlides.length}</span>
          <button
            onClick={() => setCurrent(c => Math.max(c - 1, 0))}
            disabled={current === 0}
            className="glass-card p-2 rounded-xl disabled:opacity-30 transition-opacity hover:bg-pres-light"
          >
            <ChevronLeft className="w-4 h-4 text-pres-dark" />
          </button>
          <button
            onClick={() => setCurrent(c => Math.min(c + 1, allSlides.length - 1))}
            disabled={current === allSlides.length - 1}
            className="glass-card p-2 rounded-xl disabled:opacity-30 transition-opacity hover:bg-pres-light"
          >
            <ChevronRight className="w-4 h-4 text-pres-dark" />
          </button>
        </div>
      </main>
    </div>
  );
};
