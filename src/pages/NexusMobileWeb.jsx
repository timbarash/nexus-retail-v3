import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Home, Bell, Zap, MessageSquare, LayoutGrid,
  ArrowLeft, Check, X, Sparkles, Send, Mic,
  ChevronRight, TrendingUp, TrendingDown, AlertTriangle,
  Package, DollarSign, Star, Clock, MapPin,
  ShoppingCart, Activity, Shield, RefreshCw, User,
  BarChart3, Store, Search, ArrowUpDown, Percent,
  Eye, Truck, Box, Clipboard, Camera, FileText,
  ArrowRightLeft, Lock, Megaphone, Rocket, Users,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA MODEL — Pulled from the real desktop prototype files
   ═══════════════════════════════════════════════════════════════════════════ */

// From NexusHome.jsx — NEXUS_DATA
const NEXUS_DATA = {
  todaySales: 454_700,
  salesGoal: 500_000,
  salesVsGoalPct: -8,
  topStore: 'Logan Square',
  topStoreRevenue: 750_000,
  underperformer: 'Morenci, MI',
  underperformerDelta: -23,
  traffic: { today: 5_460, yesterday: 5_120, trend: 'up' },
  lowStockAlerts: 7,
  stockoutRisk: 3,
  overallSentiment: 68,
  sentimentTrend: 'up',
  sentimentDelta: +4,
  npsScore: 34,
  npsDelta: +6,
  topPositiveTopic: 'Staff Friendliness',
  topNegativeTopic: 'Wait Times',
  activeMembers: 18_420,
  discountWaste: 127_400,
  sentimentTopics: [
    { topic: 'Staff Friendliness', score: 84, delta: +7 },
    { topic: 'Product Quality', score: 76, delta: +2 },
    { topic: 'Wait Times', score: 38, delta: -5 },
    { topic: 'Online Ordering', score: 61, delta: +12 },
  ],
};

// Store data — matches NexusHome STORE_METRICS for key stores
const STORES = [
  {
    id: 'logan-square', name: 'Logan Square', state: 'IL', city: 'Chicago', score: 87,
    revenue: 48200, transactions: 312, avgBasket: 154, margin: 52.1, sentimentScore: 78,
    delta: '+12%', up: true, spark: [5,6,7,6,8,9,9],
    kpis: [
      { l: 'Revenue', v: '$48.2K', d: '+12%', up: true, spark: [4,5,6,6,7,8,9] },
      { l: 'Transactions', v: '312', d: '+8%', up: true, spark: [3,4,4,5,5,6,7] },
      { l: 'Avg Basket', v: '$154', d: '+3%', up: true, spark: [5,5,5,5,6,6,6] },
      { l: 'Margin', v: '52.1%', d: '+0.4%', up: true, spark: [5,5,5,5,5,5,5] },
    ],
    hourly: [2,5,12,18,24,31,28,35,42,38,29,22,15,8],
    topProducts: [
      { name: 'Ozone Cake Mints', units: 47, rev: '$2,115' },
      { name: 'Baby Jeeter Churros', units: 38, rev: '$1,330' },
      { name: 'Stiiizy OG Kush', units: 31, rev: '$1,395' },
      { name: 'Camino Gummies', units: 28, rev: '$616' },
      { name: 'Simply Herb Pre-Roll', units: 24, rev: '$360' },
    ],
    sentiment: { score: 78, delta: '+6 pts', note: '"Staff Friendliness" trending up 12%' },
  },
  {
    id: 'fort-lee', name: 'Fort Lee', state: 'NJ', city: 'Fort Lee', score: 79,
    revenue: 41600, transactions: 267, avgBasket: 156, margin: 49.7, sentimentScore: 72,
    delta: '+5%', up: true, spark: [4,4,5,5,6,5,6],
    kpis: [
      { l: 'Revenue', v: '$41.6K', d: '+5%', up: true, spark: [3,4,4,5,5,5,6] },
      { l: 'Transactions', v: '267', d: '+3%', up: true, spark: [4,4,4,5,5,5,5] },
      { l: 'Avg Basket', v: '$156', d: '+1.8%', up: true, spark: [5,5,5,5,5,6,6] },
      { l: 'Margin', v: '49.7%', d: '-0.2%', up: false, spark: [5,5,5,5,5,5,4] },
    ],
    hourly: [1,3,9,14,20,26,24,30,35,32,25,18,12,6],
    topProducts: [
      { name: 'Stiiizy Pod LLR 1g', units: 42, rev: '$1,890' },
      { name: 'Baby Jeeter Churros', units: 35, rev: '$1,225' },
      { name: 'Ozone Gummies 100mg', units: 29, rev: '$725' },
      { name: 'Blue Dream 3.5g', units: 24, rev: '$1,080' },
      { name: 'Camino Gummies', units: 21, rev: '$462' },
    ],
    sentiment: { score: 71, delta: '+2 pts', note: '"Product Selection" rated 4.3 stars' },
  },
  {
    id: 'springfield', name: 'Springfield', state: 'IL', city: 'Springfield', score: 74,
    revenue: 52100, transactions: 386, avgBasket: 135, margin: 51.3, sentimentScore: 68,
    delta: '+34%', up: true, spark: [3,4,4,5,6,8,10],
    kpis: [
      { l: 'Revenue', v: '$52.1K', d: '+34%', up: true, spark: [3,4,4,5,6,8,10] },
      { l: 'Transactions', v: '386', d: '+28%', up: true, spark: [3,3,4,5,6,7,9] },
      { l: 'Avg Basket', v: '$135', d: '+4.6%', up: true, spark: [4,4,4,5,5,5,6] },
      { l: 'Margin', v: '51.3%', d: '+1.1%', up: true, spark: [4,4,5,5,5,5,6] },
    ],
    hourly: [3,7,15,22,28,34,32,38,45,42,33,26,18,10],
    topProducts: [
      { name: 'Baby Jeeter Churros', units: 52, rev: '$1,820' },
      { name: 'Ozone Cake Mints', units: 44, rev: '$1,980' },
      { name: 'Simply Herb Pre-Roll', units: 39, rev: '$585' },
      { name: 'Camino Gummies', units: 33, rev: '$726' },
      { name: 'Blue Dream 3.5g', units: 28, rev: '$1,260' },
    ],
    sentiment: { score: 68, delta: '+9 pts', note: '"Wait Times" improved by 18%' },
  },
  {
    id: 'boston', name: 'Boston', state: 'MA', city: 'Boston', score: 65,
    revenue: 29800, transactions: 198, avgBasket: 151, margin: 48.9, sentimentScore: 59,
    delta: '-3%', up: false, spark: [6,5,5,4,5,4,4],
    kpis: [
      { l: 'Revenue', v: '$29.8K', d: '-3%', up: false, spark: [6,5,5,4,5,4,4] },
      { l: 'Transactions', v: '198', d: '-5%', up: false, spark: [6,5,5,5,4,4,4] },
      { l: 'Avg Basket', v: '$151', d: '+2.1%', up: true, spark: [5,5,5,5,5,6,6] },
      { l: 'Margin', v: '48.9%', d: '-1.2%', up: false, spark: [6,5,5,5,5,5,4] },
    ],
    hourly: [1,2,7,11,16,20,18,22,28,24,19,14,9,5],
    topProducts: [
      { name: 'Tunnel Vision 5-Pack', units: 28, rev: '$840' },
      { name: 'Blue Dream 3.5g', units: 22, rev: '$990' },
      { name: 'Stiiizy OG Kush', units: 19, rev: '$855' },
      { name: 'Ozone Cake Mints', units: 15, rev: '$675' },
      { name: 'Camino Gummies', units: 12, rev: '$264' },
    ],
    sentiment: { score: 59, delta: '-2 pts', note: '"Parking Availability" rated 2.8 stars' },
  },
  {
    id: 'morenci', name: 'Morenci', state: 'MI', city: 'Morenci', score: 48,
    revenue: 12400, transactions: 89, avgBasket: 139, margin: 44.2, sentimentScore: 42,
    delta: '-23%', up: false, spark: [7,6,5,4,3,3,2],
    kpis: [
      { l: 'Revenue', v: '$12.4K', d: '-23%', up: false, spark: [7,6,5,4,3,3,2] },
      { l: 'Transactions', v: '89', d: '-18%', up: false, spark: [7,6,6,5,4,4,3] },
      { l: 'Avg Basket', v: '$139', d: '-6%', up: false, spark: [6,6,5,5,5,4,4] },
      { l: 'Margin', v: '44.2%', d: '-3.1%', up: false, spark: [7,6,6,5,5,4,4] },
    ],
    hourly: [0,1,3,5,8,11,10,13,16,14,10,7,4,2],
    topProducts: [
      { name: 'Simply Herb Pre-Roll', units: 14, rev: '$210' },
      { name: 'Camino Gummies', units: 11, rev: '$242' },
      { name: 'Blue Dream 3.5g', units: 9, rev: '$405' },
      { name: 'Ozone Cake Mints', units: 7, rev: '$315' },
      { name: 'Baby Jeeter Churros', units: 5, rev: '$175' },
    ],
    sentiment: { score: 42, delta: '-8 pts', note: '"Product Availability" rated 2.1 stars' },
  },
];

// From NexusHome.jsx — SMART_ALERTS
const INITIAL_ALERTS = [
  { id: 'a1', sev: 'CRITICAL', color: '#E87068', time: '2m', title: 'Blue Dream 3.5g out of stock at 4 stores', ai: 'Vendor has stock. Reorder 200 units for $2,840. Est. delivery: 2 days.', actions: ['Approve Reorder', 'Modify'], storeIds: ['logan-square','fort-lee','boston','morenci'] },
  { id: 'a2', sev: 'WARNING', color: '#D4A03A', time: '15m', title: 'Stiiizy Pod LLR priced 18% above market avg', ai: 'Competitors at $42 avg. Suggest $44.99 (currently $52). Projected +23% velocity.', actions: ['Apply Price', 'View Comps'], storeIds: ['fort-lee'] },
  { id: 'a3', sev: 'OPPORTUNITY', color: '#00C27C', time: '1h', title: 'Jeeter brand sentiment spike (+34% WoW)', ai: '2 stores don\'t stock it. Trending on social. Contact vendor for initial order?', actions: ['Draft PO', 'View Data'], storeIds: ['boston','morenci'] },
  { id: 'a4', sev: 'INSIGHT', color: '#64A8E0', time: '3h', title: '62% of Tuesday sales happen after 4pm', ai: 'Consider shifting staff coverage to match peak traffic window.', actions: ['View Staffing'], storeIds: [] },
];

// From ConnectAgent.jsx — OUT_OF_STOCK_PRODUCTS
const OUT_OF_STOCK_PRODUCTS = [
  { id: 'stz-001', brand: 'STIIIZY', name: 'STIIIZY OG Kush Pod', type: 'Vape Pod 1g', urgency: 'high', supplier: 'STIIIZY Direct', leadTime: '2-3 days', recommendedQty: 36, daysOutOfStock: 3, avgWeeklySales: 42, lastPrice: 35 },
  { id: 'kv-001', brand: 'Kiva', name: 'Camino Pineapple Habanero', type: 'Edible 100mg', urgency: 'high', supplier: 'Kiva Sales Inc.', leadTime: '3-5 days', recommendedQty: 24, daysOutOfStock: 1, avgWeeklySales: 38, lastPrice: 22 },
  { id: 'rg-001', brand: 'Raw Garden', name: 'Slippery Susan Cart 1g', type: 'Vape Cart 1g', urgency: 'medium', supplier: 'Raw Garden LLC', leadTime: '3-4 days', recommendedQty: 18, daysOutOfStock: 5, avgWeeklySales: 28, lastPrice: 40 },
  { id: 'wy-001', brand: 'Wyld', name: 'Elderberry Indica Gummies', type: 'Edible 100mg', urgency: 'medium', supplier: 'Wyld Distribution', leadTime: '4-5 days', recommendedQty: 18, daysOutOfStock: 2, avgWeeklySales: 22, lastPrice: 18 },
  { id: 'jt-001', brand: 'Jeeter', name: 'Baby Jeeter Churros 5pk', type: 'Pre-Rolls 2.5g', urgency: 'low', supplier: 'DreamFields', leadTime: '2-3 days', recommendedQty: 48, daysOutOfStock: 0, avgWeeklySales: 56, lastPrice: 25 },
];

// From PricingAgent.jsx — PRICING_PRODUCTS
const PRICING_PRODUCTS = [
  { id: 'pp-1', brand: 'Jeeter', name: 'Baby Jeeter Churros', category: 'Pre-Rolls', grossPrice: 35, cost: 18, margin: 48.6, marketAvg: 33, marketLow: 30, marketHigh: 38, weeklyUnits: 62 },
  { id: 'pp-2', brand: 'STIIIZY', name: 'OG Kush Pod 1g', category: 'Vapes', grossPrice: 45, cost: 24, margin: 46.7, marketAvg: 42, marketLow: 38, marketHigh: 48, weeklyUnits: 42 },
  { id: 'pp-3', brand: 'Kiva', name: 'Camino Pineapple Habanero', category: 'Edibles', grossPrice: 22, cost: 10, margin: 54.5, marketAvg: 22, marketLow: 19, marketHigh: 25, weeklyUnits: 55 },
  { id: 'pp-4', brand: 'Raw Garden', name: 'Slippery Susan Cart 1g', category: 'Vapes', grossPrice: 40, cost: 22, margin: 45.0, marketAvg: 38, marketLow: 35, marketHigh: 42, weeklyUnits: 28 },
  { id: 'pp-5', brand: 'Wyld', name: 'Elderberry Indica Gummies', category: 'Edibles', grossPrice: 18, cost: 8, margin: 55.6, marketAvg: 18, marketLow: 16, marketHigh: 20, weeklyUnits: 35 },
  { id: 'pp-6', brand: 'Cookies', name: 'Gary Payton 3.5g', category: 'Flower', grossPrice: 55, cost: 32, margin: 41.8, marketAvg: 52, marketLow: 48, marketHigh: 58, weeklyUnits: 18 },
  { id: 'pp-7', brand: 'Alien Labs', name: 'Atomic Apple 3.5g', category: 'Flower', grossPrice: 50, cost: 28, margin: 44.0, marketAvg: 48, marketLow: 45, marketHigh: 55, weeklyUnits: 22 },
  { id: 'pp-8', brand: 'PLUS', name: 'Sour Watermelon Gummies', category: 'Edibles', grossPrice: 20, cost: 9, margin: 55.0, marketAvg: 19, marketLow: 17, marketHigh: 22, weeklyUnits: 30 },
];

// From PricingAgent.jsx — PROMOTIONS
const PROMOTIONS = [
  { name: 'Happy Hour 15% Off', type: 'Time-based', spend: '$2,100', redemptions: 342, roi: 1.5, verdict: 'Keep' },
  { name: 'First-Time 20% Off', type: 'New Customer', spend: '$3,400', redemptions: 189, roi: 2.4, verdict: 'Keep' },
  { name: 'BOGO Edibles', type: 'Category', spend: '$4,800', redemptions: 156, roi: 0.3, verdict: 'Kill' },
  { name: 'Loyalty 10% Off', type: 'Loyalty', spend: '$1,900', redemptions: 420, roi: 2.4, verdict: 'Keep' },
  { name: 'Weekend Bundle', type: 'Bundle', spend: '$2,200', redemptions: 78, roi: 0.4, verdict: 'Optimize' },
];

// Cannabis-specific: Vault vs Floor inventory
const VAULT_INVENTORY = [
  { id: 'v1', name: 'Blue Dream 3.5g', floor: 0, vault: 47, store: 'Logan Square', category: 'Flower', urgency: 'critical' },
  { id: 'v2', name: 'Stiiizy OG Kush Pod 1g', floor: 3, vault: 24, store: 'Fort Lee', category: 'Vapes', urgency: 'high' },
  { id: 'v3', name: 'Ozone Cake Mints 3.5g', floor: 2, vault: 31, store: 'Logan Square', category: 'Flower', urgency: 'high' },
  { id: 'v4', name: 'Camino Gummies 100mg', floor: 8, vault: 42, store: 'Springfield', category: 'Edibles', urgency: 'medium' },
  { id: 'v5', name: 'Baby Jeeter Churros 5pk', floor: 5, vault: 38, store: 'Fort Lee', category: 'Pre-Rolls', urgency: 'medium' },
  { id: 'v6', name: 'Tunnel Vision 5-Pack', floor: 1, vault: 19, store: 'Boston', category: 'Pre-Rolls', urgency: 'high' },
];

// Compliance data
const COMPLIANCE = {
  licenseStatus: 'Active',
  licenseExpiry: 'Sep 14, 2026',
  metrcSync: 'Synced 4m ago',
  metrcStatus: 'green',
  idScansToday: 347,
  cameraStatus: 'All Online',
  cameras: 24,
  lastAudit: 'Feb 28, 2026',
  openViolations: 0,
};

// Transfer log
const INITIAL_TRANSFERS = [
  { id: 't1', product: 'Ozone Reserve Cart 1g', qty: 12, from: 'Vault', to: 'Floor', by: 'Marcus T.', time: '10:42 AM', store: 'Logan Square' },
  { id: 't2', product: 'Camino Gummies', qty: 8, from: 'Vault', to: 'Floor', by: 'Alex K.', time: '9:15 AM', store: 'Fort Lee' },
];

// Floor view data
const FLOOR_DATA = {
  hourlyVelocity: [
    { hour: '9a', txns: 42, rev: 3528 },
    { hour: '10a', txns: 68, rev: 5644 },
    { hour: '11a', txns: 95, rev: 7885 },
    { hour: '12p', txns: 112, rev: 9296 },
    { hour: '1p', txns: 108, rev: 8964 },
    { hour: '2p', txns: 89, rev: 7387 },
    { hour: '3p', txns: 76, rev: 6308 },
    { hour: '4p', txns: 94, rev: 7802 },
    { hour: '5p', txns: 118, rev: 9794 },
    { hour: '6p', txns: 102, rev: 8466 },
  ],
  currentHourIdx: 5,
  topSellers: [
    { name: 'Baby Jeeter Churros', units: 47, rev: '$1,645' },
    { name: 'Ozone Cake Mints', units: 42, rev: '$1,890' },
    { name: 'Stiiizy OG Kush Pod', units: 38, rev: '$1,710' },
    { name: 'Camino Gummies', units: 33, rev: '$726' },
    { name: 'Blue Dream 3.5g', units: 28, rev: '$1,260' },
  ],
  queue: { inStore: 14, avgWait: '4.2 min', budtendersActive: 6, budtendersTotal: 8 },
  pulse: { txnsThisHour: 89, avgBasket: '$83', itemsPerTxn: 2.4 },
};


/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Spark({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 36, h = 12 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 2800); return () => clearTimeout(t); }, [onDismiss]);
  const bg = type === 'success' ? '#00C27C' : type === 'warning' ? '#D4A03A' : '#64A8E0';
  return (
    <div className="fixed top-4 left-4 right-4 z-[10000] flex justify-center" style={{ animation: 'slideDown 0.3s ease-out' }}>
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

function HealthRing({ score, size = 40 }) {
  const c = score >= 75 ? '#00C27C' : score >= 55 ? '#D4A03A' : '#E87068';
  const inner = Math.round(size * 0.7);
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, background: `conic-gradient(${c} ${score * 3.6}deg, #2A2722 0deg)` }}>
      <div className="rounded-full bg-[#161514] flex items-center justify-center font-bold" style={{ width: inner, height: inner, color: c, fontSize: size * 0.25 }}>{score}</div>
    </div>
  );
}

function BottomNav({ active = 'home', onNavigate, alertCount = 0 }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: alertCount },
    { id: 'floor', icon: Activity, label: 'Floor' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'actions', icon: LayoutGrid, label: 'Actions' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-3" style={{ background: 'linear-gradient(transparent 0%, rgba(10,9,8,0.97) 35%)' }}>
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

function fmtK(v) { return v >= 1000 ? `$${(v/1000).toFixed(1)}K` : `$${v}`; }


/* ═══════════════════════════════════════════════════════════════════════════
   TAB 1: HOME — Portfolio Pulse
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenHome({ stores, alerts, onNavigate, onSelectStore }) {
  const totalRev = stores.reduce((s, st) => s + st.revenue, 0);
  const goalPct = Math.round((NEXUS_DATA.todaySales / NEXUS_DATA.salesGoal) * 100);
  const healthy = stores.filter(s => s.score >= 75).length;
  const watch = stores.filter(s => s.score >= 55 && s.score < 75).length;
  const critical = stores.filter(s => s.score < 55).length;
  const criticalAlerts = alerts.filter(a => a.sev === 'CRITICAL').length;

  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <NexusIcon size={16} />
          <span className="text-[12px] font-bold text-white">Nexus</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative" onClick={() => onNavigate('alerts')}>
            <Bell className="w-4 h-4 text-[#ADA599]" />
            {alerts.length > 0 && <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-[#E87068] border border-[#0A0908]" />}
          </button>
          <div className="w-6 h-6 rounded-full bg-[#D4A03A]/20 flex items-center justify-center"><User className="w-3 h-3 text-[#D4A03A]" /></div>
        </div>
      </div>

      {/* AI Briefing */}
      <div className="rounded-2xl p-3.5 mb-4" style={{ background: 'linear-gradient(135deg, rgba(212,160,58,0.10), rgba(212,160,58,0.03))', border: '1px solid rgba(212,160,58,0.18)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-[#D4A03A]" />
          <span className="text-[8px] font-bold text-[#D4A03A] uppercase tracking-[1.5px]">AI Briefing</span>
        </div>
        <p className="text-[10px] text-[#C8C3BA] leading-[1.6] italic mb-2.5">
          {`"${goalPct >= 100 ? 'On target!' : `${goalPct}% to daily goal.`} ${NEXUS_DATA.topStore} leads revenue. ${NEXUS_DATA.underperformer} needs attention at ${NEXUS_DATA.underperformerDelta}%. ${criticalAlerts > 0 ? `${criticalAlerts} critical alert${criticalAlerts > 1 ? 's' : ''} require action.` : 'No critical alerts.'}"`}
        </p>
        <div className="flex gap-4">
          {[
            { l: 'Revenue', v: fmtK(NEXUS_DATA.todaySales), t: `${goalPct}% of goal`, up: goalPct >= 90 },
            { l: 'Traffic', v: NEXUS_DATA.traffic.today.toLocaleString(), t: `+${Math.round(((NEXUS_DATA.traffic.today - NEXUS_DATA.traffic.yesterday) / NEXUS_DATA.traffic.yesterday) * 100)}%`, up: true },
            { l: 'Alerts', v: String(alerts.length), t: criticalAlerts > 0 ? `${criticalAlerts} critical` : 'none critical', up: criticalAlerts === 0 },
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

      {/* Revenue vs Goal bar */}
      <div className="rounded-xl border border-[#2A2722] bg-[#161514] p-3 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1px]">Today vs Goal</span>
          <span className="text-[10px] font-bold text-white">{fmtK(NEXUS_DATA.todaySales)} / {fmtK(NEXUS_DATA.salesGoal)}</span>
        </div>
        <div className="h-[6px] rounded-full bg-[#2A2722] overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, goalPct)}%`, background: goalPct >= 100 ? '#00C27C' : goalPct >= 80 ? '#D4A03A' : '#E87068' }} />
        </div>
      </div>

      {/* Health buckets */}
      <div className="flex gap-2 mb-3">
        {[{ n: healthy, l: 'Healthy', c: '#00C27C' }, { n: watch, l: 'Watch', c: '#D4A03A' }, { n: critical, l: 'Critical', c: '#E87068' }].map(s => (
          <div key={s.l} className="flex-1 rounded-xl p-2 text-center" style={{ background: `${s.c}0D`, border: `1px solid ${s.c}25` }}>
            <p className="text-[14px] font-extrabold" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[7px] font-semibold" style={{ color: `${s.c}99` }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Stores — worst first */}
      <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Stores — worst first</p>
      <div className="space-y-2">
        {[...stores].sort((a, b) => a.score - b.score).map(s => {
          const c = s.score >= 75 ? '#00C27C' : s.score >= 55 ? '#D4A03A' : '#E87068';
          const storeAlerts = alerts.filter(al => al.storeIds?.includes(s.id)).length;
          return (
            <button key={s.id} onClick={() => onSelectStore(s)} className="w-full rounded-xl border border-[#2A2722] bg-[#161514] p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <HealthRing score={s.score} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white truncate">{s.name}</span>
                  <span className="text-[9px] text-[#6B6359]">{s.state}</span>
                  {storeAlerts > 0 && <span className="ml-auto w-[18px] h-[18px] rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{storeAlerts}</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-white">{fmtK(s.revenue)}</span>
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


/* ═══════════════════════════════════════════════════════════════════════════
   STORE DETAIL sub-screen
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenStoreDetail({ store, onBack }) {
  if (!store) return null;
  const c = store.score >= 75 ? '#00C27C' : store.score >= 55 ? '#D4A03A' : '#E87068';
  const maxH = Math.max(...store.hourly);

  return (
    <div className="px-4 pt-2 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-white">{store.name}</p>
          <p className="text-[9px] text-[#6B6359]">{store.city}, {store.state}</p>
        </div>
        <HealthRing score={store.score} size={44} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {store.kpis.map(k => (
          <div key={k.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3">
            <p className="text-[8px] text-[#6B6359] uppercase tracking-[1px] font-bold mb-1">{k.l}</p>
            <div className="flex items-end justify-between">
              <div><span className="text-[15px] font-extrabold text-white">{k.v}</span><span className={`text-[9px] font-bold ml-1 ${k.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{k.d}</span></div>
              <Spark data={k.spark} color={k.up ? '#00C27C' : '#E87068'} w={32} h={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Hourly chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-3">Hourly Transactions</p>
        <div className="flex items-end gap-[4px] h-[50px]">
          {store.hourly.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${Math.max(4, (v / maxH) * 100)}%`, background: i === store.hourly.indexOf(maxH) ? '#D4A03A' : v > maxH * 0.7 ? '#00C27C' : '#2A2722' }} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[7px] text-[#6B6359]"><span>8am</span><span>12pm</span><span>4pm</span><span>9pm</span></div>
      </div>

      {/* Top Products */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Top Products Today</p>
        {store.topProducts.map((p, i) => (
          <div key={i} className="flex items-center py-1.5 border-b border-[#2A2722]/60 last:border-0">
            <span className="w-4 text-[9px] font-bold text-[#6B6359]">{i + 1}</span>
            <span className="text-[10px] text-white flex-1">{p.name}</span>
            <span className="text-[9px] font-bold text-white">{p.rev}</span>
            <span className="text-[8px] text-[#6B6359] ml-2 w-7 text-right">{p.units}u</span>
          </div>
        ))}
      </div>

      {/* Sentiment */}
      <div className="rounded-2xl border p-3.5" style={{ borderColor: `${c}25`, background: `${c}08` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5" style={{ color: c }} /><span className="text-[10px] font-bold text-white">Sentiment: {store.sentiment.score}</span></div>
          <span className="text-[9px] font-semibold" style={{ color: c }}>{store.sentiment.delta}</span>
        </div>
        <p className="text-[9px] text-[#ADA599] mt-1">{store.sentiment.note}</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   TAB 2: ALERTS — Smart Alerts + Vault-to-Floor + Low Stock
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenAlerts({ alerts, resolvedAlerts, inventory, vaultItems, onAlertAction, onVaultTransfer, onReorder, showToast }) {
  const lowStock = inventory.filter(i => i.status !== 'ordered');
  const orderedItems = inventory.filter(i => i.status === 'ordered');
  const vaultAvailable = vaultItems.filter(v => v.floor <= 3 && v.vault > 0);

  return (
    <div className="px-4 pt-2 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Smart Alerts</p><p className="text-[9px] text-[#6B6359]">Tap actions to resolve</p></div>
        <span className="text-[9px] font-bold text-[#E87068] bg-[#E87068]/10 px-2.5 py-1 rounded-full">{alerts.length} active</span>
      </div>

      {/* Active alerts */}
      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-8 text-center mb-4">
          <Check className="w-10 h-10 text-[#00C27C] mx-auto mb-3" />
          <p className="text-[14px] font-bold text-white mb-1">All Clear</p>
          <p className="text-[11px] text-[#6B6359]">No active alerts</p>
        </div>
      ) : (
        <div className="space-y-2.5 mb-4">
          {alerts.map((a, i) => (
            <div key={a.id} className="rounded-2xl border overflow-hidden" style={{ borderColor: i === 0 ? `${a.color}50` : '#2A2722', background: i === 0 ? `${a.color}08` : '#161514' }}>
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
                  {a.actions.map((act, j) => (
                    <button key={j} onClick={() => onAlertAction(a.id, act)} className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all active:scale-[0.97] ${j === 0 ? 'text-white' : 'text-[#ADA599] border border-[#38332B]'}`} style={j === 0 ? { background: a.color } : undefined}>{act}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vault-to-Floor section */}
      {vaultAvailable.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#B598E8]" />
            <p className="text-[8px] font-bold text-[#B598E8] uppercase tracking-[1.5px]">Vault to Floor</p>
            <span className="text-[8px] font-medium text-[#B598E8]/70 bg-[#B598E8]/10 px-1.5 py-0.5 rounded-full">{vaultAvailable.length} items</span>
          </div>
          <div className="space-y-2 mb-4">
            {vaultAvailable.map(v => (
              <div key={v.id} className="rounded-xl border border-[#B598E8]/20 bg-[#B598E8]/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-[10px] font-semibold text-white">{v.name}</p>
                    <p className="text-[8px] text-[#6B6359]">{v.store} -- {v.category}</p>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${v.urgency === 'critical' ? 'text-[#E87068] bg-[#E87068]/15' : v.urgency === 'high' ? 'text-[#D4A03A] bg-[#D4A03A]/15' : 'text-[#64A8E0] bg-[#64A8E0]/15'}`}>{v.urgency}</span>
                </div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex-1 text-center rounded-lg bg-[#161514] py-1.5">
                    <p className="text-[8px] text-[#6B6359]">Floor</p>
                    <p className={`text-[12px] font-extrabold ${v.floor === 0 ? 'text-[#E87068]' : 'text-[#D4A03A]'}`}>{v.floor}</p>
                  </div>
                  <ArrowRightLeft className="w-3 h-3 text-[#6B6359]" />
                  <div className="flex-1 text-center rounded-lg bg-[#161514] py-1.5">
                    <p className="text-[8px] text-[#6B6359]">Vault</p>
                    <p className="text-[12px] font-extrabold text-[#00C27C]">{v.vault}</p>
                  </div>
                </div>
                <button onClick={() => onVaultTransfer(v.id)} className="w-full py-2 rounded-xl bg-[#B598E8] text-[10px] font-bold text-white active:scale-[0.97] transition-transform">Transfer to Floor</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Low Stock items */}
      {lowStock.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-3.5 h-3.5 text-[#D4A03A]" />
            <p className="text-[8px] font-bold text-[#D4A03A] uppercase tracking-[1.5px]">Low Stock</p>
          </div>
          <div className="space-y-2 mb-4">
            {lowStock.map(it => {
              const c = it.sev === 'critical' ? '#E87068' : it.sev === 'warning' ? '#D4A03A' : '#64A8E0';
              return (
                <div key={it.id} className="rounded-xl border bg-[#161514] p-3" style={{ borderColor: it.sev === 'critical' ? `${c}40` : '#2A2722' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div><p className="text-[10px] font-semibold text-white">{it.name}</p><p className="text-[8px] text-[#6B6359]">{it.store}</p></div>
                    <div className="text-right"><p className="text-[12px] font-extrabold" style={{ color: c }}>{it.hours}h</p><p className="text-[7px] text-[#6B6359]">until out</p></div>
                  </div>
                  <div className="h-[5px] rounded-full bg-[#2A2722] overflow-hidden mb-2">
                    <div className="h-full rounded-full" style={{ width: `${Math.max(8, 100 - (it.hours / 96) * 100)}%`, background: c }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#ADA599]">{it.cost}</span>
                    <button onClick={() => onReorder(it.id)} className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-white active:scale-[0.97]" style={{ background: c }}>Reorder</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Ordered items */}
      {orderedItems.length > 0 && (
        <div className="mb-4">
          <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Ordered</p>
          {orderedItems.map(it => (
            <div key={it.id} className="rounded-xl border border-[#00C27C]/20 bg-[#00C27C]/5 p-3 flex items-center gap-2 mb-1.5">
              <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" />
              <div className="flex-1"><p className="text-[10px] font-semibold text-white">{it.name}</p><p className="text-[8px] text-[#6B6359]">{it.store}</p></div>
              <span className="text-[8px] font-semibold text-[#00C27C]">Ordered</span>
            </div>
          ))}
        </div>
      )}

      {/* Auto-resolved */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5">
        <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Auto-Resolved</p>
        {resolvedAlerts.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] text-[#00C27C] mb-1 last:mb-0"><Check className="w-3 h-3 flex-shrink-0" /> {r}</div>
        ))}
        {['Register sync -- fixed', 'March campaign -- launched', 'Stiiizy Pods -- auto-reordered'].map(r => (
          <div key={r} className="flex items-center gap-2 text-[9px] text-[#ADA599] mb-1 last:mb-0"><Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" /> {r}</div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   TAB 3: FLOOR — Live Floor View
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenFloor({ floor, onNavigate }) {
  const maxTxns = Math.max(...floor.hourlyVelocity.map(h => h.txns));

  return (
    <div className="px-4 pt-2 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Live Floor</p><p className="text-[9px] text-[#6B6359]">Real-time dispensary view</p></div>
        <div className="flex items-center gap-1"><div className="w-[6px] h-[6px] rounded-full bg-[#00C27C] animate-pulse" /><span className="text-[8px] text-[#00C27C] font-medium">Live</span></div>
      </div>

      {/* Pulse metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { l: 'This Hour', v: String(floor.pulse.txnsThisHour), sub: 'transactions', c: '#00C27C' },
          { l: 'Avg Basket', v: floor.pulse.avgBasket, sub: 'per txn', c: '#64A8E0' },
          { l: 'Items/Txn', v: String(floor.pulse.itemsPerTxn), sub: 'average', c: '#B598E8' },
        ].map(m => (
          <div key={m.l} className="rounded-xl border border-[#2A2722] bg-[#161514] p-2.5 text-center">
            <p className="text-[7px] text-[#6B6359] uppercase tracking-[1px] font-bold">{m.l}</p>
            <p className="text-[14px] font-extrabold" style={{ color: m.c }}>{m.v}</p>
            <p className="text-[7px] text-[#6B6359]">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Hourly velocity bar chart */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-3">Hourly Sales Velocity</p>
        <div className="flex items-end gap-[5px] h-[60px]">
          {floor.hourlyVelocity.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full rounded-t-sm transition-all" style={{ height: `${Math.max(4, (h.txns / maxTxns) * 100)}%`, background: i === floor.currentHourIdx ? '#D4A03A' : i < floor.currentHourIdx ? '#00C27C' : '#2A2722' }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {floor.hourlyVelocity.map((h, i) => (
            <span key={i} className={`text-[6px] flex-1 text-center ${i === floor.currentHourIdx ? 'text-[#D4A03A] font-bold' : 'text-[#6B6359]'}`}>{h.hour}</span>
          ))}
        </div>
      </div>

      {/* Top sellers right now */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2">Top Sellers Right Now</p>
        {floor.topSellers.map((p, i) => (
          <div key={i} className="flex items-center py-1.5 border-b border-[#2A2722]/60 last:border-0">
            <span className="w-4 text-[9px] font-bold" style={{ color: i === 0 ? '#D4A03A' : i < 3 ? '#ADA599' : '#6B6359' }}>{i + 1}</span>
            <span className="text-[10px] text-white flex-1">{p.name}</span>
            <span className="text-[9px] font-bold text-white">{p.rev}</span>
            <span className="text-[8px] text-[#6B6359] ml-2 w-7 text-right">{p.units}u</span>
          </div>
        ))}
      </div>

      {/* Queue & wait */}
      <div className="rounded-2xl border border-[#2A2722] bg-[#161514] p-3.5 mb-4">
        <p className="text-[9px] font-bold text-[#ADA599] uppercase tracking-[1px] mb-2.5">Queue & Staffing</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l: 'In Store', v: String(floor.queue.inStore), icon: Users, c: '#64A8E0' },
            { l: 'Avg Wait', v: floor.queue.avgWait, icon: Clock, c: '#D4A03A' },
            { l: 'Active', v: `${floor.queue.budtendersActive}/${floor.queue.budtendersTotal}`, icon: User, c: '#00C27C' },
            { l: 'Utilization', v: `${Math.round((floor.queue.budtendersActive / floor.queue.budtendersTotal) * 100)}%`, icon: Activity, c: '#B598E8' },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.l} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.c }} />
                <div><p className="text-[8px] text-[#6B6359]">{m.l}</p><p className="text-[11px] font-bold text-white">{m.v}</p></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions grid */}
      <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Quick Actions</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { l: 'Vault Transfer', icon: ArrowRightLeft, c: '#B598E8', screen: 'actions' },
          { l: 'Price Check', icon: DollarSign, c: '#D4A03A', screen: 'actions' },
          { l: 'Compliance', icon: Shield, c: '#00C27C', screen: 'actions' },
          { l: 'Staff Schedule', icon: Users, c: '#64A8E0', screen: null },
        ].map(a => {
          const Icon = a.icon;
          return (
            <button key={a.l} onClick={() => a.screen && onNavigate(a.screen)} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3 flex items-center gap-2.5 active:scale-[0.97] transition-transform">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${a.c}15` }}><Icon className="w-4 h-4" style={{ color: a.c }} /></div>
              <span className="text-[10px] font-semibold text-white">{a.l}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   TAB 4: CHAT — Mobile Nexus AI (matches CustomerBridge suggestions)
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenChat({ alerts, inventory, vaultItems, oosProducts, pricingProducts, promos, onReorderAll, showToast, onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  // Desktop NEXUS_SUGGESTIONS mapped to mobile
  const suggestions = [
    { key: 'inventory', label: 'Reorder out-of-stock inventory', icon: ShoppingCart, c: '#64A8E0' },
    { key: 'campaign', label: 'Run a marketing campaign', icon: Megaphone, c: '#00C27C' },
    { key: 'pricing', label: 'Compare prices vs market', icon: DollarSign, c: '#D4A03A' },
    { key: 'sentiment', label: 'Customer sentiment this month', icon: Star, c: '#B598E8' },
    { key: 'report', label: 'Weekly sales summary', icon: BarChart3, c: '#0EA5E9' },
    { key: 'trending', label: 'Trending products to add', icon: Rocket, c: '#EC4899' },
  ];

  const processMessage = useCallback((text) => {
    if (!text.trim()) return;
    const msg = text.trim();
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    const lower = msg.toLowerCase();
    let status = 'Thinking...';
    let delay = 800;
    let reply;

    if (lower.includes('reorder') || lower.includes('inventory') || lower.includes('stock')) {
      status = 'Searching inventory...';
      delay = 1200;
      const active = oosProducts.filter(p => p.urgency === 'high' || p.urgency === 'medium');
      const totalCost = active.reduce((s, p) => s + p.lastPrice * p.recommendedQty, 0);
      reply = {
        from: 'ai', text: `Found **${oosProducts.length} products** needing reorder. ${active.length} are urgent. Total recommended reorder: **$${totalCost.toLocaleString()}**.`,
        reorderCards: oosProducts.slice(0, 3),
        showReorderAll: true,
        totalCost,
      };
    } else if (lower.includes('campaign') || lower.includes('marketing')) {
      status = 'Analyzing top sellers...';
      delay = 1000;
      reply = {
        from: 'ai', text: 'Based on current momentum, I recommend a **"Weekend Jeeter Fest"** campaign. Baby Jeeter Churros are your #1 seller with 62 units/week.\n\nProjected impact: **+$4,200 revenue** over 3 days with a 15% targeted discount to loyalty members.',
        campaignCard: { name: 'Weekend Jeeter Fest', brand: 'Jeeter', discount: '15% off', target: 'Loyalty Members', projected: '+$4,200', duration: 'Fri-Sun' },
      };
    } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('market')) {
      status = 'Analyzing prices...';
      delay = 1100;
      const aboveMarket = pricingProducts.filter(p => p.grossPrice > p.marketAvg * 1.05);
      const belowMarket = pricingProducts.filter(p => p.grossPrice < p.marketAvg * 0.95);
      reply = {
        from: 'ai', text: `Across ${pricingProducts.length} tracked products: **${aboveMarket.length} above market** and **${belowMarket.length} below market**. Your weighted avg margin is **48.3%**.`,
        priceCards: pricingProducts.slice(0, 4).map(p => ({
          name: p.name, brand: p.brand, yours: p.grossPrice, market: p.marketAvg,
          gap: `${((p.grossPrice - p.marketAvg) / p.marketAvg * 100).toFixed(1)}%`,
          rec: p.grossPrice > p.marketAvg * 1.08 ? 'Lower' : p.grossPrice < p.marketAvg * 0.95 ? 'Raise' : 'Keep',
        })),
      };
    } else if (lower.includes('sentiment') || lower.includes('customer') || lower.includes('review')) {
      status = 'Analyzing sentiment...';
      delay = 1000;
      reply = {
        from: 'ai', text: `Overall sentiment: **${NEXUS_DATA.overallSentiment}/100** (${NEXUS_DATA.sentimentDelta >= 0 ? '+' : ''}${NEXUS_DATA.sentimentDelta} pts). NPS: **${NEXUS_DATA.npsScore}** (${NEXUS_DATA.npsDelta >= 0 ? '+' : ''}${NEXUS_DATA.npsDelta}).`,
        sentimentCard: {
          score: NEXUS_DATA.overallSentiment, delta: NEXUS_DATA.sentimentDelta,
          nps: NEXUS_DATA.npsScore, npsDelta: NEXUS_DATA.npsDelta,
          topPos: NEXUS_DATA.topPositiveTopic, topNeg: NEXUS_DATA.topNegativeTopic,
          topics: NEXUS_DATA.sentimentTopics,
        },
      };
    } else if (lower.includes('weekly') || lower.includes('summary') || lower.includes('report') || lower.includes('sales')) {
      status = 'Generating report...';
      delay = 1000;
      const topStore = STORES.reduce((a, b) => a.revenue > b.revenue ? a : b);
      const worstStore = STORES.reduce((a, b) => a.revenue < b.revenue ? a : b);
      reply = {
        from: 'ai', text: `**Weekly Summary:**\n- Total revenue: **${fmtK(STORES.reduce((s, st) => s + st.revenue, 0))}** across ${STORES.length} stores\n- Best: **${topStore.name}** at ${fmtK(topStore.revenue)} (${topStore.delta})\n- Needs attention: **${worstStore.name}** at ${fmtK(worstStore.revenue)} (${worstStore.delta})\n- Avg basket: **$${Math.round(STORES.reduce((s, st) => s + st.avgBasket, 0) / STORES.length)}**\n- ${alerts.length} active alerts, ${inventory.filter(i => i.status === 'ordered').length} items on order`,
      };
    } else if (lower.includes('trending') || lower.includes('products') || lower.includes('add') || lower.includes('menu')) {
      status = 'Scanning market trends...';
      delay = 1100;
      reply = {
        from: 'ai', text: '**3 trending products** worth adding to your menu:\n\n1. **Alien Labs Xeno Disposable** - Live resin, 88% THC, $48 retail, 42% margin. Top seller in CA last 30 days.\n2. **Wyld Raspberry Sativa Gummies** - America\'s #1 selling gummy. $22 retail, 50% margin.\n3. **Cookies Gary Payton 3.5g** - Iconic strain, $55 retail, 42% margin. Top-5 in NYC metro.',
      };
    } else {
      reply = {
        from: 'ai', text: `I can help with that! Across your ${STORES.length} stores, the average health score is **${Math.round(STORES.reduce((s, st) => s + st.score, 0) / STORES.length)}**. You have ${alerts.length} active alerts and ${vaultItems.filter(v => v.floor <= 3).length} items needing vault-to-floor transfers. What would you like to dig into?`,
      };
    }

    setTypingStatus(status);
    setTimeout(() => {
      setMessages(prev => [...prev, reply]);
      setTyping(false);
      setTypingStatus('');
    }, delay + Math.random() * 400);
  }, [alerts, inventory, oosProducts, pricingProducts, vaultItems]);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
      {/* Header */}
      <div className="px-4 pt-2 flex items-center gap-2.5 mb-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1710, #2A2318)', border: '1px solid rgba(212,160,58,0.2)' }}>
          <NexusIcon size={16} />
        </div>
        <div>
          <span className="text-[12px] font-bold text-white">Nexus AI</span>
          <div className="flex items-center gap-1"><span className="w-[5px] h-[5px] rounded-full bg-[#00C27C]" /><span className="text-[8px] text-[#00C27C] font-medium">Online</span></div>
        </div>
      </div>

      {/* Suggestions (only show when no messages) */}
      {messages.length === 0 && (
        <div className="px-4 mb-3 flex-shrink-0">
          <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Suggested</p>
          <div className="grid grid-cols-2 gap-1.5">
            {suggestions.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.key} onClick={() => processMessage(s.label)} className="rounded-xl border border-[#2A2722] bg-[#161514] p-2.5 text-left active:scale-[0.97] transition-transform">
                  <Icon className="w-3.5 h-3.5 mb-1" style={{ color: s.c }} />
                  <p className="text-[9px] text-white leading-[1.4]">{s.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-3">
        {messages.map((msg, idx) => msg.from === 'user' ? (
          <div key={idx} className="flex justify-end">
            <div className="rounded-2xl rounded-br-md bg-[#D4A03A]/12 border border-[#D4A03A]/20 px-3.5 py-2 max-w-[85%]">
              <p className="text-[10px] text-white">{msg.text}</p>
            </div>
          </div>
        ) : (
          <div key={idx} className="flex gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
              <NexusIcon size={10} />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-3.5 py-2.5 max-w-[85%]">
              <p className="text-[10px] text-[#C8C3BA] leading-[1.6] mb-2 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>') }} />

              {/* Reorder cards */}
              {msg.reorderCards && msg.reorderCards.map(p => (
                <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-[#2A2722]/60 last:border-0">
                  <div>
                    <p className="text-[9px] font-semibold text-white">{p.name}</p>
                    <p className="text-[8px] text-[#6B6359]">{p.brand} -- {p.urgency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-white">{p.recommendedQty} units</p>
                    <p className="text-[8px] text-[#6B6359]">${(p.lastPrice * p.recommendedQty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {msg.showReorderAll && (
                <button onClick={onReorderAll} className="mt-2.5 w-full py-2 rounded-xl bg-[#00C27C] text-[10px] font-bold text-white active:scale-[0.97]">
                  Approve All Reorders -- ${msg.totalCost?.toLocaleString()}
                </button>
              )}

              {/* Price cards */}
              {msg.priceCards && msg.priceCards.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#2A2722]/60 last:border-0">
                  <div><p className="text-[9px] font-semibold text-white">{p.name}</p><p className="text-[8px] text-[#6B6359]">{p.brand}</p></div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white">${p.yours}</span>
                    <span className="text-[8px] text-[#6B6359]">vs ${p.market}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${p.rec === 'Lower' ? 'text-[#E87068] bg-[#E87068]/15' : p.rec === 'Raise' ? 'text-[#00C27C] bg-[#00C27C]/15' : 'text-[#ADA599] bg-[#ADA599]/10'}`}>{p.rec}</span>
                  </div>
                </div>
              ))}

              {/* Sentiment card */}
              {msg.sentimentCard && (
                <div className="mt-2 rounded-xl bg-[#0D0C0A] border border-[#2A2722] p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-center">
                      <p className="text-[18px] font-extrabold text-[#B598E8]">{msg.sentimentCard.score}</p>
                      <p className="text-[7px] text-[#6B6359]">SENTIMENT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[18px] font-extrabold text-[#64A8E0]">{msg.sentimentCard.nps}</p>
                      <p className="text-[7px] text-[#6B6359]">NPS</p>
                    </div>
                    <div className="flex-1" />
                    <div className="text-right">
                      <p className={`text-[9px] font-bold ${msg.sentimentCard.delta >= 0 ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{msg.sentimentCard.delta >= 0 ? '+' : ''}{msg.sentimentCard.delta} pts</p>
                      <p className="text-[7px] text-[#6B6359]">vs last month</p>
                    </div>
                  </div>
                  {msg.sentimentCard.topics.map(t => (
                    <div key={t.topic} className="flex items-center justify-between py-1 border-b border-[#2A2722]/40 last:border-0">
                      <span className="text-[9px] text-[#ADA599]">{t.topic}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-white">{t.score}</span>
                        <span className={`text-[8px] font-bold ${t.delta >= 0 ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{t.delta >= 0 ? '+' : ''}{t.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Campaign card */}
              {msg.campaignCard && (
                <div className="mt-2 rounded-xl bg-[#00C27C]/8 border border-[#00C27C]/20 p-3">
                  <p className="text-[10px] font-bold text-white mb-1">{msg.campaignCard.name}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div><p className="text-[7px] text-[#6B6359]">Discount</p><p className="text-[9px] font-bold text-[#00C27C]">{msg.campaignCard.discount}</p></div>
                    <div><p className="text-[7px] text-[#6B6359]">Target</p><p className="text-[9px] font-bold text-white">{msg.campaignCard.target}</p></div>
                    <div><p className="text-[7px] text-[#6B6359]">Projected</p><p className="text-[9px] font-bold text-[#00C27C]">{msg.campaignCard.projected}</p></div>
                  </div>
                  <button className="mt-2 w-full py-1.5 rounded-lg bg-[#00C27C] text-[9px] font-bold text-white active:scale-[0.97]" onClick={() => showToast('Campaign scheduled for Friday')}>Launch Campaign</button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(212,160,58,0.1)' }}>
              <NexusIcon size={10} />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-[#161514] border border-[#2A2722] px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                {typingStatus && <span className="text-[8px] text-[#6B6359] italic">{typingStatus}</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestion pills (when there are messages) */}
      {messages.length > 0 && (
        <div className="px-4 pt-2 flex-shrink-0">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {['Reorder inventory', 'Price check', 'Sentiment', 'Weekly summary'].map(s => (
              <button key={s} onClick={() => processMessage(s)} className="px-2.5 py-1 rounded-full text-[9px] font-medium text-[#D4A03A] border border-[#D4A03A]/25 bg-[#D4A03A]/5 active:scale-[0.95] flex-shrink-0">{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 pb-20 pt-2 flex-shrink-0">
        <div className="flex items-center gap-2 bg-[#161514] border border-[#2A2722] rounded-2xl px-3.5 py-2.5">
          <NexusIcon size={12} />
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && processMessage(input)}
            placeholder="Ask Nexus anything..."
            className="text-[10px] text-white placeholder-[#6B6359] bg-transparent outline-none flex-1"
          />
          <Mic className="w-4 h-4 text-[#6B6359]" />
          <button onClick={() => processMessage(input)} className="active:scale-90 transition-transform"><Send className="w-4 h-4 text-[#D4A03A]" /></button>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   TAB 5: ACTIONS — Quick Actions Hub
   ═══════════════════════════════════════════════════════════════════════════ */
function ScreenActions({ vaultItems, transfers, pricingProducts, promos, compliance, onVaultTransfer, showToast }) {
  const [activeAction, setActiveAction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Vault Transfer sub-view
  if (activeAction === 'vault') {
    const available = vaultItems.filter(v => v.vault > 0);
    return (
      <div className="px-4 pt-2 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setActiveAction(null)}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
          <div><p className="text-[14px] font-bold text-white">Vault to Floor</p><p className="text-[9px] text-[#6B6359]">Chain-of-custody transfer</p></div>
        </div>
        <div className="space-y-2.5">
          {available.map(v => (
            <div key={v.id} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div><p className="text-[10px] font-semibold text-white">{v.name}</p><p className="text-[8px] text-[#6B6359]">{v.store} -- {v.category}</p></div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${v.urgency === 'critical' ? 'text-[#E87068] bg-[#E87068]/15' : v.urgency === 'high' ? 'text-[#D4A03A] bg-[#D4A03A]/15' : 'text-[#64A8E0] bg-[#64A8E0]/15'}`}>{v.urgency}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 text-center rounded-lg bg-[#0D0C0A] py-2">
                  <p className="text-[7px] text-[#6B6359] uppercase">Floor Qty</p>
                  <p className={`text-[14px] font-extrabold ${v.floor === 0 ? 'text-[#E87068]' : v.floor <= 3 ? 'text-[#D4A03A]' : 'text-white'}`}>{v.floor}</p>
                </div>
                <ArrowRightLeft className="w-4 h-4 text-[#6B6359]" />
                <div className="flex-1 text-center rounded-lg bg-[#0D0C0A] py-2">
                  <p className="text-[7px] text-[#6B6359] uppercase">Vault Qty</p>
                  <p className="text-[14px] font-extrabold text-[#00C27C]">{v.vault}</p>
                </div>
              </div>
              <button onClick={() => onVaultTransfer(v.id)} className="w-full py-2 rounded-xl bg-[#B598E8] text-[10px] font-bold text-white active:scale-[0.97] flex items-center justify-center gap-1.5">
                <ArrowRightLeft className="w-3 h-3" /> Transfer to Floor
              </button>
            </div>
          ))}
        </div>
        {transfers.length > 0 && (
          <div className="mt-4">
            <p className="text-[8px] font-bold text-[#6B6359] uppercase tracking-[1.5px] mb-2">Transfer Log</p>
            {transfers.map(t => (
              <div key={t.id} className="flex items-center gap-2 py-2 border-b border-[#2A2722]/60 last:border-0">
                <Check className="w-3 h-3 text-[#00C27C] flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[9px] text-white">{t.product} x{t.qty}</p>
                  <p className="text-[8px] text-[#6B6359]">{t.by} -- {t.time} -- {t.store}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Price Check sub-view
  if (activeAction === 'price') {
    const filtered = searchQuery ? pricingProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())) : pricingProducts;
    return (
      <div className="px-4 pt-2 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => { setActiveAction(null); setSearchQuery(''); }}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
          <div><p className="text-[14px] font-bold text-white">Price Check</p><p className="text-[9px] text-[#6B6359]">Your price vs market</p></div>
        </div>
        <div className="flex items-center gap-2 bg-[#161514] border border-[#2A2722] rounded-xl px-3 py-2 mb-3">
          <Search className="w-3.5 h-3.5 text-[#6B6359]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search product or brand..." className="text-[10px] text-white placeholder-[#6B6359] bg-transparent outline-none flex-1" />
        </div>
        <div className="space-y-2">
          {filtered.map(p => {
            const gap = ((p.grossPrice - p.marketAvg) / p.marketAvg * 100);
            const rec = gap > 5 ? 'Above' : gap < -5 ? 'Below' : 'At Market';
            const recC = gap > 5 ? '#E87068' : gap < -5 ? '#64A8E0' : '#00C27C';
            return (
              <div key={p.id} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div><p className="text-[10px] font-semibold text-white">{p.name}</p><p className="text-[8px] text-[#6B6359]">{p.brand} -- {p.category}</p></div>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: recC, background: `${recC}15` }}>{rec}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#0D0C0A] rounded-lg p-2 text-center">
                    <p className="text-[7px] text-[#6B6359]">Your Price</p>
                    <p className="text-[12px] font-bold text-white">${p.grossPrice}</p>
                  </div>
                  <div className="flex-1 bg-[#0D0C0A] rounded-lg p-2 text-center">
                    <p className="text-[7px] text-[#6B6359]">Market Avg</p>
                    <p className="text-[12px] font-bold text-[#ADA599]">${p.marketAvg}</p>
                  </div>
                  <div className="flex-1 bg-[#0D0C0A] rounded-lg p-2 text-center">
                    <p className="text-[7px] text-[#6B6359]">Range</p>
                    <p className="text-[10px] font-bold text-[#6B6359]">${p.marketLow}-${p.marketHigh}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[8px] text-[#6B6359]">Margin: {p.margin}% -- {p.weeklyUnits} units/wk</span>
                  <span className={`text-[9px] font-bold`} style={{ color: recC }}>{gap >= 0 ? '+' : ''}{gap.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Compliance sub-view
  if (activeAction === 'compliance') {
    return (
      <div className="px-4 pt-2 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setActiveAction(null)}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
          <div><p className="text-[14px] font-bold text-white">Compliance Status</p><p className="text-[9px] text-[#6B6359]">License, METRC, security</p></div>
        </div>
        <div className="space-y-2.5">
          {[
            { l: 'License Status', v: compliance.licenseStatus, sub: `Expires ${compliance.licenseExpiry}`, icon: FileText, c: '#00C27C', ok: true },
            { l: 'METRC Sync', v: compliance.metrcSync, sub: compliance.metrcStatus === 'green' ? 'All packages tracked' : 'Sync issue', icon: RefreshCw, c: compliance.metrcStatus === 'green' ? '#00C27C' : '#E87068', ok: compliance.metrcStatus === 'green' },
            { l: 'ID Scans Today', v: String(compliance.idScansToday), sub: '100% compliance rate', icon: Shield, c: '#64A8E0', ok: true },
            { l: 'Camera System', v: compliance.cameraStatus, sub: `${compliance.cameras} cameras active`, icon: Camera, c: '#00C27C', ok: true },
            { l: 'Last Audit', v: compliance.lastAudit, sub: `${compliance.openViolations} open violations`, icon: Clipboard, c: compliance.openViolations === 0 ? '#00C27C' : '#E87068', ok: compliance.openViolations === 0 },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.l} className="rounded-xl border bg-[#161514] p-3.5 flex items-center gap-3" style={{ borderColor: item.ok ? '#2A2722' : '#E87068' + '40' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.c}15` }}>
                  <Icon className="w-4 h-4" style={{ color: item.c }} />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] text-[#6B6359] uppercase tracking-[1px] font-bold">{item.l}</p>
                  <p className="text-[11px] font-bold text-white">{item.v}</p>
                  <p className="text-[8px] text-[#6B6359]">{item.sub}</p>
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: item.ok ? '#00C27C20' : '#E8706820' }}>
                  {item.ok ? <Check className="w-3 h-3 text-[#00C27C]" /> : <AlertTriangle className="w-3 h-3 text-[#E87068]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Promotions sub-view
  if (activeAction === 'promos') {
    const verdictC = { Keep: '#00C27C', Optimize: '#D4A03A', Kill: '#E87068' };
    return (
      <div className="px-4 pt-2 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setActiveAction(null)}><ArrowLeft className="w-4 h-4 text-[#ADA599]" /></button>
          <div><p className="text-[14px] font-bold text-white">Active Promotions</p><p className="text-[9px] text-[#6B6359]">{promos.length} running</p></div>
        </div>
        <div className="space-y-2.5">
          {promos.map((p, i) => {
            const vc = verdictC[p.verdict] || '#ADA599';
            return (
              <div key={i} className="rounded-xl border border-[#2A2722] bg-[#161514] p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-semibold text-white">{p.name}</p>
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ color: vc, background: `${vc}18` }}>{p.verdict}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-2">
                  <div className="bg-[#0D0C0A] rounded-lg py-1.5">
                    <p className="text-[7px] text-[#6B6359]">Spend</p>
                    <p className="text-[10px] font-bold text-white">{p.spend}</p>
                  </div>
                  <div className="bg-[#0D0C0A] rounded-lg py-1.5">
                    <p className="text-[7px] text-[#6B6359]">Redemptions</p>
                    <p className="text-[10px] font-bold text-white">{p.redemptions}</p>
                  </div>
                  <div className="bg-[#0D0C0A] rounded-lg py-1.5">
                    <p className="text-[7px] text-[#6B6359]">ROI</p>
                    <p className={`text-[10px] font-bold ${p.roi >= 1.5 ? 'text-[#00C27C]' : p.roi < 1 ? 'text-[#E87068]' : 'text-[#D4A03A]'}`}>{p.roi}x</p>
                  </div>
                </div>
                <p className="text-[8px] text-[#6B6359]">{p.type}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Main actions hub
  const actionCards = [
    { id: 'vault', l: 'Vault Transfer', desc: 'Move product from vault to floor', icon: ArrowRightLeft, c: '#B598E8', badge: vaultItems.filter(v => v.floor <= 3 && v.vault > 0).length },
    { id: 'price', l: 'Price Check', desc: 'Your price vs market', icon: DollarSign, c: '#D4A03A' },
    { id: 'compliance', l: 'Compliance', desc: 'License, METRC, security', icon: Shield, c: '#00C27C' },
    { id: 'promos', l: 'Active Promos', desc: `${promos.length} running promotions`, icon: Percent, c: '#EC4899' },
  ];

  return (
    <div className="px-4 pt-2 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div><p className="text-[14px] font-bold text-white">Quick Actions</p><p className="text-[9px] text-[#6B6359]">One-tap mobile actions</p></div>
      </div>
      <div className="space-y-2.5">
        {actionCards.map(a => {
          const Icon = a.icon;
          return (
            <button key={a.id} onClick={() => setActiveAction(a.id)} className="w-full rounded-xl border border-[#2A2722] bg-[#161514] p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.c}15` }}>
                <Icon className="w-5 h-5" style={{ color: a.c }} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-white">{a.l}</p>
                <p className="text-[9px] text-[#6B6359]">{a.desc}</p>
              </div>
              {a.badge > 0 && <span className="w-5 h-5 rounded-full bg-[#E87068] flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{a.badge}</span>}
              <ChevronRight className="w-4 h-4 text-[#38332B] flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP — Centralized state, connected data & actions
   ═══════════════════════════════════════════════════════════════════════════ */
export default function NexusMobileWeb() {
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [toast, setToast] = useState(null);
  const [vaultItems, setVaultItems] = useState(VAULT_INVENTORY);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [inventory, setInventory] = useState([
    { id: 'blue-dream', name: 'Blue Dream 3.5g', store: '4 stores', hours: 12, cost: '$2,840', sev: 'critical', status: 'active' },
    { id: 'ozone-gummies', name: 'Ozone Gummies 100mg', store: 'Fort Lee', hours: 36, cost: '$675', sev: 'warning', status: 'active' },
    { id: 'tunnel-vision', name: 'Tunnel Vision 5-Pack', store: 'Boston', hours: 48, cost: '$420', sev: 'warning', status: 'active' },
    { id: 'stiiizy-pod', name: 'Stiiizy Pod LLR 1g', store: 'Hoboken', hours: 72, cost: '$1,125', sev: 'low', status: 'active' },
  ]);
  const [oosProducts, setOosProducts] = useState(OUT_OF_STOCK_PRODUCTS);

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

  // Alert action handler
  const handleAlertAction = useCallback((alertId, action) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    if (action === 'Approve Reorder') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setInventory(prev => prev.map(i => i.id === 'blue-dream' ? { ...i, status: 'ordered' } : i));
      setResolvedAlerts(prev => [`${alert.title} -- reorder approved`, ...prev]);
      showToast('Reorder approved -- delivery in 2 days');
    } else if (action === 'Apply Price') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setResolvedAlerts(prev => [`${alert.title} -- price adjusted to $44.99`, ...prev]);
      showToast('Price updated to $44.99');
    } else if (action === 'Draft PO') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setResolvedAlerts(prev => [`${alert.title} -- PO drafted`, ...prev]);
      showToast('Purchase order drafted for Jeeter');
    } else if (action === 'View Staffing' || action === 'View Data' || action === 'View Comps' || action === 'Modify') {
      showToast(`Opening ${action.toLowerCase()}...`, 'info');
    }
  }, [alerts, showToast]);

  // Vault transfer handler
  const handleVaultTransfer = useCallback((vaultId) => {
    const item = vaultItems.find(v => v.id === vaultId);
    if (!item || item.vault <= 0) return;
    const transferQty = Math.min(item.vault, 12);
    setVaultItems(prev => prev.map(v => v.id === vaultId ? { ...v, floor: v.floor + transferQty, vault: v.vault - transferQty } : v));
    setTransfers(prev => [{ id: `t-${Date.now()}`, product: item.name, qty: transferQty, from: 'Vault', to: 'Floor', by: 'You', time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), store: item.store }, ...prev]);
    showToast(`Transferred ${transferQty}x ${item.name} to floor`);
  }, [vaultItems, showToast]);

  // Inventory reorder handler
  const handleReorder = useCallback((itemId) => {
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, status: 'ordered' } : i));
    showToast('Reorder placed -- delivery in 2-3 days');
  }, [showToast]);

  // Reorder all handler
  const handleReorderAll = useCallback(() => {
    setInventory(prev => prev.map(i => i.status === 'active' ? { ...i, status: 'ordered' } : i));
    showToast('All items reordered successfully');
  }, [showToast]);

  // Current tab for bottom nav (ignore sub-screens)
  const activeTab = screen === 'store-detail' ? 'home' : screen;

  return (
    <div className="min-h-screen text-white" style={{ background: '#0D0C0A', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} key={toast.key} />}

      {screen === 'home' && <ScreenHome stores={STORES} alerts={alerts} onNavigate={navigate} onSelectStore={handleSelectStore} />}
      {screen === 'store-detail' && <ScreenStoreDetail store={selectedStore} onBack={goBack} />}
      {screen === 'alerts' && <ScreenAlerts alerts={alerts} resolvedAlerts={resolvedAlerts} inventory={inventory} vaultItems={vaultItems} onAlertAction={handleAlertAction} onVaultTransfer={handleVaultTransfer} onReorder={handleReorder} showToast={showToast} />}
      {screen === 'floor' && <ScreenFloor floor={FLOOR_DATA} onNavigate={navigate} />}
      {screen === 'chat' && <ScreenChat alerts={alerts} inventory={inventory} vaultItems={vaultItems} oosProducts={oosProducts} pricingProducts={PRICING_PRODUCTS} promos={PROMOTIONS} onReorderAll={handleReorderAll} showToast={showToast} onNavigate={navigate} />}
      {screen === 'actions' && <ScreenActions vaultItems={vaultItems} transfers={transfers} pricingProducts={PRICING_PRODUCTS} promos={PROMOTIONS} compliance={COMPLIANCE} onVaultTransfer={handleVaultTransfer} showToast={showToast} />}

      {screen !== 'chat' && <BottomNav active={activeTab} onNavigate={(id) => { setHistory([]); setScreen(id); window.scrollTo({ top: 0, behavior: 'instant' }); }} alertCount={alerts.length} />}
      {screen === 'chat' && <BottomNav active="chat" onNavigate={(id) => { setHistory([]); setScreen(id); window.scrollTo({ top: 0, behavior: 'instant' }); }} alertCount={alerts.length} />}
    </div>
  );
}
