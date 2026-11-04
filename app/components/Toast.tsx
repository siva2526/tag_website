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
  const bgColor = {
    success: 'border-green-500 bg-green-500/10',
    info: 'border-blue-500 bg-blue-500/10',
    warning: 'border-yellow-400 bg-yellow-400/10',
    xp: 'border-yellow-400 bg-yellow-400/10',
  }[toast.type ?? 'info'];

  const textColor = {
    success: 'text-green-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    xp: 'text-yellow-400',
  }[toast.type ?? 'info'];

  return (
    <div
      className={`flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-black/95 border-2 ${bgColor} rounded-xl font-mono text-xs sm:text-sm shadow-2xl max-w-full`}
      style={{ animation: 'toastSlideIn 0.3s ease-out' }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {toast.icon && <span className="text-base sm:text-lg shrink-0">{toast.icon}</span>}
        <span className={`font-bold ${textColor} break-words`}>{toast.message}</span>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors text-sm rounded-lg hover:bg-gray-900"
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
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
