import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Shared confirmation drawer for all destructive/important actions.
 * Slides up from bottom on mobile, centered modal on desktop.
 *
 * Props:
 *  - open: boolean
 *  - onConfirm: () => void
 *  - onCancel: () => void
 *  - title: string (e.g. "Confirm Purchase Orders")
 *  - description: string (e.g. "This will send POs to 3 suppliers")
 *  - details: Array<{ label: string, value: string }> — key/value summary rows
 *  - confirmLabel: string (e.g. "Place Orders")
 *  - confirmColor: string (hex color for confirm button)
 *  - icon: React component (optional, defaults to AlertTriangle)
 *  - warning: string (optional amber warning text)
 */
export default function ConfirmationDrawer({
  open, onConfirm, onCancel, title, description,
  details = [], confirmLabel = 'Confirm', confirmColor = '#00C27C',
  icon: Icon = AlertTriangle, warning,
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]"
        onClick={onCancel}
      />

      {/* Drawer */}
      <div className="fixed z-[91] bottom-0 left-0 right-0 sm:bottom-auto sm:top-[50%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-[#1C1B1A] border border-[#38332B] shadow-2xl overflow-hidden animate-[slideUp_200ms_ease-out] sm:animate-[fadeIn_150ms_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${confirmColor}15` }}>
              <Icon size={18} style={{ color: confirmColor }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F0EDE8]">{title}</h3>
              <p className="text-[11px] text-[#6B6359] mt-0.5">{description}</p>
            </div>
          </div>
          <button onClick={onCancel} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B6359] hover:text-[#ADA599] hover:bg-[#282724] transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Detail rows */}
        {details.length > 0 && (
          <div className="mx-5 rounded-xl border border-[#38332B] bg-[#141210] divide-y divide-[#38332B]/60">
            {details.map((d, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[11px] text-[#6B6359]">{d.label}</span>
                <span className="text-[12px] font-medium text-[#F0EDE8]">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning */}
        {warning && (
          <div className="mx-5 mt-3 flex items-start gap-2 px-3 py-2 rounded-lg bg-[#D4A03A]/8 border border-[#D4A03A]/15">
            <AlertTriangle size={12} className="text-[#D4A03A] mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-[#D4A03A]">{warning}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 p-5">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-[#38332B] text-[#ADA599] hover:text-[#F0EDE8] hover:bg-[#282724] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: confirmColor }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
