import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-zine-coral selection:text-black overflow-x-hidden">
    
      {/* Heavy Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <nav className="h-24 flex items-center justify-between px-8 md:px-20 border-b-8 border-zinc-950 sticky top-0 bg-background z-[110]">
        <div className="font-display text-5xl font-black tracking-tighter flex items-center gap-3 drop-shadow-[4px_4px_0px_#FF6B35]">
          AETHER
        </div>
        <div className="hidden md:flex gap-12 font-display text-[10px] font-black tracking-[0.5em] items-center text-zinc-500">
          <a href="#manifesto" className="hover:text-zine-coral transition-colors">MANIFESTO</a>
          <a href="#features" className="hover:text-zine-coral transition-colors">SYSTEM_LOGS</a>
          <a href="/login" className="aether-button border-4 border-black scale-90">
            ACCESS_NODE
          </a>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 border-b-8 border-zinc-950 bg-white">
          <div className="max-w-7xl mx-auto py-20">
              <div className="bg-black text-zine-coral inline-block px-4 py-1 font-display text-[12px] tracking-[0.4em] mb-12 border-4 border-black font-black uppercase shadow-[6px_6px_0px_#020617]">
                  V1.0.0 // STATUS: OPERATIONAL
              </div>
              <h1 className="text-[14vw] md:text-[13rem] leading-[0.8] font-display font-black tracking-tighter mb-12 uppercase text-zinc-950">
                 RECLAIM<br/><span className="text-zine-coral drop-shadow-[8px_8px_0px_#020617]">YOUR_MIND</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-16">
                  <a href="/signup" className="aether-button w-full md:w-auto h-24 px-20 text-4xl tracking-[0.2em] border-8 border-black flex items-center shadow-[12px_12px_0px_#020617] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
                      INITIALIZE
                  </a>
                  <p className="font-display text-xl md:text-2xl text-zinc-600 max-w-sm text-left leading-tight font-black uppercase tracking-tighter">
                    A fragmented workspace for a fragmented generation. <br/>
                    <span className="text-black italic underline decoration-zine-coral decoration-8 underline-offset-8">Notes, links, and documents—Aetherized.</span>
                  </p>
              </div>
          </div>
        </section>

        {/* Dynamic Ticker */}
        <div className="bg-zine-coral py-8 border-b-8 border-black overflow-hidden flex whitespace-nowrap font-display text-5xl text-black font-black italic uppercase">
          <div className="animate-marquee flex gap-20">
             <span>Unlimited Storage // Local Sovereignty // Encrypted Vaults // Open Source //</span>
             <span>Unlimited Storage // Local Sovereignty // Encrypted Vaults // Open Source //</span>
          </div>
        </div>

        <section id="features" className="py-40 px-8 md:px-20 bg-zinc-900 border-b-8 border-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-32">
                <h2 className="text-8xl md:text-[11rem] font-display font-black leading-none tracking-tighter text-white opacity-10 uppercase">
                    CORE_MODULES
                </h2>
                <div className="h-4 w-48 bg-zine-coral -mt-6 ml-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Card 1 */}
              <div className="aether-card p-12 min-h-[450px] flex flex-col justify-between group hover:rotate-1">
                <div>
                    <span className="font-display text-sm text-zinc-600 font-bold block mb-10 tracking-[0.4em]">01 // FRAGMENTS</span>
                    <h3 className="text-5xl font-display font-black mb-8 tracking-tighter group-hover:text-zine-coral transition-colors uppercase italic underline decoration-transparent group-hover:decoration-zine-coral decoration-8 underline-offset-8">NOTES_ENGINE</h3>
                    <p className="font-sans text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                        Brutalist markdown. Bi-directional vector search. A high-fidelity capture node for your mental debris.
                    </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="aether-card p-12 min-h-[450px] flex flex-col justify-between bg-zine-green border-black text-zinc-950 shadow-[8px_8px_0px_#000]">
                <div>
                    <span className="font-display text-sm text-zinc-800 font-bold block mb-10 tracking-[0.4em]">02 // RESOURCES</span>
                    <h3 className="text-5xl font-display font-black mb-8 tracking-tighter uppercase">DATA_INDEX</h3>
                    <p className="font-sans text-sm text-zinc-900 leading-relaxed font-bold uppercase tracking-tight">
                        Turn any digital resource into a permanent artifact. Indexed, categorized, and secured in your local registry.
                    </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="aether-card p-12 min-h-[450px] flex flex-col justify-between group hover:-rotate-1 border-zine-coral shadow-[8px_8px_0px_#fff]">
                <div>
                    <span className="font-display text-sm text-zinc-600 font-bold block mb-10 tracking-[0.4em]">03 // ARTIFACTS</span>
                    <h3 className="text-5xl font-display font-black mb-8 tracking-tighter group-hover:text-zinc-100 transition-colors uppercase underline decoration-zine-coral decoration-8 underline-offset-8 leading-none">DOCS_SYNAPSE</h3>
                    <p className="font-sans text-sm text-zinc-400 leading-relaxed font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                        Upload raw PDFs and talk to them. AI-powered extraction meets decentralized storage.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-60 px-6 text-center bg-zinc-950 relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-7xl md:text-[10rem] font-display font-black tracking-tighter mb-20 uppercase leading-none">
               RECLAIM_YOUR_<span className="text-zine-coral italic underline decoration-white decoration-8 underline-offset-12">FLOW</span>
             </h2>
             <a href="/login" className="aether-button h-28 px-28 text-4xl tracking-[0.4em] border-8 border-black">
               GET_AETHER
             </a>
           </div>
           
           <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </section>
      </main>

      <footer className="py-20 border-t-8 border-black bg-white px-12 font-display text-[10px] uppercase tracking-[0.4em] text-zinc-900 font-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
             <p>// SYSTEM_AETHER_V2.4 [COPYLEFT] // 2026</p>
             <div className="flex gap-16">
                <a href="#" className="hover:text-zine-coral transition-colors underline decoration-2">TERMINAL</a>
                <a href="#" className="hover:text-zine-coral transition-colors underline decoration-2">DEPOSITORY</a>
                <a href="#" className="hover:text-zine-coral transition-colors underline decoration-2">REGISTRY</a>
             </div>
          </div>
          <div className="mt-20 text-center opacity-20">
             AETHER: THE_OMNIPRESENT_DATA_LAYER
          </div>
      </footer>
    </div>
  );
}