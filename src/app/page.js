"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({
    wallet: { usdc: "26.22", eth: "0.001", botcoin: "2.29M" },
    status: "STANDBY",
    lastBet: { market: "BTC Up/Down", result: "Loss", pnl: "-$1.74" },
    mining: { credits: 2, epoch: 2, hurdle: "25M" }
  });

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">🛡️ Aegis Dashboard</h1>
          <p className="text-slate-400 mt-1">Digital Commander Intelligence System</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-sm tracking-widest text-green-500">LIVE CONNECTION</span>
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
              <div className="bg-blue-500 h-full rounded-full" style={{width: '9%'}}></div>
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
              <span className="text-red-400 font-bold font-mono">{data.lastBet.pnl}</span>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Recent Activity</p>
              <p className="text-sm italic text-slate-300">"{data.lastBet.market} 12:45 GMT - Resulted in {data.lastBet.result}"</p>
            </div>
          </div>
        </div>

        {/* Intelligence Card */}
        <div className="md:col-span-3 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">🔎 Aegis Signal (TA Learning)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-blue-300"><b>Aegis Strategist (Claude Opus):</b> "Wait for 25M BOTCOIN hurdle. Market structure neutral. BTC RSI at 52 shows indecision."</p>
            </div>
            <div className="space-y-2">
               <p className="text-sm text-green-300"><b>Aegis Data (GPT Codex):</b> "Calculation complete. Accuracy for last epoch: 100%. Ready for next challenge."</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-600 text-xs tracking-widest uppercase">
        System Status: {data.status} • Powered by OpenClaw + Spark Intelligence
      </footer>
    </div>
  );
}
