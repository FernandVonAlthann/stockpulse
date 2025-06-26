from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Top-traded US tickers (you can modify this list)
TICKERS = [
    "AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META", "NVDA", "NFLX", "AMD", "INTC",
    "BABA", "UBER", "DIS", "PEP", "KO", "NKE", "XOM", "CVX", "BA", "PFE"
]

@app.get("/rankings")
def get_stock_rankings():
    tickers_str = " ".join(TICKERS)
    data = yf.download(tickers=tickers_str, period="1d", interval="1m", group_by="ticker", threads=True, progress=False)

    stock_changes = []

    for ticker in TICKERS:
        try:
            current = data[ticker]["Close"][-1]
            previous = data[ticker]["Close"][0]
            change_pct = ((current - previous) / previous) * 100
            stock_changes.append({"ticker": ticker, "change": round(change_pct, 2)})
        except Exception:
            # If data is missing (e.g., after-hours), skip
            continue

    stock_changes.sort(key=lambda x: x["change"], reverse=True)
    return {
        "top": stock_changes[:5],
        "bottom": stock_changes[-5:]
    }
