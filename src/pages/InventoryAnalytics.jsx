import { useState, useMemo, useCallback } from 'react';
import { Package, AlertTriangle, ArrowRightLeft, ShoppingCart, ChevronDown, ChevronRight, Filter, ArrowUpDown, TrendingDown, Warehouse, Truck, ClipboardList } from 'lucide-react';
import { locations } from '../data/mockData';
import { usePersona } from '../contexts/PersonaContext';
import { useStores } from '../contexts/StoreContext';
import ConfirmationDrawer from '../components/common/ConfirmationDrawer';

// ---------------------------------------------------------------------------
// Seeded RNG (same algo as NexusHome)
// ---------------------------------------------------------------------------
function _seedRng(seed) {
  let s = seed | 0;
  return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function fmtDollar(v) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${Math.round(v).toLocaleString()}`;
}

// ---------------------------------------------------------------------------
// Product Catalog — 25 cannabis products across 6 categories
// ---------------------------------------------------------------------------
const PRODUCT_CATALOG = [
  // Flower (6)
  { name: 'Blue Dream 3.5g', brand: 'Ozone', category: 'Flower', price: 45 },
  { name: 'Gelato 3.5g', brand: 'Cookies', category: 'Flower', price: 55 },
  { name: 'OG Kush 7g', brand: 'Ozone Reserve', category: 'Flower', price: 80 },
  { name: 'Wedding Cake 3.5g', brand: 'Simply Herb', category: 'Flower', price: 35 },
  { name: 'Purple Punch 3.5g', brand: 'Common Goods', category: 'Flower', price: 30 },
  { name: 'Jack Herer 7g', brand: 'Ozone', category: 'Flower', price: 75 },
  // Pre-Rolls (4)
  { name: 'Baby Jeeter Infused 5pk', brand: 'Jeeter', category: 'Pre-Rolls', price: 40 },
  { name: 'Blunt 2pk Indica', brand: 'Tunnel Vision', category: 'Pre-Rolls', price: 28 },
  { name: 'Diamond Infused Pre-Roll', brand: 'Jeeter', category: 'Pre-Rolls', price: 22 },
  { name: 'Classic Pre-Roll 3pk', brand: 'Simply Herb', category: 'Pre-Rolls', price: 18 },
  // Vapes (5)
  { name: 'Live Resin Pod 1g', brand: 'STIIIZY', category: 'Vapes', price: 55 },
  { name: 'CDT Pod 0.5g', brand: 'STIIIZY', category: 'Vapes', price: 35 },
  { name: 'Xeno Disposable 1g', brand: 'Alien Labs', category: 'Vapes', price: 48 },
  { name: 'Bagio Punch Cart 1g', brand: 'Alien Labs', category: 'Vapes', price: 52 },
  { name: 'All-in-One Disposable 0.3g', brand: 'Ozone', category: 'Vapes', price: 25 },
  // Edibles (5)
  { name: 'Camino Gummies 100mg', brand: 'Kiva', category: 'Edibles', price: 22 },
  { name: 'Lost Farm Chews 100mg', brand: 'Kiva', category: 'Edibles', price: 24 },
  { name: 'Raspberry Gummies 100mg', brand: 'Wyld', category: 'Edibles', price: 18 },
  { name: 'Marionberry Gummies 100mg', brand: 'Wyld', category: 'Edibles', price: 18 },
  { name: 'Chocolate Bar 100mg', brand: 'Kiva', category: 'Edibles', price: 20 },
  // Concentrates (3)
  { name: 'Live Resin Badder 1g', brand: 'Ozone Reserve', category: 'Concentrates', price: 45 },
  { name: 'Diamonds & Sauce 1g', brand: 'Ozone Reserve', category: 'Concentrates', price: 60 },
  { name: 'Cured Resin Shatter 1g', brand: 'Common Goods', category: 'Concentrates', price: 30 },
  // Topicals (2)
  { name: 'Relief Balm 200mg', brand: 'Kiva', category: 'Topicals', price: 32 },
  { name: 'Transdermal Patch 40mg', brand: 'Common Goods', category: 'Topicals', price: 18 },
];

// ---------------------------------------------------------------------------
// Generate deterministic per-store inventory
// ---------------------------------------------------------------------------
function generateStoreInventory(loc, storeIndex) {
  const rng = _seedRng(storeIndex * 8731 + 137);
  const numProducts = 8 + Math.floor(rng() * 5); // 8-12 SKUs per store
  const isOutlet = loc.name.includes('Outlet');

  // Pick products deterministically
  const shuffled = [...PRODUCT_CATALOG].sort(() => rng() - 0.5);
  const picked = shuffled.slice(0, numProducts);

  return picked.map((product, pi) => {
    const r = _seedRng(storeIndex * 4219 + pi * 997 + 53);
    const avgWeekly = Math.round((3 + r() * 25) * (isOutlet ? 0.6 : 1));
    const roll = r();

    let floor, vault;
    if (roll < 0.12) {
      // OOS: floor=0, maybe vault
      floor = 0;
      vault = r() < 0.6 ? Math.round(2 + r() * 10) : 0;
    } else if (roll < 0.30) {
      // Low stock
      floor = Math.round(1 + r() * (avgWeekly * 0.4));
      vault = Math.round(r() * 8);
    } else {
      // Normal
      floor = Math.round(avgWeekly * (0.8 + r() * 1.5));
      vault = Math.round(r() * 15);
    }

    const daysSupply = avgWeekly > 0 ? Math.round(((floor + vault) / (avgWeekly / 7)) * 10) / 10 : 999;
    const estLostPerDay = floor === 0 ? Math.round((avgWeekly / 7) * product.price * 100) / 100 : 0;

    // Status
    let status;
    if (floor === 0) status = 'oos';
    else if (daysSupply < 3) status = 'critical';
    else if (daysSupply < 7) status = 'low';
    else status = 'ok';

    // METRC package tag (24-char numeric format: 1A4 + 21 digits)
    const tagNum = String(4060300000 + storeIndex * 1000 + pi + 1).padStart(21, '0');
    const metrcPkg = `1A4${tagNum}`;

    return {
      ...product,
      floor,
      vault,
      avgWeekly,
      daysSupply,
      estLostPerDay,
      status,
      metrcPkg,
    };
  });
}

// ---------------------------------------------------------------------------
// Build all store data
// ---------------------------------------------------------------------------
const ALL_STORE_INVENTORY = locations.map((loc, i) => {
  const products = generateStoreInventory(loc, i);
  const oosCount = products.filter(p => p.status === 'oos').length;
  const lowCount = products.filter(p => p.status === 'low' || p.status === 'critical').length;
  const totalLost = products.reduce((sum, p) => sum + p.estLostPerDay, 0);
  const vaultReady = products.filter(p => p.floor === 0 && p.vault > 0).length;
  return { ...loc, products, oosCount, lowCount, totalLost, vaultReady };
});

// State list from locations
const ALL_STATES = [...new Set(locations.map(l => l.state))].sort();

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const STATUS_CONFIG = {
  oos: { label: 'OOS', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/20' },
  critical: { label: 'Critical', bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/20' },
  low: { label: 'Low', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  ok: { label: 'OK', bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/15' },
};

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}

function KpiCard({ icon: Icon, label, value, subValue, color, iconBg }) {
  return (
    <div className="flex-1 min-w-[180px] rounded-xl border border-[#38332B] bg-[#1C1B1A] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div>
          <p className="text-[20px] font-bold" style={{ color }}>{value}</p>
          <p className="text-[11px] text-[#6B6359]">{label}</p>
          {subValue && <p className="text-[10px] text-[#554F46] mt-0.5">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, onTransfer, onReorder }) {
  const canTransfer = product.floor === 0 && product.vault > 0;
  const canReorder = product.daysSupply < 7;

  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 px-4 py-3 border-b border-[#38332B]/40 hover:bg-[#1E1D1B] transition-colors group">
      <div className="grid grid-cols-[1fr_repeat(5,auto)] items-center gap-x-4 gap-y-1 min-w-0">
        {/* Product info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-[#F0EDE8] truncate">{product.name}</span>
            <StatusPill status={product.status} />
          </div>
          <p className="text-[11px] text-[#6B6359] truncate">{product.brand} · {product.category} · {fmtDollar(product.price)}</p>
        </div>

        {/* Floor qty */}
        <div className="text-center min-w-[60px]">
          <p className={`text-[13px] font-semibold ${product.floor === 0 ? 'text-red-400' : 'text-[#F0EDE8]'}`}>{product.floor}</p>
          <p className="text-[10px] text-[#554F46]">Floor</p>
        </div>

        {/* Vault qty */}
        <div className="text-center min-w-[60px]">
          <p className={`text-[13px] font-semibold ${product.vault > 0 && product.floor === 0 ? 'text-blue-400' : 'text-[#F0EDE8]'}`}>{product.vault}</p>
          <p className="text-[10px] text-[#554F46]">Vault</p>
        </div>

        {/* Days of supply */}
        <div className="text-center min-w-[60px]">
          <p className={`text-[13px] font-semibold ${product.daysSupply < 3 ? 'text-red-400' : product.daysSupply < 7 ? 'text-amber-400' : 'text-[#F0EDE8]'}`}>
            {product.daysSupply > 90 ? '90+' : product.daysSupply.toFixed(1)}
          </p>
          <p className="text-[10px] text-[#554F46]">Days Supply</p>
        </div>

        {/* Avg weekly */}
        <div className="text-center min-w-[60px]">
          <p className="text-[13px] font-semibold text-[#F0EDE8]">{product.avgWeekly}</p>
          <p className="text-[10px] text-[#554F46]">Avg/Wk</p>
        </div>

        {/* Est lost */}
        <div className="text-center min-w-[70px]">
          <p className={`text-[13px] font-semibold ${product.estLostPerDay > 0 ? 'text-red-400' : 'text-[#554F46]'}`}>
            {product.estLostPerDay > 0 ? fmtDollar(product.estLostPerDay) : '—'}
          </p>
          <p className="text-[10px] text-[#554F46]">Lost/Day</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {canTransfer && (
          <button
            onClick={() => onTransfer(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            <ArrowRightLeft size={12} />
            Transfer to Floor
          </button>
        )}
        {canReorder && (
          <button
            onClick={() => onReorder(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <Truck size={12} />
            Draft Reorder
          </button>
        )}
      </div>
    </div>
  );
}

function StoreAccordion({ store, onTransfer, onReorder, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-[#38332B] bg-[#1C1B1A] overflow-hidden">
      {/* Store header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1E1D1B] transition-colors"
      >
        {open ? <ChevronDown size={16} className="text-[#6B6359] flex-shrink-0" /> : <ChevronRight size={16} className="text-[#6B6359] flex-shrink-0" />}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="text-[14px] font-semibold text-[#F0EDE8] truncate">{store.name}</span>
          <span className="text-[11px] text-[#6B6359] flex-shrink-0">{store.state}</span>
          {store.oosCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/20">
              {store.oosCount} OOS
            </span>
          )}
          {store.lowCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">
              {store.lowCount} Low
            </span>
          )}
          {store.vaultReady > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {store.vaultReady} Vault Ready
            </span>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          {store.totalLost > 0 && (
            <span className="text-[12px] font-semibold text-red-400">{fmtDollar(store.totalLost)}/day lost</span>
          )}
        </div>
      </button>

      {/* Product rows */}
      {open && (
        <div className="border-t border-[#38332B]">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto] gap-2 px-4 py-2 bg-[#141210] border-b border-[#38332B]/60">
            <div className="grid grid-cols-[1fr_repeat(5,auto)] items-center gap-x-4 text-[10px] font-semibold text-[#554F46] uppercase tracking-wider">
              <span>Product</span>
              <span className="text-center min-w-[60px]">Floor</span>
              <span className="text-center min-w-[60px]">Vault</span>
              <span className="text-center min-w-[60px]">Days</span>
              <span className="text-center min-w-[60px]">Avg/Wk</span>
              <span className="text-center min-w-[70px]">Lost/Day</span>
            </div>
            <span className="min-w-[200px]" />
          </div>
          {store.products.map((product, i) => (
            <ProductRow
              key={i}
              product={product}
              onTransfer={(p) => onTransfer(store, p)}
              onReorder={(p) => onReorder(store, p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function InventoryAnalytics() {
  const { selectedPersona } = usePersona();
  const { selectedStoreNames } = useStores();

  // Filters
  const [stateFilter, setStateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // all | oos | low | vault
  const [sortBy, setSortBy] = useState('lost'); // lost | days | alpha

  // Drawer state
  const [transferDrawer, setTransferDrawer] = useState({ open: false, store: null, product: null });
  const [reorderDrawer, setReorderDrawer] = useState({ open: false, store: null, product: null });
  const [bulkTransferDrawer, setBulkTransferDrawer] = useState(false);
  const [bulkReorderDrawer, setBulkReorderDrawer] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Filter stores by persona/store selection
  const visibleStores = useMemo(() => {
    let stores = ALL_STORE_INVENTORY;

    // Persona filter
    if (selectedPersona.storeFilter) {
      if (selectedPersona.storeFilter.states) {
        stores = stores.filter(s => selectedPersona.storeFilter.states.includes(s.state));
      }
      if (selectedPersona.storeFilter.store) {
        stores = stores.filter(s => s.name === selectedPersona.storeFilter.store);
      }
    }

    // Store context selection
    if (selectedStoreNames.size > 0 && selectedStoreNames.size < locations.length) {
      stores = stores.filter(s => selectedStoreNames.has(s.name));
    }

    // State filter
    if (stateFilter) {
      stores = stores.filter(s => s.state === stateFilter);
    }

    // Status filter — filter stores that have matching products
    if (statusFilter === 'oos') {
      stores = stores.filter(s => s.oosCount > 0);
    } else if (statusFilter === 'low') {
      stores = stores.filter(s => s.lowCount > 0 || s.oosCount > 0);
    } else if (statusFilter === 'vault') {
      stores = stores.filter(s => s.vaultReady > 0);
    }

    // Sort
    if (sortBy === 'lost') {
      stores = [...stores].sort((a, b) => b.totalLost - a.totalLost);
    } else if (sortBy === 'days') {
      stores = [...stores].sort((a, b) => {
        const aMin = Math.min(...a.products.map(p => p.daysSupply));
        const bMin = Math.min(...b.products.map(p => p.daysSupply));
        return aMin - bMin;
      });
    } else {
      stores = [...stores].sort((a, b) => a.name.localeCompare(b.name));
    }

    return stores;
  }, [selectedPersona, selectedStoreNames, stateFilter, statusFilter, sortBy]);

  // Also filter products within each store based on status filter
  const filteredStores = useMemo(() => {
    if (statusFilter === 'all') return visibleStores;
    return visibleStores.map(store => {
      let filtered;
      if (statusFilter === 'oos') filtered = store.products.filter(p => p.status === 'oos');
      else if (statusFilter === 'low') filtered = store.products.filter(p => ['oos', 'critical', 'low'].includes(p.status));
      else if (statusFilter === 'vault') filtered = store.products.filter(p => p.floor === 0 && p.vault > 0);
      else filtered = store.products;
      return { ...store, products: filtered };
    }).filter(s => s.products.length > 0);
  }, [visibleStores, statusFilter]);

  // KPI totals
  const kpis = useMemo(() => {
    const allProducts = visibleStores.flatMap(s => s.products);
    return {
      oosCount: allProducts.filter(p => p.status === 'oos').length,
      lowCount: allProducts.filter(p => p.status === 'low' || p.status === 'critical').length,
      vaultReady: allProducts.filter(p => p.floor === 0 && p.vault > 0).length,
      totalLost: allProducts.reduce((sum, p) => sum + p.estLostPerDay, 0),
    };
  }, [visibleStores]);

  // Available states from visible stores
  const availableStates = useMemo(() => {
    return [...new Set(visibleStores.map(s => s.state))].sort();
  }, [visibleStores]);

  // Handlers
  const handleTransfer = useCallback((store, product) => {
    setTransferDrawer({ open: true, store, product });
  }, []);

  const handleReorder = useCallback((store, product) => {
    setReorderDrawer({ open: true, store, product });
  }, []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  // Bulk counts
  const bulkTransferCount = useMemo(() => visibleStores.reduce((sum, s) => sum + s.products.filter(p => p.floor === 0 && p.vault > 0).length, 0), [visibleStores]);
  const bulkReorderCount = useMemo(() => visibleStores.reduce((sum, s) => sum + s.products.filter(p => p.daysSupply < 3).length, 0), [visibleStores]);

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#F0EDE8] flex items-center gap-2">
            <Package size={22} className="text-[#D4A03A]" />
            Inventory Analytics & Actions
          </h1>
          <p className="text-[13px] text-[#6B6359] mt-1">
            Real-time stock levels, vault-to-floor transfers, and reorder management across {visibleStores.length} locations
          </p>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="flex gap-3 flex-wrap">
        <KpiCard
          icon={AlertTriangle}
          label="Out of Stock Products"
          value={kpis.oosCount}
          subValue={`across ${visibleStores.filter(s => s.oosCount > 0).length} stores`}
          color="#EF4444"
          iconBg="rgba(239,68,68,0.1)"
        />
        <KpiCard
          icon={TrendingDown}
          label="Low Stock (< 7 days)"
          value={kpis.lowCount}
          subValue="critical + low stock"
          color="#F59E0B"
          iconBg="rgba(245,158,11,0.1)"
        />
        <KpiCard
          icon={Warehouse}
          label="Vault → Floor Pending"
          value={kpis.vaultReady}
          subValue="OOS with vault inventory"
          color="#3B82F6"
          iconBg="rgba(59,130,246,0.1)"
        />
        <KpiCard
          icon={TrendingDown}
          label="Est. Lost Sales / Day"
          value={fmtDollar(kpis.totalLost)}
          subValue="from stockouts only"
          color="#EF4444"
          iconBg="rgba(239,68,68,0.1)"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* State pills */}
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-[#6B6359]" />
          <button
            onClick={() => setStateFilter(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${!stateFilter ? 'bg-[#D4A03A]/15 text-[#D4A03A] border border-[#D4A03A]/25' : 'text-[#6B6359] border border-[#38332B] hover:text-[#ADA599] hover:border-[#554F46]'}`}
          >
            All States
          </button>
          {availableStates.map(st => (
            <button
              key={st}
              onClick={() => setStateFilter(stateFilter === st ? null : st)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${stateFilter === st ? 'bg-[#D4A03A]/15 text-[#D4A03A] border border-[#D4A03A]/25' : 'text-[#6B6359] border border-[#38332B] hover:text-[#ADA599] hover:border-[#554F46]'}`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[#38332B]" />

        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          {[
            { key: 'all', label: 'All' },
            { key: 'oos', label: 'OOS Only' },
            { key: 'low', label: 'Low Stock' },
            { key: 'vault', label: 'Vault Ready' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${statusFilter === f.key ? 'bg-[#00C27C]/15 text-[#00C27C] border border-[#00C27C]/25' : 'text-[#6B6359] border border-[#38332B] hover:text-[#ADA599] hover:border-[#554F46]'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[#38332B]" />

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={14} className="text-[#6B6359]" />
          {[
            { key: 'lost', label: 'By Lost Sales' },
            { key: 'days', label: 'By Days Supply' },
            { key: 'alpha', label: 'A→Z' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${sortBy === s.key ? 'bg-[#B598E8]/15 text-[#B598E8] border border-[#B598E8]/25' : 'text-[#6B6359] border border-[#38332B] hover:text-[#ADA599] hover:border-[#554F46]'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Store Accordion List */}
      <div className="space-y-3 pb-20">
        {filteredStores.length === 0 ? (
          <div className="text-center py-12 text-[#6B6359]">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-[14px]">No stores match the current filters</p>
          </div>
        ) : (
          filteredStores.map((store, i) => (
            <StoreAccordion
              key={store.name}
              store={store}
              onTransfer={handleTransfer}
              onReorder={handleReorder}
              defaultOpen={i === 0}
            />
          ))
        )}
      </div>

      {/* Bulk Actions Bar (sticky bottom) */}
      {(kpis.vaultReady > 0 || kpis.oosCount > 0) && (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-20 bg-[#1C1B1A]/95 backdrop-blur-md border-t border-[#38332B] px-6 py-3 flex items-center justify-between">
          <div className="text-[12px] text-[#6B6359]">
            <span className="text-[#F0EDE8] font-semibold">{filteredStores.length}</span> stores · <span className="text-red-400 font-semibold">{kpis.oosCount}</span> OOS · <span className="text-amber-400 font-semibold">{kpis.lowCount}</span> low stock
          </div>
          <div className="flex items-center gap-3">
            {kpis.vaultReady > 0 && (
              <button
                onClick={() => setBulkTransferDrawer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <ArrowRightLeft size={14} />
                Transfer All OOS from Vault ({kpis.vaultReady})
              </button>
            )}
            {bulkReorderCount > 0 && (
              <button
                onClick={() => setBulkReorderDrawer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <ClipboardList size={14} />
                Draft Reorder for All Critical ({bulkReorderCount})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Vault → Floor Transfer Drawer */}
      <ConfirmationDrawer
        open={transferDrawer.open}
        onCancel={() => setTransferDrawer({ open: false, store: null, product: null })}
        onConfirm={() => {
          setTransferDrawer({ open: false, store: null, product: null });
          showToast(`Transferred ${transferDrawer.product?.vault} units of ${transferDrawer.product?.name} to sales floor`);
        }}
        title="Confirm Vault → Floor Room Change"
        description="This will update the METRC package room assignment from vault to sales floor."
        icon={ArrowRightLeft}
        confirmLabel="Confirm Transfer"
        confirmColor="#3B82F6"
        details={transferDrawer.product ? [
          { label: 'Product', value: transferDrawer.product.name },
          { label: 'Store', value: transferDrawer.store?.name || '' },
          { label: 'Quantity', value: `${transferDrawer.product.vault} units` },
          { label: 'METRC Package', value: transferDrawer.product.metrcPkg },
          { label: 'Source', value: 'Vault / Back of House' },
          { label: 'Destination', value: 'Sales Floor' },
        ] : []}
        warning="This room change will be logged in METRC. Ensure physical inventory matches before confirming."
      />

      {/* Reorder Draft Drawer */}
      <ConfirmationDrawer
        open={reorderDrawer.open}
        onCancel={() => setReorderDrawer({ open: false, store: null, product: null })}
        onConfirm={() => {
          setReorderDrawer({ open: false, store: null, product: null });
          showToast(`Reorder PO drafted for ${reorderDrawer.product?.name}`);
        }}
        title="Draft Reorder Purchase Order"
        description="This will create a draft PO to replenish this SKU."
        icon={ShoppingCart}
        confirmLabel="Create Draft PO"
        confirmColor="#00C27C"
        details={reorderDrawer.product ? (() => {
          const houseBrands = ['Ozone', 'Ozone Reserve', 'Simply Herb', 'Common Goods', 'Tunnel Vision'];
          const isHouse = houseBrands.includes(reorderDrawer.product.brand);
          return [
            { label: 'Product', value: reorderDrawer.product.name },
            { label: 'Store', value: reorderDrawer.store?.name || '' },
            { label: isHouse ? 'Source' : 'Brand / Vendor', value: isHouse ? `Internal Allocation (${reorderDrawer.product.brand})` : reorderDrawer.product.brand },
            { label: 'Suggested Qty', value: `${reorderDrawer.product.avgWeekly * 2} units (2-week supply)` },
            { label: 'Est. Cost', value: fmtDollar(reorderDrawer.product.avgWeekly * 2 * reorderDrawer.product.price * 0.55) },
            { label: 'Current Floor', value: `${reorderDrawer.product.floor} units` },
            { label: 'Current Vault', value: `${reorderDrawer.product.vault} units` },
          ];
        })() : []}
        warning={(() => {
          const houseBrands = ['Ozone', 'Ozone Reserve', 'Simply Herb', 'Common Goods', 'Tunnel Vision'];
          const isHouse = reorderDrawer.product && houseBrands.includes(reorderDrawer.product.brand);
          return isHouse ? 'Internal allocation request will be routed to cultivation/processing.' : 'Draft PO will require manager approval before submission to vendor.';
        })()}
      />

      {/* Bulk Transfer Confirmation Drawer */}
      <ConfirmationDrawer
        open={bulkTransferDrawer}
        onCancel={() => setBulkTransferDrawer(false)}
        onConfirm={() => {
          setBulkTransferDrawer(false);
          showToast(`Queued ${bulkTransferCount} vault → floor room changes for METRC confirmation`);
        }}
        title="Bulk Vault → Floor Room Changes"
        description={`This will queue ${bulkTransferCount} METRC room assignments across ${visibleStores.filter(s => s.vaultReady > 0).length} stores.`}
        icon={ArrowRightLeft}
        confirmLabel={`Queue ${bulkTransferCount} Room Changes`}
        confirmColor="#3B82F6"
        details={[
          { label: 'Total Items', value: `${bulkTransferCount} OOS products with vault stock` },
          { label: 'Stores Affected', value: `${visibleStores.filter(s => s.vaultReady > 0).length} locations` },
          { label: 'Action', value: 'Move from Vault to Sales Floor in METRC' },
        ]}
        warning="Each room change will be logged individually in METRC. Verify physical inventory at each location before confirming."
      />

      {/* Bulk Reorder Confirmation Drawer */}
      <ConfirmationDrawer
        open={bulkReorderDrawer}
        onCancel={() => setBulkReorderDrawer(false)}
        onConfirm={() => {
          setBulkReorderDrawer(false);
          showToast(`Drafted reorder POs for ${bulkReorderCount} critical items`);
        }}
        title="Bulk Draft Reorder POs"
        description={`This will create ${bulkReorderCount} draft POs for all products with < 3 days supply.`}
        icon={ShoppingCart}
        confirmLabel={`Draft ${bulkReorderCount} POs`}
        confirmColor="#00C27C"
        details={[
          { label: 'Total Items', value: `${bulkReorderCount} critical products (< 3 days supply)` },
          { label: 'Stores Affected', value: `${visibleStores.filter(s => s.products.some(p => p.daysSupply < 3)).length} locations` },
          { label: 'Qty Per Item', value: '2-week supply (auto-calculated)' },
        ]}
        warning="All draft POs will require individual manager approval before submission."
      />

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl bg-[#1C1B1A] border border-[#00C27C]/30 shadow-2xl animate-[fadeIn_150ms_ease-out]">
          <p className="text-[13px] font-medium text-[#00C27C]">{toastMsg}</p>
        </div>
      )}
    </div>
  );
}
