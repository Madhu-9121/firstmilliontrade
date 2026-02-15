import { useState, useEffect, useCallback } from 'react';

export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  isOpen: boolean;
  lastUpdated: string;
}

// Simulated realistic market data (public Yahoo Finance API requires CORS proxy)
// In production, use a backend proxy or licensed data feed
const BASE_INDICES: MarketItem[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50', price: 23856.50, change: 142.30, changePercent: 0.60, previousClose: 23714.20, isOpen: true, lastUpdated: '' },
  { symbol: 'SENSEX', name: 'BSE Sensex', price: 78699.07, change: 454.11, changePercent: 0.58, previousClose: 78244.96, isOpen: true, lastUpdated: '' },
  { symbol: 'BANK NIFTY', name: 'Bank Nifty', price: 51243.80, change: -89.45, changePercent: -0.17, previousClose: 51333.25, isOpen: true, lastUpdated: '' },
  { symbol: 'FINNIFTY', name: 'Fin Nifty', price: 23412.65, change: 67.20, changePercent: 0.29, previousClose: 23345.45, isOpen: true, lastUpdated: '' },
  { symbol: 'NIFTY MID', name: 'Nifty Midcap', price: 53287.40, change: 312.55, changePercent: 0.59, previousClose: 52974.85, isOpen: true, lastUpdated: '' },
];

const BASE_GAINERS: MarketItem[] = [
  { symbol: 'TATAPOWER', name: 'Tata Power', price: 432.75, change: 18.60, changePercent: 4.49, previousClose: 414.15, isOpen: true, lastUpdated: '' },
  { symbol: 'ADANIENT', name: 'Adani Ent.', price: 3245.30, change: 124.80, changePercent: 4.00, previousClose: 3120.50, isOpen: true, lastUpdated: '' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7892.45, change: 267.90, changePercent: 3.51, previousClose: 7624.55, isOpen: true, lastUpdated: '' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1734.20, change: 48.35, changePercent: 2.87, previousClose: 1685.85, isOpen: true, lastUpdated: '' },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: 2967.80, change: 72.15, changePercent: 2.49, previousClose: 2895.65, isOpen: true, lastUpdated: '' },
];

const BASE_LOSERS: MarketItem[] = [
  { symbol: 'INFY', name: 'Infosys', price: 1823.40, change: -62.30, changePercent: -3.31, previousClose: 1885.70, isOpen: true, lastUpdated: '' },
  { symbol: 'TCS', name: 'TCS', price: 4123.55, change: -98.45, changePercent: -2.33, previousClose: 4222.00, isOpen: true, lastUpdated: '' },
  { symbol: 'WIPRO', name: 'Wipro', price: 567.80, change: -11.20, changePercent: -1.94, previousClose: 579.00, isOpen: true, lastUpdated: '' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1654.30, change: -28.70, changePercent: -1.71, previousClose: 1683.00, isOpen: true, lastUpdated: '' },
  { symbol: 'HCLTECH', name: 'HCL Tech', price: 1876.90, change: -27.10, changePercent: -1.42, previousClose: 1904.00, isOpen: true, lastUpdated: '' },
];

function jitter(value: number, percent: number = 0.15): number {
  const delta = value * (percent / 100) * (Math.random() * 2 - 1);
  return parseFloat((value + delta).toFixed(2));
}

function refreshData(items: MarketItem[]): MarketItem[] {
  const now = new Date();
  const hours = now.getHours();
  const isMarketOpen = hours >= 9 && hours < 16;
  const timestamp = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return items.map(item => {
    const newPrice = jitter(item.price);
    const newChange = parseFloat((newPrice - item.previousClose).toFixed(2));
    const newChangePercent = parseFloat(((newChange / item.previousClose) * 100).toFixed(2));
    return {
      ...item,
      price: newPrice,
      change: newChange,
      changePercent: newChangePercent,
      isOpen: isMarketOpen,
      lastUpdated: timestamp,
    };
  });
}

export function useMarketData(refreshInterval = 60000) {
  const [indices, setIndices] = useState<MarketItem[]>(() => refreshData(BASE_INDICES));
  const [gainers, setGainers] = useState<MarketItem[]>(() => refreshData(BASE_GAINERS));
  const [losers, setLosers] = useState<MarketItem[]>(() => refreshData(BASE_LOSERS));
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setIndices(refreshData(BASE_INDICES));
    setGainers(refreshData(BASE_GAINERS));
    setLosers(refreshData(BASE_LOSERS));
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      refresh();
    }, 800); // simulate initial load
    const interval = setInterval(refresh, refreshInterval);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [refresh, refreshInterval]);

  return { indices, gainers, losers, loading, refresh };
}
