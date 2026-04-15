import React from "react";
import GlobalSearch from "@/components/GlobalSearch";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground h-full overflow-hidden flex">
      {/* Artistic Sidebar */}
      <aside className="w-72 bg-zine-green border-r-4 border-zine-coral flex flex-col p-8 relative overflow-hidden">
        {/* Decorative Corner */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-zine-coral -rotate-45 -translate-x-8 -translate-y-8" />
        
        <div className="relative z-10 flex flex-col h-full">
          <h1 className="text-5xl mb-12 text-zine-coral drop-shadow-[4px_4px_0px_#000]">
            STUDENT<br/>O_S
          </h1>
          
          <nav className="flex flex-col gap-6">
            {[
              { name: 'DASHBOARD', path: '/dashboard' },
              { name: 'DOCUMENTS', path: '/dashboard/documents' },
              { name: 'NOTES', path: '/dashboard/notes' },
              { name: 'LINKS', path: '/dashboard/links' },
              { name: 'SETTINGS', path: '/dashboard/settings' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="font-bebas text-3xl tracking-widest hover:text-zine-coral transition-colors hover:translate-x-2 duration-300 uppercase"
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto">
            <div className="zine-card p-4 scale-90 -rotate-2">
              <p className="font-bebas text-xl text-zine-coral">SYSTEM STATUS</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-zine-coral animate-pulse" />
                <span className="text-xs font-bold uppercase">All Systems Optimal</span>
              </div>
            </div>
            
            {/* Exit to Landing */}
            <a href="/" className="block mt-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zine-coral transition-colors">
               ← BACK_TO_LANDING
            </a>
          </div>
        </div>
        
        {/* Halftone Overlay Placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative bg-[#050505]">
         {/* Top Bar / Search */}
         <header className="h-20 border-b-2 border-zine-green/30 flex items-center justify-between px-12 z-10">
            <div className="font-bebas text-2xl tracking-tighter opacity-50">
              TERMINAL ID: OS_PROX_8.4
            </div>
            <button className="zine-button">
               SYNC_DATA
            </button>
         </header>
         
         <section className="flex-1 p-12">
            <GlobalSearch />
            {children}
         </section>
      </main>
    </div>
  );
}
