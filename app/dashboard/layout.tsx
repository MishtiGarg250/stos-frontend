import React from "react";
import GlobalSearch from "@/components/GlobalSearch";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground h-full overflow-hidden flex font-sans">
      <aside className="w-80 bg-zinc-950 border-r-4 border-zine-coral flex flex-col p-10 relative overflow-hidden group">
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-16">
            <h1 className="text-5xl font-display font-black tracking-tighter text-white drop-shadow-[4px_4px_0px_#FF6B35]">
              AETHER
            </h1>
            <p className="text-[10px] font-display uppercase tracking-[0.4em] text-zinc-500 mt-2">Personal Data Hub // v2.4</p>
          </div>
          
          <nav className="flex flex-col gap-4">
            {[
              { name: 'DASHBOARD', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'DOCUMENTS', path: '/dashboard/documents', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { name: 'NOTES', path: '/dashboard/notes', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
              { name: 'LINKS', path: '/dashboard/links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
              { name: 'SETTINGS', path: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="group flex items-center gap-4 py-4 px-6 hover:bg-white/[0.08] border-l-4 border-transparent hover:border-zine-coral transition-all active:scale-[0.98]"
              >
                <svg className="w-6 h-6 text-zinc-500 group-hover:text-zine-coral transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                </svg>
                <span className="font-display text-[11px] font-black tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors uppercase">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
          
          <div className="mt-auto">
            <div className="bg-zinc-900 border-2 border-zinc-800 p-6 relative overflow-hidden shadow-[4px_4px_0px_var(--zine-coral)]">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-zine-coral animate-pulse" />
                 <span className="text-[10px] font-display font-bold text-white uppercase tracking-widest">System Operational</span>
              </div>
              <p className="font-display text-[9px] text-zinc-500 uppercase tracking-widest leading-loose">
                Data_Link: <span className="text-zine-coral">Encrypted</span><br/>
                Vault_ID: <span className="text-zinc-300">AETHER_v2</span>
              </p>
            </div>
            
            <a href="/" className="flex items-center gap-2 mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-all group">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> EXIT_SESSION
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative bg-[#020617]">
         <header className="h-20 border-b-4 border-zinc-900/50 flex items-center justify-between px-16 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-30">
            <div className="font-display text-xs text-zinc-600 tracking-[0.4em] uppercase">
              INTERFACE_NODE // <span className="text-white">AETHER_CORE</span>
            </div>
            <button className="aether-button scale-90">
               SYNC_VAULT
            </button>
         </header>
         
         <section className="flex-1 p-16 max-w-7xl mx-auto w-full">
            <GlobalSearch />
            <div className="mt-12">
               {children}
            </div>
         </section>
      </main>
    </div>
  );
}
