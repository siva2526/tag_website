'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'xp';
  icon?: string;
}

interface ToastContextType {
  showToast: (message: string, options?: { type?: Toast['type']; icon?: string }) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  const styling = {
    success: 'border-2 border-emerald-400 bg-[#0c0c12] text-emerald-300 shadow-[4px_4px_0px_0px_#34d399]',
    info: 'border-2 border-cyan-400 bg-[#0c0c12] text-cyan-300 shadow-[4px_4px_0px_0px_#00f0ff]',
    warning: 'border-2 border-yellow-400 bg-[#0c0c12] text-yellow-300 shadow-[4px_4px_0px_0px_#fff400]',
    xp: 'border-2 border-yellow-400 bg-[#0c0c12] text-yellow-300 shadow-[4px_4px_0px_0px_#fff400]',
  }[toast.type ?? 'info'];

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 border backdrop-blur-xl rounded-xl font-mono text-xs sm:text-sm shadow-2xl max-w-full ${styling}`}
      style={{ animation: 'toastSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {toast.icon && <span className="text-base sm:text-lg shrink-0">{toast.icon}</span>}
        <span className="font-bold break-words">{toast.message}</span>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white transition-colors text-sm rounded-lg hover:bg-zinc-800"
        aria-label="Dismiss alert"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const showToast = useCallback((message: string, options?: { type?: Toast['type']; icon?: string }) => {
    const id = counterRef.current++;
    const toast: Toast = { id, message, ...options };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Responsive Toast Container */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[9997] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
