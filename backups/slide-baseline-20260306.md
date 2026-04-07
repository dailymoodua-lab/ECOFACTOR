# Ecofactor Presentation Baseline (2026-03-06)

## Backup
- Archive: `backups/ecofactorautop-backup-20260306-121150.tar.gz`
- Purpose: full rollback snapshot (project copy without `.git`, `node_modules`, `backups`).

## Slide Structure Lock (Order MUST NOT change)
1. CoverSlide (`src/components/v2/slides/IntroSlides.tsx`)
2. EssenceSlide (`src/components/v2/slides/IntroSlides.tsx`)
3. WhyWorksSlide (`src/components/v2/slides/IntroSlides.tsx`)
4. Market2026Slide (`src/components/v2/slides/IntroSlides.tsx`)
5. GeographySlide (`src/components/v2/slides/IntroSlides.tsx`)
6. FundingSlide (`src/components/v2/slides/OperationsSlides.tsx`)
7. Capital3MSlide (`src/components/v2/slides/OperationsSlides.tsx`)
8. WarehouseSlide (`src/components/v2/slides/OperationsSlides.tsx`)
9. LogisticsFlowSlide (`src/components/v2/slides/OperationsSlides.tsx`)
10. TimelineSlide (`src/components/v2/slides/OperationsSlides.tsx`)
11. ContainerSlide (`src/components/v2/slides/OperationsSlides.tsx`)
12. LogCostSlide (`src/components/v2/slides/OperationsSlides.tsx`)
13. RealCostSlide (`src/components/v2/slides/OperationsSlides.tsx`)
14. TaxEVSlide (`src/components/v2/slides/ProductSlides.tsx`)
15. TaxHybridSlide (`src/components/v2/slides/ProductSlides.tsx`)
16. CoreAssortmentSlide (`src/components/v2/slides/ProductSlides.tsx`)
17. AllEVSlide (`src/components/v2/slides/ProductSlides.tsx`)
18. AllHybridSlide (`src/components/v2/slides/ProductSlides.tsx`)
19. UE_Seagull (`src/components/v2/slides/EconomicsSlides.tsx`)
20. UE_Dolphin (`src/components/v2/slides/EconomicsSlides.tsx`)
21. UE_SU7 (`src/components/v2/slides/EconomicsSlides.tsx`)
22. UE_SongPlus (`src/components/v2/slides/EconomicsSlides.tsx`)
23. UE_L6 (`src/components/v2/slides/EconomicsSlides.tsx`)
24. UE_M7 (`src/components/v2/slides/EconomicsSlides.tsx`)
25. MostLiquidSlide (`src/components/v2/slides/EconomicsSlides.tsx`)
26. MostProfitableSlide (`src/components/v2/slides/EconomicsSlides.tsx`)
27. TestDriveSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
28. FastWarehouseSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
29. PipelineSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
30. ExampleBatchSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
31. CapitalStructureSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
32. FinModelSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
33. ROISlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
34. InvestorIncomeSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
35. ScalingSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
36. ExitSlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)
37. SummarySlide (`src/components/v2/slides/StrategyFinanceSlides.tsx`)

## Animation/Behavior Lock
- Desktop slide transition: `AnimatePresence` + `motion.div` in `src/components/v2/PresentationLayout.tsx`.
- Mobile behavior: vertical snap scroll + progress bar + burger overlay in `src/components/v2/PresentationLayout.tsx`.
- Shared animation primitives in `src/components/v2/AnimatedComponents.tsx`:
  - `FadeIn` (viewport reveal)
  - `AnimatedCounter` (count-up numbers)
  - `AnimatedBar` (growing bars)
- Chart animations from `recharts` are used in funding/economics/finance slides.

## Numeric Source of Truth (edit here first)
1. `src/data/presentationData.ts`
- `LOGISTICS_PER_CAR`
- `evCars[]`: `buyPrice`, `sellPrice`, `battery`
- `hybridCars[]`: `buyPrice`, `sellPrice`, `engine`
- `CONTAINER.cost`, `CONTAINER.cars`
- `TRANSIT[].days`
- `CAPITAL_ALLOCATION[].value`

2. Hardcoded numeric blocks inside slides (manual sync required)
- `src/components/v2/slides/IntroSlides.tsx`
- `src/components/v2/slides/OperationsSlides.tsx`
- `src/components/v2/slides/StrategyFinanceSlides.tsx`

## Safe Edit Protocol (for next price update)
1. Change only numeric literals/percentages/currency values.
2. Do not modify JSX structure, class names, animation props, array order, or component names.
3. Preserve all `FadeIn`, `motion.*`, `AnimatedCounter`, `AnimatedBar`, chart configs.
4. Validate on both desktop and mobile views after numeric edits.
5. Keep all edits minimal and isolated to value fields.

## Rollback
- Quick restore: unpack archive `backups/ecofactorautop-backup-20260306-121150.tar.gz` into a clean folder.
- Alternative restore: compare against hash manifest (`backups/source-hashes-20260306.txt`).
