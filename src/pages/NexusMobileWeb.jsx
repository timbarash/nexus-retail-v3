import { useState, useEffect, useCallback, useRef, useMemo, useReducer } from 'react';
import {
  Home, Bell, Zap, MessageSquare, LayoutGrid,
  ArrowLeft, Check, X, Sparkles, Send, Mic,
  ChevronRight, TrendingUp, TrendingDown, AlertTriangle,
  Package, DollarSign, Star, Clock, MapPin,
  ShoppingCart, Activity, Shield, RefreshCw, User,
  BarChart3, Store, Search, ArrowUpDown, Percent,
  Eye, Truck, Box, Clipboard, Camera, FileText,
  ArrowRightLeft, Lock, Megaphone, Rocket, Users,
  Plus, Minus, ChevronDown, Filter, Flame, Target,
  Calendar, Hash, AlertCircle, Info, Zap as ZapIcon,
} from 'lucide-react';
import NexusIcon from '../components/NexusIcon';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — Real prototype data from NexusHome, ConnectAgent, PricingAgent
   ═══════════════════════════════════════════════════════════════════════════ */

const NEXUS_DATA = {
  todaySales: 47832, salesGoal: 52000, salesPct: 92,
  traffic: { today: 847, yesterday: 791, trend: 'up', delta: '+7.1%' },
  sentiment: { score: 4.2, nps: 72, delta: '+4' },
  loyalty: { signupsToday: 23, activeMembers: 18420 },
  activePromos: 5, pricingHealth: 78,
  topStore: 'Logan Square', topStoreRev: '$48.2K',
  underperformer: 'Morenci', underperformerDelta: '-23%',
};

const STORES = [
  { id: 'logan-square', name: 'Logan Square', state: 'IL', score: 87, revenue: 48200, txns: 312, basket: 154, margin: 52.1, delta: '+12%', up: true },
  { id: 'fort-lee', name: 'Fort Lee', state: 'NJ', score: 79, revenue: 41600, txns: 267, basket: 156, margin: 49.7, delta: '+5%', up: true },
  { id: 'springfield', name: 'Springfield', state: 'IL', score: 74, revenue: 52100, txns: 386, basket: 135, margin: 51.3, delta: '+34%', up: true },
  { id: 'boston', name: 'Boston', state: 'MA', score: 65, revenue: 29800, txns: 198, basket: 151, margin: 48.9, delta: '-3%', up: false },
  { id: 'morenci', name: 'Morenci', state: 'MI', score: 48, revenue: 12400, txns: 89, basket: 139, margin: 44.2, delta: '-23%', up: false },
];

const VAULT_INVENTORY = [
  { id: 'v1', name: 'Blue Dream 3.5g', brand: 'Jeeter', category: 'Flower', floor: 0, vault: 45, avgWeekly: 38, daysOOS: 3, store: 'Logan Square', urgency: 'critical', metrc: 'METRC-1A40603-BD35' },
  { id: 'v2', name: 'Stiiizy Live Resin Pod 1g', brand: 'STIIIZY', category: 'Vapes', floor: 2, vault: 30, avgWeekly: 24, daysOOS: 0, store: 'Fort Lee', urgency: 'high', metrc: 'METRC-1A40603-SL10' },
  { id: 'v3', name: 'Kiva Lost Farm Gummies', brand: 'Kiva', category: 'Edibles', floor: 0, vault: 60, avgWeekly: 28, daysOOS: 2, store: 'Logan Square', urgency: 'critical', metrc: 'METRC-1A40603-KL60' },
  { id: 'v4', name: 'Raw Garden LR Cart 1g', brand: 'Raw Garden', category: 'Vapes', floor: 3, vault: 48, avgWeekly: 18, daysOOS: 0, store: 'Springfield', urgency: 'high', metrc: 'METRC-1A40603-RG10' },
  { id: 'v5', name: 'PLUS Sour Watermelon Gummies', brand: 'PLUS', category: 'Edibles', floor: 8, vault: 36, avgWeekly: 15, daysOOS: 0, store: 'Springfield', urgency: 'medium', metrc: 'METRC-1A40603-PS36' },
  { id: 'v6', name: 'Alien Labs Baklava 3.5g', brand: 'Alien Labs', category: 'Flower', floor: 1, vault: 24, avgWeekly: 12, daysOOS: 0, store: 'Boston', urgency: 'high', metrc: 'METRC-1A40603-AL35' },
  { id: 'v7', name: 'Cookies Gary Payton 3.5g', brand: 'Cookies', category: 'Flower', floor: 15, vault: 40, avgWeekly: 20, daysOOS: 0, store: 'Logan Square', urgency: 'ok', metrc: 'METRC-1A40603-CG35' },
  { id: 'v8', name: 'Wyld Elderberry Gummies', brand: 'Wyld', category: 'Edibles', floor: 0, vault: 55, avgWeekly: 22, daysOOS: 1, store: 'Fort Lee', urgency: 'critical', metrc: 'METRC-1A40603-WE55' },
  { id: 'v9', name: 'Papa & Barkley Releaf Balm', brand: 'Papa & Barkley', category: 'Topicals', floor: 12, vault: 20, avgWeekly: 8, daysOOS: 0, store: 'Boston', urgency: 'ok', metrc: 'METRC-1A40603-PB20' },
  { id: 'v10', name: 'Jeeter Infused Pre-Roll', brand: 'Jeeter', category: 'Pre-Rolls', floor: 4, vault: 72, avgWeekly: 32, daysOOS: 0, store: 'Logan Square', urgency: 'high', metrc: 'METRC-1A40603-JI72' },
];

const PRICING_PRODUCTS = [
  { id: 'pp1', brand: 'Jeeter', name: 'Baby Jeeter Churros', cat: 'Pre-Rolls', price: 35, cost: 18, margin: 48.6, mktAvg: 33, mktLow: 30, mktHigh: 38, units: 62, pos: 'above' },
  { id: 'pp2', brand: 'STIIIZY', name: 'OG Kush Pod 1g', cat: 'Vapes', price: 45, cost: 24, margin: 46.7, mktAvg: 42, mktLow: 38, mktHigh: 48, units: 42, pos: 'above' },
  { id: 'pp3', brand: 'Kiva', name: 'Camino Pineapple Habanero', cat: 'Edibles', price: 22, cost: 10, margin: 54.5, mktAvg: 22, mktLow: 19, mktHigh: 25, units: 55, pos: 'at' },
  { id: 'pp4', brand: 'Raw Garden', name: 'Slippery Susan Cart 1g', cat: 'Vapes', price: 40, cost: 22, margin: 45.0, mktAvg: 38, mktLow: 35, mktHigh: 42, units: 28, pos: 'above' },
  { id: 'pp5', brand: 'Wyld', name: 'Elderberry Indica Gummies', cat: 'Edibles', price: 18, cost: 8, margin: 55.6, mktAvg: 18, mktLow: 16, mktHigh: 20, units: 35, pos: 'at' },
  { id: 'pp6', brand: 'Cookies', name: 'Gary Payton 3.5g', cat: 'Flower', price: 55, cost: 32, margin: 41.8, mktAvg: 52, mktLow: 48, mktHigh: 58, units: 18, pos: 'above' },
  { id: 'pp7', brand: 'Alien Labs', name: 'Atomic Apple 3.5g', cat: 'Flower', price: 50, cost: 28, margin: 44.0, mktAvg: 48, mktLow: 45, mktHigh: 55, units: 22, pos: 'above' },
  { id: 'pp8', brand: 'PLUS', name: 'Sour Watermelon Gummies', cat: 'Edibles', price: 20, cost: 9, margin: 55.0, mktAvg: 19, mktLow: 17, mktHigh: 22, units: 30, pos: 'above' },
];

const PROMOTIONS = [
  { id: 'pr1', name: 'Happy Hour 15% Off', type: 'Time-based', spend: 2100, redemptions: 342, roi: 1.5, verdict: 'Keep', lift: '+23% afternoon traffic' },
  { id: 'pr2', name: 'First-Time 20% Off', type: 'New Customer', spend: 3400, redemptions: 189, roi: 2.4, verdict: 'Keep', lift: '+34 new customers/wk' },
  { id: 'pr3', name: 'BOGO Edibles', type: 'Category', spend: 4800, redemptions: 156, roi: 0.3, verdict: 'Kill', lift: 'Cannibalizing full-price gummy sales' },
  { id: 'pr4', name: 'Loyalty 10% Off', type: 'Loyalty', spend: 1900, redemptions: 420, roi: 2.4, verdict: 'Keep', lift: '+12% repeat visits' },
  { id: 'pr5', name: 'Weekend Bundle', type: 'Bundle', spend: 2200, redemptions: 78, roi: 0.4, verdict: 'Optimize', lift: 'Low uptake — needs repositioning' },
];

const CAMPAIGNS_READY = [
  { id: 'c1', name: 'Win-Back Re-Engagement', target: '340 lapsed customers', channel: 'SMS + Email', projReturn: '12%', estRevenue: '$8,200', desc: 'Target customers with no visit in 30+ days with personalized 25% offer on their last-purchased category' },
  { id: 'c2', name: 'Jeeter Brand Spotlight', target: '1,200 flower buyers', channel: 'Push + SMS', projReturn: '18%', estRevenue: '$4,600', desc: 'Capitalize on +34% Jeeter sentiment spike. Feature Baby Jeeter Churros and new Infused Pre-Rolls' },
  { id: 'c3', name: 'Birthday/Loyalty Bonus', target: '89 members this month', channel: 'Email + In-App', projReturn: '45%', estRevenue: '$2,800', desc: 'Automated birthday rewards with double loyalty points and free pre-roll with $50+ purchase' },
];

const INITIAL_ALERTS = [
  { id: 'a01', sev: 'CRITICAL', icon: 'vault', color: '#E87068', time: '2m ago', title: 'Blue Dream 3.5g — out of stock on floor', detail: 'Floor: 0 units | Vault: 45 units available. Lost ~$380 in sales today. Avg weekly: 38 units.', action: 'Transfer to Floor', actionType: 'transfer', refId: 'v1' },
  { id: 'a02', sev: 'CRITICAL', icon: 'vault', color: '#E87068', time: '18m ago', title: 'Kiva Lost Farm Gummies — out of stock 2 days', detail: 'Floor: 0 units | Vault: 60 units. 2 days of lost sales (~$560). Customers asking at counter.', action: 'Transfer to Floor', actionType: 'transfer', refId: 'v3' },
  { id: 'a03', sev: 'CRITICAL', icon: 'vault', color: '#E87068', time: '45m ago', title: 'Wyld Elderberry Gummies — out since yesterday', detail: 'Floor: 0 units | Vault: 55 units at Fort Lee. Avg weekly: 22 units. Transfer immediately.', action: 'Transfer to Floor', actionType: 'transfer', refId: 'v8' },
  { id: 'a04', sev: 'WARNING', icon: 'vault', color: '#D4A03A', time: '1h ago', title: 'Stiiizy Live Resin Pod — low stock warning', detail: 'Floor: 2 units remaining | Vault: 30 units. At current velocity, floor depletes in ~3 hours.', action: 'Transfer to Floor', actionType: 'transfer', refId: 'v2' },
  { id: 'a05', sev: 'WARNING', icon: 'vault', color: '#D4A03A', time: '1h ago', title: 'Jeeter Infused Pre-Roll running low', detail: 'Floor: 4 units | Vault: 72 units. Weekend rush approaching — avg 32/wk. Restock now.', action: 'Transfer to Floor', actionType: 'transfer', refId: 'v10' },
  { id: 'a06', sev: 'WARNING', icon: 'price', color: '#D4A03A', time: '30m ago', title: 'Stiiizy Battery Kit priced 14% below market', detail: 'Your price: $29.99 | Market avg: $34.99. Opportunity to increase to $32.99 = +$450/wk margin.', action: 'Adjust Price', actionType: 'price' },
  { id: 'a07', sev: 'WARNING', icon: 'price', color: '#D4A03A', time: '2h ago', title: 'Cookies Gary Payton 3.5g — 6% above market', detail: 'Your price: $55 | Market avg: $52 | Range: $48-$58. Sales velocity declining 8% WoW.', action: 'Review Pricing', actionType: 'price' },
  { id: 'a08', sev: 'OPPORTUNITY', icon: 'campaign', color: '#00C27C', time: '1h ago', title: 'Win-Back campaign ready to launch', detail: '340 lapsed customers identified. Projected 12% return rate. Est. revenue: $8,200. One tap to launch.', action: 'Launch Campaign', actionType: 'campaign', refId: 'c1' },
  { id: 'a09', sev: 'OPPORTUNITY', icon: 'campaign', color: '#00C27C', time: '2h ago', title: 'Happy Hour promo driving 23% traffic lift', detail: '156 redemptions this week. Afternoon traffic up 23%. ROI: 1.5x. Consider expanding hours.', action: 'View Details', actionType: 'info' },
  { id: 'a10', sev: 'OPPORTUNITY', icon: 'price', color: '#00C27C', time: '3h ago', title: 'BOGO Edibles promo — recommend discontinuing', detail: 'ROI: 0.3x. Cannibalizing full-price gummy sales. $4,800 spend with minimal incremental revenue.', action: 'Kill Promo', actionType: 'promo' },
  { id: 'a11', sev: 'INFO', icon: 'compliance', color: '#64A8E0', time: '4h ago', title: '3 products expiring within 30 days', detail: 'Ozone Cart batch #2847 (14 units), Camino Gummies batch #1923 (8 units), Simply Herb batch #3401 (22 units). METRC destruction manifest needed.', action: 'Create Manifest', actionType: 'compliance' },
  { id: 'a12', sev: 'INFO', icon: 'compliance', color: '#64A8E0', time: '5h ago', title: 'Daily inventory reconciliation due by 5pm', detail: 'METRC reconciliation required. Last sync: 4 minutes ago. 2 discrepancies flagged for review.', action: 'Start Recon', actionType: 'compliance' },
  { id: 'a13', sev: 'INFO', icon: 'ops', color: '#64A8E0', time: '6h ago', title: 'Jeeter shipment arriving 2:30 PM today', detail: '42 SKUs from DreamFields. Includes 48x Baby Jeeter Churros, 72x Infused Pre-Rolls. Receiving dock B.', action: 'Prep Receiving', actionType: 'receive' },
  { id: 'a14', sev: 'INSIGHT', icon: 'insight', color: '#B598E8', time: '8h ago', title: 'Tuesday projected traffic: 920 customers', detail: 'Current staff covers 750 capacity. Gap of 170 customers. 62% of sales happen after 4pm.', action: 'View Staffing', actionType: 'info' },
  { id: 'a15', sev: 'INSIGHT', icon: 'insight', color: '#B598E8', time: '12h ago', title: 'Jeeter brand sentiment surging +34% WoW', detail: 'Social mentions up significantly. 2 stores don\'t stock Jeeter yet. Trending in local market.', action: 'Draft PO', actionType: 'info' },
];

const COMPLIANCE_DATA = {
  licenseStatus: 'Active', licenseExpiry: 'Sep 14, 2026',
  metrcSync: 'Synced 4m ago', metrcStatus: 'green',
  idScansToday: 347, cameraStatus: 'All 24 Online',
  lastAudit: 'Feb 28, 2026', openViolations: 0,
  expiringProducts: [
    { name: 'Ozone Cart batch #2847', units: 14, expires: 'Apr 12, 2026' },
    { name: 'Camino Gummies batch #1923', units: 8, expires: 'Apr 8, 2026' },
    { name: 'Simply Herb batch #3401', units: 22, expires: 'Apr 15, 2026' },
  ],
};

const INITIAL_TRANSFERS = [
  { id: 't1', product: 'Ozone Reserve Cart 1g', qty: 12, by: 'Marcus T.', time: '10:42 AM', store: 'Logan Square' },
  { id: 't2', product: 'Camino Gummies', qty: 8, by: 'Alex K.', time: '9:15 AM', store: 'Fort Lee' },
];

const CHAT_SUGGESTIONS = [
  'Reorder out-of-stock inventory',
  'Run a marketing campaign',
  'Compare prices vs market',
  'Customer sentiment this month',
  'Weekly sales summary',
  'Trending products to add',
];

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 3200); return () => clearTimeout(t); }, [onDismiss]);
  const bg = type === 'success' ? '#00C27C' : type === 'warning' ? '#D4A03A' : type === 'error' ? '#E87068' : '#64A8E0';
  return (
    <div className="fixed top-4 left-4 right-4 z-[10000] flex justify-center" style={{ animation: 'slideDown 0.3s ease-out' }}>
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl max-w-sm w-full" style={{ background: '#1C1B1A', border: `1px solid ${bg}40` }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${bg}20` }}>
          <Check className="w-3.5 h-3.5" style={{ color: bg }} />
        </div>
        <span className="text-[13px] text-white font-medium flex-1">{message}</span>
        <button onClick={onDismiss} className="p-0.5"><X className="w-3.5 h-3.5 text-[#6B6359]" /></button>
      </div>
    </div>
  );
}

function HealthRing({ score, size = 44 }) {
  const c = score >= 75 ? '#00C27C' : score >= 55 ? '#D4A03A' : '#E87068';
  const inner = Math.round(size * 0.72);
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, background: `conic-gradient(${c} ${score * 3.6}deg, #38332B 0deg)` }}>
      <div className="rounded-full bg-[#1C1B1A] flex items-center justify-center font-bold" style={{ width: inner, height: inner, color: c, fontSize: size * 0.27 }}>{score}</div>
    </div>
  );
}

function SevBadge({ sev, color }) {
  return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>{sev}</span>;
}

function Spark({ data = [3,5,4,7,6,8,9], color = '#00C27C', w = 40, h = 14 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PriceBar({ price, mktLow, mktHigh, mktAvg }) {
  const range = mktHigh - mktLow || 1;
  const yourPos = Math.max(0, Math.min(100, ((price - mktLow) / range) * 100));
  const avgPos = Math.max(0, Math.min(100, ((mktAvg - mktLow) / range) * 100));
  return (
    <div className="relative h-2 rounded-full bg-[#38332B] w-full mt-1">
      <div className="absolute top-0 h-2 rounded-full" style={{ left: 0, width: '100%', background: 'linear-gradient(90deg, #00C27C, #D4A03A, #E87068)' , opacity: 0.3 }} />
      <div className="absolute -top-0.5 w-1 h-3 rounded bg-[#6B6359]" style={{ left: `${avgPos}%` }} title="Market Avg" />
      <div className="absolute -top-1 w-2.5 h-4 rounded-sm bg-white border border-[#141210]" style={{ left: `calc(${yourPos}% - 5px)` }} title="Your Price" />
    </div>
  );
}

function BottomNav({ active = 'home', onNavigate, alertCount = 0 }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: alertCount },
    { id: 'floor', icon: ArrowRightLeft, label: 'Floor' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'actions', icon: LayoutGrid, label: 'Actions' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-3" style={{ background: 'linear-gradient(transparent 0%, rgba(20,18,16,0.97) 35%)' }}>
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          const on = t.id === active;
          return (
            <button key={t.id} onClick={() => onNavigate(t.id)} className="flex flex-col items-center gap-[2px] outline-none relative min-w-[48px] min-h-[48px] justify-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${on ? 'bg-[#D4A03A]/15' : ''}`}>
                <Icon className={`w-[17px] h-[17px] ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
                {t.badge > 0 && <span className="absolute -top-0.5 right-0.5 w-[18px] h-[18px] rounded-full bg-[#E87068] flex items-center justify-center text-[9px] font-bold text-white">{t.badge > 9 ? '9+' : t.badge}</span>}
              </div>
              <span className={`text-[9px] font-medium ${on ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const Card = ({ children, className = '', style = {} }) => (
  <div className={`rounded-2xl p-4 ${className}`} style={{ background: '#1C1B1A', border: '1px solid #38332B', ...style }}>{children}</div>
);

const Section = ({ title, action, onAction, children }) => (
  <div className="mb-5">
    <div className="flex items-center justify-between mb-2.5 px-1">
      <span className="text-[13px] font-semibold text-[#A39B8D] uppercase tracking-wider">{title}</span>
      {action && <button onClick={onAction} className="text-[12px] text-[#D4A03A] font-medium">{action}</button>}
    </div>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN: HOME — Executive Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

function ScreenHome({ data, alerts, vault, stores, onNav, showToast }) {
  const critAlerts = alerts.filter(a => a.sev === 'CRITICAL').length;
  const oosCount = vault.filter(v => v.floor === 0).length;
  const pricingIssues = PRICING_PRODUCTS.filter(p => Math.abs(p.price - p.mktAvg) / p.mktAvg > 0.08).length;

  return (
    <div className="px-4 pt-[env(safe-area-inset-top,12px)] pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-3 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center">
            <NexusIcon className="w-4 h-4 text-[#D4A03A]" />
          </div>
          <div>
            <div className="text-[15px] font-bold text-white">Nexus Mobile</div>
            <div className="text-[11px] text-[#6B6359]">All Stores &middot; Today</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {critAlerts > 0 && (
            <button onClick={() => onNav('alerts')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E87068]/10 border border-[#E87068]/20">
              <AlertTriangle className="w-3.5 h-3.5 text-[#E87068]" />
              <span className="text-[11px] font-bold text-[#E87068]">{critAlerts}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sales Ring + KPIs */}
      <Card className="mb-4">
        <div className="flex items-center gap-4">
          <HealthRing score={data.salesPct} size={64} />
          <div className="flex-1">
            <div className="text-[22px] font-bold text-white">${data.todaySales.toLocaleString()}</div>
            <div className="text-[12px] text-[#6B6359]">of ${data.salesGoal.toLocaleString()} goal</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-[#00C27C]" />
              <span className="text-[11px] text-[#00C27C]">{data.traffic.delta} vs yesterday</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#38332B]">
          {[
            { label: 'Traffic', value: data.traffic.today, sub: data.traffic.delta, up: true },
            { label: 'Sentiment', value: `${data.sentiment.score}/5`, sub: `NPS ${data.sentiment.nps}`, up: true },
            { label: 'Loyalty', value: data.loyalty.signupsToday, sub: 'signups', up: true },
            { label: 'Promos', value: data.activePromos, sub: 'active', up: true },
          ].map(k => (
            <div key={k.label} className="text-center">
              <div className="text-[14px] font-bold text-white">{k.value}</div>
              <div className="text-[9px] text-[#6B6359]">{k.sub}</div>
              <div className="text-[9px] text-[#6B6359] mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Smart Briefing */}
      <Section title="Smart Briefing">
        <div className="space-y-2.5">
          {[
            { icon: AlertTriangle, color: '#E87068', text: `${oosCount} products out of stock on floor — vault inventory available for all. Transfer now to recover ~$940/day in lost sales.`, action: 'Transfer All', onAction: () => onNav('floor') },
            { icon: DollarSign, color: '#D4A03A', text: `${pricingIssues} products priced >8% from market avg. Stiiizy Battery Kit 14% below = $450/wk margin opportunity.`, action: 'Review Pricing', onAction: () => onNav('actions') },
            { icon: Megaphone, color: '#00C27C', text: 'Win-Back campaign ready: 340 lapsed customers, projected $8,200 revenue. Jeeter sentiment surging +34%.', action: 'Launch', onAction: () => showToast('Win-Back campaign launched to 340 customers') },
            { icon: Clock, color: '#64A8E0', text: 'Jeeter shipment arriving 2:30 PM (42 SKUs). Tuesday peak traffic expected after 4pm — ensure coverage.', action: null },
          ].map((b, i) => (
            <Card key={i} className="!p-3">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}15` }}>
                  <b.icon className="w-3.5 h-3.5" style={{ color: b.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-[#C4BDB2] leading-[1.5]">{b.text}</div>
                  {b.action && (
                    <button onClick={b.onAction} className="mt-2 text-[11px] font-semibold text-[#D4A03A] flex items-center gap-1">
                      {b.action} <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing Snapshot */}
      <Section title="Pricing Benchmark" action="See All" onAction={() => onNav('actions')}>
        <Card className="!p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HealthRing score={data.pricingHealth} size={36} />
              <div>
                <div className="text-[13px] font-bold text-white">Pricing Health</div>
                <div className="text-[10px] text-[#6B6359]">5 competitive, 2 above, 1 below market</div>
              </div>
            </div>
          </div>
          {PRICING_PRODUCTS.slice(0, 4).map(p => {
            const diff = ((p.price - p.mktAvg) / p.mktAvg * 100).toFixed(0);
            const diffColor = Math.abs(diff) <= 5 ? '#00C27C' : Math.abs(diff) <= 10 ? '#D4A03A' : '#E87068';
            return (
              <div key={p.id} className="flex items-center justify-between py-2 border-t border-[#38332B]/50">
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-[#6B6359]">{p.brand} &middot; {p.margin}% margin</div>
                </div>
                <div className="text-right ml-3">
                  <div className="text-[12px] font-bold text-white">${p.price}</div>
                  <div className="text-[10px] font-medium" style={{ color: diffColor }}>{diff > 0 ? '+' : ''}{diff}% vs mkt</div>
                </div>
              </div>
            );
          })}
        </Card>
      </Section>

      {/* Store Performance */}
      <Section title="Store Performance" action="All Stores" onAction={() => onNav('actions')}>
        <div className="space-y-2">
          {stores.map(s => (
            <Card key={s.id} className="!p-3 flex items-center gap-3">
              <HealthRing score={s.score} size={38} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white">{s.name}</div>
                <div className="text-[10px] text-[#6B6359]">{s.state} &middot; ${(s.revenue / 1000).toFixed(1)}K today</div>
              </div>
              <div className="text-right">
                <div className={`text-[12px] font-bold ${s.up ? 'text-[#00C27C]' : 'text-[#E87068]'}`}>{s.delta}</div>
                <div className="text-[10px] text-[#6B6359]">{s.txns} txns</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN: ALERTS — Actionable, Categorized Alerts
   ═══════════════════════════════════════════════════════════════════════════ */

function ScreenAlerts({ alerts, onAction, onNav }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'All', count: alerts.length },
    { id: 'CRITICAL', label: 'Critical', count: alerts.filter(a => a.sev === 'CRITICAL').length },
    { id: 'WARNING', label: 'Warning', count: alerts.filter(a => a.sev === 'WARNING').length },
    { id: 'OPPORTUNITY', label: 'Opportunity', count: alerts.filter(a => a.sev === 'OPPORTUNITY').length },
    { id: 'INFO', label: 'Info', count: alerts.filter(a => a.sev === 'INFO').length },
    { id: 'INSIGHT', label: 'Insight', count: alerts.filter(a => a.sev === 'INSIGHT').length },
  ];
  const shown = filter === 'all' ? alerts : alerts.filter(a => a.sev === filter);

  return (
    <div className="px-4 pt-[env(safe-area-inset-top,12px)] pb-24">
      <div className="flex items-center justify-between pt-3 pb-3">
        <div className="text-[17px] font-bold text-white">Alerts</div>
        <span className="text-[11px] text-[#6B6359]">{alerts.length} active</span>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${filter === f.id ? 'bg-[#D4A03A]/15 text-[#D4A03A] border border-[#D4A03A]/30' : 'bg-[#1C1B1A] text-[#6B6359] border border-[#38332B]'}`}>
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2.5">
        {shown.map(a => (
          <Card key={a.id} className="!p-3.5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${a.color}15` }}>
                {a.icon === 'vault' && <ArrowRightLeft className="w-4 h-4" style={{ color: a.color }} />}
                {a.icon === 'price' && <DollarSign className="w-4 h-4" style={{ color: a.color }} />}
                {a.icon === 'campaign' && <Megaphone className="w-4 h-4" style={{ color: a.color }} />}
                {a.icon === 'compliance' && <Shield className="w-4 h-4" style={{ color: a.color }} />}
                {a.icon === 'ops' && <Truck className="w-4 h-4" style={{ color: a.color }} />}
                {a.icon === 'insight' && <Sparkles className="w-4 h-4" style={{ color: a.color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <SevBadge sev={a.sev} color={a.color} />
                  <span className="text-[10px] text-[#6B6359]">{a.time}</span>
                </div>
                <div className="text-[13px] font-semibold text-white leading-snug mb-1">{a.title}</div>
                <div className="text-[11px] text-[#A39B8D] leading-relaxed mb-2.5">{a.detail}</div>
                <button
                  onClick={() => onAction(a)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold min-h-[36px]"
                  style={{ background: `${a.color}15`, color: a.color, border: `1px solid ${a.color}25` }}>
                  {a.actionType === 'transfer' && <ArrowRightLeft className="w-3.5 h-3.5" />}
                  {a.actionType === 'price' && <DollarSign className="w-3.5 h-3.5" />}
                  {a.actionType === 'campaign' && <Rocket className="w-3.5 h-3.5" />}
                  {a.actionType === 'compliance' && <Shield className="w-3.5 h-3.5" />}
                  {a.actionType === 'receive' && <Truck className="w-3.5 h-3.5" />}
                  {a.actionType === 'promo' && <X className="w-3.5 h-3.5" />}
                  {a.actionType === 'info' && <Eye className="w-3.5 h-3.5" />}
                  {a.action}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN: FLOOR — Vault-to-Floor Transfer System
   ═══════════════════════════════════════════════════════════════════════════ */

function ScreenFloor({ vault, transfers, onTransfer, showToast }) {
  const [selectedId, setSelectedId] = useState(null);
  const [transferQty, setTransferQty] = useState(0);
  const [tab, setTab] = useState('inventory'); // inventory | transfers
  const selected = vault.find(v => v.id === selectedId);

  const sorted = useMemo(() => {
    return [...vault].sort((a, b) => {
      const urgMap = { critical: 0, high: 1, medium: 2, ok: 3 };
      return (urgMap[a.urgency] || 3) - (urgMap[b.urgency] || 3);
    });
  }, [vault]);

  const oosCount = vault.filter(v => v.floor === 0).length;
  const lowCount = vault.filter(v => v.floor > 0 && v.floor <= 5).length;

  const handleTransfer = () => {
    if (!selected || transferQty <= 0) return;
    onTransfer(selectedId, transferQty);
    setSelectedId(null);
    setTransferQty(0);
  };

  const statusColor = (v) => v.floor === 0 ? '#E87068' : v.floor <= 5 ? '#D4A03A' : '#00C27C';
  const statusLabel = (v) => v.floor === 0 ? 'OUT OF STOCK' : v.floor <= 5 ? 'LOW STOCK' : 'OK';

  return (
    <div className="px-4 pt-[env(safe-area-inset-top,12px)] pb-24">
      <div className="flex items-center justify-between pt-3 pb-3">
        <div>
          <div className="text-[17px] font-bold text-white">Floor Management</div>
          <div className="text-[11px] text-[#6B6359]">Vault → Floor Transfers</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-1 rounded-md bg-[#E87068]/10 text-[#E87068] font-bold">{oosCount} OOS</span>
          <span className="text-[10px] px-2 py-1 rounded-md bg-[#D4A03A]/10 text-[#D4A03A] font-bold">{lowCount} Low</span>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex bg-[#1C1B1A] rounded-xl p-1 mb-4 border border-[#38332B]">
        {['inventory', 'transfers'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-[12px] font-semibold transition-all ${tab === t ? 'bg-[#38332B] text-white' : 'text-[#6B6359]'}`}>
            {t === 'inventory' ? `Inventory (${vault.length})` : `Log (${transfers.length})`}
          </button>
        ))}
      </div>

      {tab === 'inventory' && (
        <div className="space-y-2">
          {sorted.map(v => (
            <Card key={v.id} className="!p-3" style={selectedId === v.id ? { border: '1px solid #D4A03A40' } : {}}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[7px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${statusColor(v)}15`, color: statusColor(v) }}>{statusLabel(v)}</span>
                    <span className="text-[9px] text-[#6B6359]">{v.category}</span>
                  </div>
                  <div className="text-[13px] font-semibold text-white">{v.name}</div>
                  <div className="text-[10px] text-[#6B6359]">{v.brand} &middot; {v.store}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-2.5 py-2 bg-[#141210] rounded-lg px-2">
                <div className="text-center">
                  <div className="text-[14px] font-bold" style={{ color: statusColor(v) }}>{v.floor}</div>
                  <div className="text-[8px] text-[#6B6359]">Floor</div>
                </div>
                <div className="text-center">
                  <div className="text-[14px] font-bold text-[#00C27C]">{v.vault}</div>
                  <div className="text-[8px] text-[#6B6359]">Vault</div>
                </div>
                <div className="text-center">
                  <div className="text-[14px] font-bold text-white">{v.avgWeekly}</div>
                  <div className="text-[8px] text-[#6B6359]">Wk Avg</div>
                </div>
                <div className="text-center">
                  <div className="text-[14px] font-bold text-white">{v.daysOOS > 0 ? v.daysOOS : '—'}</div>
                  <div className="text-[8px] text-[#6B6359]">Days OOS</div>
                </div>
              </div>

              {selectedId === v.id ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-[#A39B8D]">Transfer quantity:</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setTransferQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-[#38332B] flex items-center justify-center">
                        <Minus className="w-3.5 h-3.5 text-white" />
                      </button>
                      <span className="text-[16px] font-bold text-white w-8 text-center">{transferQty}</span>
                      <button onClick={() => setTransferQty(q => Math.min(v.vault, q + 1))} className="w-8 h-8 rounded-lg bg-[#38332B] flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2.5 text-[9px] text-[#6B6359]">
                    <Shield className="w-3 h-3" />
                    <span>Chain of custody logged to {v.metrc}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedId(null); setTransferQty(0); }} className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold bg-[#38332B] text-[#6B6359]">Cancel</button>
                    <button onClick={handleTransfer} className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold bg-[#D4A03A]/15 text-[#D4A03A] border border-[#D4A03A]/25">
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setSelectedId(v.id); setTransferQty(Math.min(v.vault, Math.ceil(v.avgWeekly / 2))); }}
                  className="w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5"
                  style={{ background: v.vault > 0 ? '#D4A03A15' : '#38332B', color: v.vault > 0 ? '#D4A03A' : '#6B6359', border: v.vault > 0 ? '1px solid #D4A03A25' : '1px solid #38332B' }}
                  disabled={v.vault <= 0}>
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  {v.vault > 0 ? 'Transfer to Floor' : 'No Vault Stock'}
                </button>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === 'transfers' && (
        <div className="space-y-2">
          {transfers.length === 0 ? (
            <Card className="!p-6 text-center">
              <div className="text-[13px] text-[#6B6359]">No transfers today yet</div>
            </Card>
          ) : transfers.map(t => (
            <Card key={t.id} className="!p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00C27C]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-[#00C27C]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-white">{t.product}</div>
                <div className="text-[10px] text-[#6B6359]">{t.qty} units &middot; {t.by} &middot; {t.time}</div>
              </div>
              <div className="text-[10px] text-[#6B6359]">{t.store}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN: CHAT — Mobile-Optimized Nexus AI Assistant
   ═══════════════════════════════════════════════════════════════════════════ */

// Brand → image map for chat product cards
const BRAND_IMG = {
  'Jeeter': 'brands/jeeter-baby-churros.webp',
  'STIIIZY': 'brands/stiiizy-pods.png',
  'Kiva': 'brands/kiva-camino.jpg',
  'Raw Garden': 'brands/raw-garden-cart.webp',
  'PLUS': 'brands/plus-gummies.jpg',
  'Alien Labs': 'brands/alien-xeno.png',
  'Cookies': 'brands/cookies-gary-payton.png',
  'Wyld': 'brands/wyld-elderberry.png',
  'Papa & Barkley': 'brands/papa-barkley-balm.jpg',
};
const brandImgUrl = (brand) => {
  const path = BRAND_IMG[brand];
  return path ? `${import.meta.env.BASE_URL || '/'}${path}` : null;
};

function ScreenChat({ vault, showToast, onNav, onTransfer }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTiles, setShowTiles] = useState(true);
  const [launchedCampaigns, setLaunchedCampaigns] = useState(new Set());
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const ACTION_TILES = [
    { id: 'restock', icon: Package, label: 'Restock Inventory', desc: 'Find out-of-stock items and reorder from suppliers', tag: 'Urgent', tagColor: '#E87068', gradient: 'from-red-600/20 to-orange-600/20', query: 'Reorder out-of-stock inventory' },
    { id: 'campaign', icon: Rocket, label: 'Launch Campaign', desc: 'Ready-to-go campaigns targeting lapsed and active customers', tag: 'Marketing', tagColor: '#00C27C', gradient: 'from-green-600/20 to-emerald-600/20', query: 'Run a marketing campaign' },
    { id: 'pricing', icon: DollarSign, label: 'Price Benchmarks', desc: 'Compare your prices vs market and find margin opportunities', tag: 'Pricing', tagColor: '#D4A03A', gradient: 'from-amber-600/20 to-orange-600/20', query: 'Compare prices vs market' },
    { id: 'sentiment', icon: Star, label: 'Customer Sentiment', desc: 'NPS scores, review trends, and satisfaction analysis', tag: 'Insights', tagColor: '#64A8E0', gradient: 'from-blue-600/20 to-indigo-600/20', query: 'Customer sentiment this month' },
    { id: 'sales', icon: BarChart3, label: 'Sales Summary', desc: "Today's revenue, top sellers, and category breakdown", tag: 'Performance', tagColor: '#00C27C', gradient: 'from-emerald-600/20 to-green-600/20', query: 'Weekly sales summary' },
    { id: 'trending', icon: TrendingUp, label: 'Trending Products', desc: 'Hot products in your market worth adding to inventory', tag: 'Discovery', tagColor: '#B598E8', gradient: 'from-purple-600/20 to-indigo-600/20', query: 'Trending products to add' },
  ];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = useCallback((text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setShowTiles(false);
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', content: msg, type: 'text' }]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let response;

      // Intent detection
      if (lower.includes('reorder') || lower.includes('out of stock') || lower.includes('inventory') || lower.includes('stock')) {
        const oosItems = vault.filter(v => v.floor === 0);
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'inventory',
          content: `I found ${oosItems.length} out-of-stock products and ${vault.filter(v => v.floor > 0 && v.floor <= 5).length} running low. Here's what needs attention:`,
          items: vault.filter(v => v.urgency === 'critical' || v.urgency === 'high').map(v => ({
            vaultId: v.id, name: v.name, brand: v.brand, floor: v.floor, vault: v.vault,
            daysOOS: v.daysOOS, avgWeekly: v.avgWeekly, store: v.store,
            action: v.floor === 0 ? 'Transfer Now' : 'Restock Soon',
          })),
        };
      } else if (lower.includes('campaign') || lower.includes('marketing') || lower.includes('win-back') || lower.includes('promote')) {
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'campaigns',
          content: `I've prepared ${CAMPAIGNS_READY.length} campaigns ready to launch:`,
          campaigns: CAMPAIGNS_READY,
        };
      } else if (lower.includes('pric') || lower.includes('market') || lower.includes('benchmark') || lower.includes('margin')) {
        const aboveMarket = PRICING_PRODUCTS.filter(p => p.price > p.mktAvg * 1.05);
        const belowMarket = PRICING_PRODUCTS.filter(p => p.price < p.mktAvg * 0.95);
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'pricing',
          content: `Pricing analysis across ${PRICING_PRODUCTS.length} key products:\n\n${aboveMarket.length} priced above market, ${belowMarket.length} below, ${PRICING_PRODUCTS.length - aboveMarket.length - belowMarket.length} competitive.`,
          products: PRICING_PRODUCTS,
        };
      } else if (lower.includes('sentiment') || lower.includes('review') || lower.includes('nps') || lower.includes('customer')) {
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'sentiment',
          content: "Here's your customer sentiment overview:",
          data: {
            nps: 72, satisfaction: '4.2/5', delta: '+4 pts this month',
            positive: ['Staff Friendliness (84/100, +7)', 'Product Quality (76/100, +2)', 'Online Ordering (61/100, +12)'],
            negative: ['Wait Times (38/100, -5)'],
            topReview: '"Love the new Jeeter selection! Staff was super helpful picking the right strain for my needs." — Google, 2 days ago',
          },
        };
      } else if (lower.includes('sales') || lower.includes('summary') || lower.includes('revenue') || lower.includes('performance')) {
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'sales',
          content: "Today's sales summary across all stores:",
          data: {
            total: '$47,832', goal: '$52,000', pct: '92%',
            topSellers: [
              { name: 'Baby Jeeter Churros', units: 52, rev: '$1,820' },
              { name: 'Ozone Cake Mints', units: 44, rev: '$1,980' },
              { name: 'Stiiizy OG Kush Pod', units: 38, rev: '$1,710' },
              { name: 'Camino Gummies', units: 33, rev: '$726' },
              { name: 'Blue Dream 3.5g', units: 28, rev: '$1,260' },
            ],
            byCategory: [
              { cat: 'Flower', pct: 34, rev: '$16,263' },
              { cat: 'Vapes', pct: 28, rev: '$13,393' },
              { cat: 'Edibles', pct: 22, rev: '$10,523' },
              { cat: 'Pre-Rolls', pct: 12, rev: '$5,740' },
              { cat: 'Topicals', pct: 4, rev: '$1,913' },
            ],
          },
        };
      } else if (lower.includes('trending') || lower.includes('trend') || lower.includes('hot') || lower.includes('popular') || lower.includes('add')) {
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'trending',
          content: "Here are 5 trending products in your market worth considering:",
          products: [
            { name: 'Stiiizy CDT Pod Skywalker OG', brand: 'STIIIZY', cat: 'Vapes', growth: '+42%', margin: '48%', rec: 'High demand, pairs with existing STIIIZY line' },
            { name: 'Jeeter Liquid Diamonds Cart', brand: 'Jeeter', cat: 'Vapes', growth: '+38%', margin: '51%', rec: 'Capitalize on Jeeter sentiment surge' },
            { name: 'Kiva Midnight Blueberry CBN', brand: 'Kiva', cat: 'Edibles', growth: '+35%', margin: '56%', rec: 'Sleep/wellness trending — complements Lost Farm' },
            { name: 'Raw Garden Refined LR 2g', brand: 'Raw Garden', cat: 'Vapes', growth: '+28%', margin: '44%', rec: 'Larger format = higher basket size' },
            { name: 'Wyld Huckleberry Hybrid', brand: 'Wyld', cat: 'Edibles', growth: '+24%', margin: '54%', rec: 'Top 3 gummy in adjacent markets' },
          ],
        };
      } else {
        response = {
          id: `a-${Date.now()}`, role: 'assistant', type: 'text',
          content: `I can help with:\n\n• **Inventory** — Check stock levels, reorder products, find out-of-stock items\n• **Marketing** — Launch campaigns, view performance, target segments\n• **Pricing** — Benchmark against market, review margins, optimize promos\n• **Sentiment** — NPS scores, review analysis, customer feedback\n• **Sales** — Today's summary, top sellers, category breakdown\n• **Trends** — Hot products, market growth, new additions\n\nTry asking something like "Which products should I reorder?" or "How are my prices vs market?"`,
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    }, 1200 + Math.random() * 800);
  }, [input, vault]);

  const renderMessage = (msg) => {
    if (msg.type === 'text') {
      return <div className="text-[14px] text-[#E8E3DA] leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />;
    }
    if (msg.type === 'inventory') {
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3">{msg.content}</div>
          <div className="space-y-2">
            {msg.items.map((item, i) => {
              const img = brandImgUrl(item.brand);
              const recQty = Math.min(item.vault, Math.max(item.avgWeekly, 10));
              return (
                <div key={i} className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
                  <div className="flex gap-3 mb-2">
                    {img && (
                      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-[#1C1B1A]">
                        <img src={img} alt={item.brand} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[13px] font-semibold text-white">{item.name}</div>
                          <div className="text-[10px] text-[#6B6359]">{item.brand} &middot; {item.store}</div>
                        </div>
                        {item.daysOOS > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E87068]/15 text-[#E87068] font-bold">{item.daysOOS}d OOS</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[11px] mb-2">
                    <span className="text-[#6B6359]">Floor: <span className={item.floor === 0 ? 'text-[#E87068] font-bold' : 'text-white'}>{item.floor}</span></span>
                    <span className="text-[#6B6359]">Vault: <span className="text-[#00C27C] font-bold">{item.vault}</span></span>
                    <span className="text-[#6B6359]">Wk Avg: <span className="text-white">{item.avgWeekly}</span></span>
                  </div>
                  <button
                    onClick={() => {
                      if (item.vaultId && onTransfer) {
                        onTransfer(item.vaultId, recQty);
                        showToast(`Transferred ${recQty} units of ${item.name} to floor`);
                      } else {
                        showToast(`${item.name} — ${recQty} units queued for transfer`);
                      }
                    }}
                    className="w-full py-2 rounded-lg text-[11px] font-semibold bg-[#D4A03A]/10 text-[#D4A03A] border border-[#D4A03A]/20 flex items-center justify-center gap-1.5">
                    <ArrowRightLeft className="w-3 h-3" />
                    Transfer {recQty} units to Floor
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (msg.type === 'campaigns') {
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3">{msg.content}</div>
          <div className="space-y-2">
            {msg.campaigns.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
                <div className="text-[13px] font-semibold text-white mb-1">{c.name}</div>
                <div className="text-[11px] text-[#A39B8D] mb-2">{c.desc}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#6B6359] mb-2.5">
                  <span>Target: <span className="text-white">{c.target}</span></span>
                  <span>Channel: <span className="text-white">{c.channel}</span></span>
                  <span>Est. Rev: <span className="text-[#00C27C] font-bold">{c.estRevenue}</span></span>
                </div>
                {launchedCampaigns.has(c.name) ? (
                  <button disabled className="w-full py-2 rounded-lg text-[11px] font-semibold bg-[#00C27C]/20 text-[#00C27C] border border-[#00C27C]/30 opacity-80 cursor-default">
                    <Check className="w-3 h-3 inline mr-1" />Campaign Launched
                  </button>
                ) : (
                  <button onClick={() => { setLaunchedCampaigns(prev => new Set([...prev, c.name])); showToast(`${c.name} campaign launched!`); }} className="w-full py-2 rounded-lg text-[11px] font-semibold bg-[#00C27C]/10 text-[#00C27C] border border-[#00C27C]/20">
                    <Rocket className="w-3 h-3 inline mr-1" />Launch Campaign
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (msg.type === 'pricing') {
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3 whitespace-pre-wrap">{msg.content}</div>
          <div className="space-y-2">
            {msg.products.map((p, i) => {
              const diff = ((p.price - p.mktAvg) / p.mktAvg * 100).toFixed(0);
              const diffColor = Math.abs(diff) <= 5 ? '#00C27C' : Math.abs(diff) <= 10 ? '#D4A03A' : '#E87068';
              return (
                <div key={i} className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="text-[12px] font-semibold text-white">{p.name}</div>
                      <div className="text-[10px] text-[#6B6359]">{p.brand} &middot; {p.cat}</div>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${diffColor}15`, color: diffColor }}>
                      {diff > 0 ? '+' : ''}{diff}%
                    </span>
                  </div>
                  <div className="flex gap-3 text-[10px] mt-1.5 mb-1">
                    <span className="text-[#6B6359]">You: <span className="text-white font-bold">${p.price}</span></span>
                    <span className="text-[#6B6359]">Mkt: <span className="text-white">${p.mktAvg}</span></span>
                    <span className="text-[#6B6359]">Range: ${p.mktLow}-${p.mktHigh}</span>
                    <span className="text-[#6B6359]">Margin: <span className="text-[#00C27C]">{p.margin}%</span></span>
                  </div>
                  <PriceBar price={p.price} mktLow={p.mktLow} mktHigh={p.mktHigh} mktAvg={p.mktAvg} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (msg.type === 'sentiment') {
      const d = msg.data;
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3">{msg.content}</div>
          <div className="p-3 rounded-xl bg-[#141210] border border-[#38332B] mb-2">
            <div className="flex gap-4 mb-3">
              <div className="text-center">
                <div className="text-[22px] font-bold text-[#00C27C]">{d.nps}</div>
                <div className="text-[9px] text-[#6B6359]">NPS Score</div>
              </div>
              <div className="text-center">
                <div className="text-[22px] font-bold text-white">{d.satisfaction}</div>
                <div className="text-[9px] text-[#6B6359]">Satisfaction</div>
              </div>
              <div className="flex-1 text-right">
                <div className="text-[13px] font-bold text-[#00C27C]">{d.delta}</div>
                <div className="text-[9px] text-[#6B6359]">This Month</div>
              </div>
            </div>
            <div className="text-[11px] text-[#A39B8D] mb-1.5">Top themes:</div>
            {d.positive.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#00C27C] mb-0.5"><TrendingUp className="w-3 h-3" />{p}</div>
            ))}
            {d.negative.map((n, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#E87068] mb-0.5"><TrendingDown className="w-3 h-3" />{n}</div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
            <div className="text-[10px] text-[#6B6359] mb-1">Recent Review</div>
            <div className="text-[12px] text-[#E8E3DA] italic leading-relaxed">{d.topReview}</div>
          </div>
        </div>
      );
    }
    if (msg.type === 'sales') {
      const d = msg.data;
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3">{msg.content}</div>
          <div className="p-3 rounded-xl bg-[#141210] border border-[#38332B] mb-2">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-[22px] font-bold text-white">{d.total}</div>
                <div className="text-[10px] text-[#6B6359]">{d.pct} of {d.goal} goal</div>
              </div>
              <HealthRing score={92} size={44} />
            </div>
            <div className="text-[11px] text-[#A39B8D] mb-2">Top Sellers Today</div>
            {d.topSellers.map((s, i) => (
              <div key={i} className="flex justify-between py-1.5 border-t border-[#38332B]/50 text-[11px]">
                <span className="text-white">{i + 1}. {s.name}</span>
                <span className="text-[#6B6359]">{s.units}u &middot; {s.rev}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
            <div className="text-[11px] text-[#A39B8D] mb-2">Revenue by Category</div>
            {d.byCategory.map((c, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-white">{c.cat}</span>
                  <span className="text-[#6B6359]">{c.rev} ({c.pct}%)</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#38332B]">
                  <div className="h-1.5 rounded-full bg-[#D4A03A]" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (msg.type === 'trending') {
      return (
        <div>
          <div className="text-[14px] text-[#E8E3DA] leading-relaxed mb-3">{msg.content}</div>
          <div className="space-y-2">
            {msg.products.map((p, i) => {
              const img = brandImgUrl(p.brand);
              return (
                <div key={i} className="p-3 rounded-xl bg-[#141210] border border-[#38332B]">
                  <div className="flex gap-3 mb-1">
                    {img && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#1C1B1A]">
                        <img src={img} alt={p.brand} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[12px] font-semibold text-white">{p.name}</div>
                          <div className="text-[10px] text-[#6B6359]">{p.brand} &middot; {p.cat}</div>
                        </div>
                        <span className="text-[10px] font-bold text-[#00C27C] bg-[#00C27C]/10 px-1.5 py-0.5 rounded">{p.growth}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#6B6359] mb-1">Margin: <span className="text-white">{p.margin}</span></div>
                  <div className="text-[11px] text-[#A39B8D]">{p.rec}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <div className="text-[14px] text-[#E8E3DA]">{msg.content}</div>;
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: '#141210' }}>
      {/* Chat Header */}
      <div className="px-4 pt-[env(safe-area-inset-top,12px)] pb-2 border-b border-[#38332B]" style={{ background: '#1C1B1A' }}>
        <div className="flex items-center gap-2.5 py-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4A03A] to-[#B8860B] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-white">Nexus Chat</div>
            <div className="text-[10px] text-[#00C27C] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C27C]" /> Online
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: '100px' }}>
        {showTiles ? (
          /* ── Action Tiles Grid (Connect-style) ── */
          <div>
            <div className="text-center mb-5 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4A03A] to-[#B8860B] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-[16px] font-bold text-[#F0EDE8] mb-1">Nexus AI Assistant</div>
              <div className="text-[12px] text-[#ADA599] leading-relaxed max-w-[280px] mx-auto">
                Your AI-powered retail command center. Ask anything or tap an action below.
              </div>
            </div>

            <div className="text-[10px] text-[#ADA599] uppercase tracking-wider font-semibold mb-2.5 px-1">Quick actions</div>
            <div className="grid grid-cols-2 gap-2.5">
              {ACTION_TILES.map(tile => {
                const Icon = tile.icon;
                return (
                  <button key={tile.id} onClick={() => handleSend(tile.query)}
                    className={`text-left p-3.5 rounded-xl bg-[#1C1B1A] border border-[#38332B] active:scale-[0.97] transition-all`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" style={{ color: tile.tagColor }} />
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/10" style={{ color: tile.tagColor, background: `${tile.tagColor}15` }}>
                        {tile.tag}
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#F0EDE8] mb-0.5">{tile.label}</div>
                    <div className="text-[10px] text-[#6B6359] leading-snug">{tile.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-4 text-[10px] text-[#6B6359]">
              Or type a question below to get started
            </div>
          </div>
        ) : (
          /* ── Chat Messages ── */
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#D4A03A]/15 border border-[#D4A03A]/20'
                    : 'bg-[#1C1B1A] border border-[#38332B]'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3 h-3 text-[#D4A03A]" />
                      <span className="text-[10px] font-semibold text-[#D4A03A]">Nexus</span>
                    </div>
                  )}
                  {renderMessage(msg)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1C1B1A] border border-[#38332B] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3 h-3 text-[#D4A03A]" />
                    <span className="text-[10px] font-semibold text-[#D4A03A]">Nexus</span>
                  </div>
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#6B6359] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nothing here — tiles are inline now */}

      {/* Input */}
      <div className="px-4 pb-[env(safe-area-inset-bottom,8px)] pt-2 border-t border-[#38332B]" style={{ background: '#1C1B1A' }}>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask Nexus anything..."
            className="flex-1 bg-[#141210] border border-[#38332B] rounded-xl px-4 py-3 text-[14px] text-white placeholder-[#6B6359] outline-none focus:border-[#D4A03A]/40 min-h-[48px]"
          />
          <button
            onClick={() => handleSend()}
            className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 border border-[#D4A03A]/25 flex items-center justify-center flex-shrink-0"
            disabled={!input.trim()}>
            <Send className="w-5 h-5 text-[#D4A03A]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN: ACTIONS — Quick Actions Hub
   ═══════════════════════════════════════════════════════════════════════════ */

function ScreenActions({ vault, transfers, showToast, onNav }) {
  const oosCount = vault.filter(v => v.floor === 0).length;
  const pricingAbove = PRICING_PRODUCTS.filter(p => p.price > p.mktAvg * 1.05).length;
  const pricingBelow = PRICING_PRODUCTS.filter(p => p.price < p.mktAvg * 0.95).length;
  const promoKeep = PROMOTIONS.filter(p => p.verdict === 'Keep').length;
  const promoKill = PROMOTIONS.filter(p => p.verdict === 'Kill').length;

  const sections = [
    {
      title: 'Inventory', items: [
        { icon: ArrowRightLeft, color: '#E87068', title: 'Transfer Vault → Floor', sub: `${oosCount} out of stock, vault available`, action: () => onNav('floor') },
        { icon: Truck, color: '#64A8E0', title: 'Receive Shipment', sub: 'Jeeter — 42 SKUs arriving 2:30 PM', action: () => showToast('Receiving checklist opened for Jeeter shipment') },
        { icon: Clipboard, color: '#D4A03A', title: 'Cycle Count', sub: 'Last completed: Yesterday 4:45 PM', action: () => showToast('Cycle count started for Logan Square') },
        { icon: Shield, color: '#B598E8', title: 'METRC Reconciliation', sub: 'Last sync: 4 min ago · 2 discrepancies', action: () => showToast('METRC reconciliation started — resolving 2 discrepancies') },
      ]
    },
    {
      title: 'Pricing', items: [
        { icon: BarChart3, color: '#D4A03A', title: 'Benchmark All Products', sub: `${pricingBelow} below market, ${pricingAbove} above, ${PRICING_PRODUCTS.length - pricingAbove - pricingBelow} competitive`, action: () => onNav('chat') },
        { icon: DollarSign, color: '#00C27C', title: 'Quick Price Editor', sub: '8 products loaded for review', action: () => showToast('Price editor opened — 8 products loaded') },
        { icon: Percent, color: '#E87068', title: 'Manage Promotions', sub: `${PROMOTIONS.length} active: ${promoKeep} keep, ${promoKill} kill`, action: () => {} },
      ]
    },
    {
      title: 'Marketing', items: [
        { icon: Rocket, color: '#00C27C', title: 'Launch Campaign', sub: `${CAMPAIGNS_READY.length} ready-to-go templates`, action: () => onNav('chat') },
        { icon: BarChart3, color: '#64A8E0', title: 'Campaign Performance', sub: 'Happy Hour: +23% lift, BOGO: 0.3x ROI', action: () => showToast('Campaign performance dashboard loaded') },
        { icon: Users, color: '#B598E8', title: 'Customer Segments', sub: '340 lapsed, 89 birthdays, 18.4K active', action: () => showToast('Segment builder opened') },
      ]
    },
    {
      title: 'Compliance', items: [
        { icon: Clipboard, color: '#00C27C', title: 'Daily Reconciliation', sub: `${COMPLIANCE_DATA.idScansToday} ID scans today · Due by 5pm`, action: () => showToast('Daily reconciliation checklist opened') },
        { icon: AlertTriangle, color: '#D4A03A', title: 'Expiring Products', sub: `${COMPLIANCE_DATA.expiringProducts.length} items within 30 days — manifest needed`, action: () => showToast('METRC destruction manifest created for 3 batches') },
        { icon: Camera, color: '#64A8E0', title: 'ID Verification Log', sub: `${COMPLIANCE_DATA.cameraStatus} · ${COMPLIANCE_DATA.idScansToday} scans`, action: () => showToast('ID verification log opened') },
      ]
    },
    {
      title: 'Operations', items: [
        { icon: Users, color: '#64A8E0', title: "Today's Schedule", sub: '6 of 8 budtenders active · Peak at 5pm', action: () => showToast('Staff schedule loaded') },
        { icon: Activity, color: '#D4A03A', title: 'Traffic Forecast', sub: '920 projected today · 62% after 4pm', action: () => showToast('Traffic forecast loaded') },
      ]
    },
  ];

  return (
    <div className="px-4 pt-[env(safe-area-inset-top,12px)] pb-24">
      <div className="flex items-center justify-between pt-3 pb-4">
        <div className="text-[17px] font-bold text-white">Quick Actions</div>
      </div>

      {/* Promos Section */}
      <Section title="Active Promotions">
        <div className="space-y-2">
          {PROMOTIONS.map(p => {
            const vColor = p.verdict === 'Keep' ? '#00C27C' : p.verdict === 'Kill' ? '#E87068' : '#D4A03A';
            return (
              <Card key={p.id} className="!p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-semibold text-white">{p.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${vColor}15`, color: vColor }}>{p.verdict}</span>
                    </div>
                    <div className="text-[10px] text-[#6B6359]">{p.type} &middot; {p.redemptions} redemptions &middot; ROI {p.roi}x</div>
                    <div className="text-[10px] text-[#A39B8D] mt-0.5">{p.lift}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-white">${(p.spend).toLocaleString()}</div>
                    <div className="text-[9px] text-[#6B6359]">spend</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {sections.map(sec => (
        <Section key={sec.title} title={sec.title}>
          <div className="space-y-2">
            {sec.items.map((item, i) => (
              <button key={i} onClick={item.action} className="w-full text-left">
                <Card className="!p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}12` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-white">{item.title}</div>
                    <div className="text-[10px] text-[#6B6359] leading-snug">{item.sub}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#38332B] flex-shrink-0" />
                </Card>
              </button>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT — State Management & Routing
   ═══════════════════════════════════════════════════════════════════════════ */

export default function NexusMobileWeb() {
  const [screen, setScreen] = useState('home');
  const [toast, setToast] = useState(null);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [vault, setVault] = useState(VAULT_INVENTORY);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const navigate = useCallback((s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Handle vault transfer with connected state
  const handleVaultTransfer = useCallback((vaultId, qty) => {
    const item = vault.find(v => v.id === vaultId);
    if (!item || qty <= 0 || qty > item.vault) return;

    // Update vault inventory
    setVault(prev => prev.map(v => v.id === vaultId ? {
      ...v,
      floor: v.floor + qty,
      vault: v.vault - qty,
      urgency: (v.floor + qty) > 5 ? 'ok' : (v.floor + qty) > 0 ? 'medium' : v.urgency,
      daysOOS: (v.floor + qty) > 0 ? 0 : v.daysOOS,
    } : v));

    // Add to transfer log
    setTransfers(prev => [{
      id: `t-${Date.now()}`, product: item.name, qty,
      by: 'You', time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      store: item.store,
    }, ...prev]);

    // Remove related alerts
    setAlerts(prev => prev.filter(a => a.refId !== vaultId));

    showToast(`Transferred ${qty}x ${item.name} to floor — Chain of custody logged`);
  }, [vault, showToast]);

  // Handle alert actions
  const handleAlertAction = useCallback((alert) => {
    if (alert.actionType === 'transfer') {
      navigate('floor');
    } else if (alert.actionType === 'campaign') {
      showToast(`${alert.title.split('—')[0].trim()} launched!`);
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    } else if (alert.actionType === 'promo') {
      showToast('BOGO Edibles promotion discontinued');
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    } else if (alert.actionType === 'price') {
      showToast('Price adjustment applied');
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    } else if (alert.actionType === 'compliance') {
      showToast('Compliance action started');
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    } else if (alert.actionType === 'receive') {
      showToast('Receiving checklist opened for Jeeter shipment');
    } else {
      showToast('Details loaded', 'info');
    }
  }, [navigate, showToast]);

  return (
    <div className="min-h-screen text-white" style={{ background: '#141210', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} key={toast.key} />}

      {screen === 'home' && <ScreenHome data={NEXUS_DATA} alerts={alerts} vault={vault} stores={STORES} onNav={navigate} showToast={showToast} />}
      {screen === 'alerts' && <ScreenAlerts alerts={alerts} onAction={handleAlertAction} onNav={navigate} />}
      {screen === 'floor' && <ScreenFloor vault={vault} transfers={transfers} onTransfer={handleVaultTransfer} showToast={showToast} />}
      {screen === 'chat' && <ScreenChat vault={vault} showToast={showToast} onNav={navigate} onTransfer={handleVaultTransfer} />}
      {screen === 'actions' && <ScreenActions vault={vault} transfers={transfers} showToast={showToast} onNav={navigate} />}

      <BottomNav active={screen} onNavigate={navigate} alertCount={alerts.length} />
    </div>
  );
}
