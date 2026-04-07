import { motion } from 'framer-motion';
import { SlideWrapper } from '../SlideWrapper';
import { FadeIn, AnimatedCounter, GlassCard, SlideLabel, SlideTitle, AnimatedBar } from '../AnimatedComponents';
import { scenarioSummary } from '@/data/presentationData';
import { HandCoins, ShoppingCart, Ship, Warehouse, Handshake, TrendingUp, type LucideIcon } from 'lucide-react';

const roiScenario = { conservative: 21, base: 27, optimistic: 32 } as const;
const roiMin = roiScenario.conservative;
const roiMax = roiScenario.optimistic;
const roiBaseAnnualProfitK = Math.round((3000000 * roiScenario.base) / 100 / 1000);
const unitMarginPercent = Math.round((scenarioSummary.base.avgMargin / scenarioSummary.base.avgSell) * 1000) / 10;

/* ── SLIDE 1: COVER ── */
export const CoverSlide = () => (
  <SlideWrapper>
    <div className="text-center">
      <FadeIn><SlideLabel>Инвестиционная презентация 2026</SlideLabel></FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="text-3xl md:text-6xl font-extrabold mt-4 leading-tight bg-gradient-to-r from-pres-blue via-pres-teal to-pres-gold bg-clip-text text-transparent">
          Импорт авто из Китая<br />
          и EV импорт
        </h1>
      </FadeIn>
      <FadeIn delay={0.25}>
        <p className="text-base md:text-lg text-pres-gray mt-4 max-w-xl mx-auto">
          Инвестиционная модель товарного оборота с 3 сценариями доходности
        </p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto">
          <GlassCard className="aspect-[1.1/1] px-3 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-pres-gray">Маржа с 1 авто</p>
            <p className="text-xl md:text-2xl font-bold text-pres-gold">$<AnimatedCounter target={scenarioSummary.base.avgMargin} /></p>
            <p className="text-[11px] text-pres-gray mt-1">≈ {unitMarginPercent}% от продажи</p>
          </GlassCard>
          <GlassCard className="aspect-[1.1/1] px-3 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-pres-gray">Прибыль за цикл</p>
            <p className="text-xl md:text-2xl font-bold text-pres-blue">$<AnimatedCounter target={Math.round(scenarioSummary.base.profitPerCycle / 1000)} />K</p>
            <p className="text-[11px] text-pres-gray mt-1">50 авто / 60–80 дней</p>
          </GlassCard>
          <GlassCard className="aspect-[1.1/1] px-3 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-pres-gray">ROI оборота (год)</p>
            <p className="text-xl md:text-2xl font-bold text-pres-teal">
              {roiMin === roiMax ? <><AnimatedCounter target={roiMin} />%</> : `${roiMin}% … ${roiMax}%`}
            </p>
            <p className="text-[11px] text-pres-gray mt-1">база: $<AnimatedCounter target={roiBaseAnnualProfitK} />K в год</p>
          </GlassCard>
          <GlassCard className="aspect-[1.1/1] px-3 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-pres-gray">Капитал</p>
            <p className="text-xl md:text-2xl font-bold text-pres-dark">до $<AnimatedCounter target={3} />M</p>
            <p className="text-[11px] text-pres-gray mt-1">рабочий капитал модели</p>
          </GlassCard>
        </div>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div className="max-w-4xl mx-auto mt-4 text-left md:text-center">
          <p className="text-xs text-pres-gray leading-relaxed">
            Примечание: показатели рассчитаны по текущей модели при базовых допущениях:
            закупка авто в Китае + логистика (фрахт, доставка до Одессы, выгрузка, брокер) + налоги и сборы
            + рыночная цена продажи по данным AutoRIA. Фактическая доходность может отличаться в зависимости от
            сроков поставки, курса валют, переговорной цены и реальных условий сделки.
          </p>
        </div>
      </FadeIn>
    </div>
  </SlideWrapper>
);

/* ── SLIDE 2: PROJECT ESSENCE ── */
const flowSteps = ['Инвестор', 'Закупка', 'Логистика', 'Склад', 'Продажа', 'Прибыль'];
const flowIcons: LucideIcon[] = [HandCoins, ShoppingCart, Ship, Warehouse, Handshake, TrendingUp];

export const EssenceSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Как это работает</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Суть проекта</SlideTitle></FadeIn>
    <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
      {flowSteps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="w-full"
        >
          <GlassCard className="aspect-square w-full p-3 md:p-4 text-center flex flex-col items-center justify-center">
            {(() => {
              const Icon = flowIcons[i];
              return <Icon className="w-8 h-8 md:w-10 md:h-10 mb-2 text-pres-blue" strokeWidth={2} />;
            })()}
            <p className="text-sm md:text-base font-semibold text-pres-dark leading-tight">{step}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
    <FadeIn delay={0.9}>
      <p className="text-center text-sm text-pres-gray mt-6">Капитал оборачивается каждые 60–80 дней, генерируя стабильную прибыль</p>
    </FadeIn>
  </SlideWrapper>
);

/* ── SLIDE 3: WHY WORKS ── */
export const WhyWorksSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Рыночный контекст</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Почему эта модель работает</SlideTitle></FadeIn>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {[
        { label: 'Рост EV рынка в ЕС, %', value: 37, suffix: '%', color: 'text-pres-blue' },
        { label: 'Доля китайских EV, %', value: 25, suffix: '%', color: 'text-pres-teal' },
        { label: 'Экономия vs европейские', value: 40, suffix: '%', color: 'text-pres-gold' },
        { label: 'Спрос на доступные EV', value: 92, suffix: '%', color: 'text-pres-blue' },
      ].map((m, i) => (
        <FadeIn key={m.label} delay={i * 0.12}>
          <GlassCard className="p-5 text-center h-full min-h-[150px] flex flex-col items-center justify-center">
            <p className={`text-3xl md:text-4xl font-extrabold ${m.color}`}>
              <AnimatedCounter target={m.value} suffix={m.suffix} />
            </p>
            <p className="text-xs text-pres-gray mt-2">{m.label}</p>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  </SlideWrapper>
);

/* ── SLIDE 4: MARKET 2026 ── */
export const Market2026Slide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Регуляция</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Рынок 2026: налоговая среда</SlideTitle></FadeIn>
    <div className="mt-8 space-y-1">
      <AnimatedBar label="НДС (все авто)" value={20} max={25} color="#3B82F6" suffix="%" />
      <AnimatedBar label="Пошлина EV" value={0} max={25} color="#10B981" suffix="%" />
      <AnimatedBar label="Акциз EV" value={1} max={25} color="#0EA5E9" suffix=" €/kWh" />
      <AnimatedBar label="Пошлина гибриды" value={10} max={25} color="#8B5CF6" suffix="%" />
    </div>
    <FadeIn delay={0.5}>
      <GlassCard className="p-4 mt-6">
        <p className="text-sm text-pres-gray">💡 EV имеют <span className="font-bold text-pres-teal">нулевую пошлину</span> — это ключевое преимущество перед гибридами и ДВС</p>
      </GlassCard>
    </FadeIn>
  </SlideWrapper>
);

/* ── SLIDE 5: GEOGRAPHY ── */
const phases = [
  { phase: 'Фаза 1', region: 'Украина', desc: 'Запуск, тестирование спроса', color: '#3B82F6', scale: 1 },
  { phase: 'Фаза 2', region: 'Польша + Восточная Европа', desc: 'Масштабирование', color: '#8B5CF6', scale: 1.2 },
  { phase: 'Фаза 3', region: 'Расширение по ЕС', desc: 'Полное покрытие', color: '#10B981', scale: 1.5 },
];

export const GeographySlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Стратегия расширения</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>География запуска</SlideTitle></FadeIn>
    <div className="mt-8 flex flex-col md:flex-row gap-4 items-center md:items-end justify-center">
      {phases.map((p, i) => (
        <motion.div
          key={p.phase}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="flex-1 w-full max-w-xs"
        >
          <GlassCard className="p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ background: p.color }} />
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold" style={{ background: `${p.color}20`, color: p.color }}>
              {i + 1}
            </div>
            <p className="font-bold text-pres-dark text-lg">{p.region}</p>
            <p className="text-xs text-pres-gray mt-1">{p.desc}</p>
            <p className="text-xs font-medium mt-2" style={{ color: p.color }}>{p.phase}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </SlideWrapper>
);

export const introSlides = [CoverSlide, EssenceSlide, WhyWorksSlide, Market2026Slide, GeographySlide];
