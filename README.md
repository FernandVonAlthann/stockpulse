# StockPulse — Real-Time Stock Ranking Dashboard

A real-time dashboard showing the **top 5 gainers** and **top 5 losers**, updated every minute. Built with:

- **FastAPI** backend using real data from Yahoo Finance (`yfinance`)
- ⚛**Next.js** + **Tailwind CSS** frontend
- **ShadCN UI** for styled cards
- Auto-refresh every 30 seconds

---

## Live Demo

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000/rankings](http://localhost:8000/rankings)

---

## Project Structure

```
stockpulse/
├── backend/         ← FastAPI + yfinance
│   ├── main.py
│   ├── requirements.txt
│   └── .venv/       ← Python virtual environment
│
├── frontend/        ← Next.js + Tailwind + ShadCN UI
│   ├── src/app/page.tsx
│   ├── src/components/ui/card.tsx
│   ├── package.json
│   └── tailwind.config.js
```

---

##  Backend Setup (Python + FastAPI + yfinance)

### 1. Create & activate virtual environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install fastapi uvicorn yfinance
```

### 3. Save dependencies

```bash
pip freeze > requirements.txt
```

### 4. Run the backend

```bash
uvicorn main:app --reload --port 8000
```

Open [http://localhost:8000/rankings](http://localhost:8000/rankings)

> ⚠**Tip**: This data only updates once per minute — no need to poll every second.

---

## Frontend Setup (Next.js + Tailwind + ShadCN)

### 1. Create project (if needed)

```bash
cd ..
npx create-next-app@latest frontend --typescript
```

Choose:
- Tailwind CSS ✅
- App Router ✅
- TypeScript ✅

### 2. Install dependencies

```bash
cd frontend
npm install
npm install lucide-react
```

### 3. Add ShadCN UI

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add card
```

Use:
- Path: `src/components`  
- Base path: `src`  
- Use Tailwind? ✅

> Or manually create `src/components/ui/card.tsx`:

```tsx
import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <div className={\`bg-white shadow-md rounded-2xl p-4 ${className}\`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

### 4. Run frontend

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Features

- Real stock data from Yahoo Finance (via `yfinance`)
- Auto-refreshes every 30 seconds
- Sorted top/bottom 5 stocks by intraday percent change
- Clean UI with ShadCN and Tailwind CSS

---

## Notes

- For true real-time tick data, consider using **Polygon.io** or **Finnhub**.

---

## To Do

- [ ] Add sparklines or mini-charts
- [ ] Add "last updated" timestamp
- [ ] Deploy frontend (Vercel) + backend (Render, Fly.io)
- [ ] Add watchlist, filters, search
- [ ] Improve performance with caching

---
