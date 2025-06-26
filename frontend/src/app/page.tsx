"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StockPulse() {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/rankings");
      const data = await res.json();
      setTopGainers(data.top);
      setTopLosers(data.bottom);
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Top Gainers</h2>
          <ul>
            {topGainers.map((stock, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{stock.ticker}</span>
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {stock.change.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Top Losers</h2>
          <ul>
            {topLosers.map((stock, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{stock.ticker}</span>
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  {stock.change.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
