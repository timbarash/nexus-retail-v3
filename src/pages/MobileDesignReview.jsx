import { useState } from 'react';
import {
  Smartphone, Monitor, ArrowLeft, Bell, Store, BarChart3, MessageSquare,
  TrendingUp, AlertTriangle, Package, DollarSign, Star,
  ChevronRight, Check, Zap, Shield, Wifi, Mic,
  WifiOff, Clock, MapPin, ShoppingCart, Send, Activity,
  ArrowUpRight, ArrowDownRight, Layers, Globe, Download, Sparkles,
  Home, User, RefreshCw,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════
   PHONE FRAME — realistic iPhone with dynamic island
   ═══════════════════════════════════════════════════════════════════ */
function Phone({ children, label, tilt, className = '' }) {
  const style = tilt === 'left'
    ? { transform: 'perspective(900px) rotateY(8deg) rotateX(2deg) scale(0.98)' }
    : tilt === 'right'
    ? { transform: 'perspective(900px) rotateY(-8deg) rotateX(2deg) scale(0.98)' }
    : {};
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative rounded-[44px] border-[4px] border-[#2A2722] bg-[#0A0908] overflow-hidden" style={{ width: 300, height: 620, boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,160,58,0.06), inset 0 0 30px rgba(0,0,0,0.3)', ...style }}>
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 w-[100px] h-[28px] rounded-full bg-black" style={{ boxShadow: '0 0 0 2px #1A1918' }} />
        {/* Status bar */}
        <div className="relative z-20 flex items-center justify-between px-7 pt-4 pb-1 text-[9px] font-semibold text-white/80">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 7h1.5v3H1zM4 5h1.5v5H4zM7 3h1.5v7H7zM10 0h1.5v10H10z" fill="currentColor" opacity="0.8"/></svg>
            <span className="text-[8px]">5G</span>
            <div className="w-[22px] h-[9px] rounded-[2px] border border-white/40 relative ml-0.5">
              <div className="absolute inset-[1.5px] right-[4px] rounded-[1px] bg-[#00C27C]" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-full overflow-y-auto pb-24" style={{ scrollbarWidth: 'none' }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[110px] h-[4px] rounded-full bg-white/25 z-30" />
      </div>
      {label && (
        <div className="text-center">
          <p className="text-sm font-bold text-[#F0EDE8]">{label}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM NAV — inside phone frames
   ═══════════════════════════════════════════════════════════════════ */
function BottomNav({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'stores', icon: Store, label: 'Stores' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-7 pt-3" style={{ background: 'linear-gradient(transparent 0%, rgba(10,9,8,0.95) 40%)' }}>
      <div className="flex items-center justify-around">
        {tabs.map(t => {
          const Icon = t.icon;
          const on = t.id === active;
          return (
            <div key={t.id} className="flex flex-col items-center gap-[2px]">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${on ? 'bg-[#D4A03A]/15' : ''}`}>
                <Icon className={`w-[16px] h-[16px] ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
              </div>
              <span className={`text-[8px] font-semibold ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`}>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SPARKLINE — tiny inline chart
   ═══════════════════════════════════════════════════════════════════ */
function Spark({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 36, h = 12 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: HOME — Portfolio health
   ═══════════════════════════════════════════════════════════════════ */
function ScreenHome() {
  const stores = [
    { name: 'Logan Square', state: 'IL', score: 87, rev: '$48.2K', delta: '+12%', up: true, alerts: 0, spark: [5,6,7,6,8,9,9] },
    { name: 'Fort Lee', state: 'NJ', score: 79, rev: '$41.6K', delta: '+5%', up: true, alerts: 1, spark: [4,4,5,5,6,5,6] },
    { name: 'Springfield', state: 'IL', score: 74, rev: '$52.1K', delta: '+34%', up: true, alerts: 0, spark: [3,4,4,5,6,8,10] },
    { name: 'Boston', state: 'MA', score: 65, rev: '$29.8K', delta: '-3%', up: false, alerts: 1, spark: [6,5,5,4,5,4,4] },
    { name: 'Morenci', state: 'MI', score: 48, rev: '$12.4K', delta: '-23%', up: false, alerts: 3, spark: [7,6,5,4,3,3,2] },
  ];
  return (
    <div className="px-4 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <NexusIcon size={16} />
          <span className="text-[12px] font-bold text-white">Nexus</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Bell className="w-4 h-4 text-[#ADA599]" /><div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#E87068] border border-[#0A0908]" /></div>
          <div className="w-6 h-6 rounded-full bg-[#D4A03A]/20 flex items-center justify-center"><User className="w-3 h-3 text-[#D4A03A]" /></div>
        </div>
      </div>
      {/* AI Briefing */}
      <div className="rounded-2xl p-3.5 mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.10), rgba(212,160,58,0.03))', border: '1px solid rgba(212,160,58,0.18)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-[#D4A03A]" />
          <span className="text-[8px] font-bold text-[#D4A03A] uppercase tracking-[1.5px]">AI Briefing</span>
        </div>
        <p className="text-[10px] text-[#C8C3BA] leading-[1.6] italic mb-2.5">"Best Friday this quarter. Springfield drove 34% of revenue. 3 items need reordering."</p>
        <div className="flex gap-4">
          {[{ l: 'Revenue', v: '$47.2K', t: '+12%', up: true }, { l: 'Traffic', v: '2,140', t: '+8%', up: true }, { l: 'Alerts', v: '5', t: '2 critical', up: false }].map(m => (
            <div key={m.l}>
              <p className="text-[7px] uppercase tracking-[1px] text-[#6B6359] font-bold">{m.l}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[13px] font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.v}</span>
                <span className={`text-[8px] font-bold ${m.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{m.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Status */}
      <div className="flex gap-2 mb-3">
        {[{ n: 3, l: 'Healthy', c: '#00C27C' }, { n: 1, l: 'Watch', c: '#D4A03A' }, { n: 1, l: 'Critical', c: '#E87068' }].map(s => (
          <div key={s.l} className="flex-1 rounded-xl p-2 text-center" style={{ background: `${s.c}0D`, border: `1px solid ${s.c}25` }}>
            <p className="text-[14px] font-extrabold" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[7px] font-semibold" style={{ color: `${s.c}99` }}>{s.l}</p>
          </div>
        ))}
      </div>
      {/* Stores */}
      <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Stores — worst first</p>
      <div className="space-y-2">
        {[...stores].reverse().map(s => {
          const c = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          return (
            <div key={s.name} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `conic-gradient(${c} ${s.score * 3.6}deg, #2A2722 0deg)` }}>
                <div className="w-7 h-7 rounded-full bg-[#161514] flex items-center justify-center text-[10px] font-bold" style={{ color: c }}>{s.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white truncate">{s.name}</span>
                  <span className="text-[9px] text-[#6B6359]">{s.state}</span>
                  {s.alerts > 0 && <span className="ml-auto w-[18px] h-[18px] rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{s.alerts}</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-white">{s.rev}</span>
                  <span className={`text-[9px] font-semibold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</span>
                  <Spark data={s.spark} color={s.up ? '#00C27C' : '#E87068'} />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#38332B] flex-shrink-0" />
            </div>
          );
        })}
      </div>
      <BottomNav active="home" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: ALERTS
   ═══════════════════════════════════════════════════════════════════ */
function ScreenAlerts() {
  const [done, setDone] = useState({});
  const tap = (key) => { setDone(p => ({ ...p, [key]: true })); setTimeout(() => setDone(p => ({ ...p, [key]: false })), 1500); };
  const alerts = [
    { sev: 'CRITICAL', color: '#E87068', time: '2m', title: 'Blue Dream 3.5g out at 4 stores', ai: 'Reorder 200 units for $2,840. Est. delivery: 2 days.', actions: ['Approve Reorder', 'Modify'] },
    { sev: 'WARNING', color: '#D4A03A', time: '15m', title: 'Stiiizy Pod 18% above market avg', ai: 'Suggest $44.99 (currently $52). Projected +23% velocity.', actions: ['Apply Price', 'View Comps'] },
    { sev: 'OPPORTUNITY', color: '#00C27C', time: '1h', title: 'Jeeter brand sentiment spike +34%', ai: '2 stores don\'t stock it. Trending on social.', actions: ['Draft PO', 'View Data'] },
  ];
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Smart Alerts</p><p className="text-[9px] text-[#6B6359]">Swipe left for quick actions</p></div>
        <span className="text-[9px] font-bold text-[#E87068] bg-[#E87068]/10 px-2.5 py-1 rounded-full">4 active</span>
      </div>
      <div className="space-y-2.5">
        {alerts.map((a, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden" style={{ borderColor: i === 0 ? `${a.color}50` : '#2A2722', background: i === 0 ? `${a.color}08` : '#161514' }}>
            <div className="p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold px-2 py-[3px] rounded-full" style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}>{a.sev}</span>
                <span className="text-[8px] text-[#6B6359]">{a.time} ago</span>
              </div>
              <p className="text-[11px] font-semibold text-white mb-2">{a.title}</p>
              <div className="rounded-xl px-3 py-2 mb-3" style={{ background: `${a.color}08`, border: `1px solid ${a.color}12` }}>
                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" style={{ color: a.color }} />
                  <p className="text-[9px] text-[#C8C3BA] italic leading-[1.5]">{a.ai}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {a.actions.map((act, j) => {
                  const k = `${i}-${j}`;
                  return (
                    <button key={j} onClick={() => tap(k)} className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${done[k] ? 'bg-[#00C27C] text-white' : j === 0 ? 'text-white' : 'text-[#ADA599] border border-[#38332B]'}`} style={!done[k] && j === 0 ? { background: a.color } : undefined}>{done[k] ? '✓ Done' : act}</button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Auto-resolved */}
      <div className="mt-3 rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5">
        <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Auto-Resolved</p>
        {['Register sync — fixed', 'March campaign — launched', 'Stiiizy Pods — auto-reordered'].map(r => (
          <div key={r} className="flex items-center gap-2 text-[9px] text-[#ADA599] mb-1 last:mb-0">
            <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" /> {r}
          </div>
        ))}
      </div>
      <BottomNav active="alerts" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: STORE DETAIL
   ═══════════════════════════════════════════════════════════════════ */
function ScreenStore() {
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft className="w-4 h-4 text-[#ADA599]" />
        <div className="flex-1">
          <p className="text-[13px] font-bold text-white">Logan Square</p>
          <p className="text-[9px] text-[#6B6359]">Chicago, IL</p>
        </div>
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#00C27C 313deg, #2A2722 0deg)' }}>
          <div className="w-7.5 h-7.5 rounded-full bg-[#0A0908] flex items-center justify-center text-[11px] font-bold text-[#00C27C]" style={{ width: 30, height: 30 }}>87</div>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { l: 'Revenue', v: '$48.2K', d: '+12%', up: true, spark: [4,5,6,6,7,8,9] },
          { l: 'Transactions', v: '312', d: '+8%', up: true, spark: [3,4,4,5,5,6,7] },
          { l: 'Avg Basket', v: '$154', d: '+3%', up: true, spark: [5,5,5,5,6,6,6] },
          { l: 'Margin', v: '52.1%', d: '+0.4%', up: true, spark: [5,5,5,5,5,5,5] },
        ].map(k => (
          <div key={k.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3">
            <p className="text-[8px] text-[#6B6359] uppercase tracking-[1px] font-bold mb-1">{k.l}</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[15px] font-extrabold text-white">{k.v}</span>
                <span className={`text-[9px] font-bold ml-1 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
              </div>
              <Spark data={k.spark} color={k.up ? '#00C27C' : '#E87068'} w={32} h={14} />
            </div>
          </div>
        ))}
      </div>
      {/* Hourly chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-3">Hourly Transactions</p>
        <div className="flex items-end gap-[4px] h-[50px]">
          {[2,5,12,18,24,31,28,35,42,38,29,22,15,8].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${(v / 42) * 100}%`, background: i === 8 ? '#D4A03A' : v > 30 ? '#00C27C' : '#2A2722' }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[7px] text-[#6B6359]">
          <span>8am</span><span>12pm</span><span>4pm</span><span>9pm</span>
        </div>
      </div>
      {/* Top Products */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Top Products Today</p>
        {[
          { name: 'Ozone Cake Mints', u: 47, rev: '$2,115' },
          { name: 'Baby Jeeter Churros', u: 38, rev: '$1,330' },
          { name: 'Stiiizy OG Kush', u: 31, rev: '$1,395' },
          { name: 'Camino Gummies', u: 28, rev: '$616' },
          { name: 'Simply Herb Pre-Roll', u: 24, rev: '$360' },
        ].map((p, i) => (
          <div key={i} className="flex items-center py-1.5 border-b border-[#2A2722]/60 last:border-0">
            <span className="w-4 text-[9px] font-bold text-[#6B6359]">{i + 1}</span>
            <span className="text-[10px] text-white flex-1">{p.name}</span>
            <span className="text-[9px] font-bold text-white">{p.rev}</span>
            <span className="text-[8px] text-[#6B6359] ml-2 w-5 text-right">{p.u}u</span>
          </div>
        ))}
      </div>
      {/* Sentiment */}
      <div className="rounded-2xl border border-[#00C27C]/15 bg-[#00C27C]/5 p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-[#00C27C]" />
            <span className="text-[10px] font-bold text-white">Sentiment: 78</span>
          </div>
          <span className="text-[9px] font-semibold text-[#00C27C]">+6 pts</span>
        </div>
        <p className="text-[9px] text-[#ADA599] mt-1">"Staff Friendliness" trending up 12%</p>
      </div>
      <BottomNav active="stores" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: AI CHAT
   ═══════════════════════════════════════════════════════════════════ */
function ScreenChat() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="px-4 pt-2 flex flex-col" style={{ minHeight: 540 }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1710, #2A2318)', border: '1px solid rgba(212,160,58,0.2)' }}>
          <NexusIcon size={16} />
        </div>
        <div>
          <span className="text-[12px] font-bold text-white">Nexus AI</span>
          <div className="flex items-center gap-1"><span className="w-[5px] h-[5px] rounded-full bg-[#00C27C]" /><span className="text-[8px] text-[#00C27C] font-medium">Online</span></div>
        </div>
      </div>
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {['Reorder inventory', 'Weekly summary', 'Price check', 'Staff schedule'].map(s => (
          <span key={s} className="px-2.5 py-1 rounded-full text-[9px] font-medium text-[#D4A03A] border border-[#D4A03A]/25 bg-[#D4A03A]/5">{s}</span>
        ))}
      </div>
      {/* Conversation */}
      <div className="flex-1 space-y-3">
        {/* User */}
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-md bg-[#D4A03A]/12 border border-[#D4A03A]/20 px-3.5 py-2 max-w-[82%]">
            <p className="text-[10px] text-white">Show me stockout risks across all stores</p>
          </div>
        </div>
        {/* AI */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
            <NexusIcon size={10} />
          </div>
          <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-3.5 py-2.5 max-w-[82%]">
            <p className="text-[10px] text-[#C8C3BA] leading-[1.6] mb-2">Found <span className="font-bold text-white">3 products</span> at risk:</p>
            {[
              { name: 'Blue Dream 3.5g', store: '4 stores', time: '12h', c: '#E87068' },
              { name: 'Ozone Gummies', store: 'Fort Lee', time: '36h', c: '#D4A03A' },
              { name: 'Tunnel Vision', store: 'Boston', time: '48h', c: '#D4A03A' },
            ].map(p => (
              <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-[#2A2722]/60 last:border-0">
                <div><p className="text-[9px] font-semibold text-white">{p.name}</p><p className="text-[8px] text-[#6B6359]">{p.store}</p></div>
                <span className="text-[9px] font-bold" style={{ color: p.c }}>{p.time}</span>
              </div>
            ))}
            <button onClick={() => setApproved(true)} className={`mt-2.5 w-full py-2 rounded-xl text-[10px] font-bold text-white transition-all ${approved ? 'bg-[#00C27C]/60' : 'bg-[#00C27C]'}`}>{approved ? '✓ Reorders Approved' : 'Approve All Reorders — $3,935'}</button>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="mt-3 flex items-center gap-2 bg-[#161514] border border-[#2A2722] rounded-2xl px-3.5 py-2.5">
        <NexusIcon size={12} />
        <span className="text-[10px] text-[#6B6359] flex-1">Ask Nexus anything...</span>
        <Mic className="w-4 h-4 text-[#6B6359]" />
        <Send className="w-4 h-4 text-[#D4A03A]" />
      </div>
      <BottomNav active="chat" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: INVENTORY
   ═══════════════════════════════════════════════════════════════════ */
function ScreenInventory() {
  const [allApproved, setAllApproved] = useState(false);
  const [reordered, setReordered] = useState({});
  const reorder = (name) => { setReordered(p => ({ ...p, [name]: true })); };
  const items = [
    { name: 'Blue Dream 3.5g', store: '4 stores', hours: 12, cost: '$2,840', sev: 'critical' },
    { name: 'Ozone Gummies 100mg', store: 'Fort Lee', hours: 36, cost: '$675', sev: 'warning' },
    { name: 'Tunnel Vision 5-Pack', store: 'Boston', hours: 48, cost: '$420', sev: 'warning' },
    { name: 'Stiiizy Pod LLR 1g', store: 'Hoboken', hours: 72, cost: '$1,125', sev: 'low' },
  ];
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Low Stock</p><p className="text-[9px] text-[#6B6359]">4 items need attention</p></div>
        <button onClick={() => setAllApproved(true)} className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold text-white transition-all ${allApproved ? 'bg-[#00C27C]/60' : 'bg-[#00C27C]'}`}>{allApproved ? '✓ Approved' : 'Approve All'}</button>
      </div>
      <div className="space-y-2.5">
        {items.map(it => {
          const c = it.sev === 'critical' ? '#E87068' : it.sev === 'warning' ? '#D4A03A' : '#64A8E0';
          const ordered = allApproved || reordered[it.name];
          return (
            <div key={it.name} className="rounded-2xl border bg-[#161514] p-3.5" style={{ borderColor: it.sev === 'critical' ? `${c}40` : '#2A2722' }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[11px] font-semibold text-white">{it.name}</p>
                  <p className="text-[9px] text-[#6B6359]">{it.store}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-extrabold" style={{ color: c }}>{it.hours}h</p>
                  <p className="text-[8px] text-[#6B6359]">until out</p>
                </div>
              </div>
              {/* Progress */}
              <div className="h-[6px] rounded-full bg-[#2A2722] overflow-hidden mb-2.5">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(8, 100 - (it.hours / 96) * 100)}%`, background: c }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[#ADA599]">{it.cost}</span>
                <button onClick={() => reorder(it.name)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold text-white transition-all ${ordered ? 'bg-[#00C27C]/60' : ''}`} style={!ordered ? { background: c } : undefined}>{ordered ? '✓ Ordered' : 'Reorder Now'}</button>
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav active="alerts" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: REPORTS
   ═══════════════════════════════════════════════════════════════════ */
function ScreenReports() {
  const [dashOpen, setDashOpen] = useState(false);
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Reports</p><p className="text-[9px] text-[#6B6359]">Last 30 Days · All Stores</p></div>
        <div className="flex gap-1">{['7D','30D','QTR'].map((r,i) => (<span key={r} className={`px-2 py-1 rounded-lg text-[8px] font-bold ${i===1?'bg-[#D4A03A]/15 text-[#D4A03A]':'text-[#6B6359]'}`}>{r}</span>))}</div>
      </div>
      {/* Chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Revenue</p>
        <svg width="100%" height="70" viewBox="0 0 250 70" preserveAspectRatio="none">
          <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C27C" stopOpacity="0.25" /><stop offset="100%" stopColor="#00C27C" stopOpacity="0" /></linearGradient></defs>
          <path d="M0,55 L25,48 L50,52 L75,40 L100,35 L125,38 L150,28 L175,22 L200,25 L225,15 L250,10 L250,70 L0,70Z" fill="url(#rg)" />
          <polyline points="0,55 25,48 50,52 75,40 100,35 125,38 150,28 175,22 200,25 225,15 250,10" fill="none" stroke="#00C27C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { l: 'Revenue', v: '$1.42M', d: '+8.2%', up: true, c: '#00C27C', icon: DollarSign },
          { l: 'Transactions', v: '9,847', d: '+5.1%', up: true, c: '#64A8E0', icon: ShoppingCart },
          { l: 'Avg Basket', v: '$144', d: '+2.9%', up: true, c: '#B598E8', icon: Package },
          { l: 'Margin', v: '50.8%', d: '-0.3%', up: false, c: '#D4A03A', icon: TrendingUp },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3" style={{ borderLeftWidth: 3, borderLeftColor: k.c }}>
              <div className="flex items-center gap-1.5 mb-1"><Icon className="w-3 h-3" style={{ color: k.c }} /><span className="text-[8px] text-[#6B6359] uppercase font-bold">{k.l}</span></div>
              <span className="text-[14px] font-extrabold text-white">{k.v}</span>
              <span className={`text-[9px] font-bold ml-1 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span>
            </div>
          );
        })}
      </div>
      {/* Categories */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">By Category</p>
        {[{ n:'Flower',p:38,c:'#00C27C'},{n:'Vapes',p:28,c:'#64A8E0'},{n:'Edibles',p:18,c:'#B598E8'},{n:'Pre-Rolls',p:11,c:'#D4A03A'},{n:'Other',p:5,c:'#6B6359'}].map(c=>(
          <div key={c.n} className="flex items-center gap-2 mb-1.5"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:c.c}}/><span className="text-[9px] text-[#ADA599] w-14">{c.n}</span><div className="flex-1 h-2 rounded-full bg-[#2A2722] overflow-hidden"><div className="h-full rounded-full" style={{width:`${c.p}%`,background:c.c}}/></div><span className="text-[9px] font-bold text-white w-8 text-right">{c.p}%</span></div>
        ))}
      </div>
      <button onClick={() => setDashOpen(true)} className={`w-full py-2.5 rounded-xl border text-[10px] font-semibold flex items-center justify-center gap-1.5 transition-all ${dashOpen ? 'border-[#00C27C]/30 bg-[#00C27C]/10 text-[#00C27C]' : 'border-[#2A2722] bg-[#161514] text-[#ADA599]'}`}>{dashOpen ? <><Check className="w-3.5 h-3.5" />Opening Dashboard...</> : <><Monitor className="w-3.5 h-3.5" />Open Full Dashboard</>}</button>
      <BottomNav active="reports" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN DESIGN REVIEW PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function MobileDesignReview() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#F0EDE8]">

      {/* ████ HERO ████ */}
      <div className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,160,58,0.12) 0%, transparent 65%)' }} />
        <div className="absolute top-[200px] right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,194,124,0.08) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(transparent, #0D0C0A)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">
          <a href="#/" className="inline-flex items-center gap-1.5 text-sm text-[#6B6359] hover:text-[#D4A03A] transition-colors mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Nexus v3
          </a>

          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4A03A]/20 bg-[#D4A03A]/5 mb-8">
                <Smartphone className="w-4 h-4 text-[#D4A03A]" />
                <span className="text-sm font-bold text-[#D4A03A]">Design Review — Mobile PWA</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6">
                Nexus{' '}
                <span className="inline-block" style={{ background: 'linear-gradient(135deg, #D4A03A 0%, #E8C068 50%, #D4A03A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mobile</span>
              </h1>
              <p className="text-xl text-[#ADA599] leading-relaxed mb-10 max-w-lg">
                A companion decision surface for dispensary operators. Not a shrunken desktop — purpose-built for 8-second decisions.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { icon: Globe, n: 'PWA', d: 'No App Store needed' },
                  { icon: WifiOff, n: 'Offline-First', d: 'Works without signal' },
                  { icon: Bell, n: 'Push Alerts', d: 'Tiered notifications' },
                ].map(b => (
                  <div key={b.n} className="rounded-xl border border-[#2A2722] bg-[#161514] p-4 text-center">
                    <b.icon className="w-5 h-5 text-[#D4A03A] mx-auto mb-2" />
                    <p className="text-sm font-bold text-white">{b.n}</p>
                    <p className="text-[10px] text-[#6B6359]">{b.d}</p>
                  </div>
                ))}
              </div>
              <a href="#/mobile" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #D4A03A, #B8860B)', boxShadow: '0 8px 32px rgba(212,160,58,0.3)' }}>
                <Smartphone className="w-5 h-5" /> Launch Mobile App
              </a>
            </div>
            {/* Hero phone */}
            <div className="flex justify-center lg:justify-end">
              <Phone tilt="left"><ScreenHome /></Phone>
            </div>
          </div>
        </div>
      </div>

      {/* ████ SCREEN SHOWCASE — full-bleed gallery ████ */}
      <div className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0D0C0A 0%, #12110F 50%, #0D0C0A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Screen Gallery</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Six screens. Every use case.</h2>
          <p className="text-lg text-[#ADA599] max-w-xl">Progressive disclosure: glance at the summary, tap for details, act with one button.</p>
        </div>
        <div className="flex gap-10 overflow-x-auto px-12 pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          <div className="snap-center flex-shrink-0"><Phone label="Portfolio Health"><ScreenHome /></Phone></div>
          <div className="snap-center flex-shrink-0"><Phone label="Smart Alerts"><ScreenAlerts /></Phone></div>
          <div className="snap-center flex-shrink-0"><Phone label="Store Detail"><ScreenStore /></Phone></div>
          <div className="snap-center flex-shrink-0"><Phone label="Nexus AI Chat"><ScreenChat /></Phone></div>
          <div className="snap-center flex-shrink-0"><Phone label="Low Stock"><ScreenInventory /></Phone></div>
          <div className="snap-center flex-shrink-0"><Phone label="Reports"><ScreenReports /></Phone></div>
        </div>
        <p className="text-center text-sm text-[#6B6359] mt-6">← Scroll to explore all screens →</p>
      </div>

      {/* ████ SIDE-BY-SIDE: DESKTOP VS MOBILE ████ */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Philosophy</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">Desktop analyzes.<br />Mobile decides.</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-[#2A2722] bg-[#161514] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(100,168,224,0.1), transparent)' }} />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#64A8E0]/10 flex items-center justify-center"><Monitor className="w-6 h-6 text-[#64A8E0]" /></div>
              <div><p className="text-lg font-bold text-white">Desktop</p><p className="text-sm text-[#6B6359]">Nexus v3</p></div>
            </div>
            <div className="space-y-3">
              {['Deep analysis sessions — 10+ min', 'Full charts, tables, multi-tab views', 'Configure campaigns & surveys', 'All 39 stores side by side', 'Omnichannel pipeline'].map(t => (
                <div key={t} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#64A8E0] flex-shrink-0" /><span className="text-[15px] text-[#ADA599]">{t}</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#D4A03A]/20 p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.06), rgba(212,160,58,0.02))' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,160,58,0.1), transparent)' }} />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D4A03A]/10 flex items-center justify-center"><Smartphone className="w-6 h-6 text-[#D4A03A]" /></div>
              <div><p className="text-lg font-bold text-white">Mobile</p><p className="text-sm text-[#D4A03A]">Nexus Mobile</p></div>
            </div>
            <div className="space-y-3">
              {['Glance-and-go — 8 seconds', 'Sparklines + summary numbers', 'One-tap: approve, dismiss, act', 'Worst-first store ranking', 'Push notifications for urgency'].map(t => (
                <div key={t} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#D4A03A] flex-shrink-0" /><span className="text-[15px] text-[#ADA599]">{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ████ FEATURE DEEP DIVES — alternating phone + text ████ */}
      <div className="py-24" style={{ background: 'linear-gradient(180deg, #0D0C0A 0%, #12110F 50%, #0D0C0A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">

          {/* ── Alerts Deep Dive ── */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-center">
            <Phone tilt="right"><ScreenAlerts /></Phone>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#E87068] mb-3">Smart Alerts</p>
              <h3 className="text-3xl font-black text-white mb-6">Swipe to act.<br />No screens to navigate.</h3>
              <div className="space-y-4">
                {[
                  { icon: ArrowLeft, title: 'Swipe Left → Quick Actions', desc: 'Approve reorders, apply prices, dismiss alerts — without opening a detail view.', c: '#E87068' },
                  { icon: Sparkles, title: 'AI Recommendation Inline', desc: 'Every alert includes an AI-generated action with estimated impact.', c: '#D4A03A' },
                  { icon: Clock, title: '5-Second Undo', desc: 'Every action shows an undo toast. No confirmation dialogs — speed over ceremony.', c: '#64A8E0' },
                  { icon: Bell, title: 'Tiered Push Notifications', desc: 'Immediate for stockouts. Hourly digest for warnings. Morning summary from AI.', c: '#B598E8' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.c}12` }}>
                      <f.icon className="w-5 h-5" style={{ color: f.c }} />
                    </div>
                    <div><p className="text-[15px] font-bold text-white mb-1">{f.title}</p><p className="text-sm text-[#ADA599] leading-relaxed">{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Store Detail Deep Dive ── */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#00C27C] mb-3">Store Detail</p>
              <h3 className="text-3xl font-black text-white mb-6">Tap any store.<br />Full picture in one scroll.</h3>
              <div className="space-y-4">
                {[
                  { icon: Activity, title: 'Sparkline KPIs', desc: 'Every metric shows a 7-day inline trend. Direction at a glance.', c: '#00C27C' },
                  { icon: BarChart3, title: 'Hourly Traffic', desc: 'Bar chart of transactions per hour. Golden bar = current peak hour.', c: '#D4A03A' },
                  { icon: ShoppingCart, title: 'Top Products', desc: 'Top 5 by revenue today. Quick scan of what\'s moving.', c: '#64A8E0' },
                  { icon: Star, title: 'Live Sentiment', desc: 'Current score + trending topic. One-tap to open full review.', c: '#B598E8' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.c}12` }}>
                      <f.icon className="w-5 h-5" style={{ color: f.c }} />
                    </div>
                    <div><p className="text-[15px] font-bold text-white mb-1">{f.title}</p><p className="text-sm text-[#ADA599] leading-relaxed">{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <Phone tilt="left"><ScreenStore /></Phone>
          </div>

          {/* ── AI Chat Deep Dive ── */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-center">
            <Phone tilt="right"><ScreenChat /></Phone>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Nexus AI</p>
              <h3 className="text-3xl font-black text-white mb-6">Ask anything.<br />Act on the answer.</h3>
              <div className="space-y-4">
                {[
                  { icon: Mic, title: 'Voice-to-Text Input', desc: 'Hands-free queries on the floor. "What\'s low stock at Logan Square?"', c: '#D4A03A' },
                  { icon: Zap, title: 'Inline Action Cards', desc: 'AI returns structured data with one-tap buttons. Approve a $3,935 reorder right in the chat.', c: '#00C27C' },
                  { icon: Sparkles, title: 'Context-Aware Prompts', desc: 'Suggested queries based on current alerts, time of day, and your history.', c: '#B598E8' },
                  { icon: Shield, title: 'Role-Aware Responses', desc: 'HQ sees chain-wide data. Store managers see their store. No config needed.', c: '#64A8E0' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.c}12` }}>
                      <f.icon className="w-5 h-5" style={{ color: f.c }} />
                    </div>
                    <div><p className="text-[15px] font-bold text-white mb-1">{f.title}</p><p className="text-sm text-[#ADA599] leading-relaxed">{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ████ THREE LAYERS ████ */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Information Architecture</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">Three layers. Never overwhelming.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '01', title: 'Portfolio', desc: 'Chain-level KPIs. Store list sorted worst-first. Is everything okay?', c: '#00C27C', items: ['AI briefing card', 'Health status buckets', 'Store list + sparklines', 'Alert count badges'] },
            { n: '02', title: 'Store', desc: 'Single-store deep dive. What happened here?', c: '#D4A03A', items: ['4 KPIs with sparklines', 'Hourly transaction chart', 'Top 5 products today', 'Local alerts + sentiment'] },
            { n: '03', title: 'Action', desc: 'Product-level detail. Let me fix this.', c: '#64A8E0', items: ['Stock levels per location', 'One-tap reorder', 'Price comparison', 'Compliance status'] },
          ].map(l => (
            <div key={l.n} className="rounded-3xl border border-[#2A2722] bg-[#161514] p-8 relative overflow-hidden">
              <div className="absolute -top-4 -right-2 text-[80px] font-black leading-none" style={{ color: `${l.c}08` }}>{l.n}</div>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${l.c}12` }}>
                  <span className="text-xl font-black" style={{ color: l.c }}>{l.n}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-2">{l.title}</h3>
                <p className="text-sm text-[#ADA599] mb-5">{l.desc}</p>
                <div className="space-y-2">
                  {l.items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: l.c }} />
                      <span className="text-sm text-[#ADA599]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ████ BOTTOM NAV RATIONALE ████ */}
      <div className="py-24" style={{ background: 'linear-gradient(180deg, #0D0C0A 0%, #12110F 50%, #0D0C0A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Navigation</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Bottom tab bar. Always visible.</h2>
          <p className="text-lg text-[#ADA599] mb-12 max-w-xl">65% higher engagement vs hamburger menus. 40% faster task completion.</p>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
            <div className="space-y-4">
              {[
                { icon: Home, tab: 'Home', desc: 'Portfolio health, AI briefing, store list ranked worst-first', c: '#D4A03A' },
                { icon: Bell, tab: 'Alerts', desc: 'Swipeable alert cards. Critical → Warning → Opportunity → Insight.', c: '#E87068' },
                { icon: Store, tab: 'Stores', desc: 'Store picker + drill-down: KPIs, hourly traffic, top products', c: '#00C27C' },
                { icon: MessageSquare, tab: 'Chat', desc: 'Nexus AI with voice input and inline action cards', c: '#B598E8' },
                { icon: BarChart3, tab: 'Reports', desc: 'Sparkline summaries with "Open Full Dashboard" escape hatch', c: '#64A8E0' },
              ].map(t => (
                <div key={t.tab} className="flex items-start gap-4 rounded-2xl border border-[#2A2722] bg-[#161514] p-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${t.c}12` }}>
                    <t.icon className="w-5 h-5" style={{ color: t.c }} />
                  </div>
                  <div><p className="text-[15px] font-bold text-white">{t.tab}</p><p className="text-sm text-[#ADA599] leading-relaxed">{t.desc}</p></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-start">
              <Phone><ScreenHome /></Phone>
            </div>
          </div>
        </div>
      </div>

      {/* ████ PWA + TECH ████ */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Technical</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">Progressive Web App.<br />No app store required.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Globe, title: 'Bypass App Store', desc: 'Cannabis apps face restrictions. A PWA installs from the browser in one tap.', c: '#00C27C' },
            { icon: WifiOff, title: 'Offline Caching', desc: 'Service workers cache last data. Review numbers in a back room with no signal.', c: '#64A8E0' },
            { icon: Bell, title: 'Web Push', desc: 'Supported on iOS 17+ and Android. Tiered alerts for every severity level.', c: '#E87068' },
            { icon: Download, title: 'Home Screen Install', desc: 'Full-screen, no browser chrome. Indistinguishable from native.', c: '#D4A03A' },
            { icon: RefreshCw, title: 'Background Sync', desc: 'Queue actions offline. Auto-execute when connectivity resumes.', c: '#B598E8' },
            { icon: Layers, title: 'One Codebase', desc: 'React + Vite + Tailwind. Same stack as v3. ~60% lower cost than native.', c: '#ADA599' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl border border-[#2A2722] bg-[#161514] p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.c}12` }}>
                <f.icon className="w-5 h-5" style={{ color: f.c }} />
              </div>
              <p className="text-[15px] font-bold text-white mb-1">{f.title}</p>
              <p className="text-sm text-[#ADA599] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        {/* Stack */}
        <div className="rounded-3xl border border-[#2A2722] bg-[#161514] p-8">
          <h3 className="text-lg font-bold text-white mb-6">Proposed Stack</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l:'Framework',t:'React 18 + Vite',n:'Same as v3' }, { l:'Styling',t:'Tailwind CSS',n:'Shared tokens' },
              { l:'State',t:'Context + SWR',n:'Cache + revalidate' }, { l:'PWA',t:'Workbox',n:'Service workers' },
              { l:'Routing',t:'React Router',n:'Hash-based' }, { l:'Charts',t:'SVG Sparklines',n:'Lightweight' },
              { l:'Push',t:'Web Push API',n:'VAPID keys' }, { l:'Deploy',t:'GitHub Pages',n:'Same pipeline' },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-[#2A2722] bg-[#0D0C0A] p-4">
                <p className="text-[9px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-1">{s.l}</p>
                <p className="text-sm font-bold text-white">{s.t}</p>
                <p className="text-xs text-[#6B6359]">{s.n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ████ DESIGN TOKENS ████ */}
      <div className="py-24" style={{ background: '#12110F' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#D4A03A] mb-3">Design System</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">Warm dark palette.</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { n: 'Background', h: '#0D0C0A' }, { n: 'Surface', h: '#161514' }, { n: 'Border', h: '#2A2722' },
              { n: 'Primary', h: '#F0EDE8' }, { n: 'Secondary', h: '#ADA599' }, { n: 'Muted', h: '#6B6359' },
              { n: 'Gold', h: '#D4A03A' }, { n: 'Green', h: '#00C27C' }, { n: 'Red', h: '#E87068' },
              { n: 'Blue', h: '#64A8E0' }, { n: 'Purple', h: '#B598E8' }, { n: 'Orange', h: '#FFA657' },
            ].map(c => (
              <div key={c.n} className="text-center">
                <div className="w-full aspect-square rounded-2xl mb-2 border border-[#2A2722]" style={{ background: c.h }} />
                <p className="text-xs font-bold text-white">{c.n}</p>
                <p className="text-[10px] text-[#6B6359] font-mono">{c.h}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ████ LAUNCH CTA ████ */}
      <div className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,160,58,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C27C]/20 bg-[#00C27C]/5 mb-6">
            <Zap className="w-4 h-4 text-[#00C27C]" />
            <span className="text-sm font-bold text-[#00C27C]">Interactive Prototype</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Try it now.</h2>
          <p className="text-lg text-[#ADA599] mb-10">Experience the full Nexus Mobile app with working navigation, all six screens, and real interaction patterns.</p>
          <a href="#/mobile" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #D4A03A, #B8860B)', boxShadow: '0 12px 40px rgba(212,160,58,0.35)' }}>
            <Smartphone className="w-6 h-6" /> Launch Mobile App
          </a>
        </div>
      </div>

      {/* ████ FOOTER ████ */}
      <div className="py-16 text-center border-t border-[#2A2722]">
        <NexusIcon size={32} className="mx-auto mb-4" />
        <p className="text-lg font-bold text-white mb-1">Nexus Mobile — Design Review</p>
        <p className="text-sm text-[#6B6359]">Dutchie AI · March 2026</p>
      </div>
    </div>
  );
}
