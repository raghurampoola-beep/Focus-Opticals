"use client";

import { useEffect, useState } from "react";
import { X, Instagram, Facebook } from "lucide-react";

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export function Toast({ isVisible, onClose, message }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 8000); // 8 seconds
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      <div className="bg-[#1a2b4b] text-white p-5 rounded-2xl shadow-2xl border border-teal-500/30 flex items-center gap-4 min-w-[280px]">
        <div className="flex flex-col gap-0.5 flex-grow">
          <h4 className="font-black text-teal-400 uppercase tracking-tighter text-[10px] opacity-70">Notice</h4>
          <p className="font-bold text-base leading-tight uppercase tracking-wide">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-4 w-4 opacity-60" />
        </button>
      </div>
    </div>
  );
}
