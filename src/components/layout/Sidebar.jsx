import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Tag, MapPin, MessageSquare, Trophy, X, Zap, Bot, Megaphone, ShoppingCart, CircleDollarSign, Waypoints, Hash, Globe, Briefcase } from 'lucide-react';
import { CHANNELS } from '../../data/slackMockData';
import { useStores } from '../../contexts/StoreContext';
import NexusIcon from '../NexusIcon';

const MY_STORES_ITEMS = [
  { to: '/', label: 'Command Center', icon: Zap },
  { to: '/locations', label: 'Store Performance', icon: MapPin },
];

const CUSTOMERS_ITEMS = [
  { to: '/overview', label: 'Sentiment & Reviews', icon: BarChart3 },
  { to: '/brands', label: 'Brand Perception', icon: Tag },
  { to: '/reviews', label: 'Review Explorer', icon: MessageSquare },
  { to: '/competitive', label: 'Competitive Intel', icon: Trophy },
];

const OPERATIONS_ITEMS = [
  { to: '/agents/connect', label: 'Inventory & Reordering', icon: ShoppingCart },
  { to: '/agents/pricing', label: 'Pricing & Margins', icon: CircleDollarSign },
  { to: '/agents/marketing', label: 'Marketing Campaigns', icon: Megaphone },
];

const HELP_ITEMS = [
  { to: '/agents/bridge', label: 'Nexus Chat', icon: Waypoints },
  { to: '/portal', label: 'Customer Portal', icon: Briefcase },
];

function SidebarContent({ onClose, onSlackOpen, onDtchOpen }) {
  const { selectionLabel } = useStores();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0A2E1E 0%, #153D2A 100%)', boxShadow: '0 0 20px rgba(0,194,124,0.2), inset 0 1px 0 rgba(0,194,124,0.1)', border: '1px solid rgba(0,194,124,0.2)' }}>
            <NexusIcon size={22} />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#00C27C] via-[#00C27C] to-[#64A8E0] bg-clip-text text-transparent">nexus</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors" aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll">
        {[
          { label: 'My Stores', items: MY_STORES_ITEMS },
          { label: 'Customers', items: CUSTOMERS_ITEMS },
          { label: 'Operations', items: OPERATIONS_ITEMS, icon: Bot },
          { label: 'Help', items: HELP_ITEMS },
        ].map(({ label: groupLabel, items, icon: GroupIcon }, gi) => (
          <Fragment key={groupLabel}>
            <p className={`px-3 ${gi > 0 ? 'mt-6' : ''} mb-2 text-[11px] font-semibold text-[#00C27C]/30 uppercase tracking-widest flex items-center gap-2`}>
              {GroupIcon && <GroupIcon className="w-3 h-3" />}
              {groupLabel}
            </p>
            {items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-sidebar-hover text-[#00E08E] shadow-sm'
                      : 'text-white/60 hover:bg-sidebar-hover/60 hover:text-white/90'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-150 ${isActive ? 'text-[#00E08E]' : 'text-white/40 group-hover:text-white/70'}`} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{label}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00C27C]" />}
                  </>
                )}
              </NavLink>
            ))}
          </Fragment>
        ))}
      </nav>

      {/* Chat buttons */}
      <div className="px-3 pb-2 space-y-1">
        <button
          onClick={() => { if (onSlackOpen) onSlackOpen(); if (onClose) onClose(); }}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-white/60 hover:bg-white/[0.06] hover:text-white/90 transition-all duration-150"
        >
          <Hash className="w-[18px] h-[18px] flex-shrink-0 text-white/40 group-hover:text-white/70" />
          <span>Team Chat</span>
          {(() => {
            const totalUnread = CHANNELS.reduce((sum, c) => sum + (c.unread || 0), 0);
            return totalUnread > 0 ? (
              <span className="ml-auto bg-[#E87068] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {totalUnread}
              </span>
            ) : null;
          })()}
        </button>
        <button
          onClick={() => { if (onDtchOpen) onDtchOpen(); if (onClose) onClose(); }}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-white/60 hover:bg-[#D4A03A]/[0.08] hover:text-white/90 transition-all duration-150"
        >
          <MessageSquare className="w-[18px] h-[18px] flex-shrink-0 text-white/40 group-hover:text-white/70" />
          <span>DTCH Team Chat</span>
          <span className="ml-auto text-[9px] font-bold text-[#D4A03A] bg-[#D4A03A]/10 rounded px-1.5 py-0.5" style={{ boxShadow: '0 0 8px rgba(212,160,58,0.15)' }}>NEW</span>
        </button>
      </div>

      {/* Tenant badge */}
      <div className="px-4 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-3 transition-colors duration-150 hover:bg-white/[0.10] cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00C27C] to-[#00E08E] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Ascend</p>
            <p className="text-white/40 text-xs truncate">{selectionLabel}</p>
          </div>
        </div>
      </div>

      {/* Marketing link */}
      <div className="px-3 pb-3">
        <NavLink
          to="/nexus-landing"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all border border-dashed ${
              isActive
                ? 'border-[#B598E8]/40 bg-[#B598E8]/10 text-[#B598E8]'
                : 'border-white/10 text-white/30 hover:text-white/50 hover:border-white/20 hover:bg-white/[0.04]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Globe className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#B598E8]' : ''}`} />
              <span>Dutchie AI Website</span>
              <span className="ml-auto text-[8px] font-bold text-[#B598E8]/60 uppercase tracking-wider">Marketing</span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose, onSlackOpen, onDtchOpen }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 bg-sidebar-bg border-r border-sidebar-border z-30">
        <SidebarContent onSlackOpen={onSlackOpen} onDtchOpen={onDtchOpen} />
      </aside>
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0" />

      {/* Mobile overlay */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden="true" />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg shadow-2xl lg:hidden animate-slide-in">
            <SidebarContent onClose={onClose} onSlackOpen={onSlackOpen} onDtchOpen={onDtchOpen} />
          </aside>
        </>
      )}

      <style>{`
        @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.2s ease-out; }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </>
  );
}
