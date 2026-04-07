import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { SlideWrapper } from '../SlideWrapper';
import { FadeIn, AnimatedCounter, GlassCard, SlideLabel, SlideTitle, AnimatedBar, MetricCard } from '../AnimatedComponents';
import { CAPITAL_ALLOCATION, TRANSIT, CONTAINER, MOSTYSKA_LOGISTICS } from '@/data/presentationData';
import { Inbox, Boxes, Send, Car } from 'lucide-react';

/* ── 6: FUNDING ALLOCATION ── */
export const FundingSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Структура вложений</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Что финансируется</SlideTitle></FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={CAPITAL_ALLOCATION} innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3} isAnimationActive animationBegin={120} animationDuration={1800}>
                {CAPITAL_ALLOCATION.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      <FadeIn delay={0.3}>
        <div className="space-y-3">
          {CAPITAL_ALLOCATION.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: a.color }} />
              <span className="text-sm text-pres-dark flex-1">{a.name}</span>
              <span className="text-sm font-bold text-pres-dark">{a.value}%</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </SlideWrapper>
);

/* ── 7: CAPITAL 3M ── */
export const Capital3MSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Инвестиционный капитал</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Капитал $3M — это лимит, не расход</SlideTitle></FadeIn>
    <FadeIn delay={0.2}>
      <GlassCard className="p-6 mt-8">
        <p className="text-sm text-pres-gray mb-4">$3M — максимальный объём капитала в обороте. Деньги не тратятся — они вращаются:</p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Закупка авто', 'Доставка 60-80д', 'Продажа', 'Возврат + прибыль'].map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center"
            >
              <GlassCard className="px-4 py-3 text-center text-sm font-medium text-pres-dark">{s}</GlassCard>
              {i < 3 && <span className="mx-2 text-pres-blue">→</span>}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </FadeIn>
    <div className="grid grid-cols-3 gap-4 mt-6">
      <FadeIn delay={0.4}><MetricCard label="Оборотов/год" value={4} color="text-pres-blue" /></FadeIn>
      <FadeIn delay={0.5}><MetricCard label="Авто за оборот" value={50} color="text-pres-teal" /></FadeIn>
      <FadeIn delay={0.6}><MetricCard label="Авто в год" value={200} prefix="~" color="text-pres-gold" /></FadeIn>
    </div>
  </SlideWrapper>
);

/* ── 8: WAREHOUSE LOGIC ── */
export const WarehouseSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Операционная модель</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Логика склада</SlideTitle></FadeIn>
    <FadeIn delay={0.2}>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Inbox, title: 'Поступление', desc: 'Партия 10–15 авто каждые 60–80 дней', metric: '15', unit: 'авто' },
          { icon: Boxes, title: 'На складе', desc: 'Средний остаток 5–10 автомобилей', metric: '7', unit: 'авто' },
          { icon: Send, title: 'Продажа', desc: 'Средний срок продажи 15–30 дней', metric: '22', unit: 'дня' },
        ].map((w, i) => (
          <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <GlassCard className="p-5 text-center h-full">
              <div className="mb-2 flex justify-center">
                <w.icon className="w-8 h-8 text-pres-blue" strokeWidth={2} />
              </div>
              <p className="font-bold text-pres-dark">{w.title}</p>
              <p className="text-xs text-pres-gray mt-1">{w.desc}</p>
              <p className="text-2xl font-bold text-pres-blue mt-3"><AnimatedCounter target={Number(w.metric)} /> <span className="text-xs text-pres-gray">{w.unit}</span></p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  </SlideWrapper>
);

/* ── 9: LOGISTICS FLOW ── */
export const LogisticsFlowSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Цепочка поставок</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Логистика: Китай → ЕС</SlideTitle></FadeIn>
    <div className="mt-8 relative">
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-pres-light hidden md:block" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {TRANSIT.map((t, i) => (
          <motion.div key={t.stage} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-sm" style={{ background: `${t.color}15`, color: t.color, border: `2px solid ${t.color}` }}>
                {t.days[0]}–{t.days[1]}
              </div>
              <p className="text-sm font-semibold text-pres-dark mt-3">{t.stage}</p>
              <p className="text-xs text-pres-gray">{t.days[0]}–{t.days[1]} дней</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <FadeIn delay={0.8}>
      <GlassCard className="p-4 mt-8 text-center">
        <p className="text-sm text-pres-gray">Общий срок: <span className="font-bold text-pres-dark">60–80 дней</span> от закупки до склада</p>
      </GlassCard>
    </FadeIn>
  </SlideWrapper>
);

/* ── 10: TIMELINE BREAKDOWN ── */
export const TimelineSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Детализация сроков</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Разбивка сроков доставки</SlideTitle></FadeIn>
    <div className="mt-8 space-y-1">
      {TRANSIT.map((t, i) => (
        <FadeIn key={t.stage} delay={i * 0.12}>
          <AnimatedBar label={t.stage} value={(t.days[0] + t.days[1]) / 2} max={50} color={t.color} suffix=" дней" />
        </FadeIn>
      ))}
    </div>
    <FadeIn delay={0.6}>
      <div className="mt-6 flex justify-between items-center glass-card p-4">
        <span className="text-sm text-pres-gray">Итого среднее</span>
        <span className="text-xl font-bold text-pres-dark"><AnimatedCounter target={70} /> дней</span>
      </div>
    </FadeIn>
  </SlideWrapper>
);

/* ── 11: CONTAINER MODEL ── */
export const ContainerSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Логистика</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Контейнерная модель: 40ft</SlideTitle></FadeIn>
    <FadeIn delay={0.2}>
      <div className="mt-8 flex justify-center">
        <GlassCard className="p-8 max-w-md w-full">
          <div className="border-2 border-dashed border-pres-blue/30 rounded-xl p-6 relative">
            <p className="absolute -top-3 left-4 bg-background px-2 text-xs text-pres-blue font-medium">40ft контейнер</p>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map(n => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: n * 0.2 }}
                  className="aspect-[3/2] bg-pres-blue/10 rounded-lg flex items-center justify-center"
                >
                  <Car className="w-8 h-8 text-pres-blue" strokeWidth={2} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-pres-gray">1 контейнер = <span className="font-bold text-pres-dark">3 автомобиля</span></p>
          </div>
        </GlassCard>
      </div>
    </FadeIn>
  </SlideWrapper>
);

/* ── 12: LOGISTICS COST ── */
export const LogCostSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Расчёт стоимости</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Стоимость логистики на контейнер ({CONTAINER.route})</SlideTitle></FadeIn>
    <div className="mt-8 flex flex-col items-center gap-6">
      <FadeIn delay={0.2}>
        <GlassCard className="p-6 text-center">
          <p className="text-sm text-pres-gray">Фрахт + доставка до Одессы (40ft)</p>
          <p className="text-3xl font-bold text-pres-dark mt-1">$<AnimatedCounter target={CONTAINER.cost} /></p>
        </GlassCard>
      </FadeIn>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-2xl text-pres-blue">÷ {CONTAINER.cars}</motion.div>
      <FadeIn delay={0.5}>
        <GlassCard className="p-6 text-center border-2 border-pres-teal/30">
          <p className="text-sm text-pres-gray">На 1 автомобиль</p>
          <p className="text-3xl font-bold text-pres-teal mt-1">≈ $<AnimatedCounter target={CONTAINER.perCar} /></p>
        </GlassCard>
      </FadeIn>
    </div>
  </SlideWrapper>
);

/* ── 13: REAL COST PER CAR ── */
export const RealCostSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Полная стоимость</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Реальная стоимость на 1 авто ({MOSTYSKA_LOGISTICS.route})</SlideTitle></FadeIn>
    <div className="mt-8 space-y-1">
      <AnimatedBar label="Фрахт контейнера (÷3)" value={Math.round(MOSTYSKA_LOGISTICS.freightPerContainer / 3)} max={3000} color="#3B82F6" suffix=" $" />
      <AnimatedBar label="Доставка до Одессы" value={MOSTYSKA_LOGISTICS.deliveryToOdessaPerCar} max={3000} color="#8B5CF6" suffix=" $" />
      <AnimatedBar label="Выгрузка + брокер EV" value={MOSTYSKA_LOGISTICS.unloadingPerCar + MOSTYSKA_LOGISTICS.brokerEvPerCar} max={3000} color="#0EA5E9" suffix=" $" />
    </div>
    <FadeIn delay={0.5}>
      <GlassCard className="p-5 mt-6 text-center">
        <p className="text-sm text-pres-gray">Итого логистика на 1 авто</p>
        <p className="text-3xl font-bold text-pres-dark mt-1">$<AnimatedCounter target={MOSTYSKA_LOGISTICS.totalEvPerCar3} /></p>
        <p className="text-xs text-pres-gray mt-1">для Yuan Up (4 авто/контейнер): ~$<AnimatedCounter target={MOSTYSKA_LOGISTICS.totalEvPerCar4} /></p>
      </GlassCard>
    </FadeIn>
  </SlideWrapper>
);

export const operationsSlides = [FundingSlide, Capital3MSlide, WarehouseSlide, LogisticsFlowSlide, TimelineSlide, ContainerSlide, LogCostSlide, RealCostSlide];
