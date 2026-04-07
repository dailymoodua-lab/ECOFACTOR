import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { SlideWrapper } from '../SlideWrapper';
import { FadeIn, AnimatedCounter, GlassCard, SlideLabel, SlideTitle, MetricCard, AnimatedBar } from '../AnimatedComponents';
import { allCars, CONTAINER, scenarioSummary } from '@/data/presentationData';
import { CarFront, HandCoins, Building2, Route } from 'lucide-react';

const base = scenarioSummary.base;
const avgBuy = base.avgBuy;
const avgSell = base.avgSell;
const roiScenario = { conservative: 21, base: 27, optimistic: 32 } as const;
const INVESTOR_SHARE = 0.5;
const investorAnnualProfit = Math.round(base.annualProfit * INVESTOR_SHARE);

/* ── 27: TEST DRIVE ── */
export const TestDriveSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Стратегия продаж</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Тест-драйв стратегия</SlideTitle></FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <FadeIn delay={0.2}>
        <GlassCard className="p-6">
          <div className="mb-3"><Route className="w-9 h-9 text-pres-blue" strokeWidth={2} /></div>
          <p className="font-bold text-pres-dark text-lg">5–10 автомобилей</p>
          <p className="text-sm text-pres-gray mt-2">Постоянный парк для тест-драйвов. Клиент пробует → покупает с уверенностью.</p>
          <div className="mt-4 space-y-2 text-xs">
            {['Конверсия тест-драйв → покупка: 35–45%', 'Средний срок решения: 3–5 дней', 'Парк ротируется → после 3 мес продаётся'].map(t => (
              <p key={t} className="text-pres-gray flex items-start gap-2"><span className="text-pres-teal mt-0.5">✓</span> {t}</p>
            ))}
          </div>
        </GlassCard>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="space-y-3">
          <MetricCard label="Авто в парке" value={8} color="text-pres-blue" />
          <MetricCard label="Конверсия" value={40} suffix="%" color="text-pres-teal" />
          <MetricCard label="Инвестиции в парк" value={Math.round(avgBuy * 8)} prefix="$" color="text-pres-gold" />
        </div>
      </FadeIn>
    </div>
  </SlideWrapper>
);

/* ── 28: FAST WAREHOUSE ── */
export const FastWarehouseSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Складская модель</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Модель быстрого склада</SlideTitle></FadeIn>
    <FadeIn delay={0.2}>
      <GlassCard className="p-6 mt-8">
        <p className="text-sm text-pres-gray mb-4">Минимальный остаток на складе для мгновенной продажи</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Популярные EV', count: 7, models: 'Yuan Up, Dolphin, Seagull' },
            { label: 'Премиум EV', count: 3, models: 'SU7, Zeekr 001, Zeekr 7X' },
            { label: 'Гибриды', count: 3, models: 'Song Plus DM-i, L6 Pro, L7 Pro' },
          ].map((g, i) => (
            <motion.div key={g.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-pres-blue"><AnimatedCounter target={g.count} /></p>
                <p className="text-xs font-medium text-pres-dark mt-1">{g.label}</p>
                <p className="text-xs text-pres-gray">{g.models}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </FadeIn>
    <FadeIn delay={0.4}>
      <GlassCard className="p-4 mt-4 text-center">
        <p className="text-sm text-pres-gray">Общий буфер: <span className="font-bold text-pres-dark">13 авто</span> × средняя закупка = <span className="font-bold text-pres-blue">${(avgBuy * 13).toLocaleString()}</span></p>
      </GlassCard>
    </FadeIn>
  </SlideWrapper>
);

/* ── 29: PIPELINE ── */
export const PipelineSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Операции</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Статус поставок машин</SlideTitle></FadeIn>
    <div className="mt-8 space-y-4">
      {[
        { stage: 'Заказаны / в производстве', count: 15, color: '#3B82F6' },
        { stage: 'В порту / на загрузке', count: 10, color: '#8B5CF6' },
        { stage: 'В море (в пути)', count: 20, color: '#0EA5E9' },
        { stage: 'На складе (готовы к продаже)', count: 7, color: '#10B981' },
        { stage: 'Тест-драйв парк', count: 8, color: '#F59E0B' },
      ].map((s, i) => (
        <FadeIn key={s.stage} delay={i * 0.1}>
          <AnimatedBar label={s.stage} value={s.count} max={25} color={s.color} suffix=" авто" />
        </FadeIn>
      ))}
    </div>
    <FadeIn delay={0.6}>
      <div className="mt-4 glass-card p-4 text-center">
        <p className="text-sm text-pres-gray">Всего в pipeline: <span className="font-bold text-pres-dark"><AnimatedCounter target={60} /> авто</span></p>
      </div>
    </FadeIn>
  </SlideWrapper>
);

/* ── 30: EXAMPLE BATCH ── */
export const ExampleBatchSlide = () => {
  const byName = Object.fromEntries(allCars.map(car => [car.name, car]));
  const batch = [
    { model: 'BYD Yuan Up', qty: 4, cost: byName['BYD Yuan Up']?.buyPrice || 0 },
    { model: 'BYD Dolphin', qty: 3, cost: byName['BYD Dolphin']?.buyPrice || 0 },
    { model: 'Xiaomi SU7', qty: 3, cost: byName['Xiaomi SU7']?.buyPrice || 0 },
    { model: 'BYD Song Plus DM-i', qty: 4, cost: byName['BYD Song Plus DM-i']?.buyPrice || 0 },
    { model: 'Li Auto L7 Pro', qty: 1, cost: byName['Li Auto L7 Pro']?.buyPrice || 0 },
  ];
  const totalQty = batch.reduce((s, b) => s + b.qty, 0);
  const totalCost = batch.reduce((s, b) => s + b.qty * b.cost, 0);

  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Операционный пример</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>Пример одной партии</SlideTitle></FadeIn>
      <FadeIn delay={0.2}>
        <GlassCard className="p-6 mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-pres-gray border-b border-pres-light">
                <th className="pb-2">Модель</th><th className="pb-2">Кол-во</th><th className="pb-2">Цена/шт</th><th className="pb-2">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {batch.map((b, i) => (
                <motion.tr key={b.model} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border-b border-pres-light/50">
                  <td className="py-2 font-medium text-pres-dark">{b.model}</td>
                  <td className="py-2">{b.qty}</td>
                  <td className="py-2">${b.cost.toLocaleString()}</td>
                  <td className="py-2 font-semibold">${(b.qty * b.cost).toLocaleString()}</td>
                </motion.tr>
              ))}
              <tr className="font-bold text-pres-dark">
                <td className="pt-3">Итого</td><td className="pt-3">{totalQty}</td><td></td><td className="pt-3 text-pres-blue">${totalCost.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </GlassCard>
      </FadeIn>
      <FadeIn delay={0.4}>
        <p className="text-xs text-pres-gray text-center mt-3">Контейнеров: {Math.ceil(totalQty / CONTAINER.cars)} × ${CONTAINER.cost.toLocaleString()} = ${(Math.ceil(totalQty / CONTAINER.cars) * CONTAINER.cost).toLocaleString()} логистика</p>
      </FadeIn>
    </SlideWrapper>
  );
};

/* ── 31: CAPITAL STRUCTURE ── */
const capitalData = [
  { name: 'Закупка авто', value: 2100000, pct: 70, color: '#3B82F6' },
  { name: 'Логистика', value: 300000, pct: 10, color: '#8B5CF6' },
  { name: 'Налоги/пошлины', value: 300000, pct: 10, color: '#F59E0B' },
  { name: 'Тест-драйв + склад', value: 150000, pct: 5, color: '#0EA5E9' },
  { name: 'Операционный резерв', value: 150000, pct: 5, color: '#10B981' },
];

export const CapitalStructureSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Финансы</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Структура капитала $3M</SlideTitle></FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
      <FadeIn delay={0.2}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={capitalData} innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2} isAnimationActive animationBegin={250} animationDuration={2200}>
                {capitalData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="space-y-3">
          {capitalData.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="text-sm flex-1 text-pres-dark">{c.name}</span>
              <span className="text-sm font-bold">${(c.value / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </SlideWrapper>
);

/* ── 32: FINMODEL ── */
export const FinModelSlide = () => {
  const rows = [
    { label: 'Средняя закупка', value: `$${base.avgBuy.toLocaleString()}` },
    { label: 'Средняя продажа', value: `$${base.avgSell.toLocaleString()}` },
    { label: 'Средняя маржа/авто', value: `$${base.avgMargin.toLocaleString()}` },
    { label: 'Авто за оборот', value: '50' },
    { label: 'Прибыль за оборот', value: `$${base.profitPerCycle.toLocaleString()}` },
    { label: 'Оборотов в год', value: '4' },
    { label: 'Годовая прибыль', value: `$${base.annualProfit.toLocaleString()}`, highlight: true },
  ];
  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Финансовая модель</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>Финмодель: годовой расчёт</SlideTitle></FadeIn>
      <FadeIn delay={0.2}>
        <GlassCard className="p-6 mt-8 max-w-lg mx-auto">
          <div className="space-y-3">
            {rows.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`flex justify-between text-sm ${r.highlight ? 'font-bold text-lg border-t-2 border-pres-blue/20 pt-3 mt-3' : ''}`}>
                <span className="text-pres-gray">{r.label}</span>
                <span className={`font-semibold ${r.highlight ? 'text-pres-blue' : 'text-pres-dark'}`}>{r.value}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>
    </SlideWrapper>
  );
};

/* ── 33: ROI ── */
export const ROISlide = () => (
  <SlideWrapper>
    <div className="text-center">
      <FadeIn><SlideLabel>Эффективность оборота</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>ROI оборота</SlideTitle></FadeIn>
      <FadeIn delay={0.2}>
        <div className="mt-8">
          <p className="text-6xl md:text-8xl font-extrabold text-pres-teal">
            <AnimatedCounter target={roiScenario.base} suffix="%" duration={2.5} />
          </p>
          <p className="text-lg text-pres-gray mt-2">годовая доходность</p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
        <FadeIn delay={0.4}><MetricCard label="Консерв." value={roiScenario.conservative} suffix="%" color="text-pres-gray" /></FadeIn>
        <FadeIn delay={0.5}><MetricCard label="Базовый" value={roiScenario.base} suffix="%" color="text-pres-teal" /></FadeIn>
        <FadeIn delay={0.6}><MetricCard label="Оптимист." value={roiScenario.optimistic} suffix="%" color="text-pres-gold" /></FadeIn>
      </div>
    </div>
  </SlideWrapper>
);

/* ── 34: INVESTOR INCOME ── */
const incomeData = [
  { month: 'Q1', income: Math.round(investorAnnualProfit * 0.25) },
  { month: 'Q2', income: Math.round(investorAnnualProfit * 0.5) },
  { month: 'Q3', income: Math.round(investorAnnualProfit * 0.75) },
  { month: 'Q4', income: investorAnnualProfit },
];

export const InvestorIncomeSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Прогноз дохода</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Доход инвестора (1 год, доля 50%)</SlideTitle></FadeIn>
    <FadeIn delay={0.2}>
      <GlassCard className="p-6 mt-8">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 97%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} animationDuration={2000} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div className="mt-4 text-center">
        <p className="text-sm text-pres-gray">Кумулятивный доход инвестора за год: <span className="font-bold text-pres-teal text-lg">$<AnimatedCounter target={investorAnnualProfit} /></span></p>
      </div>
    </FadeIn>
  </SlideWrapper>
);

/* ── 35: SCALING ── */
export const ScalingSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Рост</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Масштабирование</SlideTitle></FadeIn>
    <div className="mt-8 space-y-3">
      {[
        { year: 'Год 1', cars: '150–200', revenue: `$${Math.round(avgSell * 175 / 1000000)}M`, market: 'Украина', color: '#3B82F6' },
        { year: 'Год 2', cars: '400–500', revenue: `$${Math.round(avgSell * 450 / 1000000)}M`, market: '+ Польша, Чехия', color: '#8B5CF6' },
        { year: 'Год 3', cars: '800–1000', revenue: `$${Math.round(avgSell * 900 / 1000000)}M`, market: '+ Германия, Румыния', color: '#10B981' },
      ].map((s, i) => (
        <motion.div key={s.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
          <GlassCard className="p-4 flex flex-col md:flex-row md:items-center gap-2">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${s.color}15`, color: s.color }}>
              {s.year}
            </div>
            <div className="flex-1">
              <p className="font-bold text-pres-dark">{s.cars} авто</p>
              <p className="text-xs text-pres-gray">{s.market}</p>
            </div>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.revenue}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </SlideWrapper>
);

/* ── 36: EXIT ── */
export const ExitSlide = () => (
  <SlideWrapper>
    <FadeIn><SlideLabel>Стратегия выхода</SlideLabel></FadeIn>
    <FadeIn delay={0.1}><SlideTitle>Exit стратегия</SlideTitle></FadeIn>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {[
        { title: 'Buyout', desc: 'Выкуп доли операционным партнёром на 3–5 год', icon: HandCoins },
        { title: 'Дивиденды', desc: 'Пассивный доход по 3 сценариям (консерв./базовый/оптимист.)', icon: CarFront },
        { title: 'Продажа бизнеса', desc: 'Продажа операционной компании стратегическому покупателю', icon: Building2 },
      ].map((e, i) => (
        <FadeIn key={e.title} delay={i * 0.15}>
          <GlassCard className="p-6 text-center h-full">
            <div className="mb-3 flex justify-center"><e.icon className="w-8 h-8 text-pres-blue" strokeWidth={2} /></div>
            <p className="font-bold text-pres-dark text-lg">{e.title}</p>
            <p className="text-sm text-pres-gray mt-2">{e.desc}</p>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  </SlideWrapper>
);

/* ── 37: SUMMARY ── */
export const SummarySlide = () => (
  <SlideWrapper>
    <div className="text-center">
      <FadeIn><SlideLabel>Заключение</SlideLabel></FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="text-3xl md:text-5xl font-extrabold text-pres-dark mt-4">Итог</h2>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'ROI', value: base.roiPercent, suffix: '%', color: 'text-pres-teal' },
          { label: 'Авто/год', value: 200, suffix: '+', color: 'text-pres-blue' },
          { label: 'Прибыль/год', value: Math.round(base.annualProfit / 1000), prefix: '$', suffix: 'K', color: 'text-pres-gold' },
          { label: 'Оборот', value: 70, suffix: ' дней', color: 'text-pres-dark' },
        ].map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.12}>
            <GlassCard className="p-5 text-center">
              <p className={`text-2xl md:text-3xl font-extrabold ${m.color}`}>
                <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
              </p>
              <p className="text-xs text-pres-gray mt-1">{m.label}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.6}>
        <GlassCard className="p-6 mt-8 max-w-2xl mx-auto">
          <p className="text-pres-dark font-medium">
            Модель с прозрачной unit-экономикой и сценарием доходности: консервативный, базовый и оптимистичный.
          </p>
          <p className="text-sm text-pres-gray mt-2">Готовы обсудить условия инвестирования</p>
        </GlassCard>
      </FadeIn>
    </div>
  </SlideWrapper>
);

export const strategyFinanceSlides = [TestDriveSlide, FastWarehouseSlide, PipelineSlide, ExampleBatchSlide, CapitalStructureSlide, FinModelSlide, ROISlide, InvestorIncomeSlide, ScalingSlide, ExitSlide, SummarySlide];
