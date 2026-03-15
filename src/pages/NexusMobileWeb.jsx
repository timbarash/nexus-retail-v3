import { useState } from 'react';
import {
  ArrowLeft, Bell, Store, BarChart3, MessageSquare,
  TrendingUp, AlertTriangle, Package, DollarSign, Star,
  ChevronRight, Check, Zap, Shield, Mic,
  Clock, MapPin, ShoppingCart, Send, Activity,
  Sparkles, Home, User, Monitor, RefreshCw,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════
   SPARKLINE
   ═══════════════════════════════════════════════════════════════════ */
function Spark({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 36, h = 12 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM NAV — real interactive navigation
   ═══════════════════════════════════════════════════════════════════ */
function BottomNav({ active = 'home', onNavigate }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'stores', icon: Store, label: 'Stores' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-3" style={{ background: 'linear-gradient(transparent 0%, rgba(10,9,8,0.97) 35%)' }}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          const on = t.id === active;
          return (
            <button key={t.id} onClick={() => onNavigate(t.id)} className="flex flex-col items-center gap-[2px] outline-none">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${on ? 'bg-[#D4A03A]/15' : ''}`}>
                <Icon className={`w-[18px] h-[18px] ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
              </div>
              <span className={`text-[9px] font-semibold ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: HOME — Portfolio health
   ═══════════════════════════════════════════════════════════════════ */
function ScreenHome({ onNavigate }) {
  const stores = [
    { name: 'Logan Square', state: 'IL', score: 87, rev: '$48.2K', delta: '+12%', up: true, alerts: 0, spark: [5,6,7,6,8,9,9] },
    { name: 'Fort Lee', state: 'NJ', score: 79, rev: '$41.6K', delta: '+5%', up: true, alerts: 1, spark: [4,4,5,5,6,5,6] },
    { name: 'Springfield', state: 'IL', score: 74, rev: '$52.1K', delta: '+34%', up: true, alerts: 0, spark: [3,4,4,5,6,8,10] },
    { name: 'Boston', state: 'MA', score: 65, rev: '$29.8K', delta: '-3%', up: false, alerts: 1, spark: [6,5,5,4,5,4,4] },
    { name: 'Morenci', state: 'MI', score: 48, rev: '$12.4K', delta: '-23%', up: false, alerts: 3, spark: [7,6,5,4,3,3,2] },
  ];
  return (
    <div className="px-4 pt-2 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <NexusIcon size={20} />
          <span className="text-[15px] font-bold text-white">Nexus</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative" onClick={() => onNavigate('alerts')}>
            <Bell className="w-5 h-5 text-[#ADA599]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E87068] border-2 border-[#0D0C0A]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
            <User className="w-4 h-4 text-[#D4A03A]" />
          </div>
        </div>
      </div>
      {/* AI Briefing */}
      <div className="rounded-2xl p-4 mb-5" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.10), rgba(212,160,58,0.03))', border: '1px solid rgba(212,160,58,0.18)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A03A]" />
          <span className="text-[9px] font-bold text-[#D4A03A] uppercase tracking-[1.5px]">AI Briefing</span>
        </div>
        <p className="text-[12px] text-[#C8C3BA] leading-[1.6] italic mb-3">"Best Friday this quarter. Springfield drove 34% of revenue. 3 items need reordering."</p>
        <div className="flex gap-4">
          {[{ l: 'Revenue', v: '$47.2K', t: '+12%', up: true }, { l: 'Traffic', v: '2,140', t: '+8%', up: true }, { l: 'Alerts', v: '5', t: '2 critical', up: false }].map(m => (
            <div key={m.l}>
              <p className="text-[8px] uppercase tracking-[1px] text-[#6B6359] font-bold">{m.l}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.v}</span>
                <span className={`text-[10px] font-bold ${m.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{m.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Status buckets */}
      <div className="flex gap-2.5 mb-4">
        {[{ n: 3, l: 'Healthy', c: '#00C27C' }, { n: 1, l: 'Watch', c: '#D4A03A' }, { n: 1, l: 'Critical', c: '#E87068' }].map(s => (
          <div key={s.l} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: `${s.c}0D`, border: `1px solid ${s.c}25` }}>
            <p className="text-[18px] font-extrabold" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[9px] font-semibold" style={{ color: `${s.c}99` }}>{s.l}</p>
          </div>
        ))}
      </div>
      {/* Store list */}
      <p className="text-[9px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2.5">Stores — worst first</p>
      <div className="space-y-2.5">
        {[...stores].reverse().map(s => {
          const c = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          return (
            <button key={s.name} onClick={() => onNavigate('store-detail')} className="w-full rounded-xl border border-[#2A2722] bg-[#161514] p-3.5 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `conic-gradient(${c} ${s.score * 3.6}deg, #2A2722 0deg)` }}>
                <div className="w-8 h-8 rounded-full bg-[#161514] flex items-center justify-center text-[11px] font-bold" style={{ color: c }}>{s.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-white truncate">{s.name}</span>
                  <span className="text-[11px] text-[#6B6359]">{s.state}</span>
                  {s.alerts > 0 && <span className="ml-auto w-5 h-5 rounded-full bg-[#E87068] flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">{s.alerts}</span>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] font-bold text-white">{s.rev}</span>
                  <span className={`text-[10px] font-semibold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</span>
                  <Spark data={s.spark} color={s.up ? '#00C27C' : '#E87068'} w={40} h={14} />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#38332B] flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: ALERTS
   ═══════════════════════════════════════════════════════════════════ */
function ScreenAlerts() {
  const alerts = [
    { sev: 'CRITICAL', color: '#E87068', time: '2m', title: 'Blue Dream 3.5g out at 4 stores', ai: 'Reorder 200 units for $2,840. Est. delivery: 2 days.', actions: ['Approve Reorder', 'Modify'] },
    { sev: 'WARNING', color: '#D4A03A', time: '15m', title: 'Stiiizy Pod 18% above market avg', ai: 'Suggest $44.99 (currently $52). Projected +23% velocity.', actions: ['Apply Price', 'View Comps'] },
    { sev: 'OPPORTUNITY', color: '#00C27C', time: '1h', title: 'Jeeter brand sentiment spike +34%', ai: '2 stores don\'t stock it. Trending on social.', actions: ['Draft PO', 'View Data'] },
  ];
  return (
    <div className="px-4 pt-2 pb-28">
      <div className="flex items-center justify-between mb-5">
        <div><p className="text-[18px] font-bold text-white">Smart Alerts</p><p className="text-[11px] text-[#6B6359]">Swipe left for quick actions</p></div>
        <span className="text-[10px] font-bold text-[#E87068] bg-[#E87068]/10 px-3 py-1.5 rounded-full">4 active</span>
      </div>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden" style={{ borderColor: i === 0 ? `${a.color}50` : '#2A2722', background: i === 0 ? `${a.color}08` : '#161514' }}>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full" style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}>{a.sev}</span>
                <span className="text-[9px] text-[#6B6359]">{a.time} ago</span>
              </div>
              <p className="text-[14px] font-semibold text-white mb-2.5">{a.title}</p>
              <div className="rounded-xl px-3.5 py-2.5 mb-3.5" style={{ background: `${a.color}08`, border: `1px solid ${a.color}12` }}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: a.color }} />
                  <p className="text-[11px] text-[#C8C3BA] italic leading-[1.6]">{a.ai}</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                {a.actions.map((act, j) => (
                  <button key={j} className={`flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-[0.97] ${j === 0 ? 'text-white' : 'text-[#ADA599] border border-[#38332B]'}`} style={j === 0 ? { background: a.color } : undefined}>{act}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Auto-resolved */}
      <div className="mt-4 rounded-2xl border border-[#2A2722] bg-[#161514] p-4">
        <p className="text-[9px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2.5">Auto-Resolved</p>
        {['Register sync — fixed', 'March campaign — launched', 'Stiiizy Pods — auto-reordered'].map(r => (
          <div key={r} className="flex items-center gap-2.5 text-[11px] text-[#ADA599] mb-1.5 last:mb-0">
            <Check className="w-3.5 h-3.5 text-[#00C27C] flex-shrink-0" /> {r}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: STORE DETAIL
   ═══════════════════════════════════════════════════════════════════ */
function ScreenStoreDetail({ onBack }) {
  return (
    <div className="px-4 pt-2 pb-28">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="p-1"><ArrowLeft className="w-5 h-5 text-[#ADA599]" /></button>
        <div className="flex-1">
          <p className="text-[16px] font-bold text-white">Logan Square</p>
          <p className="text-[11px] text-[#6B6359]">Chicago, IL</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#00C27C 313deg, #2A2722 0deg)' }}>
          <div className="w-8 h-8 rounded-full bg-[#0D0C0A] flex items-center justify-center text-[12px] font-bold text-[#00C27C]">87</div>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { l: 'Revenue', v: '$48.2K', d: '+12%', up: true, spark: [4,5,6,6,7,8,9] },
          { l: 'Transactions', v: '312', d: '+8%', up: true, spark: [3,4,4,5,5,6,7] },
          { l: 'Avg Basket', v: '$154', d: '+3%', up: true, spark: [5,5,5,5,6,6,6] },
          { l: 'Margin', v: '52.1%', d: '+0.4%', up: true, spark: [5,5,5,5,5,5,5] },
        ].map(k => (
          <div key={k.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3.5">
            <p className="text-[9px] text-[#6B6359] uppercase tracking-[1px] font-bold mb-1.5">{k.l}</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[18px] font-extrabold text-white">{k.v}</span>
                <span className={`text-[10px] font-bold ml-1.5 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
              </div>
              <Spark data={k.spark} color={k.up ? '#00C27C' : '#E87068'} w={36} h={16} />
            </div>
          </div>
        ))}
      </div>
      {/* Hourly chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-4 mb-5">
        <p className="text-[10px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-3">Hourly Transactions</p>
        <div className="flex items-end gap-[5px] h-[60px]">
          {[2,5,12,18,24,31,28,35,42,38,29,22,15,8].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${(v / 42) * 100}%`, background: i === 8 ? '#D4A03A' : v > 30 ? '#00C27C' : '#2A2722' }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[8px] text-[#6B6359]">
          <span>8am</span><span>12pm</span><span>4pm</span><span>9pm</span>
        </div>
      </div>
      {/* Top Products */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-4 mb-5">
        <p className="text-[10px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2.5">Top Products Today</p>
        {[
          { name: 'Ozone Cake Mints', u: 47, rev: '$2,115' },
          { name: 'Baby Jeeter Churros', u: 38, rev: '$1,330' },
          { name: 'Stiiizy OG Kush', u: 31, rev: '$1,395' },
          { name: 'Camino Gummies', u: 28, rev: '$616' },
          { name: 'Simply Herb Pre-Roll', u: 24, rev: '$360' },
        ].map((p, i) => (
          <div key={i} className="flex items-center py-2 border-b border-[#2A2722]/60 last:border-0">
            <span className="w-5 text-[10px] font-bold text-[#6B6359]">{i + 1}</span>
            <span className="text-[12px] text-white flex-1">{p.name}</span>
            <span className="text-[11px] font-bold text-white">{p.rev}</span>
            <span className="text-[10px] text-[#6B6359] ml-2 w-6 text-right">{p.u}u</span>
          </div>
        ))}
      </div>
      {/* Sentiment */}
      <div className="rounded-2xl border border-[#00C27C]/15 bg-[#00C27C]/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#00C27C]" />
            <span className="text-[13px] font-bold text-white">Sentiment: 78</span>
          </div>
          <span className="text-[11px] font-semibold text-[#00C27C]">+6 pts</span>
        </div>
        <p className="text-[11px] text-[#ADA599] mt-1.5">"Staff Friendliness" trending up 12%</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: AI CHAT
   ═══════════════════════════════════════════════════════════════════ */
function ScreenChat() {
  return (
    <div className="px-4 pt-2 pb-28 flex flex-col" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1710, #2A2318)', border: '1px solid rgba(212,160,58,0.2)' }}>
          <NexusIcon size={18} />
        </div>
        <div>
          <span className="text-[15px] font-bold text-white">Nexus AI</span>
          <div className="flex items-center gap-1"><span className="w-[6px] h-[6px] rounded-full bg-[#00C27C]" /><span className="text-[10px] text-[#00C27C] font-medium">Online</span></div>
        </div>
      </div>
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['Reorder inventory', 'Weekly summary', 'Price check', 'Staff schedule'].map(s => (
          <span key={s} className="px-3 py-1.5 rounded-full text-[11px] font-medium text-[#D4A03A] border border-[#D4A03A]/25 bg-[#D4A03A]/5">{s}</span>
        ))}
      </div>
      {/* Conversation */}
      <div className="flex-1 space-y-4">
        {/* User */}
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-md bg-[#D4A03A]/12 border border-[#D4A03A]/20 px-4 py-2.5 max-w-[85%]">
            <p className="text-[12px] text-white">Show me stockout risks across all stores</p>
          </div>
        </div>
        {/* AI */}
        <div className="flex gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
            <NexusIcon size={12} />
          </div>
          <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-4 py-3 max-w-[85%]">
            <p className="text-[12px] text-[#C8C3BA] leading-[1.6] mb-2.5">Found <span className="font-bold text-white">3 products</span> at risk:</p>
            {[
              { name: 'Blue Dream 3.5g', store: '4 stores', time: '12h', c: '#E87068' },
              { name: 'Ozone Gummies', store: 'Fort Lee', time: '36h', c: '#D4A03A' },
              { name: 'Tunnel Vision', store: 'Boston', time: '48h', c: '#D4A03A' },
            ].map(p => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-[#2A2722]/60 last:border-0">
                <div><p className="text-[11px] font-semibold text-white">{p.name}</p><p className="text-[10px] text-[#6B6359]">{p.store}</p></div>
                <span className="text-[11px] font-bold" style={{ color: p.c }}>{p.time}</span>
              </div>
            ))}
            <button className="mt-3 w-full py-2.5 rounded-xl bg-[#00C27C] text-[12px] font-bold text-white active:scale-[0.97] transition-transform">Approve All Reorders — $3,935</button>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="mt-4 flex items-center gap-2.5 bg-[#161514] border border-[#2A2722] rounded-2xl px-4 py-3">
        <NexusIcon size={14} />
        <span className="text-[12px] text-[#6B6359] flex-1">Ask Nexus anything...</span>
        <Mic className="w-5 h-5 text-[#6B6359]" />
        <Send className="w-5 h-5 text-[#D4A03A]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: INVENTORY
   ═══════════════════════════════════════════════════════════════════ */
function ScreenInventory() {
  const items = [
    { name: 'Blue Dream 3.5g', store: '4 stores', hours: 12, cost: '$2,840', sev: 'critical' },
    { name: 'Ozone Gummies 100mg', store: 'Fort Lee', hours: 36, cost: '$675', sev: 'warning' },
    { name: 'Tunnel Vision 5-Pack', store: 'Boston', hours: 48, cost: '$420', sev: 'warning' },
    { name: 'Stiiizy Pod LLR 1g', store: 'Hoboken', hours: 72, cost: '$1,125', sev: 'low' },
  ];
  return (
    <div className="px-4 pt-2 pb-28">
      <div className="flex items-center justify-between mb-5">
        <div><p className="text-[18px] font-bold text-white">Low Stock</p><p className="text-[11px] text-[#6B6359]">4 items need attention</p></div>
        <button className="px-4 py-2 rounded-xl bg-[#00C27C] text-[12px] font-bold text-white active:scale-[0.97] transition-transform">Approve All</button>
      </div>
      <div className="space-y-3">
        {items.map(it => {
          const c = it.sev === 'critical' ? '#E87068' : it.sev === 'warning' ? '#D4A03A' : '#64A8E0';
          return (
            <div key={it.name} className="rounded-2xl border bg-[#161514] p-4" style={{ borderColor: it.sev === 'critical' ? `${c}40` : '#2A2722' }}>
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <p className="text-[13px] font-semibold text-white">{it.name}</p>
                  <p className="text-[11px] text-[#6B6359]">{it.store}</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-extrabold" style={{ color: c }}>{it.hours}h</p>
                  <p className="text-[9px] text-[#6B6359]">until out</p>
                </div>
              </div>
              <div className="h-[7px] rounded-full bg-[#2A2722] overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(8, 100 - (it.hours / 96) * 100)}%`, background: c }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#ADA599]">{it.cost}</span>
                <button className="px-4 py-2 rounded-lg text-[11px] font-bold text-white active:scale-[0.97] transition-transform" style={{ background: c }}>Reorder Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: REPORTS
   ═══════════════════════════════════════════════════════════════════ */
function ScreenReports({ period, setPeriod }) {
  return (
    <div className="px-4 pt-2 pb-28">
      <div className="flex items-center justify-between mb-5">
        <div><p className="text-[18px] font-bold text-white">Reports</p><p className="text-[11px] text-[#6B6359]">Last 30 Days · All Stores</p></div>
        <div className="flex gap-1.5">
          {['7D','30D','QTR'].map(r => (
            <button key={r} onClick={() => setPeriod(r)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${r === period ? 'bg-[#D4A03A]/15 text-[#D4A03A]' : 'text-[#6B6359]'}`}>{r}</button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-4 mb-5">
        <p className="text-[10px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2.5">Revenue</p>
        <svg width="100%" height="80" viewBox="0 0 250 70" preserveAspectRatio="none">
          <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C27C" stopOpacity="0.25" /><stop offset="100%" stopColor="#00C27C" stopOpacity="0" /></linearGradient></defs>
          <path d="M0,55 L25,48 L50,52 L75,40 L100,35 L125,38 L150,28 L175,22 L200,25 L225,15 L250,10 L250,70 L0,70Z" fill="url(#rg)" />
          <polyline points="0,55 25,48 50,52 75,40 100,35 125,38 150,28 175,22 200,25 225,15 250,10" fill="none" stroke="#00C27C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { l: 'Revenue', v: '$1.42M', d: '+8.2%', up: true, c: '#00C27C', icon: DollarSign },
          { l: 'Transactions', v: '9,847', d: '+5.1%', up: true, c: '#64A8E0', icon: ShoppingCart },
          { l: 'Avg Basket', v: '$144', d: '+2.9%', up: true, c: '#B598E8', icon: Package },
          { l: 'Margin', v: '50.8%', d: '-0.3%', up: false, c: '#D4A03A', icon: TrendingUp },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3.5" style={{ borderLeftWidth: 3, borderLeftColor: k.c }}>
              <div className="flex items-center gap-1.5 mb-1.5"><Icon className="w-3.5 h-3.5" style={{ color: k.c }} /><span className="text-[9px] text-[#6B6359] uppercase font-bold">{k.l}</span></div>
              <span className="text-[17px] font-extrabold text-white">{k.v}</span>
              <span className={`text-[10px] font-bold ml-1.5 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
            </div>
          );
        })}
      </div>
      {/* Categories */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-4 mb-5">
        <p className="text-[10px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2.5">By Category</p>
        {[{ n:'Flower',p:38,c:'#00C27C'},{n:'Vapes',p:28,c:'#64A8E0'},{n:'Edibles',p:18,c:'#B598E8'},{n:'Pre-Rolls',p:11,c:'#D4A03A'},{n:'Other',p:5,c:'#6B6359'}].map(c=>(
          <div key={c.n} className="flex items-center gap-2.5 mb-2"><div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:c.c}}/><span className="text-[11px] text-[#ADA599] w-16">{c.n}</span><div className="flex-1 h-2.5 rounded-full bg-[#2A2722] overflow-hidden"><div className="h-full rounded-full" style={{width:`${c.p}%`,background:c.c}}/></div><span className="text-[11px] font-bold text-white w-9 text-right">{c.p}%</span></div>
        ))}
      </div>
      <a href="#/" className="block w-full py-3 rounded-xl border border-[#2A2722] bg-[#161514] text-[12px] text-[#ADA599] font-semibold text-center">
        <Monitor className="w-4 h-4 inline mr-1.5" />Open Full Dashboard
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP — full-screen mobile web experience
   ═══════════════════════════════════════════════════════════════════ */
export default function NexusMobileWeb() {
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState([]);
  const [period, setPeriod] = useState('30D');

  const navigate = (id) => {
    setHistory(prev => [...prev, screen]);
    setScreen(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    const prev = history[history.length - 1] || 'home';
    setHistory(h => h.slice(0, -1));
    setScreen(prev);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Map sub-screens to their parent tab
  const activeTab = screen === 'store-detail' ? 'stores'
    : screen === 'inventory' ? 'alerts'
    : screen;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0D0C0A] text-[#F0EDE8] overflow-y-auto overscroll-none" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-lg mx-auto min-h-screen">
        {screen === 'home' && <ScreenHome onNavigate={navigate} />}
        {screen === 'alerts' && <ScreenAlerts />}
        {screen === 'stores' && <ScreenHome onNavigate={navigate} />}
        {screen === 'store-detail' && <ScreenStoreDetail onBack={goBack} />}
        {screen === 'chat' && <ScreenChat />}
        {screen === 'inventory' && <ScreenInventory />}
        {screen === 'reports' && <ScreenReports period={period} setPeriod={setPeriod} />}
      </div>
      <BottomNav active={activeTab} onNavigate={navigate} />
    </div>
  );
}
