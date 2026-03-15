import { useState } from 'react';
import {
  Smartphone, Monitor, ArrowLeft, Bell, Store, BarChart3, MessageSquare,
  TrendingUp, TrendingDown, AlertTriangle, Package, DollarSign, Star,
  ChevronRight, ChevronDown, Check, X, RefreshCw, Zap, Shield, Wifi,
  WifiOff, Clock, MapPin, ShoppingCart, Megaphone, Send, Activity,
  ArrowUpRight, ArrowDownRight, Layers, Globe, Download, Sparkles,
  Menu, Home, Search, User, Settings,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

// ─── PHONE FRAME ─── //
function PhoneFrame({ children, label, scale = 1, className = '' }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className="relative rounded-[40px] border-[3px] border-[#38332B] bg-[#0D0C0A] overflow-hidden flex-shrink-0"
        style={{
          width: 280 * scale,
          height: 580 * scale,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,58,0.08)',
          transform: `scale(${scale > 1 ? 1 : 1})`,
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[90px] h-[26px] rounded-full bg-black" />
        {/* Status bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-[14px] pb-1 text-[9px] font-semibold text-[#F0EDE8]">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Wifi className="w-2.5 h-2.5" />
            <span>5G</span>
            <div className="w-5 h-2 rounded-sm border border-[#F0EDE8] relative">
              <div className="absolute inset-[1px] right-[3px] rounded-[1px] bg-[#00C27C]" />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="h-full overflow-y-auto pb-20 scrollbar-hide" style={{ fontSize: 10 * scale }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-[#F0EDE8]/30 z-30" />
      </div>
      {label && <p className="text-xs font-semibold text-[#ADA599] tracking-wide uppercase">{label}</p>}
    </div>
  );
}

// ─── BOTTOM NAV (inside phone) ─── //
function MobileBottomNav({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'stores', icon: Store, label: 'Stores' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-around px-2 pb-6 pt-2" style={{ background: 'linear-gradient(transparent, rgba(13,12,10,0.97) 30%)' }}>
      {tabs.map(t => {
        const Icon = t.icon;
        const isActive = t.id === active;
        return (
          <div key={t.id} className="flex flex-col items-center gap-0.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#D4A03A]/15' : ''}`}>
              <Icon className={`w-[14px] h-[14px] ${isActive ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
            </div>
            <span className={`text-[8px] font-semibold ${isActive ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── MINI SPARKLINE ─── //
function Sparkline({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 40, h = 14 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── SECTION WRAPPER ─── //
function Section({ id, label, title, children, dark = false }) {
  return (
    <section id={id} className={`py-20 px-6 ${dark ? 'bg-[#0D0C0A]' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#D4A03A] mb-2">{label}</p>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#F0EDE8] mb-10 leading-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}

// ─── FEATURE CARD ─── //
function FeatureCard({ icon: Icon, title, description, color = '#D4A03A' }) {
  return (
    <div className="rounded-2xl border border-[#38332B] bg-[#1C1B1A] p-5 hover:border-[rgba(212,160,58,0.2)] transition-all">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}14` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h4 className="text-sm font-bold text-[#F0EDE8] mb-1">{title}</h4>
      <p className="text-xs text-[#ADA599] leading-relaxed">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN MOCKUPS — realistic mobile UI inside phone frames
// ═══════════════════════════════════════════════════════════════════════════

function ScreenHome() {
  const stores = [
    { name: 'Logan Square', state: 'IL', score: 87, rev: '$48.2K', delta: '+12%', up: true, alerts: 0, spark: [5,6,7,6,8,9,9] },
    { name: 'Fort Lee', state: 'NJ', score: 79, rev: '$41.6K', delta: '+5%', up: true, alerts: 1, spark: [4,4,5,5,6,5,6] },
    { name: 'Springfield', state: 'IL', score: 74, rev: '$52.1K', delta: '+34%', up: true, alerts: 0, spark: [3,4,4,5,6,8,10] },
    { name: 'Boston', state: 'MA', score: 65, rev: '$29.8K', delta: '-3%', up: false, alerts: 1, spark: [6,5,5,4,5,4,4] },
    { name: 'Morenci', state: 'MI', score: 48, rev: '$12.4K', delta: '-23%', up: false, alerts: 3, spark: [7,6,5,4,3,3,2] },
  ];
  return (
    <div className="px-3 pt-1">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <NexusIcon size={14} />
          <span className="text-[11px] font-bold text-[#F0EDE8]">Nexus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-3.5 h-3.5 text-[#ADA599]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E87068] border border-[#0D0C0A]" />
          </div>
          <div className="w-5 h-5 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
            <User className="w-2.5 h-2.5 text-[#D4A03A]" />
          </div>
        </div>
      </div>

      {/* AI Briefing Card */}
      <div className="rounded-xl p-3 mb-3" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.08), rgba(212,160,58,0.02))', border: '1px solid rgba(212,160,58,0.15)' }}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-2.5 h-2.5 text-[#D4A03A]" />
          <span className="text-[8px] font-bold text-[#D4A03A] uppercase tracking-wider">Morning Briefing</span>
        </div>
        <p className="text-[9px] text-[#C8C3BA] leading-[1.6] italic">
          "Best Friday this quarter. Springfield drove 34% of revenue. 3 items need reordering."
        </p>
        <div className="flex gap-3 mt-2">
          {[
            { l: 'Revenue', v: '$47.2K', t: '+12%', up: true },
            { l: 'Traffic', v: '2,140', t: '+8%', up: true },
            { l: 'Alerts', v: '5', t: '2 critical', up: false },
          ].map(m => (
            <div key={m.l}>
              <p className="text-[7px] uppercase tracking-wider text-[#6B6359] font-semibold">{m.l}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] font-extrabold text-[#F0EDE8]">{m.v}</span>
                <span className={`text-[7px] font-semibold ${m.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{m.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-[#ADA599] uppercase tracking-wider">Portfolio Health</span>
        <span className="text-[8px] text-[#6B6359]">5 stores</span>
      </div>
      <div className="flex gap-1.5 mb-3">
        <div className="flex-1 rounded-lg bg-[#00C27C]/10 border border-[#00C27C]/20 p-1.5 text-center">
          <p className="text-[11px] font-extrabold text-[#00C27C]">3</p>
          <p className="text-[7px] text-[#00C27C]/70">Healthy</p>
        </div>
        <div className="flex-1 rounded-lg bg-[#D4A03A]/10 border border-[#D4A03A]/20 p-1.5 text-center">
          <p className="text-[11px] font-extrabold text-[#D4A03A]">1</p>
          <p className="text-[7px] text-[#D4A03A]/70">Watch</p>
        </div>
        <div className="flex-1 rounded-lg bg-[#E87068]/10 border border-[#E87068]/20 p-1.5 text-center">
          <p className="text-[11px] font-extrabold text-[#E87068]">1</p>
          <p className="text-[7px] text-[#E87068]/70">Critical</p>
        </div>
      </div>

      {/* Store List */}
      <div className="space-y-1.5">
        {stores.map(s => {
          const color = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          return (
            <div key={s.name} className="rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5 flex items-center gap-2">
              {/* Score donut */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `conic-gradient(${color} ${s.score * 3.6}deg, #38332B 0deg)` }}>
                <div className="w-5.5 h-5.5 rounded-full bg-[#1C1B1A] flex items-center justify-center text-[8px] font-bold" style={{ color, width: 22, height: 22 }}>{s.score}</div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-[#F0EDE8] truncate">{s.name}</span>
                  <span className="text-[8px] text-[#6B6359]">{s.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-[#F0EDE8]">{s.rev}</span>
                  <span className={`text-[8px] font-semibold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</span>
                  <Sparkline data={s.spark} color={s.up ? '#00C27C' : '#E87068'} w={30} h={10} />
                </div>
              </div>
              {/* Alert badge */}
              {s.alerts > 0 && (
                <div className="w-4 h-4 rounded-full bg-[#E87068] flex items-center justify-center flex-shrink-0">
                  <span className="text-[7px] font-bold text-white">{s.alerts}</span>
                </div>
              )}
              <ChevronRight className="w-3 h-3 text-[#6B6359] flex-shrink-0" />
            </div>
          );
        })}
      </div>
      <MobileBottomNav active="home" />
    </div>
  );
}

function ScreenAlerts() {
  const alerts = [
    { sev: 'CRITICAL', color: '#E87068', time: '2m', title: 'Blue Dream 3.5g out at 4 stores', ai: 'Reorder 200 units for $2,840. Est. 2 days.', actions: ['Approve', 'Modify'] },
    { sev: 'WARNING', color: '#D4A03A', time: '15m', title: 'Stiiizy Pod 18% above market avg', ai: 'Suggest $44.99 (currently $52).', actions: ['Apply', 'View'] },
    { sev: 'OPPORTUNITY', color: '#00C27C', time: '1h', title: 'Jeeter sentiment spike +34%', ai: '2 stores don\'t stock it. Trending.', actions: ['Draft PO'] },
    { sev: 'INSIGHT', color: '#64A8E0', time: '3h', title: '62% of Tue sales after 4pm', ai: 'Shift staff to match peak window.', actions: ['View'] },
  ];
  return (
    <div className="px-3 pt-1">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[12px] font-bold text-[#F0EDE8]">Smart Alerts</span>
          <span className="text-[8px] text-[#E87068] ml-1.5 bg-[#E87068]/10 px-1.5 py-0.5 rounded-full font-semibold">4 active</span>
        </div>
        <span className="text-[8px] text-[#6B6359]">Swipe to act</span>
      </div>
      {/* Swipe hint */}
      <div className="flex items-center gap-1.5 mb-2 px-2 py-1.5 rounded-lg bg-[#D4A03A]/5 border border-[#D4A03A]/10">
        <ArrowLeft className="w-2.5 h-2.5 text-[#D4A03A] animate-pulse" />
        <span className="text-[8px] text-[#D4A03A]">Swipe left for quick actions</span>
      </div>
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div key={i} className="rounded-xl border border-[#38332B] bg-[#1C1B1A] overflow-hidden" style={i === 0 ? { borderLeftWidth: 3, borderLeftColor: a.color } : {}}>
            <div className="p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}>{a.sev}</span>
                <span className="text-[7px] text-[#6B6359]">{a.time} ago</span>
              </div>
              <p className="text-[10px] font-semibold text-[#F0EDE8] mb-1">{a.title}</p>
              <div className="rounded-lg px-2 py-1.5 mb-2" style={{ background: `${a.color}08`, border: `1px solid ${a.color}15` }}>
                <p className="text-[8px] text-[#C8C3BA] italic">AI: "{a.ai}"</p>
              </div>
              <div className="flex gap-1.5">
                {a.actions.map((act, j) => (
                  <button key={j} className={`px-2.5 py-1 rounded-md text-[8px] font-semibold ${j === 0 ? 'text-white' : 'text-[#ADA599] border border-[#38332B]'}`} style={j === 0 ? { background: a.color } : undefined}>{act}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Auto-resolved */}
      <div className="mt-3 rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5">
        <p className="text-[7px] font-bold text-[#6B6359] uppercase tracking-wider mb-1.5">Auto-Resolved Today</p>
        {['Register sync issue fixed', 'March campaign launched', 'Stiiizy Pods reordered'].map((r, i) => (
          <div key={i} className="flex items-center gap-1 text-[8px] text-[#ADA599] mb-0.5">
            <Check className="w-2.5 h-2.5 text-[#00C27C]" /> {r}
          </div>
        ))}
      </div>
      <MobileBottomNav active="alerts" />
    </div>
  );
}

function ScreenStoreDetail() {
  return (
    <div className="px-3 pt-1">
      {/* Store header */}
      <div className="flex items-center gap-2 mb-3">
        <ArrowLeft className="w-3.5 h-3.5 text-[#ADA599]" />
        <div className="flex-1">
          <span className="text-[12px] font-bold text-[#F0EDE8]">Logan Square</span>
          <span className="text-[9px] text-[#6B6359] ml-1">Chicago, IL</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#00C27C 313deg, #38332B 0deg)' }}>
          <div className="w-6 h-6 rounded-full bg-[#0D0C0A] flex items-center justify-center text-[9px] font-bold text-[#00C27C]">87</div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          { l: 'Today Revenue', v: '$48,230', d: '+12%', up: true, spark: [4,5,5,6,7,8,9] },
          { l: 'Transactions', v: '312', d: '+8%', up: true, spark: [3,4,4,5,5,6,6] },
          { l: 'Avg Basket', v: '$154.58', d: '+3%', up: true, spark: [5,5,5,5,6,6,6] },
          { l: 'Margin', v: '52.1%', d: '+0.4%', up: true, spark: [5,5,5,5,5,5,5] },
        ].map(k => (
          <div key={k.l} className="rounded-lg border border-[#38332B] bg-[#1C1B1A] p-2">
            <p className="text-[7px] text-[#6B6359] uppercase tracking-wider font-semibold mb-0.5">{k.l}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-[12px] font-extrabold text-[#F0EDE8]">{k.v}</span>
                <span className={`text-[7px] font-semibold ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
              </div>
              <Sparkline data={k.spark} color={k.up ? '#00C27C' : '#E87068'} w={28} h={10} />
            </div>
          </div>
        ))}
      </div>

      {/* Hourly traffic */}
      <div className="rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5 mb-3">
        <p className="text-[8px] font-semibold text-[#ADA599] uppercase tracking-wider mb-2">Transactions / Hour</p>
        <div className="flex items-end gap-[3px] h-[40px]">
          {[2,5,12,18,24,31,28,35,42,38,29,22,15,8].map((v, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${(v / 42) * 100}%`, background: i === 8 ? '#D4A03A' : v > 30 ? '#00C27C' : '#38332B' }} />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[6px] text-[#6B6359]">
          <span>8am</span><span>12pm</span><span>4pm</span><span>9pm</span>
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5 mb-3">
        <p className="text-[8px] font-semibold text-[#ADA599] uppercase tracking-wider mb-2">Top 5 Products Today</p>
        {[
          { name: 'Ozone Cake Mints 3.5g', units: 47, rev: '$2,115' },
          { name: 'Baby Jeeter Churros', units: 38, rev: '$1,330' },
          { name: 'Stiiizy OG Kush Pod', units: 31, rev: '$1,395' },
          { name: 'Camino Gummies', units: 28, rev: '$616' },
          { name: 'Simply Herb Pre-Roll', units: 24, rev: '$360' },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between py-1 border-b border-[#38332B]/50 last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-bold text-[#6B6359] w-3">{i + 1}</span>
              <span className="text-[9px] text-[#F0EDE8]">{p.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-bold text-[#F0EDE8]">{p.rev}</span>
              <span className="text-[7px] text-[#6B6359] ml-1">{p.units}u</span>
            </div>
          </div>
        ))}
      </div>

      {/* Store alerts */}
      <div className="rounded-xl border border-[#E87068]/20 bg-[#E87068]/5 p-2.5">
        <p className="text-[8px] font-semibold text-[#E87068] uppercase tracking-wider mb-1.5">Active Alerts</p>
        <div className="text-[9px] text-[#F0EDE8]">No active alerts for this store</div>
        <div className="flex items-center gap-1 mt-1">
          <Check className="w-2.5 h-2.5 text-[#00C27C]" />
          <span className="text-[8px] text-[#00C27C]">All clear</span>
        </div>
      </div>
      <MobileBottomNav active="stores" />
    </div>
  );
}

function ScreenChat() {
  return (
    <div className="px-3 pt-1 flex flex-col" style={{ height: 500 }}>
      <div className="flex items-center gap-2 mb-3">
        <NexusIcon size={16} />
        <div>
          <span className="text-[11px] font-bold text-[#F0EDE8]">Nexus AI</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C27C]" />
            <span className="text-[7px] text-[#00C27C]">Online</span>
          </div>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-1 mb-3">
        {['Reorder inventory', 'Weekly summary', 'Price check'].map(s => (
          <span key={s} className="px-2 py-1 rounded-full text-[8px] font-medium text-[#D4A03A] border border-[#D4A03A]/20 bg-[#D4A03A]/5">{s}</span>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {/* User */}
        <div className="flex justify-end">
          <div className="rounded-xl rounded-tr-sm bg-[#D4A03A]/15 border border-[#D4A03A]/20 px-2.5 py-1.5 max-w-[85%]">
            <p className="text-[9px] text-[#F0EDE8]">Show me stockout risks across all stores</p>
          </div>
        </div>
        {/* AI */}
        <div className="flex justify-start gap-1.5">
          <NexusIcon size={12} className="flex-shrink-0 mt-1" />
          <div className="rounded-xl rounded-tl-sm bg-[#1C1B1A] border border-[#38332B] px-2.5 py-1.5 max-w-[85%]">
            <p className="text-[9px] text-[#C8C3BA] leading-[1.5] mb-1.5">I found <span className="font-bold text-[#F0EDE8]">3 products</span> at stockout risk across your stores:</p>
            {[
              { name: 'Blue Dream 3.5g', store: '4 stores', days: '0.5d', color: '#E87068' },
              { name: 'Ozone Gummies 100mg', store: 'Fort Lee', days: '1.5d', color: '#D4A03A' },
              { name: 'Tunnel Vision 5pk', store: 'Boston', days: '2d', color: '#D4A03A' },
            ].map(p => (
              <div key={p.name} className="flex items-center justify-between py-1 border-b border-[#38332B]/50 last:border-0">
                <div>
                  <p className="text-[8px] font-semibold text-[#F0EDE8]">{p.name}</p>
                  <p className="text-[7px] text-[#6B6359]">{p.store}</p>
                </div>
                <span className="text-[8px] font-bold" style={{ color: p.color }}>{p.days}</span>
              </div>
            ))}
            <button className="mt-1.5 w-full py-1.5 rounded-lg bg-[#00C27C] text-[8px] font-semibold text-white">Approve All Reorders — $4,210</button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-2 flex items-center gap-2 bg-[#1C1B1A] border border-[#38332B] rounded-xl px-2.5 py-2">
        <NexusIcon size={10} />
        <span className="text-[9px] text-[#6B6359] flex-1">Ask Nexus anything...</span>
        <Mic className="w-3 h-3 text-[#6B6359]" />
        <Send className="w-3 h-3 text-[#D4A03A]" />
      </div>
      <MobileBottomNav active="chat" />
    </div>
  );
}

function ScreenInventory() {
  const items = [
    { name: 'Blue Dream 3.5g', store: '4 stores', hours: 12, qty: 200, cost: '$2,840', sev: 'critical' },
    { name: 'Ozone Gummies 100mg', store: 'Fort Lee', hours: 36, qty: 50, cost: '$675', sev: 'warning' },
    { name: 'Tunnel Vision 5-Pack', store: 'Boston', hours: 48, qty: 30, cost: '$420', sev: 'warning' },
    { name: 'Stiiizy Pod LLR 1g', store: 'Hoboken', hours: 72, qty: 25, cost: '$1,125', sev: 'low' },
    { name: 'Simply Herb Pre-Roll', store: '2 stores', hours: 96, qty: 100, cost: '$550', sev: 'low' },
  ];
  return (
    <div className="px-3 pt-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-[#F0EDE8]">Low Stock</span>
        <button className="px-2.5 py-1 rounded-lg bg-[#00C27C] text-[8px] font-semibold text-white">Approve All</button>
      </div>
      {/* Filter chips */}
      <div className="flex gap-1 mb-2.5">
        {['All (5)', 'Critical (1)', 'Warning (2)', 'Low (2)'].map((c, i) => (
          <span key={c} className={`px-2 py-0.5 rounded-full text-[7px] font-semibold ${i === 0 ? 'bg-[#D4A03A]/15 text-[#D4A03A] border border-[#D4A03A]/30' : 'text-[#6B6359] border border-[#38332B]'}`}>{c}</span>
        ))}
      </div>
      <div className="space-y-1.5">
        {items.map(it => {
          const color = it.sev === 'critical' ? '#E87068' : it.sev === 'warning' ? '#D4A03A' : '#64A8E0';
          return (
            <div key={it.name} className="rounded-xl border bg-[#1C1B1A] p-2.5" style={{ borderColor: it.sev === 'critical' ? `${color}40` : '#38332B', borderLeftWidth: 3, borderLeftColor: color }}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[10px] font-semibold text-[#F0EDE8]">{it.name}</p>
                  <p className="text-[8px] text-[#6B6359]">{it.store}</p>
                </div>
                <span className="text-[8px] font-bold" style={{ color }}>{it.hours}h left</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-[8px] text-[#ADA599]">
                  <span>{it.qty} units</span>
                  <span>{it.cost}</span>
                </div>
                <div className="flex gap-1">
                  <button className="px-2 py-0.5 rounded text-[7px] font-semibold text-white" style={{ background: color }}>Reorder</button>
                  <button className="px-2 py-0.5 rounded text-[7px] font-semibold text-[#6B6359] border border-[#38332B]">Edit</button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-1.5 h-1 rounded-full bg-[#38332B] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.max(5, (1 - it.hours / 120) * 100)}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
      <MobileBottomNav active="alerts" />
    </div>
  );
}

function ScreenReports() {
  return (
    <div className="px-3 pt-1">
      <span className="text-[12px] font-bold text-[#F0EDE8]">Reports</span>
      <p className="text-[8px] text-[#6B6359] mb-3">Last 30 Days · All Stores</p>

      {/* Revenue chart area */}
      <div className="rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] font-semibold text-[#ADA599] uppercase tracking-wider">Revenue Trend</span>
          <div className="flex gap-0.5">
            {['7D', '30D', 'QTR'].map((r, i) => (
              <span key={r} className={`px-1.5 py-0.5 rounded text-[7px] font-medium ${i === 1 ? 'bg-[#D4A03A]/15 text-[#D4A03A]' : 'text-[#6B6359]'}`}>{r}</span>
            ))}
          </div>
        </div>
        {/* Mini area chart */}
        <svg width="100%" height="60" viewBox="0 0 240 60" preserveAspectRatio="none" className="mb-1">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C27C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00C27C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,45 L20,40 L40,42 L60,35 L80,30 L100,32 L120,25 L140,20 L160,22 L180,15 L200,12 L220,10 L240,8 L240,60 L0,60Z" fill="url(#areaGrad)" />
          <polyline points="0,45 20,40 40,42 60,35 80,30 100,32 120,25 140,20 160,22 180,15 200,12 220,10 240,8" fill="none" stroke="#00C27C" strokeWidth="1.5" />
        </svg>
        <div className="flex justify-between text-[7px] text-[#6B6359]">
          <span>Mar 1</span><span>Mar 8</span><span>Mar 15</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          { l: 'Total Revenue', v: '$1.42M', d: '+8.2%', up: true, icon: DollarSign, color: '#00C27C' },
          { l: 'Transactions', v: '9,847', d: '+5.1%', up: true, icon: ShoppingCart, color: '#64A8E0' },
          { l: 'Avg Basket', v: '$144.22', d: '+2.9%', up: true, icon: Package, color: '#B598E8' },
          { l: 'Gross Margin', v: '50.8%', d: '-0.3%', up: false, icon: TrendingUp, color: '#D4A03A' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.l} className="rounded-lg border border-[#38332B] bg-[#1C1B1A] p-2">
              <div className="flex items-center gap-1 mb-1">
                <Icon className="w-2.5 h-2.5" style={{ color: k.color }} />
                <span className="text-[7px] text-[#6B6359] uppercase font-semibold">{k.l}</span>
              </div>
              <span className="text-[12px] font-extrabold text-[#F0EDE8]">{k.v}</span>
              <span className={`text-[7px] font-semibold ml-1 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
            </div>
          );
        })}
      </div>

      {/* Category breakdown */}
      <div className="rounded-xl border border-[#38332B] bg-[#1C1B1A] p-2.5 mb-3">
        <p className="text-[8px] font-semibold text-[#ADA599] uppercase tracking-wider mb-2">Revenue by Category</p>
        {[
          { name: 'Flower', pct: 38, color: '#00C27C' },
          { name: 'Vapes', pct: 28, color: '#64A8E0' },
          { name: 'Edibles', pct: 18, color: '#B598E8' },
          { name: 'Pre-Rolls', pct: 11, color: '#D4A03A' },
          { name: 'Other', pct: 5, color: '#6B6359' },
        ].map(c => (
          <div key={c.name} className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <span className="text-[8px] text-[#ADA599] w-12">{c.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#38332B] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
            </div>
            <span className="text-[8px] font-bold text-[#F0EDE8] w-6 text-right">{c.pct}%</span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 rounded-xl border border-[#38332B] bg-[#1C1B1A] text-[9px] text-[#ADA599] font-medium flex items-center justify-center gap-1">
        <Monitor className="w-3 h-3" /> Open Full Dashboard
      </button>
      <MobileBottomNav active="reports" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DESIGN REVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function MobileDesignReview() {
  const [activeScreen, setActiveScreen] = useState(null);

  return (
    <div className="min-h-screen bg-[#141210] text-[#F0EDE8] overflow-x-hidden">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D0C0A 0%, #141210 100%)' }}>
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D4A03A 0%, transparent 70%)' }} />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #00C27C 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
          {/* Back link */}
          <a href="#/" className="inline-flex items-center gap-1.5 text-sm text-[#ADA599] hover:text-[#D4A03A] transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Nexus v3
          </a>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4A03A]/20 bg-[#D4A03A]/5 mb-6">
                <Smartphone className="w-3.5 h-3.5 text-[#D4A03A]" />
                <span className="text-xs font-semibold text-[#D4A03A]">Design Review — Mobile PWA</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
                <span className="text-[#F0EDE8]">Nexus </span>
                <span style={{ background: 'linear-gradient(135deg, #D4A03A, #E8C068)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mobile</span>
              </h1>
              <p className="text-lg text-[#ADA599] leading-relaxed mb-8 max-w-md">
                A companion decision surface for dispensary operators. Not a shrunken desktop — a purpose-built mobile experience for 8-second attention budgets.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, label: 'PWA — No App Store', desc: 'Bypass cannabis restrictions' },
                  { icon: WifiOff, label: 'Offline-First', desc: 'Works in back rooms' },
                  { icon: Bell, label: 'Push Notifications', desc: 'Tiered alert system' },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#38332B] bg-[#1C1B1A]">
                    <b.icon className="w-4 h-4 text-[#D4A03A]" />
                    <div>
                      <p className="text-xs font-semibold text-[#F0EDE8]">{b.label}</p>
                      <p className="text-[10px] text-[#6B6359]">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero phone */}
            <div className="flex justify-center">
              <div style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}>
                <PhoneFrame>
                  <ScreenHome />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PHILOSOPHY ── */}
      <Section id="philosophy" label="Philosophy" title="Desktop analyzes. Mobile decides.">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#38332B] bg-[#1C1B1A] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-[#64A8E0]" />
              <span className="text-sm font-bold text-[#F0EDE8]">Desktop (Nexus v3)</span>
            </div>
            <ul className="space-y-2">
              {[
                'Deep analysis sessions — 10+ minutes',
                'Full charts, tables, multi-tab exploration',
                'Configure campaigns, pricing, surveys',
                'All 39 stores side by side',
                'Omnichannel sentiment pipeline',
              ].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-[#ADA599]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#64A8E0] mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#D4A03A]/20 p-6" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.06), rgba(212,160,58,0.02))' }}>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-[#D4A03A]" />
              <span className="text-sm font-bold text-[#F0EDE8]">Mobile (Nexus Mobile)</span>
            </div>
            <ul className="space-y-2">
              {[
                'Glance-and-go — 8 seconds max',
                'Sparklines + summary numbers only',
                'One-tap: approve reorder, apply price, dismiss alert',
                'Worst-first store ranking',
                'Push notifications for what needs attention',
              ].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-[#ADA599]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── SCREEN GALLERY ── */}
      <Section id="screens" label="Screen Gallery" title="Every screen, pixel-perfect." dark>
        <p className="text-sm text-[#ADA599] mb-10 max-w-2xl">Six core screens cover 95% of mobile use cases. Each follows progressive disclosure — summary first, detail on tap.</p>
        <div className="flex gap-8 overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="Home / Portfolio"><ScreenHome /></PhoneFrame></div>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="Smart Alerts"><ScreenAlerts /></PhoneFrame></div>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="Store Detail"><ScreenStoreDetail /></PhoneFrame></div>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="AI Chat"><ScreenChat /></PhoneFrame></div>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="Low Stock / Reorder"><ScreenInventory /></PhoneFrame></div>
          <div className="snap-center flex-shrink-0"><PhoneFrame label="Reports Summary"><ScreenReports /></PhoneFrame></div>
        </div>
        <p className="text-center text-xs text-[#6B6359] mt-4">← Scroll horizontally to see all screens →</p>
      </Section>

      {/* ── NAVIGATION ── */}
      <Section id="navigation" label="Navigation" title="Bottom tab bar. Always visible.">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-[#ADA599] leading-relaxed mb-6">
              Bottom navigation gets <span className="text-[#F0EDE8] font-semibold">65% higher engagement</span> and <span className="text-[#F0EDE8] font-semibold">40% faster task completion</span> vs hamburger menus. Five tabs cover every primary action.
            </p>
            <div className="space-y-3">
              {[
                { icon: Home, label: 'Home', desc: 'Portfolio health overview, AI briefing, store list sorted worst-first' },
                { icon: Bell, label: 'Alerts', desc: 'Smart alerts with swipe-to-act. Critical → Warning → Opportunity → Insight.' },
                { icon: Store, label: 'Stores', desc: 'Store picker + drill-down: KPIs, hourly traffic, top products, local alerts' },
                { icon: MessageSquare, label: 'Chat', desc: 'Nexus AI with voice input. Context-aware prompts. Inline reorder approval.' },
                { icon: BarChart3, label: 'Reports', desc: 'Sparkline summaries. Tap any KPI to expand. "Open Full Dashboard" escape hatch.' },
              ].map(t => (
                <div key={t.label} className="flex items-start gap-3 rounded-xl border border-[#38332B] bg-[#1C1B1A] p-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#D4A03A]/10 flex-shrink-0">
                    <t.icon className="w-4 h-4 text-[#D4A03A]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#F0EDE8]">{t.label}</span>
                    <p className="text-xs text-[#ADA599] mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <PhoneFrame label="Bottom Tab Bar">
              <ScreenHome />
            </PhoneFrame>
          </div>
        </div>
      </Section>

      {/* ── INTERACTIONS ── */}
      <Section id="interactions" label="Interaction Patterns" title="Gesture-driven. Zero friction." dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: ArrowLeft, title: 'Swipe Left → Act', desc: 'Reveal contextual actions on alerts and inventory items. Approve, dismiss, escalate — without opening a detail view.', color: '#D4A03A' },
            { icon: RefreshCw, title: 'Pull to Refresh', desc: 'Pull down on any list to refresh data from server. Shows "Last updated" timestamp on completion.', color: '#00C27C' },
            { icon: ArrowUpRight, title: 'Tap Card → Drill Down', desc: 'Every store card expands to a full store detail view. Progressive disclosure: summary → detail → SKU.', color: '#64A8E0' },
            { icon: Sparkles, title: 'AI Inline Actions', desc: 'Nexus Chat returns actionable cards with one-tap buttons: "Approve Reorder $2,840" directly in the conversation.', color: '#B598E8' },
            { icon: Clock, title: 'Undo Toast (5s)', desc: 'Every action shows a 5-second undo toast. No confirmation dialogs for routine operations — speed over safety theater.', color: '#E87068' },
            { icon: MapPin, title: 'Geofenced Arrival', desc: 'Auto-switch to store context when you arrive. Morning briefing for that store appears as a push notification.', color: '#00C27C' },
          ].map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </Section>

      {/* ── PROGRESSIVE DISCLOSURE ── */}
      <Section id="disclosure" label="Information Architecture" title="Three layers. Never overwhelming.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Portfolio View', desc: 'Chain-level KPIs. Store health list sorted worst-first. 3 status buckets: healthy, watch, critical. This is Layer 1 — the "is everything okay?" glance.', color: '#00C27C', items: ['AI briefing card', 'Revenue + Traffic + Alerts', 'Store list with health scores', 'Colored status indicators'] },
            { num: '02', title: 'Store Detail', desc: 'Single-store deep dive. Today\'s numbers, hourly traffic chart, top products, active alerts. This is Layer 2 — the "what happened here?" view.', color: '#D4A03A', items: ['4 KPIs with sparklines', 'Hourly transaction bars', 'Top 5 products today', 'Store-specific alerts'] },
            { num: '03', title: 'SKU / Action', desc: 'Product-level detail, reorder forms, price adjustments. This is Layer 3 — the "let me fix this" action. Accessible via alert tap, product tap, or AI chat.', color: '#64A8E0', items: ['Stock levels per location', 'Reorder form (qty, vendor)', 'Price comparison vs market', 'Compliance & test results'] },
          ].map(layer => (
            <div key={layer.num} className="rounded-2xl border border-[#38332B] bg-[#1C1B1A] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-extrabold" style={{ color: layer.color }}>{layer.num}</span>
                <div className="flex-1 h-px" style={{ background: layer.color, opacity: 0.2 }} />
              </div>
              <h3 className="text-lg font-bold text-[#F0EDE8] mb-2">{layer.title}</h3>
              <p className="text-sm text-[#ADA599] leading-relaxed mb-4">{layer.desc}</p>
              <div className="space-y-1.5">
                {layer.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#ADA599]">
                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: layer.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <Section id="features" label="Core Features" title="Built for the floor, not the desk." dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Bell, title: 'Tiered Push Notifications', desc: 'Immediate for stockouts & POS down. Hourly digest for low-stock. Morning summary from AI.', color: '#E87068' },
            { icon: ShoppingCart, title: 'One-Tap Reorder', desc: 'AI suggests qty and vendor. Single tap to approve. Undo within 5 seconds.', color: '#00C27C' },
            { icon: Store, title: 'Store Switcher', desc: 'Persistent top-bar icon. Recent stores first. Context persists across all tabs.', color: '#64A8E0' },
            { icon: Activity, title: 'Sparkline KPIs', desc: 'Every metric shows a 7-day trend inline. Direction at a glance without opening a chart.', color: '#D4A03A' },
            { icon: MessageSquare, title: 'Voice-to-Text Chat', desc: 'Ask Nexus AI anything hands-free. Mic input with context-aware suggestions.', color: '#B598E8' },
            { icon: Shield, title: 'Role-Aware Defaults', desc: 'HQ sees chain-wide. Store managers see their store only. No configuration needed.', color: '#D4A03A' },
            { icon: Globe, title: 'PWA Install', desc: 'Add to home screen from browser. Full-screen, no browser chrome. Instant updates.', color: '#00C27C' },
            { icon: WifiOff, title: 'Offline Caching', desc: 'Last-known data with timestamp. Queue actions offline, sync when connected.', color: '#6B6359' },
          ].map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </Section>

      {/* ── DESIGN TOKENS ── */}
      <Section id="tokens" label="Design System" title="Warm dark palette. Consistent everywhere.">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Colors */}
          <div>
            <h3 className="text-sm font-bold text-[#F0EDE8] mb-4">Color Tokens</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Background', hex: '#0D0C0A', text: '#F0EDE8' },
                { name: 'Surface', hex: '#1C1B1A', text: '#F0EDE8' },
                { name: 'Border', hex: '#38332B', text: '#F0EDE8' },
                { name: 'Text Primary', hex: '#F0EDE8', text: '#141210' },
                { name: 'Text Secondary', hex: '#ADA599', text: '#141210' },
                { name: 'Text Muted', hex: '#6B6359', text: '#F0EDE8' },
                { name: 'Gold Accent', hex: '#D4A03A', text: '#141210' },
                { name: 'Green / Success', hex: '#00C27C', text: '#141210' },
                { name: 'Red / Alert', hex: '#E87068', text: '#141210' },
                { name: 'Blue / Info', hex: '#64A8E0', text: '#141210' },
                { name: 'Purple', hex: '#B598E8', text: '#141210' },
                { name: 'Orange / Warning', hex: '#FFA657', text: '#141210' },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-2 rounded-lg border border-[#38332B] p-2">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: c.hex, border: '1px solid rgba(255,255,255,0.06)' }} />
                  <div>
                    <p className="text-xs font-semibold text-[#F0EDE8]">{c.name}</p>
                    <p className="text-[10px] text-[#6B6359] font-mono">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography & spacing */}
          <div>
            <h3 className="text-sm font-bold text-[#F0EDE8] mb-4">Typography Scale</h3>
            <div className="space-y-3 mb-8">
              {[
                { size: '24px', weight: '800', label: 'Hero Number', sample: '$47,230' },
                { size: '16px', weight: '700', label: 'Section Title', sample: 'Smart Alerts' },
                { size: '13px', weight: '600', label: 'Card Title', sample: 'Logan Square, IL' },
                { size: '11px', weight: '500', label: 'Body', sample: 'Revenue vs market benchmarks' },
                { size: '9px', weight: '600', label: 'Label / Caption', sample: 'TRANSACTIONS' },
                { size: '8px', weight: '500', label: 'Micro', sample: '+12% vs yesterday' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-4 border-b border-[#38332B]/50 pb-2">
                  <div className="w-16">
                    <p className="text-[10px] text-[#6B6359] font-mono">{t.size}</p>
                    <p className="text-[10px] text-[#6B6359]">w{t.weight}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#ADA599] mb-0.5">{t.label}</p>
                    <p style={{ fontSize: t.size, fontWeight: t.weight }} className="text-[#F0EDE8]">{t.sample}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-[#F0EDE8] mb-4">Key Principles</h3>
            <div className="space-y-2">
              {[
                '44px minimum touch target (Apple HIG)',
                'Bottom 40% = primary actions (thumb zone)',
                '8px grid for all spacing',
                'No font size below 8px on mobile',
                'Tabular numerals for all data',
                'WCAG AA contrast on all text',
              ].map(p => (
                <div key={p} className="flex items-center gap-2 text-sm text-[#ADA599]">
                  <Check className="w-3.5 h-3.5 text-[#00C27C] flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── PWA ARCHITECTURE ── */}
      <Section id="pwa" label="Technical Architecture" title="Progressive Web App. No app store." dark>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Globe, title: 'No App Store Required', desc: 'Cannabis apps face Apple/Google restrictions. A PWA installs directly from the browser — one tap to home screen.', color: '#00C27C' },
            { icon: WifiOff, title: 'Service Worker Caching', desc: 'Cache the app shell + last fetched data. Managers see yesterday\'s numbers even in a back room with no signal.', color: '#64A8E0' },
            { icon: Bell, title: 'Web Push Notifications', desc: 'Supported on iOS 17+ and Android. Tiered alerts: immediate for critical, hourly digest for low-priority.', color: '#E87068' },
            { icon: Download, title: 'Install Prompt', desc: 'Full-screen experience with no browser chrome. Indistinguishable from native. Auto-updates on every visit.', color: '#D4A03A' },
            { icon: Zap, title: 'Background Sync', desc: 'Queue actions taken offline (approve reorder, dismiss alert). Execute automatically when connectivity resumes.', color: '#B598E8' },
            { icon: Layers, title: 'One Codebase', desc: 'React + Vite + Tailwind. Same stack as Nexus v3. ~60% lower cost than native iOS + Android.', color: '#ADA599' },
          ].map(f => <FeatureCard key={f.title} {...f} />)}
        </div>

        {/* Tech stack */}
        <div className="rounded-2xl border border-[#38332B] bg-[#1C1B1A] p-6">
          <h3 className="text-sm font-bold text-[#F0EDE8] mb-4">Proposed Stack</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { layer: 'Framework', tech: 'React 18 + Vite', note: 'Same as v3 desktop' },
              { layer: 'Styling', tech: 'Tailwind CSS', note: 'Shared design tokens' },
              { layer: 'State', tech: 'React Context + SWR', note: 'Cache + revalidate' },
              { layer: 'PWA', tech: 'Workbox', note: 'Service worker toolkit' },
              { layer: 'Routing', tech: 'React Router', note: 'Hash-based for GH Pages' },
              { layer: 'Charts', tech: 'SVG Sparklines', note: 'No Recharts on mobile' },
              { layer: 'Notifications', tech: 'Web Push API', note: 'VAPID keys' },
              { layer: 'Deploy', tech: 'GitHub Pages', note: 'Same pipeline as v3' },
            ].map(s => (
              <div key={s.layer} className="rounded-lg border border-[#38332B] bg-[#141210] p-3">
                <p className="text-[10px] font-bold text-[#6B6359] uppercase tracking-wider mb-1">{s.layer}</p>
                <p className="text-sm font-semibold text-[#F0EDE8]">{s.tech}</p>
                <p className="text-xs text-[#ADA599]">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PERSONAS ── */}
      <Section id="personas" label="Target Users" title="Two personas. One app.">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              role: 'Floor Manager',
              context: 'On the store floor, 10-second glances between customers',
              needs: ['What alerts need my attention right now?', 'Are we running low on anything?', 'How are we tracking vs yesterday?'],
              color: '#00C27C',
              freq: '20-30x/day, 8-15 seconds each',
            },
            {
              role: 'MSO Owner / Regional Director',
              context: 'In transit or at home, checking in episodically',
              needs: ['Which stores need attention?', 'What\'s my portfolio health at a glance?', 'Any AI recommendations I should approve?'],
              color: '#D4A03A',
              freq: '3-5x/day, 30-60 seconds each',
            },
          ].map(p => (
            <div key={p.role} className="rounded-2xl border border-[#38332B] bg-[#1C1B1A] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.color}14` }}>
                  <User className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F0EDE8]">{p.role}</h3>
                  <p className="text-xs text-[#ADA599]">{p.context}</p>
                </div>
              </div>
              <p className="text-[10px] font-semibold text-[#6B6359] uppercase tracking-wider mb-2">Key Questions</p>
              <div className="space-y-1.5 mb-4">
                {p.needs.map(n => (
                  <div key={n} className="flex items-start gap-2 text-sm text-[#ADA599]">
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                    {n}
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-[#141210] border border-[#38332B] px-3 py-2">
                <p className="text-xs text-[#6B6359]">Usage pattern: <span className="text-[#F0EDE8] font-semibold">{p.freq}</span></p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── DESKTOP-ONLY ── */}
      <Section id="desktop-only" label="Scope" title="What stays on desktop." dark>
        <p className="text-sm text-[#ADA599] mb-6 max-w-2xl">Not everything belongs on mobile. These features require the space and focus of a desktop session.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Full Sales Reporting (multi-tab charts & tables)',
            'Omnichannel Collection setup (SMS, kiosk config)',
            'Pricing scatter chart & optimization engine',
            'Unified Sentiment Pipeline aggregation',
            'Brand Analysis & competitive insights',
            'Full Inventory Management (catalog, thresholds)',
            'Campaign builder & marketing automation',
            'Compliance reporting & audit trails',
            'Staff scheduling & performance management',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-[#38332B] bg-[#1C1B1A] px-3 py-2.5">
              <Monitor className="w-3.5 h-3.5 text-[#6B6359] flex-shrink-0" />
              <span className="text-sm text-[#ADA599]">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <div className="border-t border-[#38332B] py-12 px-6 text-center">
        <NexusIcon size={28} className="mx-auto mb-3" />
        <p className="text-sm font-semibold text-[#F0EDE8] mb-1">Nexus Mobile — Design Review</p>
        <p className="text-xs text-[#6B6359]">Nexus Retail v3 · Dutchie AI · March 2026</p>
      </div>
    </div>
  );
}
