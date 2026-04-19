"use client";
import React, { useEffect, useState } from 'react';

interface ZineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ZineDrawer({ isOpen, onClose, title, children }: ZineDrawerProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setActive(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setActive(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-xl bg-[#0a0a0a] border-l border-white/5 h-full shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${active ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-3xl text-zinc-100 font-display font-bold tracking-tighter uppercase">{title}</h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-all font-bold text-xl"
            >
              ✕
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          <div className="relative z-10">
            {children}
          </div>
          <div className="absolute top-0 right-0 text-[10rem] leading-none font-display font-bold opacity-[0.02] pointer-events-none select-none -translate-x-12 translate-y-12">
             AETHER
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-white/[0.01] font-display text-[9px] text-zinc-600 uppercase tracking-[0.4em] flex justify-between">
           <span>// ENCRYPTION_ACTIVE</span>
           <span>ESTABLISHING_DATA_LINK</span>
        </div>
      </div>
    </div>
  );
}
