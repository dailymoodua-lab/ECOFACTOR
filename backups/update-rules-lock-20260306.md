# Update Rules Lock (2026-03-06)

## Scope
- Core models in presentation are mandatory.
- Adding extra models is allowed only if layout/visual integrity is preserved.

## Pricing Rules
- Purchase price (FCA):
  - if exists in Excel -> use Excel value
  - if missing in Excel -> use internet benchmark MID
- Retail/sell price: use MID

## Logistics Rules
- Route preference baseline: Mostyska
- If cost gap vs Klaipeda/Odessa is significant, report gap explicitly.
- Broker: EV = 150 USD, Hybrid = 350 USD
- Unloading: Klaipeda = 270 USD, Mostyska = 230 USD, Odessa = 200 USD
- Container capacity: default 3 cars; Yuan Up = 4 cars
- If a model is proven equivalent to Yuan Up in fitment, can use 4 cars

## Tax Rules
- Use current Ukraine tax logic used in model (EV and Hybrid as already implemented).

## Modeling Rules
- Recalculate all dependent slides: finance model, ROI, profits, summary, etc.
- Rounding: integer values only (no decimals/cents).
- Currency normalization with fixed FX is NOT required at this stage.

## AITO M7
- Choose values to minimize pricing/margin error based on available ranges.
