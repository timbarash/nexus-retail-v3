import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft, Bell, Store, BarChart3, MessageSquare,
  TrendingUp, AlertTriangle, Package, DollarSign, Star,
  ChevronRight, Check, Zap, Shield, Mic,
  Clock, MapPin, ShoppingCart, Send, Activity,
  Sparkles, Home, User, Monitor, RefreshCw, X,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════
   SHARED DATA — single source of truth for all screens
   ═══════════════════════════════════════════════════════════════════ */
const STORES_DATA = [
  {
    id: 'logan-square', name: 'Logan Square', state: 'IL', city: 'Chicago', score: 87,
    rev: '$48.2K', revNum: 48200, delta: '+12%', up: true, alerts: 0,
    spark: [5,6,7,6,8,9,9],
    kpis: [
      { l: 'Revenue', v: '$48.2K', d: '+12%', up: true, spark: [4,5,6,6,7,8,9] },
      { l: 'Transactions', v: '312', d: '+8%', up: true, spark: [3,4,4,5,5,6,7] },
      { l: 'Avg Basket', v: '$154', d: '+3%', up: true, spark: [5,5,5,5,6,6,6] },
      { l: 'Margin', v: '52.1%', d: '+0.4%', up: true, spark: [5,5,5,5,5,5,5] },
    ],
    hourly: [2,5,12,18,24,31,28,35,42,38,29,22,15,8],
    topProducts: [
      { name: 'Ozone Cake Mints', u: 47, rev: '$2,115' },
      { name: 'Baby Jeeter Churros', u: 38, rev: '$1,330' },
      { name: 'Stiiizy OG Kush', u: 31, rev: '$1,395' },
      { name: 'Camino Gummies', u: 28, rev: '$616' },
      { name: 'Simply Herb Pre-Roll', u: 24, rev: '$360' },
    ],
    sentiment: { score: 78, delta: '+6 pts', note: '"Staff Friendliness" trending up 12%' },
  },
  {
    id: 'fort-lee', name: 'Fort Lee', state: 'NJ', city: 'Fort Lee', score: 79,
    rev: '$41.6K', revNum: 41600, delta: '+5%', up: true, alerts: 1,
    spark: [4,4,5,5,6,5,6],
    kpis: [
      { l: 'Revenue', v: '$41.6K', d: '+5%', up: true, spark: [3,4,4,5,5,5,6] },
      { l: 'Transactions', v: '267', d: '+3%', up: true, spark: [4,4,4,5,5,5,5] },
      { l: 'Avg Basket', v: '$156', d: '+1.8%', up: true, spark: [5,5,5,5,5,6,6] },
      { l: 'Margin', v: '49.7%', d: '-0.2%', up: false, spark: [5,5,5,5,5,5,4] },
    ],
    hourly: [1,3,9,14,20,26,24,30,35,32,25,18,12,6],
    topProducts: [
      { name: 'Stiiizy Pod LLR 1g', u: 42, rev: '$1,890' },
      { name: 'Baby Jeeter Churros', u: 35, rev: '$1,225' },
      { name: 'Ozone Gummies 100mg', u: 29, rev: '$725' },
      { name: 'Blue Dream 3.5g', u: 24, rev: '$1,080' },
      { name: 'Camino Gummies', u: 21, rev: '$462' },
    ],
    sentiment: { score: 71, delta: '+2 pts', note: '"Product Selection" rated 4.3 stars' },
  },
  {
    id: 'springfield', name: 'Springfield', state: 'IL', city: 'Springfield', score: 74,
    rev: '$52.1K', revNum: 52100, delta: '+34%', up: true, alerts: 0,
    spark: [3,4,4,5,6,8,10],
    kpis: [
      { l: 'Revenue', v: '$52.1K', d: '+34%', up: true, spark: [3,4,4,5,6,8,10] },
      { l: 'Transactions', v: '386', d: '+28%', up: true, spark: [3,3,4,5,6,7,9] },
      { l: 'Avg Basket', v: '$135', d: '+4.6%', up: true, spark: [4,4,4,5,5,5,6] },
      { l: 'Margin', v: '51.3%', d: '+1.1%', up: true, spark: [4,4,5,5,5,5,6] },
    ],
    hourly: [3,7,15,22,28,34,32,38,45,42,33,26,18,10],
    topProducts: [
      { name: 'Baby Jeeter Churros', u: 52, rev: '$1,820' },
      { name: 'Ozone Cake Mints', u: 44, rev: '$1,980' },
      { name: 'Simply Herb Pre-Roll', u: 39, rev: '$585' },
      { name: 'Camino Gummies', u: 33, rev: '$726' },
      { name: 'Blue Dream 3.5g', u: 28, rev: '$1,260' },
    ],
    sentiment: { score: 68, delta: '+9 pts', note: '"Wait Times" improved by 18%' },
  },
  {
    id: 'boston', name: 'Boston', state: 'MA', city: 'Boston', score: 65,
    rev: '$29.8K', revNum: 29800, delta: '-3%', up: false, alerts: 1,
    spark: [6,5,5,4,5,4,4],
    kpis: [
      { l: 'Revenue', v: '$29.8K', d: '-3%', up: false, spark: [6,5,5,4,5,4,4] },
      { l: 'Transactions', v: '198', d: '-5%', up: false, spark: [6,5,5,5,4,4,4] },
      { l: 'Avg Basket', v: '$151', d: '+2.1%', up: true, spark: [5,5,5,5,5,6,6] },
      { l: 'Margin', v: '48.9%', d: '-1.2%', up: false, spark: [6,5,5,5,5,5,4] },
    ],
    hourly: [1,2,7,11,16,20,18,22,28,24,19,14,9,5],
    topProducts: [
      { name: 'Tunnel Vision 5-Pack', u: 28, rev: '$840' },
      { name: 'Blue Dream 3.5g', u: 22, rev: '$990' },
      { name: 'Stiiizy OG Kush', u: 19, rev: '$855' },
      { name: 'Ozone Cake Mints', u: 15, rev: '$675' },
      { name: 'Camino Gummies', u: 12, rev: '$264' },
    ],
    sentiment: { score: 59, delta: '-2 pts', note: '"Parking Availability" rated 2.8 stars' },
  },
  {
    id: 'morenci', name: 'Morenci', state: 'MI', city: 'Morenci', score: 48,
    rev: '$12.4K', revNum: 12400, delta: '-23%', up: false, alerts: 3,
    spark: [7,6,5,4,3,3,2],
    kpis: [
      { l: 'Revenue', v: '$12.4K', d: '-23%', up: false, spark: [7,6,5,4,3,3,2] },
      { l: 'Transactions', v: '89', d: '-18%', up: false, spark: [7,6,6,5,4,4,3] },
      { l: 'Avg Basket', v: '$139', d: '-6%', up: false, spark: [6,6,5,5,5,4,4] },
      { l: 'Margin', v: '44.2%', d: '-3.1%', up: false, spark: [7,6,6,5,5,4,4] },
    ],
    hourly: [0,1,3,5,8,11,10,13,16,14,10,7,4,2],
    topProducts: [
      { name: 'Simply Herb Pre-Roll', u: 14, rev: '$210' },
      { name: 'Camino Gummies', u: 11, rev: '$242' },
      { name: 'Blue Dream 3.5g', u: 9, rev: '$405' },
      { name: 'Ozone Cake Mints', u: 7, rev: '$315' },
      { name: 'Baby Jeeter Churros', u: 5, rev: '$175' },
    ],
    sentiment: { score: 42, delta: '-8 pts', note: '"Product Availability" rated 2.1 stars' },
  },
];

const INITIAL_ALERTS = [
  { id: 'a1', sev: 'CRITICAL', color: '#E87068', time: '2m', title: 'Blue Dream 3.5g out at 4 stores', ai: 'Reorder 200 units for $2,840. Est. delivery: 2 days.', actions: ['Approve Reorder', 'Modify'], inventoryLink: 'blue-dream', storeIds: ['logan-square','fort-lee','boston','morenci'] },
  { id: 'a2', sev: 'WARNING', color: '#D4A03A', time: '15m', title: 'Stiiizy Pod 18% above market avg', ai: 'Suggest $44.99 (currently $52). Projected +23% velocity.', actions: ['Apply Price', 'View Comps'], storeIds: ['fort-lee'] },
  { id: 'a3', sev: 'OPPORTUNITY', color: '#00C27C', time: '1h', title: 'Jeeter brand sentiment spike +34%', ai: '2 stores don\'t stock it. Trending on social.', actions: ['Draft PO', 'View Data'], storeIds: ['boston','morenci'] },
];

const INITIAL_INVENTORY = [
  { id: 'blue-dream', name: 'Blue Dream 3.5g', store: '4 stores', hours: 12, cost: '$2,840', sev: 'critical' },
  { id: 'ozone-gummies', name: 'Ozone Gummies 100mg', store: 'Fort Lee', hours: 36, cost: '$675', sev: 'warning' },
  { id: 'tunnel-vision', name: 'Tunnel Vision 5-Pack', store: 'Boston', hours: 48, cost: '$420', sev: 'warning' },
  { id: 'stiiizy-pod', name: 'Stiiizy Pod LLR 1g', store: 'Hoboken', hours: 72, cost: '$1,125', sev: 'low' },
];

/* ═══════════════════════════════════════════════════════════════════
   SPARKLINE — tiny inline chart (matches prototype exactly)
   ═══════════════════════════════════════════════════════════════════ */
function Spark({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 36, h = 12 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* ═══════════════════════════════════════════════════════════════════
   TOAST — feedback for actions
   ═══════════════════════════════════════════════════════════════════ */
function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const bg = type === 'success' ? '#00C27C' : type === 'warning' ? '#D4A03A' : '#64A8E0';
  return (
    <div className="fixed top-4 left-4 right-4 z-[10000] flex justify-center animate-in" style={{ animation: 'slideDown 0.3s ease-out' }}>
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl max-w-sm w-full" style={{ background: '#1E1D1B', border: `1px solid ${bg}40` }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${bg}20` }}>
          <Check className="w-3.5 h-3.5" style={{ color: bg }} />
        </div>
        <span className="text-[12px] text-white font-medium flex-1">{message}</span>
        <button onClick={onDismiss} className="p-0.5"><X className="w-3.5 h-3.5 text-[#6B6359]" /></button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM NAV — matches prototype structure, interactive
   ═══════════════════════════════════════════════════════════════════ */
function BottomNav({ active = 'home', onNavigate, alertCount = 0 }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: alertCount },
    { id: 'stores', icon: Store, label: 'Stores' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-3" style={{ background: 'linear-gradient(transparent 0%, rgba(10,9,8,0.95) 40%)' }}>
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          const on = t.id === active;
          return (
            <button key={t.id} onClick={() => onNavigate(t.id)} className="flex flex-col items-center gap-[2px] outline-none relative">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${on ? 'bg-[#D4A03A]/15' : ''}`}>
                <Icon className={`w-[16px] h-[16px] ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
                {t.badge > 0 && <span className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white">{t.badge}</span>}
              </div>
              <span className={`text-[8px] font-semibold ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: HOME — Portfolio health (matches prototype ScreenHome)
   ═══════════════════════════════════════════════════════════════════ */
function ScreenHome({ stores, alerts, onNavigate, onSelectStore }) {
  const totalAlerts = alerts.length;
  const criticalAlerts = alerts.filter(a => a.sev === 'CRITICAL').length;
  const totalRev = stores.reduce((s, st) => s + st.revNum, 0);
  const healthy = stores.filter(s => s.score >= 75).length;
  const watch = stores.filter(s => s.score >= 55 && s.score < 75).length;
  const critical = stores.filter(s => s.score < 55).length;

  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header — exact prototype match */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <NexusIcon size={16} />
          <span className="text-[12px] font-bold text-white">Nexus</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative" onClick={() => onNavigate('alerts')}>
            <Bell className="w-4 h-4 text-[#ADA599]" />
            {totalAlerts > 0 && <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#E87068] border border-[#0A0908]" />}
          </button>
          <div className="w-6 h-6 rounded-full bg-[#D4A03A]/20 flex items-center justify-center"><User className="w-3 h-3 text-[#D4A03A]" /></div>
        </div>
      </div>
      {/* AI Briefing — exact prototype match */}
      <div className="rounded-2xl p-3.5 mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.10), rgba(212,160,58,0.03))', border: '1px solid rgba(212,160,58,0.18)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-[#D4A03A]" />
          <span className="text-[8px] font-bold text-[#D4A03A] uppercase tracking-[1.5px]">AI Briefing</span>
        </div>
        <p className="text-[10px] text-[#C8C3BA] leading-[1.6] italic mb-2.5">{`"Best Friday this quarter. Springfield drove 34% of revenue. ${totalAlerts > 0 ? `${totalAlerts} items need reordering.` : 'All clear — no alerts!'}"`}</p>
        <div className="flex gap-4">
          {[
            { l: 'Revenue', v: `$${(totalRev / 1000).toFixed(1)}K`, t: '+12%', up: true },
            { l: 'Traffic', v: '2,140', t: '+8%', up: true },
            { l: 'Alerts', v: String(totalAlerts), t: criticalAlerts > 0 ? `${criticalAlerts} critical` : 'none critical', up: criticalAlerts === 0 },
          ].map(m => (
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
      {/* Status buckets — exact prototype match */}
      <div className="flex gap-2 mb-3">
        {[{ n: healthy, l: 'Healthy', c: '#00C27C' }, { n: watch, l: 'Watch', c: '#D4A03A' }, { n: critical, l: 'Critical', c: '#E87068' }].map(s => (
          <div key={s.l} className="flex-1 rounded-xl p-2 text-center" style={{ background: `${s.c}0D`, border: `1px solid ${s.c}25` }}>
            <p className="text-[14px] font-extrabold" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[7px] font-semibold" style={{ color: `${s.c}99` }}>{s.l}</p>
          </div>
        ))}
      </div>
      {/* Stores — worst first, exact prototype card structure */}
      <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Stores — worst first</p>
      <div className="space-y-2">
        {[...stores].sort((a, b) => a.score - b.score).map(s => {
          const c = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          const storeAlerts = alerts.filter(al => al.storeIds?.includes(s.id)).length;
          return (
            <button key={s.id} onClick={() => onSelectStore(s)} className="w-full rounded-xl border border-[#2A2722] bg-[#161514] p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `conic-gradient(${c} ${s.score * 3.6}deg, #2A2722 0deg)` }}>
                <div className="w-7 h-7 rounded-full bg-[#161514] flex items-center justify-center text-[10px] font-bold" style={{ color: c }}>{s.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white truncate">{s.name}</span>
                  <span className="text-[9px] text-[#6B6359]">{s.state}</span>
                  {storeAlerts > 0 && <span className="ml-auto w-[18px] h-[18px] rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{storeAlerts}</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-white">{s.rev}</span>
                  <span className={`text-[9px] font-semibold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</span>
                  <Spark data={s.spark} color={s.up ? '#00C27C' : '#E87068'} />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#38332B] flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: ALERTS — matches prototype ScreenAlerts exactly
   ═══════════════════════════════════════════════════════════════════ */
function ScreenAlerts({ alerts, resolvedAlerts, onAction, onNavigate }) {
  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header — exact prototype match */}
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Smart Alerts</p><p className="text-[9px] text-[#6B6359]">Tap actions to resolve</p></div>
        <span className="text-[9px] font-bold text-[#E87068] bg-[#E87068]/10 px-2.5 py-1 rounded-full">{alerts.length} active</span>
      </div>
      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-8 text-center">
          <Check className="w-10 h-10 text-[#00C27C] mx-auto mb-3" />
          <p className="text-[14px] font-bold text-white mb-1">All Clear</p>
          <p className="text-[11px] text-[#6B6359]">No active alerts. Great job!</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {alerts.map((a, i) => (
            <div key={a.id} className="rounded-2xl border overflow-hidden" style={{ borderColor: i === 0 ? `${a.color}50` : '#2A2722', background: i === 0 ? `${a.color}08` : '#161514' }}>
              <div className="p-3.5">
                {/* Severity badge + time — exact prototype */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] font-bold px-2 py-[3px] rounded-full" style={{ color: a.color, background: `${a.color}18`, border: `1px solid ${a.color}30` }}>{a.sev}</span>
                  <span className="text-[8px] text-[#6B6359]">{a.time} ago</span>
                </div>
                {/* Title — exact prototype */}
                <p className="text-[11px] font-semibold text-white mb-2">{a.title}</p>
                {/* AI recommendation — exact prototype with Sparkles icon */}
                <div className="rounded-xl px-3 py-2 mb-3" style={{ background: `${a.color}08`, border: `1px solid ${a.color}12` }}>
                  <div className="flex items-start gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" style={{ color: a.color }} />
                    <p className="text-[9px] text-[#C8C3BA] italic leading-[1.5]">{a.ai}</p>
                  </div>
                </div>
                {/* Action buttons — exact prototype styling, interactive */}
                <div className="flex gap-2">
                  {a.actions.map((act, j) => (
                    <button key={j} onClick={() => onAction(a.id, act)} className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all active:scale-[0.97] ${j === 0 ? 'text-white' : 'text-[#ADA599] border border-[#38332B]'}`} style={j === 0 ? { background: a.color } : undefined}>{act}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Auto-resolved — exact prototype match */}
      <div className="mt-3 rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5">
        <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Auto-Resolved</p>
        {resolvedAlerts.map(r => (
          <div key={r} className="flex items-center gap-2 text-[9px] text-[#00C27C] mb-1 last:mb-0">
            <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" /> {r}
          </div>
        ))}
        {['Register sync — fixed', 'March campaign — launched', 'Stiiizy Pods — auto-reordered'].map(r => (
          <div key={r} className="flex items-center gap-2 text-[9px] text-[#ADA599] mb-1 last:mb-0">
            <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" /> {r}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: STORES LIST — dedicated store list tab
   ═══════════════════════════════════════════════════════════════════ */
function ScreenStores({ stores, alerts, onSelectStore }) {
  return (
    <div className="px-4 pt-2 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">All Stores</p><p className="text-[9px] text-[#6B6359]">{stores.length} locations</p></div>
      </div>
      {/* Store cards — same structure as Home store list */}
      <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">By health score</p>
      <div className="space-y-2">
        {[...stores].sort((a, b) => a.score - b.score).map(s => {
          const c = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          const storeAlerts = alerts.filter(al => al.storeIds?.includes(s.id)).length;
          return (
            <button key={s.id} onClick={() => onSelectStore(s)} className="w-full rounded-xl border border-[#2A2722] bg-[#161514] p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `conic-gradient(${c} ${s.score * 3.6}deg, #2A2722 0deg)` }}>
                <div className="w-7 h-7 rounded-full bg-[#161514] flex items-center justify-center text-[10px] font-bold" style={{ color: c }}>{s.score}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white truncate">{s.name}</span>
                  <span className="text-[9px] text-[#6B6359]">{s.city}, {s.state}</span>
                  {storeAlerts > 0 && <span className="ml-auto w-[18px] h-[18px] rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{storeAlerts}</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-white">{s.rev}</span>
                  <span className={`text-[9px] font-semibold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</span>
                  <Spark data={s.spark} color={s.up ? '#00C27C' : '#E87068'} />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#38332B] flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: STORE DETAIL — matches prototype ScreenStore exactly
   ═══════════════════════════════════════════════════════════════════ */
function ScreenStoreDetail({ store, alerts, onBack, onNavigate }) {
  if (!store) return null;
  const c = store.score >= 75 ? '#00C27C' : store.score >= 55 ? '#D4A03A' : '#E87068';
  const maxHourly = Math.max(...store.hourly);

  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header — exact prototype: back arrow + store name + score ring */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-white">{store.name}</p>
          <p className="text-[9px] text-[#6B6359]">{store.city}, {store.state}</p>
        </div>
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${c} ${store.score * 3.6}deg, #2A2722 0deg)` }}>
          <div className="rounded-full bg-[#0A0908] flex items-center justify-center text-[11px] font-bold" style={{ width: 30, height: 30, color: c }}>{store.score}</div>
        </div>
      </div>
      {/* KPIs — exact prototype 2x2 grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {store.kpis.map(k => (
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
      {/* Hourly chart — exact prototype bar chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-3">Hourly Transactions</p>
        <div className="flex items-end gap-[4px] h-[50px]">
          {store.hourly.map((v, i) => {
            const peakIdx = store.hourly.indexOf(maxHourly);
            return (
              <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${(v / maxHourly) * 100}%`, background: i === peakIdx ? '#D4A03A' : v > maxHourly * 0.7 ? '#00C27C' : '#2A2722' }} />
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5 text-[7px] text-[#6B6359]">
          <span>8am</span><span>12pm</span><span>4pm</span><span>9pm</span>
        </div>
      </div>
      {/* Top Products — exact prototype list */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Top Products Today</p>
        {store.topProducts.map((p, i) => (
          <div key={i} className="flex items-center py-1.5 border-b border-[#2A2722]/60 last:border-0">
            <span className="w-4 text-[9px] font-bold text-[#6B6359]">{i + 1}</span>
            <span className="text-[10px] text-white flex-1">{p.name}</span>
            <span className="text-[9px] font-bold text-white">{p.rev}</span>
            <span className="text-[8px] text-[#6B6359] ml-2 w-5 text-right">{p.u}u</span>
          </div>
        ))}
      </div>
      {/* Sentiment — exact prototype styling */}
      <div className="rounded-2xl border p-3.5" style={{ borderColor: `${c}25`, background: `${c}08` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5" style={{ color: c }} />
            <span className="text-[10px] font-bold text-white">Sentiment: {store.sentiment.score}</span>
          </div>
          <span className="text-[9px] font-semibold" style={{ color: c }}>{store.sentiment.delta}</span>
        </div>
        <p className="text-[9px] text-[#ADA599] mt-1">{store.sentiment.note}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: AI CHAT — matches prototype ScreenChat exactly
   ═══════════════════════════════════════════════════════════════════ */
function ScreenChat({ alerts, inventory, onReorderAll, onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const stockoutItems = inventory.filter(i => i.sev === 'critical' || i.sev === 'warning');
  const totalCost = inventory.reduce((s, i) => s + parseInt(i.cost.replace(/[$,]/g, '')), 0);

  // Initialize with stockout conversation matching prototype
  useEffect(() => {
    setMessages([
      { from: 'user', text: 'Show me stockout risks across all stores' },
      { from: 'ai', text: `Found **${stockoutItems.length} products** at risk:`, items: stockoutItems, totalCost },
    ]);
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = text.trim();
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      let reply;
      const lower = msg.toLowerCase();
      if (lower.includes('reorder') || lower.includes('inventory')) {
        reply = { from: 'ai', text: `You have **${inventory.length} items** needing attention. The most urgent is **${inventory[0]?.name}** with only ${inventory[0]?.hours}h of stock left.`, action: { label: 'View Inventory', screen: 'inventory' } };
      } else if (lower.includes('weekly') || lower.includes('summary') || lower.includes('report')) {
        reply = { from: 'ai', text: 'Revenue is up **12%** this week, with Springfield leading at +34%. Morenci continues to underperform at -23%. 2 alerts resolved automatically.', action: { label: 'View Full Reports', screen: 'reports' } };
      } else if (lower.includes('price') || lower.includes('pricing')) {
        const priceAlert = alerts.find(a => a.title.includes('above market'));
        reply = { from: 'ai', text: priceAlert ? `Found a pricing issue: ${priceAlert.title}. ${priceAlert.ai}` : 'All products are priced competitively. No pricing adjustments recommended at this time.', action: { label: 'View Alerts', screen: 'alerts' } };
      } else if (lower.includes('staff') || lower.includes('schedule')) {
        reply = { from: 'ai', text: 'Peak hours across stores are **12pm-3pm** and **5pm-8pm**. Logan Square and Springfield could use 1 extra budtender during these windows based on transaction volume.' };
      } else {
        reply = { from: 'ai', text: `I can help with that! Here's what I see across your ${STORES_DATA.length} stores: overall health score is **${Math.round(STORES_DATA.reduce((s, st) => s + st.score, 0) / STORES_DATA.length)}** with ${alerts.length} active alerts. Want me to drill into any specific area?` };
      }
      setMessages(prev => [...prev, reply]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="px-4 pt-2 pb-24 flex flex-col" style={{ minHeight: 'calc(100vh - 60px)' }}>
      {/* Header — exact prototype: NexusIcon + "Nexus AI" + Online */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1710, #2A2318)', border: '1px solid rgba(212,160,58,0.2)' }}>
          <NexusIcon size={16} />
        </div>
        <div>
          <span className="text-[12px] font-bold text-white">Nexus AI</span>
          <div className="flex items-center gap-1"><span className="w-[5px] h-[5px] rounded-full bg-[#00C27C]" /><span className="text-[8px] text-[#00C27C] font-medium">Online</span></div>
        </div>
      </div>
      {/* Quick prompts — exact prototype pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {['Reorder inventory', 'Weekly summary', 'Price check', 'Staff schedule'].map(s => (
          <button key={s} onClick={() => sendMessage(s)} className="px-2.5 py-1 rounded-full text-[9px] font-medium text-[#D4A03A] border border-[#D4A03A]/25 bg-[#D4A03A]/5 active:scale-[0.95] transition-transform">{s}</button>
        ))}
      </div>
      {/* Conversation — exact prototype structure */}
      <div className="flex-1 space-y-3">
        {messages.map((msg, idx) => msg.from === 'user' ? (
          /* User message — right-aligned, exact prototype */
          <div key={idx} className="flex justify-end">
            <div className="rounded-2xl rounded-br-md bg-[#D4A03A]/12 border border-[#D4A03A]/20 px-3.5 py-2 max-w-[82%]">
              <p className="text-[10px] text-white">{msg.text}</p>
            </div>
          </div>
        ) : (
          /* AI message — left-aligned with NexusIcon, exact prototype */
          <div key={idx} className="flex gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
              <NexusIcon size={10} />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-3.5 py-2.5 max-w-[82%]">
              <p className="text-[10px] text-[#C8C3BA] leading-[1.6] mb-2" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>') }} />
              {/* Stockout items table — exact prototype */}
              {msg.items && msg.items.map(p => (
                <div key={p.id || p.name} className="flex items-center justify-between py-1.5 border-b border-[#2A2722]/60 last:border-0">
                  <div><p className="text-[9px] font-semibold text-white">{p.name}</p><p className="text-[8px] text-[#6B6359]">{p.store}</p></div>
                  <span className="text-[9px] font-bold" style={{ color: p.sev === 'critical' ? '#E87068' : '#D4A03A' }}>{p.hours}h</span>
                </div>
              ))}
              {/* Approve All Reorders button — exact prototype */}
              {msg.items && (
                <button onClick={onReorderAll} className="mt-2.5 w-full py-2 rounded-xl bg-[#00C27C] text-[10px] font-bold text-white active:scale-[0.97] transition-transform">Approve All Reorders — ${totalCost.toLocaleString()}</button>
              )}
              {msg.action && (
                <button onClick={() => onNavigate(msg.action.screen)} className="mt-2 text-[9px] font-semibold text-[#D4A03A] active:opacity-70">{msg.action.label}</button>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
              <NexusIcon size={10} />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-3.5 py-2.5">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Input bar — exact prototype: NexusIcon + input + Mic + Send */}
      <div className="mt-3 flex items-center gap-2 bg-[#161514] border border-[#2A2722] rounded-2xl px-3.5 py-2.5">
        <NexusIcon size={12} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask Nexus anything..."
          className="text-[10px] text-white placeholder-[#6B6359] bg-transparent outline-none flex-1"
        />
        <Mic className="w-4 h-4 text-[#6B6359]" />
        <button onClick={() => sendMessage(input)} className="active:scale-90 transition-transform">
          <Send className="w-4 h-4 text-[#D4A03A]" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: INVENTORY — matches prototype ScreenInventory exactly
   ═══════════════════════════════════════════════════════════════════ */
function ScreenInventory({ inventory, onReorder, onReorderAll }) {
  const activeItems = inventory.filter(i => i.status !== 'ordered');
  const orderedItems = inventory.filter(i => i.status === 'ordered');

  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header — exact prototype: "Low Stock" + "Approve All" button */}
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Low Stock</p><p className="text-[9px] text-[#6B6359]">{activeItems.length} items need attention</p></div>
        {activeItems.length > 0 && (
          <button onClick={onReorderAll} className="px-3.5 py-1.5 rounded-xl bg-[#00C27C] text-[10px] font-bold text-white active:scale-[0.97] transition-transform">Approve All</button>
        )}
      </div>
      {activeItems.length === 0 && orderedItems.length === 0 ? (
        <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-8 text-center">
          <Package className="w-10 h-10 text-[#00C27C] mx-auto mb-3" />
          <p className="text-[14px] font-bold text-white mb-1">All Stocked Up</p>
          <p className="text-[11px] text-[#6B6359]">No items are running low. You're in great shape!</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Inventory cards — exact prototype structure */}
          {activeItems.map(it => {
            const c = it.sev === 'critical' ? '#E87068' : it.sev === 'warning' ? '#D4A03A' : '#64A8E0';
            return (
              <div key={it.id} className="rounded-2xl border bg-[#161514] p-3.5" style={{ borderColor: it.sev === 'critical' ? `${c}40` : '#2A2722' }}>
                {/* Name + hours countdown — exact prototype */}
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
                {/* Progress bar — exact prototype */}
                <div className="h-[6px] rounded-full bg-[#2A2722] overflow-hidden mb-2.5">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(8, 100 - (it.hours / 96) * 100)}%`, background: c }} />
                </div>
                {/* Cost + Reorder button — exact prototype */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#ADA599]">{it.cost}</span>
                  <button onClick={() => onReorder(it.id)} className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-white active:scale-[0.97] transition-transform" style={{ background: c }}>Reorder Now</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Ordered items */}
      {orderedItems.length > 0 && (
        <div className="mt-3">
          <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Ordered — En Route</p>
          <div className="space-y-2">
            {orderedItems.map(it => (
              <div key={it.id} className="rounded-xl border border-[#00C27C]/20 bg-[#00C27C]/5 p-3 flex items-center gap-2">
                <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-white">{it.name}</p>
                  <p className="text-[8px] text-[#6B6359]">{it.store} · {it.cost}</p>
                </div>
                <span className="text-[8px] font-semibold text-[#00C27C]">Ordered</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN: REPORTS — matches prototype ScreenReports exactly
   ═══════════════════════════════════════════════════════════════════ */
function ScreenReports({ period, setPeriod }) {
  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header with period toggles — exact prototype */}
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Reports</p><p className="text-[9px] text-[#6B6359]">Last {period === '7D' ? '7 Days' : period === '30D' ? '30 Days' : 'Quarter'} · All Stores</p></div>
        <div className="flex gap-1">{['7D','30D','QTR'].map(r => (<button key={r} onClick={() => setPeriod(r)} className={`px-2 py-1 rounded-lg text-[8px] font-bold transition-all ${r===period?'bg-[#D4A03A]/15 text-[#D4A03A]':'text-[#6B6359]'}`}>{r}</button>))}</div>
      </div>
      {/* Revenue SVG chart — exact prototype */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Revenue</p>
        <svg width="100%" height="70" viewBox="0 0 250 70" preserveAspectRatio="none">
          <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C27C" stopOpacity="0.25" /><stop offset="100%" stopColor="#00C27C" stopOpacity="0" /></linearGradient></defs>
          <path d="M0,55 L25,48 L50,52 L75,40 L100,35 L125,38 L150,28 L175,22 L200,25 L225,15 L250,10 L250,70 L0,70Z" fill="url(#rg)" />
          <polyline points="0,55 25,48 50,52 75,40 100,35 125,38 150,28 175,22 200,25 225,15 250,10" fill="none" stroke="#00C27C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* KPIs — exact prototype 2x2 grid with colored left border */}
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
      {/* Category breakdown bars — exact prototype */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">By Category</p>
        {[{ n:'Flower',p:38,c:'#00C27C'},{n:'Vapes',p:28,c:'#64A8E0'},{n:'Edibles',p:18,c:'#B598E8'},{n:'Pre-Rolls',p:11,c:'#D4A03A'},{n:'Other',p:5,c:'#6B6359'}].map(c=>(
          <div key={c.n} className="flex items-center gap-2 mb-1.5"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:c.c}}/><span className="text-[9px] text-[#ADA599] w-14">{c.n}</span><div className="flex-1 h-2 rounded-full bg-[#2A2722] overflow-hidden"><div className="h-full rounded-full" style={{width:`${c.p}%`,background:c.c}}/></div><span className="text-[9px] font-bold text-white w-8 text-right">{c.p}%</span></div>
        ))}
      </div>
      {/* Open Full Dashboard button — exact prototype */}
      <a href="#/" className="w-full py-2.5 rounded-xl border border-[#2A2722] bg-[#161514] text-[10px] text-[#ADA599] font-semibold flex items-center justify-center gap-1.5"><Monitor className="w-3.5 h-3.5" />Open Full Dashboard</a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP — centralized state, connected data & actions
   ═══════════════════════════════════════════════════════════════════ */
export default function NexusMobileWeb() {
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState([]);
  const [period, setPeriod] = useState('30D');
  const [selectedStore, setSelectedStore] = useState(null);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY.map(i => ({ ...i, status: 'active' })));
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const navigate = useCallback((id, data) => {
    setHistory(prev => [...prev, screen]);
    if (id === 'store-detail' && data) setSelectedStore(data);
    setScreen(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [screen]);

  const goBack = useCallback(() => {
    const prev = history[history.length - 1] || 'home';
    setHistory(h => h.slice(0, -1));
    setScreen(prev);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [history]);

  const handleSelectStore = useCallback((store) => {
    navigate('store-detail', store);
  }, [navigate]);

  // Alert action handler — connects alerts to inventory
  const handleAlertAction = useCallback((alertId, action) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    if (action === 'Approve Reorder') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      if (alert.inventoryLink) {
        setInventory(prev => prev.map(i => i.id === alert.inventoryLink ? { ...i, status: 'ordered' } : i));
      }
      setResolvedAlerts(prev => [`${alert.title} — reorder approved`, ...prev]);
      showToast('Reorder approved — delivery in 2 days');
    } else if (action === 'Apply Price') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setResolvedAlerts(prev => [`${alert.title} — price adjusted`, ...prev]);
      showToast('Price updated to $44.99 across all stores');
    } else if (action === 'Draft PO') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setResolvedAlerts(prev => [`${alert.title} — PO drafted`, ...prev]);
      showToast('Purchase order drafted for Jeeter brand');
    } else if (action === 'Modify' || action === 'View Comps' || action === 'View Data') {
      showToast(`Opening ${action.toLowerCase()}...`, 'info');
    }
  }, [alerts, showToast]);

  // Inventory reorder handler
  const handleReorder = useCallback((itemId) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, status: 'ordered' } : i));
    setAlerts(prev => prev.filter(a => a.inventoryLink !== itemId));
    if (item.name) {
      setResolvedAlerts(prev => [`${item.name} — reordered`, ...prev]);
    }
    showToast(`${item.name} reorder placed — ${item.cost}`);
  }, [inventory, showToast]);

  // Reorder all active inventory items
  const handleReorderAll = useCallback(() => {
    const activeItems = inventory.filter(i => i.status !== 'ordered');
    if (activeItems.length === 0) return;
    setInventory(prev => prev.map(i => ({ ...i, status: 'ordered' })));
    const linkedAlertIds = alerts.filter(a => a.inventoryLink).map(a => a.id);
    setAlerts(prev => prev.filter(a => !linkedAlertIds.includes(a.id)));
    activeItems.forEach(i => {
      setResolvedAlerts(prev => [`${i.name} — reordered`, ...prev]);
    });
    const totalCost = activeItems.reduce((s, i) => s + parseInt(i.cost.replace(/[$,]/g, '')), 0);
    showToast(`All ${activeItems.length} items reordered — $${totalCost.toLocaleString()}`);
  }, [inventory, alerts, showToast]);

  const activeTab = screen === 'store-detail' ? 'stores'
    : screen === 'inventory' ? 'alerts'
    : screen;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0D0C0A] text-[#F0EDE8] overflow-y-auto overscroll-none" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onDismiss={dismissToast} />}
      <div className="max-w-lg mx-auto min-h-screen">
        {screen === 'home' && <ScreenHome stores={STORES_DATA} alerts={alerts} onNavigate={navigate} onSelectStore={handleSelectStore} />}
        {screen === 'alerts' && <ScreenAlerts alerts={alerts} resolvedAlerts={resolvedAlerts} onAction={handleAlertAction} onNavigate={navigate} />}
        {screen === 'stores' && <ScreenStores stores={STORES_DATA} alerts={alerts} onSelectStore={handleSelectStore} />}
        {screen === 'store-detail' && <ScreenStoreDetail store={selectedStore} alerts={alerts} onBack={goBack} onNavigate={navigate} />}
        {screen === 'chat' && <ScreenChat alerts={alerts} inventory={inventory} onReorderAll={handleReorderAll} onNavigate={navigate} />}
        {screen === 'inventory' && <ScreenInventory inventory={inventory} onReorder={handleReorder} onReorderAll={handleReorderAll} />}
        {screen === 'reports' && <ScreenReports period={period} setPeriod={setPeriod} />}
      </div>
      <BottomNav active={activeTab} onNavigate={navigate} alertCount={alerts.length} />
    </div>
  );
}
