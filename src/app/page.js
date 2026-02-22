"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({
    wallet: { usdc: "...", eth: "...", botcoin: "..." },
    status: "INITIALIZING...",
    lastBet: { market: "...", result: "...", pnl: "..." },
    mining: { credits: 0, epoch: 0, hurdle: "..." },
    aiSignal: { strategist: "Syncing...", dataWorker: "Syncing..." },
    lastUpdate: "Never"
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Anti-cache trick: add a random timestamp to the URL
        const timestamp = new Date().getTime();
        const res = await fetch(`https://raw.githubusercontent.com/peaceofheaven777/aegis-dashboard/main/aegis-data.json?t=${timestamp}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Fetch failed", e);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto bg-[#020617] text-slate-100 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">🛡️ Aegis Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-semibold">Digital Commander Intelligence System</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">
          <span className={`h-2 w-2 rounded-full animate-pulse ${data.status.includes('CLOSED') ? 'bg-orange-500' : 'bg-green-500'}`}></span>
          <span className="font-mono text-xs tracking-widest text-slate-300 uppercase">{data.status}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
          </div>
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">🏦 Wallet Assets</h2>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">USDC (Polygon)</p>
              <p className="text-3xl font-bold font-mono text-white tracking-tight">${data.wallet.usdc}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">BOTCOIN (Base)</p>
              <p className="text-2xl font-bold font-mono text-blue-400 tracking-tight">{data.wallet.botcoin}</p>
            </div>
          </div>
        </div>

        {/* Mining Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl border-t-4 border-t-blue-500">
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">⛏️ BOTCOIN Mining</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-slate-400 uppercase font-bold">Credits Earned</span>
              <span className="text-2xl font-black text-blue-400 leading-none">{data.mining.credits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Session</span>
              <span className="text-sm font-bold text-white px-2 py-0.5 bg-slate-800 rounded">Epoch {data.mining.epoch}</span>
            </div>
            <div className="pt-4">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Balance Progress</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase">~9%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{width: '9%'}}></div>
              </div>
              <p className="text-[9px] text-slate-600 mt-2 text-center font-bold tracking-widest uppercase italic">Hurdle: {data.mining.hurdle} Required</p>
            </div>
          </div>
        </div>

        {/* Trading Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl border-t-4 border-t-orange-500">
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">📊 Polymarket Stats</h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-bold">Total PnL</span>
              <span className={`text-xl font-bold font-mono ${data.lastBet.pnl.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                {data.lastBet.pnl}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-600 uppercase font-black tracking-tighter mb-1">Recent Mission</p>
              <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                  "{data.lastBet.market} ➔ <span className={data.lastBet.result === 'WIN' ? 'text-green-400' : 'text-red-400'}>{data.lastBet.result}</span>"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Card */}
        <div className="md:col-span-3 bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">🔎 Aegis Intelligence Signal (TA)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <p className="text-[10px] text-blue-300 uppercase font-black">Strategist Analysis</p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">"{data.aiSignal?.strategist || 'Analyzing...'}"</p>
            </div>
            <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <p className="text-[10px] text-green-300 uppercase font-black">Technical Engine</p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">"{data.aiSignal?.dataWorker || 'Processing...'}"</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] tracking-[0.3em] font-bold uppercase">
        <p>System Online: {data.status}</p>
        <p className="text-blue-500/50 italic font-medium tracking-normal capitalize">Powered by OpenClaw • Spark Local AI</p>
        <p>Last Sync: {data.lastUpdate}</p>
      </footer>
    </div>
  );
}
