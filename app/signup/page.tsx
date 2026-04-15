import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-zine-coral selection:text-zinc-950 overflow-x-hidden">
    
      <div className="fixed inset-0 pointer-events-none z-100 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <nav className="h-20 flex items-center justify-between px-6 md:px-12 border-b-4 border-black sticky top-0 bg-background z-[60]">
        <div className="font-bebas text-4xl tracking-tighter text-zine-coral flex items-center gap-2">
          <span className="bg-black text-white px-2 py-1">S_OS</span>
          <span className="animate-pulse">_ALPHA</span>
        </div>
        <div className="hidden md:flex gap-12 font-bebas text-2xl tracking-widest items-center">
          <a href="#manifesto" className="hover:line-through decoration-zine-green">MANIFESTO</a>
          <a href="#features" className="hover:line-through decoration-zine-coral">SYSTEM_LOG</a>
          <a href="/login" className="zine-button py-2 px-6 text-xl">ACCESS_NODE</a>
        </div>
      </nav>

      <main className="flex-1">
  
        <section className="relative min-h-screen flex items-center justify-center border-b-12 border-black">
          <div className="absolute inset-0 bg-zine-coral/10 mix-blend-multiply" />
          <Image
            src="/student_os_landing_hero_1776139214237.png"
            alt="System Interface"
            fill
            className="object-cover grayscale contrast-125 brightness-50"
            priority
          />
          
          <div className="relative z-10 w-full px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-zine-green text-black inline-block px-4 py-2 font-bebas text-2xl mb-4 -rotate-1 border-2 border-black">
                    ESTABLISHED_2026 // NO_PERMISSIONS_REQUIRED
                </div>
                <h1 className="text-[15vw] md:text-[14rem] leading-[0.8] font-bebas tracking-tighter drop-shadow-[8px_8px_0px_#ff4d4d]">
                   RECLAIM<br/>YOUR_MIND
                </h1>
                <div className="flex flex-col md:flex-row items-start md:items-end gap-8 mt-8">
                    <a href="/signup" className="zine-button text-5xl md:text-7xl px-12 py-8 bg-zinc-950 text-zine-coral hover:bg-zine-coral hover:text-black transition-all">
                        INITIALIZE_SESSION_*
                    </a>
                    <p className="font-mono text-xl max-w-sm uppercase text-white bg-black p-4 border-l-8 border-zine-green">
                        A fragmented workspace for a fragmented generation. Notes, links, and documents—decentralized from the corporate web.
                    </p>
                </div>
            </div>
          </div>
        </section>

        <div className="bg-zine-coral py-4 border-y-4 border-black overflow-hidden flex whitespace-nowrap font-bebas text-4xl text-black italic">
          <div className="animate-marquee">
             UNLIMITED STORAGE / OPEN SOURCE / NO TRACKING / BUILD THE FUTURE / REJECT TRADITION / DATA SOVEREIGNTY / &nbsp;
          </div>
          <div className="animate-marquee">
             UNLIMITED STORAGE / OPEN SOURCE / NO TRACKING / BUILD THE FUTURE / REJECT TRADITION / DATA SOVEREIGNTY / &nbsp;
          </div>
        </div>

  x
        <section id="features" className="py-32 px-6 md:px-12 bg-zinc-100 text-black relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          x
            <div className="md:col-span-4 mb-20">
                <h2 className="text-9xl font-bebas leading-none sticky top-32">
                    CORE<br/><span className="text-zine-green">SCRIPTS</span>
                </h2>
                <p className="mt-8 font-mono uppercase text-zinc-500">Manual v1.0.4: Deploying modules to local storage...</p>
            </div>
            
            <div className="md:col-span-8 flex flex-col gap-24">
         
              <div className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_black] hover:shadow-none transition-all hover:translate-x-2 hover:translate-y-2 group">
                <div className="flex justify-between items-start mb-12">
                    <span className="font-bebas text-6xl group-hover:text-zine-coral transition-colors">[01]</span>
                    <div className="h-16 w-16 bg-zine-green border-2 border-black rotate-3 group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="text-7xl font-bebas mb-6 tracking-tighter">NOTES_VAULT</h3>
                <p className="font-mono text-2xl uppercase max-w-2xl">
                    A brutalist markdown engine. No distractions. Just your thoughts and the cursor. Bi-directional linking included.
                </p>
              </div>

x
              <div className="border-4 border-black p-8 bg-zine-green shadow-[12px_12px_0px_#ff4d4d] -rotate-1 self-end md:w-3/4 group">
                <span className="font-bebas text-6xl text-white">[02]</span>
                <h3 className="text-7xl font-bebas mb-6 tracking-tighter">DATA_LINKS</h3>
                <p className="font-mono text-2xl uppercase text-zinc-900">
                    A visual graveyard for your browser tabs. Turn URLs into persistent digital artifacts.
                </p>
              </div>

   
              <div className="border-4 border-black p-8 bg-black text-white shadow-[12px_12px_0px_#00ff00] rotate-1 md:w-3/4 group">
                <span className="font-bebas text-6xl text-zine-coral">[03]</span>
                <h3 className="text-7xl font-bebas mb-6 tracking-tighter text-zine-green">DOC_EXPLORER</h3>
                <p className="font-mono text-2xl uppercase opacity-80">
                    Sift through the wreckage of your files. Metadata-heavy, search-first, clutter-last.
                </p>
              </div>
            </div>
          </div>
        </section>

   
        <section className="relative py-60 px-6 flex flex-col items-center justify-center text-center bg-black text-white overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-20 bg-zine-coral -skew-y-2 origin-top-left" />
           
           <h2 className="text-7xl md:text-[12rem] font-bebas leading-[0.8] mb-12 animate-pulse">
             STOP_BROWSING.<br/><span className="text-zine-green">START_BUILDING.</span>
           </h2>
           
           <div className="relative group">
               <div className="absolute inset-0 bg-zine-coral blur-2xl opacity-20 group-hover:opacity-50 transition-opacity" />
               <a href="/dashboard" className="relative zine-button text-6xl px-20 py-10 hover:bg-white hover:text-black">
                 INITIALIZE_SYNC_NOW
               </a>
           </div>

           <div className="mt-20 font-mono text-zinc-500 uppercase tracking-widest flex gap-8">
              <span>LATENCY: 12ms</span>
              <span className="text-zine-green">STATUS: OPERATIONAL</span>
              <span>VERSION: ALPHA_1.0</span>
           </div>
        </section>
      </main>

  x
      <footer className="py-20 border-t-4 border-black bg-white px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 font-bebas text-2xl">
          <div className="flex flex-col gap-4">
             <span className="text-zine-coral text-4xl">S_OS_ALPHA</span>
             <p className="font-mono text-sm text-zinc-400">© 2026 SYSTEM RECOVERY INC. NO RIGHTS RESERVED. COPYLEFT.</p>
          </div>
          <div className="flex flex-col gap-2">
             <span className="underline decoration-4 decoration-zine-green">NAVIGATION</span>
             <a href="#" className="hover:text-zine-coral italic">TERMINAL</a>
             <a href="#" className="hover:text-zine-coral italic">SOURCE_CODE</a>
             <a href="#" className="hover:text-zine-coral italic">DOCUMENTATION</a>
          </div>
          <div className="flex flex-col gap-2">
             <span className="underline decoration-4 decoration-zine-coral">COMMUNITY</span>
             <a href="#" className="hover:text-zine-green italic">DISCORD_NODE</a>
             <a href="#" className="hover:text-zine-green italic">TWITTER_X</a>
             <a href="#" className="hover:text-zine-green italic">MANIFESTO.PDF</a>
          </div>
      </footer>
    </div>
  );
}