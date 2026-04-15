"use client";
import React from 'react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-8xl text-zine-coral">SYSTEM_CONFIG</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="zine-card flex flex-col gap-6">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">USER_PROFILE</h3>
          <div className="flex items-center gap-6 mt-4">
             <div className="w-24 h-24 bg-zine-green border-4 border-zine-coral" />
             <div className="flex flex-col">
                <span className="text-3xl font-bebas">ALPHA_USER_01</span>
                <span className="text-xs opacity-50 font-mono">ID: X-990-22-B</span>
             </div>
          </div>
          <button className="zine-button mt-4">UPDATE_ID</button>
        </div>

        <div className="zine-card flex flex-col gap-6 -rotate-1">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">THEME_OVERRIDE</h3>
          <div className="flex flex-col gap-4 mt-4">
             <div className="flex justify-between items-center border-b border-zinc-800 py-2">
                <span className="font-bold">HIGH_CONTRAST</span>
                <div className="w-12 h-6 bg-zine-coral p-1">
                   <div className="w-4 h-4 bg-zinc-950 ml-auto" />
                </div>
             </div>
             <div className="flex justify-between items-center border-b border-zinc-800 py-2">
                <span className="font-bold">GRAIN_TEXTURE</span>
                <div className="w-12 h-6 bg-zinc-950 border border-zinc-700 p-1">
                   <div className="w-4 h-4 bg-zinc-500" />
                </div>
             </div>
          </div>
        </div>

        <div className="zine-card md:col-span-2 bg-zine-coral text-zinc-950 border-double border-4 border-zinc-950">
           <h3 className="text-4xl mb-4">DANGER_ZONE</h3>
           <p className="font-mono text-sm mb-6">ALL DATA IS STORED LOCALLY AND SYNCED TO THE ALPHA CORE. DELETING THIS NODE IS IRREVERSIBLE.</p>
           <button className="bg-zinc-950 text-zine-coral font-bebas text-2xl px-6 py-2 hover:bg-zinc-800 transition-colors">
              WIPE_ALL_DATA
           </button>
        </div>
      </div>
    </div>
  );
}
