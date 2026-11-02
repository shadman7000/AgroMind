# AgroMind

Farm decision helper for daily field work — soil, weather, costs, and a clear action plan you can accept or reject.

Visual language: Cotton Newsprint, Sumi Ink, Vermilion, and Chlorophyll.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | Purpose |
|---|---|
| `/` | Sign in |
| `/today` | Today’s jobs dashboard |
| `/field` | Field layout + soil glance |
| `/soil` | Soil nutrition list |
| `/weather` | Weather + disease probability |
| `/costing` | Market prices + profit calculator |
| `/plan` | Recommended plan with rationale + Accept/Reject |
| `/what-if` | Rain-tomorrow scenario toggle |

## Stack

- Next.js + TypeScript + Tailwind CSS
- Framer Motion
- Local data in `src/mocks/` (swap for live APIs later)

## Walkthrough

See [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md).
