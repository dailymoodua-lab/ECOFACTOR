import { motion } from 'framer-motion';
import { SlideWrapper } from '../SlideWrapper';
import { FadeIn, AnimatedCounter, GlassCard, SlideLabel, SlideTitle } from '../AnimatedComponents';
import { evCars, hybridCars, getCarByName, type CarModel } from '@/data/presentationData';

/* ── helper: Tax Calc Slide ── */
const TaxCalcSlide = ({ title, car, isEV }: { title: string; car: CarModel; isEV: boolean }) => {
  const base = car.buyPrice + car.logistics;
  const duty = isEV ? 0 : Math.round(base * 0.1);
  const ndsBase = isEV ? base : base + duty;
  const nds = Math.round(ndsBase * 0.2);
  const excise = isEV ? (car.battery || 0) : 0;
  const totalTax = nds + duty + excise;

  const steps = [
    { label: 'Закупка (FOB)', value: `$${car.buyPrice.toLocaleString()}` },
    { label: 'Логистика', value: `$${car.logistics.toLocaleString()}` },
    { label: 'База (CIF)', value: `$${base.toLocaleString()}` },
    ...(isEV ? [] : [{ label: 'Пошлина 10%', value: `$${duty.toLocaleString()}` }]),
    { label: `НДС 20%`, value: `$${nds.toLocaleString()}` },
    ...(isEV ? [{ label: `Акциз (${car.battery}kWh × €1)`, value: `€${excise}` }] : []),
    { label: 'Итого налоги', value: `$${totalTax.toLocaleString()}`, bold: true },
  ];

  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>{isEV ? 'Электромобиль' : 'Гибрид'}</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>{title}</SlideTitle></FadeIn>
      <FadeIn delay={0.2}>
        <GlassCard className="p-6 mt-8 max-w-lg mx-auto">
          <p className="text-sm font-semibold text-pres-dark mb-4">Пример: {car.name}</p>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex justify-between text-sm ${(s as any).bold ? 'font-bold text-pres-dark border-t border-pres-light pt-2' : 'text-pres-gray'}`}
              >
                <span>{s.label}</span>
                <span className={`${(s as any).bold ? 'text-pres-blue' : 'text-pres-dark'} font-medium`}>{s.value}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>
    </SlideWrapper>
  );
};

/* ── 14: TAX EV ── */
export const TaxEVSlide = () => <TaxCalcSlide title="Налоги: электромобили" car={getCarByName(evCars, 'BYD Yuan Up')} isEV />;

/* ── 15: TAX HYBRID ── */
export const TaxHybridSlide = () => <TaxCalcSlide title="Налоги: гибриды" car={getCarByName(hybridCars, 'Li Auto L7 Pro')} isEV={false} />;

/* ── helper: car card ── */
const CarCard = ({
  car,
  i,
  forceFinalized = false,
  compact = false,
  square = false,
}: {
  car: CarModel;
  i: number;
  forceFinalized?: boolean;
  compact?: boolean;
  square?: boolean;
}) => (
  (() => {
    const isFinalized = false;
    const titleStyle = compact
      ? ({ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as const)
      : undefined;
    return (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08 }}
    className={square ? 'aspect-square' : ''}
  >
    <GlassCard className={`${compact ? 'p-3 md:p-4' : 'p-4'} h-full ${isFinalized ? 'ring-2 ring-emerald-400 bg-emerald-50/70' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-bold text-pres-dark ${compact ? 'text-[12px] md:text-sm leading-tight' : 'text-sm'}`} style={titleStyle}>{car.name}</p>
          <p className={`${compact ? 'text-[11px]' : 'text-xs'} text-pres-gray`}>{car.segment}</p>
        </div>
        <div className={`flex items-center ${compact ? 'gap-0.5' : 'gap-1'} ml-1`}>
          {isFinalized && (
            <span className={`${compact ? 'text-[9px] px-1.5' : 'text-[10px] px-2'} font-semibold py-0.5 rounded-full bg-emerald-500 text-white`}>
              FIXED
            </span>
          )}
          <span className={`${compact ? 'text-[10px] px-1.5' : 'text-xs px-2'} font-medium py-0.5 rounded-full ${car.type === 'ev' ? 'bg-pres-teal/10 text-pres-teal' : 'bg-pres-blue/10 text-pres-blue'}`}>
            {car.type === 'ev' ? 'EV' : 'Hybrid'}
          </span>
        </div>
      </div>
      <div className={`${compact ? 'mt-2' : 'mt-3'} grid grid-cols-2 gap-2 ${compact ? 'text-[11px]' : 'text-xs'}`}>
        <div><span className="text-pres-gray">Закупка</span><p className="font-semibold text-pres-dark">${car.buyPrice.toLocaleString()}</p></div>
        <div><span className="text-pres-gray">Продажа</span><p className="font-semibold text-pres-teal">${car.sellPrice.toLocaleString()}</p></div>
      </div>
      <div className={`${compact ? 'mt-1.5' : 'mt-2'} ${compact ? 'text-[11px]' : 'text-xs'}`}>
        <span className="text-pres-gray">Маржа </span>
        <span className="font-bold text-pres-gold">${car.margin.toLocaleString()} ({car.marginPercent}%)</span>
      </div>
    </GlassCard>
  </motion.div>
    );
  })()
);

/* ── 16: CORE ASSORTMENT ── */
export const CoreAssortmentSlide = () => {
  const featuredNames = [
    // Current core
    'BYD Yuan Up',
    'BYD Dolphin',
    'Xiaomi SU7',
    'Zeekr 001',
    'Li Auto L7 Pro',
    'BYD Tang DM-i',
    'BYD Song Plus DM-i',
    // Added from user list
    'Geely Galaxy E6',
  ];

  const featured = featuredNames
    .map(name => getCarByName([...evCars, ...hybridCars], name))
    .filter((car, idx, arr) => arr.findIndex(c => c.name === car.name) === idx);

  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Продуктовая линейка</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>Ядро ассортимента</SlideTitle></FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-6 md:mt-8">
        {featured.map((c, i) => <CarCard key={c.name} car={c} i={i} compact />)}
      </div>
    </SlideWrapper>
  );
};

/* ── 17: ALL EV ── */
export const AllEVSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Электромобили</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Все EV модели</SlideTitle></FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {evCars.map((c, i) => <CarCard key={c.name} car={c} i={i} />)}
    </div>
  </SlideWrapper>
);

/* ── 18: ALL HYBRID ── */
export const AllHybridSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Гибриды</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Все гибридные модели</SlideTitle></FadeIn>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-6 md:mt-8">
      {hybridCars
        .filter(c => !['Li Auto L9', 'AITO M9'].includes(c.name))
        .filter(c => !c.name.startsWith('BYD Tang DM-i') || c.name === 'BYD Tang DM-i 115KM Premium Noble')
        .filter(c => c.margin > 0)
        .map((c, i) => <CarCard key={c.name} car={c} i={i} forceFinalized={false} compact />)}
    </div>
  </SlideWrapper>
);

export const productSlides = [TaxEVSlide, TaxHybridSlide, CoreAssortmentSlide, AllEVSlide, AllHybridSlide];
