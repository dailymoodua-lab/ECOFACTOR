import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SlideWrapper } from '../SlideWrapper';
import { FadeIn, AnimatedCounter, GlassCard, SlideLabel, SlideTitle, AnimatedBar } from '../AnimatedComponents';
import { evCars, hybridCars, allCars, getCarByName, type CarModel } from '@/data/presentationData';

const buildCostData = (car: CarModel, detailed = false) => {
  if (!detailed) {
    return [
      { name: 'Закупка', value: car.buyPrice, color: '#3B82F6' },
      { name: 'Логистика', value: car.logistics, color: '#8B5CF6' },
      { name: 'Налоги', value: car.tax, color: '#F59E0B' },
    ];
  }

  const nds = Math.round((car.buyPrice + car.freightShare) * 0.2);
  if (car.type === 'ev') {
    return [
      { name: 'Закупка', value: car.buyPrice, color: '#3B82F6' },
      { name: 'Фрахт (море)', value: car.freightShare, color: '#6366F1' },
      { name: 'Суша до Одессы', value: car.deliveryToOdessa, color: '#8B5CF6' },
      { name: 'Выгрузка', value: car.unloading, color: '#A855F7' },
      { name: 'Брокер', value: car.broker, color: '#C084FC' },
      { name: 'НДС 20%', value: nds, color: '#F59E0B' },
      { name: 'Акциз', value: car.battery || 0, color: '#FBBF24' },
    ];
  }

  const duty = Math.round((car.buyPrice + car.freightShare) * 0.1);
  const ndsHybrid = Math.round((car.buyPrice + car.freightShare + duty) * 0.2);
  return [
    { name: 'Закупка', value: car.buyPrice, color: '#3B82F6' },
    { name: 'Фрахт (море)', value: car.freightShare, color: '#6366F1' },
    { name: 'Суша до Одессы', value: car.deliveryToOdessa, color: '#8B5CF6' },
    { name: 'Выгрузка', value: car.unloading, color: '#A855F7' },
    { name: 'Брокер', value: car.broker, color: '#C084FC' },
    { name: 'Пошлина 10%', value: duty, color: '#F59E0B' },
    { name: 'НДС 20%', value: ndsHybrid, color: '#FBBF24' },
  ];
};

/* ── UNIT ECONOMICS TEMPLATE ── */
const UESlide = ({ car, detailed = false }: { car: CarModel; detailed?: boolean }) => {
  const data = buildCostData(car, detailed);
  const nds = car.type === 'ev'
    ? Math.round((car.buyPrice + car.freightShare) * 0.2)
    : Math.round((car.buyPrice + car.freightShare + Math.round((car.buyPrice + car.freightShare) * 0.1)) * 0.2);
  const duty = car.type === 'hybrid' ? Math.round((car.buyPrice + car.freightShare) * 0.1) : 0;
  const excise = car.type === 'ev' ? (car.battery || 0) : 0;

  const logisticsItems = [
    { label: 'Фрахт (море)', value: car.freightShare, color: '#6366F1' },
    { label: 'Суша до Одессы', value: car.deliveryToOdessa, color: '#8B5CF6' },
    { label: 'Выгрузка', value: car.unloading, color: '#A855F7' },
    { label: 'Брокер', value: car.broker, color: '#C084FC' },
  ];
  const taxItems = car.type === 'ev'
    ? [
        { label: 'НДС 20%', value: nds, color: '#F59E0B' },
        { label: 'Акциз', value: excise, color: '#FBBF24' },
      ]
    : [
        { label: 'Пошлина 10%', value: duty, color: '#F59E0B' },
        { label: 'НДС 20%', value: nds, color: '#FBBF24' },
      ];
  const maxLog = Math.max(...logisticsItems.map(i => i.value), 1);
  const maxTax = Math.max(...taxItems.map(i => i.value), 1);

  const DetailRow = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
    <div className="mb-1.5">
      <div className="flex justify-between text-[11px] md:text-xs mb-1">
        <span className="text-pres-gray">{label}</span>
        <span className="font-semibold text-pres-dark">${value.toLocaleString()}</span>
      </div>
      <div className="h-1.5 md:h-2 bg-pres-light rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ background: color, width: `${value > 0 ? Math.max((value / max) * 100, 10) : 0}%` }}
        />
      </div>
    </div>
  );

  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Unit Economics</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>{car.name}</SlideTitle></FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <FadeIn delay={0.2}>
          {!detailed ? (
            <GlassCard className="p-5">
              <p className="text-xs text-pres-gray mb-3">Структура себестоимости</p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={1200}>
                      {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-3 md:p-5">
              <p className="text-[11px] md:text-xs text-pres-gray mb-2 md:mb-4">Детальная структура себестоимости</p>
              <div className="space-y-2.5 md:space-y-4">
                <div className="border border-pres-light rounded-lg p-2.5 md:p-3">
                  <p className="text-xs text-pres-gray mb-2">Закупка</p>
                  <DetailRow label="FOB Китай" value={car.buyPrice} max={car.buyPrice} color="#3B82F6" />
                </div>
                <div className="border border-pres-light rounded-lg p-2.5 md:p-3">
                  <p className="text-xs text-pres-gray mb-2">Логистика</p>
                  {logisticsItems.map(item => (
                    <DetailRow key={item.label} label={item.label} value={item.value} max={maxLog} color={item.color} />
                  ))}
                </div>
                <div className="border border-pres-light rounded-lg p-2.5 md:p-3">
                  <p className="text-xs text-pres-gray mb-2">Налоги</p>
                  {taxItems.map(item => (
                    <DetailRow key={item.label} label={item.label} value={item.value} max={maxTax} color={item.color} />
                  ))}
                </div>
              </div>
            </GlassCard>
          )}
        </FadeIn>
        <FadeIn delay={0.3}>
          {!detailed ? (
            <div className="space-y-3">
              <GlassCard className="p-4">
                <p className="text-xs text-pres-gray">Себестоимость</p>
                <p className="text-2xl font-bold text-pres-dark">$<AnimatedCounter target={car.totalCost} /></p>
              </GlassCard>
              <GlassCard className="p-4">
                <p className="text-xs text-pres-gray">Цена продажи</p>
                <p className="text-2xl font-bold text-pres-teal">$<AnimatedCounter target={car.sellPrice} /></p>
              </GlassCard>
              <GlassCard className="p-4" style={{ borderLeft: '3px solid hsl(37 92% 55%)' }}>
                <p className="text-xs text-pres-gray">Маржа</p>
                <p className="text-xl font-bold text-pres-gold">
                  $<AnimatedCounter target={car.margin} /> <span className="text-sm">({car.marginPercent}%)</span>
                </p>
              </GlassCard>
            </div>
          ) : (
            <div className="space-y-3">
              <GlassCard className="p-3 md:p-4">
                <p className="text-xs text-pres-gray mb-2">Итоги</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-pres-gray">Себестоимость</span><span className="font-bold text-pres-dark">$<AnimatedCounter target={car.totalCost} /></span></div>
                  <div className="flex justify-between"><span className="text-pres-gray">Цена продажи</span><span className="font-bold text-pres-teal">$<AnimatedCounter target={car.sellPrice} /></span></div>
                  <div className="flex justify-between"><span className="text-pres-gray">Маржа</span><span className="font-bold text-pres-gold">$<AnimatedCounter target={car.margin} /> ({car.marginPercent}%)</span></div>
                </div>
              </GlassCard>
              <GlassCard className="hidden md:block p-4">
                <p className="text-xs text-pres-gray mb-2">Логистика: детали</p>
                <div className="space-y-1 text-sm">
                  {logisticsItems.map(item => (
                    <div key={item.label} className="flex justify-between"><span className="text-pres-gray">{item.label}</span><span className="font-semibold text-pres-dark">${item.value.toLocaleString()}</span></div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-pres-light"><span className="text-pres-gray">Итого логистика</span><span className="font-bold text-pres-dark">${car.logistics.toLocaleString()}</span></div>
                </div>
              </GlassCard>
              <GlassCard className="hidden md:block p-4">
                <p className="text-xs text-pres-gray mb-2">Налоги: детали</p>
                <div className="space-y-1 text-sm">
                  {taxItems.map(item => (
                    <div key={item.label} className="flex justify-between"><span className="text-pres-gray">{item.label}</span><span className="font-semibold text-pres-dark">${item.value.toLocaleString()}</span></div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-pres-light"><span className="text-pres-gray">Итого налоги</span><span className="font-bold text-pres-dark">${car.tax.toLocaleString()}</span></div>
                </div>
              </GlassCard>
            </div>
          )}
        </FadeIn>
      </div>
    </SlideWrapper>
  );
};

/* ── 19-24: UNIT ECONOMICS ── */
export const UE_YuanUp = () => <UESlide car={getCarByName(evCars, 'BYD Yuan Up')} detailed />;
export const UE_Dolphin = () => <UESlide car={getCarByName(evCars, 'BYD Dolphin')} detailed />;
export const UE_SU7 = () => <UESlide car={getCarByName(evCars, 'Xiaomi SU7')} detailed />;
export const UE_SongPlus = () => <UESlide car={getCarByName(hybridCars, 'BYD Song Plus DM-i')} detailed />;
export const UE_L7Pro = () => <UESlide car={getCarByName(hybridCars, 'Li Auto L7 Pro')} detailed />;
export const UE_TangDmi = () => <UESlide car={getCarByName(hybridCars, 'BYD Tang DM-i')} detailed />;

/* ── 25: MOST LIQUID ── */
export const MostLiquidSlide = () => {
  const liquidityScoreByName: Record<string, number> = {
    'BYD Yuan Up': 96,
    'BYD Dolphin': 92,
    'Xiaomi SU7': 88,
    'Li Auto L6 Pro': 84,
    'Li Auto L7 Pro': 82,
    'Zeekr 7X': 80,
    'Zeekr 001': 74,
    'BYD Song Plus DM-i': 78,
    'BYD Song Pro DM-i': 76,
    'BYD Song Pro DM-i 75KM Leading': 75,
    'BYD Song Pro DM-i 75KM Beyond': 74,
    'BYD Song Pro DM-i 115KM Beyond': 71,
    'BYD Song Pro DM-i 115KM Excellence': 72,
    'BYD Qin L DM-i 120KM Beyond': 73,
    'BYD Tang DM-i': 68,
    'BYD Tang DM-i 115KM Premium Honor': 67,
    'BYD Tang DM-i 115KM Premium Noble': 69,
    'BYD Tang DM-i 115KM Flagship': 66,
    'Geely Galaxy E6': 72,
  };

  const liquidPool = allCars
    .filter(c => liquidityScoreByName[c.name] !== undefined)
    .map(c => ({ ...c, liquidityScore: liquidityScoreByName[c.name] }))
    .sort((a, b) => b.liquidityScore - a.liquidityScore)
    .slice(0, 15);
  const maxLiquidity = Math.max(...liquidPool.map(c => c.liquidityScore), 1);

  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Рейтинг</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>Самые ликвидные модели</SlideTitle></FadeIn>
      <FadeIn delay={0.15}><p className="text-sm text-pres-gray mt-2">Ликвидность = скорость перепродажи и устойчивый спрос (отдельно от маржи)</p></FadeIn>
      <div className="mt-4 space-y-0.5">
        {liquidPool.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.08}>
            <AnimatedBar label={`${i + 1}. ${c.name}`} value={c.liquidityScore} max={maxLiquidity} color={c.type === 'ev' ? '#10B981' : '#3B82F6'} suffix={` pts • $${c.sellPrice.toLocaleString()}`} />
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.45}>
        <GlassCard className="p-3 mt-2">
          <p className="text-xs text-pres-gray">
            В расширении ассортимента (цены в валидации): <span className="font-semibold text-pres-dark">OMODA</span>, <span className="font-semibold text-pres-dark">JAECOO</span>, <span className="font-semibold text-pres-dark">GAC (AION)</span>.
          </p>
        </GlassCard>
      </FadeIn>
    </SlideWrapper>
  );
};

/* ── 26: MOST PROFITABLE ── */
export const MostProfitableSlide = () => {
  const ranked = [...allCars].sort((a, b) => b.margin - a.margin).slice(0, 10);
  const maxMargin = Math.max(...ranked.map(c => Math.max(c.margin, 0)), 1);
  return (
    <SlideWrapper>
      <FadeIn><SlideLabel>Рейтинг</SlideLabel></FadeIn>
      <FadeIn delay={0.1}><SlideTitle>Самые маржинальные модели</SlideTitle></FadeIn>
      <div className="mt-4 space-y-0.5">
        {ranked.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.08}>
            <AnimatedBar label={`${i + 1}. ${c.name}`} value={Math.max(c.margin, 0)} max={maxMargin} color={c.type === 'ev' ? '#F59E0B' : '#8B5CF6'} suffix={` $ (${c.marginPercent}%)`} />
          </FadeIn>
        ))}
      </div>
    </SlideWrapper>
  );
};

export const economicsSlides = [UE_YuanUp, UE_Dolphin, UE_SU7, UE_SongPlus, UE_L7Pro, UE_TangDmi, MostLiquidSlide, MostProfitableSlide];
