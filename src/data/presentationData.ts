export interface CarModel {
  name: string;
  brand: string;
  type: 'ev' | 'hybrid';
  buyPrice: number;
  sellPrice: number;
  battery?: number;
  engine?: number;
  segment: string;
  carsPerContainer: number;
  freightShare: number;
  deliveryToOdessa: number;
  unloading: number;
  broker: number;
  logistics: number;
  tax: number;
  totalCost: number;
  margin: number;
  marginPercent: number;
}

type ScenarioName = 'conservative' | 'base' | 'optimistic';

interface RawCarInput {
  name: string;
  brand: string;
  type: 'ev' | 'hybrid';
  battery?: number;
  engine?: number;
  segment: string;
  carsPerContainer?: number;
  buyRange: [number, number];
  sellRange: [number, number];
}

const ROUTE = {
  name: 'Mostyska',
  freightPerContainer: 6300,
  deliveryToOdessaPerCar: 180,
  unloadingPerCar: 230,
} as const;

const BROKER_PER_CAR = {
  ev: 150,
  hybrid: 350,
} as const;

export const MOSTYSKA_LOGISTICS = {
  route: ROUTE.name,
  freightPerContainer: ROUTE.freightPerContainer,
  deliveryToOdessaPerCar: ROUTE.deliveryToOdessaPerCar,
  unloadingPerCar: ROUTE.unloadingPerCar,
  brokerEvPerCar: BROKER_PER_CAR.ev,
  brokerHybridPerCar: BROKER_PER_CAR.hybrid,
  totalEvPerCar3: Math.round(ROUTE.freightPerContainer / 3) + ROUTE.deliveryToOdessaPerCar + ROUTE.unloadingPerCar + BROKER_PER_CAR.ev,
  totalEvPerCar4: Math.round(ROUTE.freightPerContainer / 4) + ROUTE.deliveryToOdessaPerCar + ROUTE.unloadingPerCar + BROKER_PER_CAR.ev,
} as const;

function midpoint([low, high]: [number, number]) {
  return Math.round((low + high) / 2);
}

function valueByScenario(range: [number, number], scenario: ScenarioName, mode: 'buy' | 'sell') {
  const [low, high] = range;
  if (scenario === 'base') return midpoint(range);
  if (scenario === 'conservative') return mode === 'buy' ? high : low;
  return mode === 'buy' ? low : high;
}

function calcEV(buy: number, freightShare: number, extraCosts: number, battery: number) {
  const nds = (buy + freightShare) * 0.2;
  const excise = battery;
  const tax = Math.round(nds + excise);
  return { tax, total: buy + freightShare + extraCosts + tax };
}

function calcHybrid(buy: number, freightShare: number, extraCosts: number) {
  const duty = (buy + freightShare) * 0.1;
  const nds = (buy + freightShare + duty) * 0.2;
  const tax = Math.round(nds + duty);
  return { tax, total: buy + freightShare + extraCosts + tax };
}

function makeCar(raw: RawCarInput, scenario: ScenarioName): CarModel {
  const buyPrice = valueByScenario(raw.buyRange, scenario, 'buy');
  const sellPrice = valueByScenario(raw.sellRange, scenario, 'sell');
  const carsPerContainer = raw.carsPerContainer || 3;
  const freightShare = Math.round(ROUTE.freightPerContainer / carsPerContainer);
  const deliveryToOdessa = ROUTE.deliveryToOdessaPerCar;
  const unloading = ROUTE.unloadingPerCar;
  const broker = BROKER_PER_CAR[raw.type];
  const logistics = freightShare + deliveryToOdessa + unloading + broker;
  const extraCosts = deliveryToOdessa + unloading + broker;
  const { tax, total } = raw.type === 'ev'
    ? calcEV(buyPrice, freightShare, extraCosts, raw.battery || 0)
    : calcHybrid(buyPrice, freightShare, extraCosts);
  const margin = sellPrice - total;
  return {
    ...raw,
    buyPrice,
    sellPrice,
    carsPerContainer,
    freightShare,
    deliveryToOdessa,
    unloading,
    broker,
    logistics,
    tax,
    totalCost: total,
    margin,
    marginPercent: Math.round((margin / sellPrice) * 100),
  };
}

const coreCars: RawCarInput[] = [
  // EV
  { name: 'Xiaomi SU7', brand: 'Xiaomi', type: 'ev', buyRange: [36949, 36949], sellRange: [49500, 49500], battery: 101, segment: 'D-sedan' },
  { name: 'BYD Yuan Up', brand: 'BYD', type: 'ev', buyRange: [11890, 11890], sellRange: [20200, 20200], battery: 50, segment: 'B-SUV', carsPerContainer: 4 },
  { name: 'Zeekr 001', brand: 'Zeekr', type: 'ev', buyRange: [66230, 66230], sellRange: [86100, 86100], battery: 100, segment: 'E-class' },
  { name: 'Zeekr 7X', brand: 'Zeekr', type: 'ev', buyRange: [45100, 45100], sellRange: [51200, 51200], battery: 100, segment: 'D-SUV' },
  { name: 'BYD Dolphin', brand: 'BYD', type: 'ev', buyRange: [14342, 14342], sellRange: [24500, 24500], battery: 44, segment: 'B-class' },

  // Hybrid
  { name: 'Li Auto L9', brand: 'Li Auto', type: 'hybrid', buyRange: [60300, 60300], sellRange: [72300, 72300], engine: 1.5, segment: 'E-SUV' },
  { name: 'Li Auto L6 Pro', brand: 'Li Auto', type: 'hybrid', buyRange: [37300, 37300], sellRange: [50700, 50700], engine: 1.5, segment: 'D-SUV' },
  { name: 'Li Auto L7 Pro', brand: 'Li Auto', type: 'hybrid', buyRange: [43300, 43300], sellRange: [69900, 69900], engine: 1.5, segment: 'D-SUV' },
  { name: 'AITO M9', brand: 'Huawei/AITO', type: 'hybrid', buyRange: [93500, 93500], sellRange: [95500, 95500], engine: 1.5, segment: 'E-SUV' },
  { name: 'BYD Song Plus DM-i', brand: 'BYD', type: 'hybrid', buyRange: [18800, 18800], sellRange: [32600, 32600], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Song Pro DM-i', brand: 'BYD', type: 'hybrid', buyRange: [15600, 15600], sellRange: [25900, 25900], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Song Pro DM-i 75KM Beyond', brand: 'BYD', type: 'hybrid', buyRange: [15600, 15600], sellRange: [25800, 25800], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Song Pro DM-i 75KM Leading', brand: 'BYD', type: 'hybrid', buyRange: [14800, 14800], sellRange: [24100, 24100], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Song Pro DM-i 115KM Beyond', brand: 'BYD', type: 'hybrid', buyRange: [16900, 16900], sellRange: [27600, 27600], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Song Pro DM-i 115KM Excellence', brand: 'BYD', type: 'hybrid', buyRange: [18100, 18100], sellRange: [25900, 25900], engine: 1.5, segment: 'C-SUV' },
  { name: 'BYD Qin L DM-i 120KM Beyond', brand: 'BYD', type: 'hybrid', buyRange: [13900, 13900], sellRange: [28200, 28200], engine: 1.5, segment: 'C-sedan' },
  { name: 'BYD Tang DM-i', brand: 'BYD', type: 'hybrid', buyRange: [22700, 22700], sellRange: [39590, 39590], engine: 1.5, segment: 'D-SUV' },
  { name: 'BYD Tang DM-i 115KM Premium Honor', brand: 'BYD', type: 'hybrid', buyRange: [20400, 20400], sellRange: [37700, 37700], engine: 1.5, segment: 'D-SUV' },
  { name: 'BYD Tang DM-i 115KM Premium Noble', brand: 'BYD', type: 'hybrid', buyRange: [21100, 21100], sellRange: [37700, 37700], engine: 1.5, segment: 'D-SUV' },
  { name: 'BYD Tang DM-i 115KM Flagship', brand: 'BYD', type: 'hybrid', buyRange: [22700, 22700], sellRange: [40850, 40850], engine: 1.5, segment: 'D-SUV' },
  { name: 'Geely Galaxy E6', brand: 'Geely', type: 'hybrid', buyRange: [18400, 18400], sellRange: [31614, 31614], engine: 1.5, segment: 'C-Sedan' },
];

function buildCars(scenario: ScenarioName) {
  return coreCars.map(car => makeCar(car, scenario));
}

export const carsByScenario = {
  conservative: buildCars('conservative'),
  base: buildCars('base'),
  optimistic: buildCars('optimistic'),
} as const;

const baseCars = carsByScenario.base;

export const evCars: CarModel[] = baseCars.filter(car => car.type === 'ev');
export const hybridCars: CarModel[] = baseCars.filter(car => car.type === 'hybrid');

const excludedFromActiveAssortment = new Set(['Li Auto L9', 'AITO M9']);

export const allCars = [...evCars, ...hybridCars].filter(car => !excludedFromActiveAssortment.has(car.name));

const activeCarsByScenario = {
  conservative: carsByScenario.conservative.filter(car => !excludedFromActiveAssortment.has(car.name)),
  base: carsByScenario.base.filter(car => !excludedFromActiveAssortment.has(car.name)),
  optimistic: carsByScenario.optimistic.filter(car => !excludedFromActiveAssortment.has(car.name)),
} as const;

// Temporary visual marker for models already approved by user and profitable.
export const finalizedModels = ['BYD Yuan Up', 'BYD Song Plus DM-i', 'BYD Song Pro DM-i', 'Li Auto L7 Pro', 'Geely Galaxy E6', 'Xiaomi SU7', 'Zeekr 001', 'BYD Dolphin'] as const;

export function getCarByName(list: CarModel[], name: string): CarModel {
  const found = list.find(car => car.name === name);
  if (!found) {
    throw new Error(`Car model not found: ${name}`);
  }
  return found;
}

export const CONTAINER = {
  freightOnly: ROUTE.freightPerContainer,
  transferToOdessaPerCar: ROUTE.deliveryToOdessaPerCar,
  cost: ROUTE.freightPerContainer + ROUTE.deliveryToOdessaPerCar * 3,
  cars: 3,
  perCar: Math.round((ROUTE.freightPerContainer + ROUTE.deliveryToOdessaPerCar * 3) / 3),
  route: ROUTE.name,
};

const INVESTMENT_CAPITAL = 3000000;
const CARS_PER_CYCLE = 50;
const CYCLES_PER_YEAR = 4;

function summarizeScenario(cars: CarModel[]) {
  const totalMargin = cars.reduce((sum, car) => sum + car.margin, 0);
  const avgBuy = Math.round(cars.reduce((sum, car) => sum + car.buyPrice, 0) / cars.length);
  const avgSell = Math.round(cars.reduce((sum, car) => sum + car.sellPrice, 0) / cars.length);
  const avgMargin = Math.round(totalMargin / cars.length);
  const profitPerCycle = avgMargin * CARS_PER_CYCLE;
  const annualProfit = profitPerCycle * CYCLES_PER_YEAR;
  const roiPercent = Math.round((annualProfit / INVESTMENT_CAPITAL) * 100);
  return { avgBuy, avgSell, avgMargin, profitPerCycle, annualProfit, roiPercent };
}

export const scenarioSummary = {
  conservative: summarizeScenario(activeCarsByScenario.conservative),
  base: summarizeScenario(activeCarsByScenario.base),
  optimistic: summarizeScenario(activeCarsByScenario.optimistic),
} as const;

export const TRANSIT = [
  { stage: 'Китай (подготовка)', days: [5, 10], color: '#3B82F6' },
  { stage: 'Порт отгрузки', days: [7, 12], color: '#8B5CF6' },
  { stage: 'Морская перевозка', days: [30, 40], color: '#0EA5E9' },
  { stage: 'ЕС (таможня + доставка)', days: [5, 10], color: '#10B981' },
];

export const CAPITAL_ALLOCATION = [
  { name: 'Машины в обороте', value: 65, color: '#3B82F6' },
  { name: 'Машины в пути', value: 15, color: '#8B5CF6' },
  { name: 'Тест-драйв парк', value: 10, color: '#0EA5E9' },
  { name: 'Быстрый склад', value: 5, color: '#10B981' },
  { name: 'Резерв', value: 5, color: '#F59E0B' },
];

export const slideNames = [
  'Обложка', 'Суть проекта', 'Почему это работает', 'Рынок 2026', 'География запуска',
  'Что финансируется', 'Капитал $3M', 'Логика склада', 'Логистика', 'Разбивка сроков',
  'Контейнерная модель', 'Стоимость логистики', 'Реальная стоимость/авто', 'Налоги EV', 'Налоги Hybrid',
  'Ядро ассортимента', 'Все EV', 'Все Hybrid',
  'UE: Yuan Up', 'UE: Dolphin', 'UE: SU7', 'UE: Song Plus', 'UE: L7 Pro', 'UE: Tang DM-i',
  'Самые ликвидные', 'Самые маржинальные',
  'Тест-драйв стратегия', 'Быстрый склад', 'Pipeline машин', 'Пример партии',
  'Структура капитала', 'Финмодель', 'ROI', 'Доход инвестора',
  'Масштабирование', 'Exit стратегия', 'Итог',
];
