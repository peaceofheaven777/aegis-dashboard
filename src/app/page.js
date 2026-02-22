"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({
    wallet: { usdc: "...", eth: "...", botcoin: "..." },
    status: "SYNCING...",
    lastBet: { market: "...", result: "...", pnl: "..." },
    mining: { credits: 0, epoch: 0, hurdle: "..." },
    lastUpdate: "Never"
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch from the raw GitHub JSON file
        const res = await fetch('https://raw.githubusercontent.com/peaceofheaven777/aegis-dashboard/main/aegis-data.json');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Fetch failed", e);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto bg-[#020617] text-slate-100">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">🛡️ Aegis Dashboard</h1>
          <p className="text-slate-400 mt-1">Digital Commander Intelligence System</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-sm tracking-widest text-green-500 uppercase">{data.status}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">🏦 Wallet Assets</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500">USDC (Polygon)</p>
              <p className="text-2xl font-bold font-mono text-white">${data.wallet.usdc}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">BOTCOIN (Base)</p>
              <p className="text-2xl font-bold font-mono text-white">{data.wallet.botcoin}</p>
            </div>
          </div>
        </div>

        {/* Mining Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl border-l-4 border-l-blue-500">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">⛏️ BOTCOIN Mining</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Credits Earned</span>
              <span className="font-bold text-blue-400">{data.mining.credits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Current Epoch</span>
              <span className="font-bold text-white">Epoch {data.mining.epoch}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{width: '9%'}}></div>
            </div>
            <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter italic">Hurdle: {data.mining.hurdle} required</p>
          </div>
        </div>

        {/* Trading Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl border-l-4 border-l-orange-500">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">📊 Polymarket Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total PnL</span>
              <span className={`${data.lastBet.pnl.startsWith('-') ? 'text-red-400' : 'text-green-400'} font-bold font-mono`}>{data.lastBet.pnl}</span>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Recent Activity</p>
              <p className="text-sm italic text-slate-300">"{data.lastBet.market} - Resulted in {data.lastBet.result}"</p>
            </div>
          </div>
        </div>

        {/* Intelligence Card */}
        <div className="md:col-span-3 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">🔎 Aegis Signal (TA Learning)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-blue-300"><b>Aegis Strategist:</b> "{data.aiSignal?.strategist || 'Analyzing market patterns...'}"</p>
            </div>
            <div className="space-y-2">
               <p className="text-sm text-green-300"><b>Aegis Data:</b> "{data.aiSignal?.dataWorker || 'Processing indicator math...'}"</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-600 text-[10px] tracking-widest uppercase">
        Last Sync: {data.lastUpdate} • System Powered by OpenClaw + Spark Intelligence
      </footer>
    </div>
  );
}
