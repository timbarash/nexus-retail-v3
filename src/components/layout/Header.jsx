import { useState, useRef, useEffect } from 'react';
import { Menu, Search, ChevronDown } from 'lucide-react';
import StoreSelector from './StoreSelector';
import DateRangeSelector from './DateRangeSelector';
import { usePersona } from '../../contexts/PersonaContext';
import { useStores } from '../../contexts/StoreContext';

function PersonaSwitcher() {
  const { personas, selectedPersona, setSelectedPersona } = usePersona();
  const { setStoresByPersona } = useStores();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (p) => {
    setSelectedPersona(p.id);
    setStoresByPersona(p);
    setOpen(false);
  };

  const Icon = selectedPersona.icon;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#38332B] hover:border-[rgba(212,160,58,0.25)] bg-[#141210] hover:bg-[#1E1D1B] transition-all"
      >
        <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'rgba(212,160,58,0.12)' }}>
          <Icon className="w-3 h-3 text-[#D4A03A]" />
        </div>
        <span className="text-xs font-medium text-[#F0EDE8] hidden md:block">{selectedPersona.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-[#6B6359] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[#38332B] bg-[#1C1B1A] shadow-2xl z-50 overflow-hidden" style={{ animation: 'fadeIn 0.15s ease-out' }}>
          <div className="px-4 py-2.5 border-b border-[#38332B]">
            <p className="text-[10px] font-semibold text-[#6B6359] uppercase tracking-wider">Switch Persona</p>
          </div>
          <div className="py-1">
            {personas.map(p => {
              const PIcon = p.icon;
              const isActive = p.id === selectedPersona.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? 'bg-[rgba(212,160,58,0.08)]'
                      : 'hover:bg-[#282724]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-[rgba(212,160,58,0.15)]' : 'bg-[#282724]'
                  }`}>
                    <PIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4A03A]' : 'text-[#6B6359]'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${isActive ? 'text-[#D4A03A]' : 'text-[#F0EDE8]'}`}>{p.label}</p>
                    <p className="text-[10px] text-[#6B6359]">
                      {p.scope === 'portfolio' ? 'All 39 stores, 7 states'
                        : p.scope === 'region' ? `${p.storeFilter.states.join(', ')} — 23 stores`
                        : p.scope === 'state' ? `${p.defaultState} — 10 stores`
                        : p.defaultStore?.replace('Ascend ', '')}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-[#1C1B1A]/80 backdrop-blur-md border-b border-[#38332B]">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-[#ADA599] hover:bg-[#282724] hover:text-[#F0EDE8] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-[#F0EDE8] leading-tight">
              Dutchie AI
            </h1>
            <p className="text-xs text-[#6B6359] hidden sm:block">
              Ascend — Retail Operations
            </p>
          </div>
        </div>
        {/* Right: persona + search + date + store */}
        <div className="flex items-center gap-2">
          <PersonaSwitcher />
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#38332B] text-[#6B6359] hover:text-[#ADA599] hover:border-[#38332B] hover:bg-[#282724] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">Search</span>
            <kbd className="text-[10px] bg-[#1E1D1B] border border-[#38332B] rounded px-1 py-0.5 ml-1 font-mono text-[#6B6359]">&#8984;K</kbd>
          </button>
          <DateRangeSelector />
          <StoreSelector />
        </div>
      </div>
    </header>
  );
}
