import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw } from 'lucide-react';
import CustomerBridge from '../pages/CustomerBridge';
import NexusIcon from './NexusIcon';

/**
 * NexusChat — Full-screen AI agent overlay
 * Wraps CustomerBridge with a dutchie-connect-style overlay shell.
 * Opened by the FAB button and Nexus AI bar.
 * Completely separate from the DTCH team chat.
 */
export default function NexusChat({ isOpen, onClose, initialQuery }) {
  const containerRef = useRef(null);
  const querySent = useRef(false);
  const [resetKey, setResetKey] = useState(0);

  // Auto-send initialQuery by programmatically filling the input and submitting
  useEffect(() => {
    if (!isOpen || !initialQuery || querySent.current) return;
    querySent.current = true;
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const input = container.querySelector('input[type="text"]');
      const form = container.querySelector('form');
      if (input && form) {
        // React-controlled input: use native setter to trigger onChange
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(input, initialQuery);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        // Submit after React state updates
        setTimeout(() => {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }, 100);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [isOpen, initialQuery]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) querySent.current = false;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col" style={{ backgroundColor: '#141210' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-[#38332B]/60 flex-shrink-0"
        style={{ background: '#1A1810' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(212,160,58,0.1)', border: '1px solid rgba(212,160,58,0.15)' }}
          >
            <NexusIcon size={17} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#F0EDE8]">Nexus</h2>
            <p className="text-[10px] text-[#6B6359]">Here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { querySent.current = false; setResetKey(k => k + 1); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-[#ADA599] hover:text-[#F0EDE8] hover:bg-white/[0.06] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            New
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#ADA599] hover:text-[#F0EDE8] hover:bg-white/[0.06] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CustomerBridge fills the rest */}
      <div className="flex-1 overflow-hidden px-0">
        <div className="h-full max-w-5xl mx-auto px-5 py-3">
          <CustomerBridge nexusOverlay key={resetKey} />
        </div>
      </div>
    </div>
  );
}
