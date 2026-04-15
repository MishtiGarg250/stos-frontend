import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-zine-coral selection:text-zinc-950">
      {/* Navigation */}
      <nav className="h-24 flex items-center justify-between px-12 border-b-2 border-zine-green z-50">
        <div className="font-bebas text-4xl tracking-tighter text-zine-coral drop-shadow-[2px_2px_0px_black]">
          S_OS_ALPHA
        </div>
        <div className="flex gap-12 font-bebas text-2xl tracking-widest">
          <a href="#features" className="hover:text-zine-coral transition-colors">FEATURES</a>
          <a href="/login" className="hover:text-zine-coral transition-colors">LOGIN</a>
          <a href="/signup" className="text-zine-coral hover:underline">SIGN_UP</a>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-zine-coral">
          <Image
            src="/student_os_landing_hero_1776139214237.png"
            alt="Student OS Hero"
            fill
            className="object-cover opacity-70"
            priority
          />
          
          <div className="relative z-10 text-center flex flex-col items-center">
             <div className="zine-card rotate-1 bg-zine-green/90 backdrop-blur-md scale-110 md:scale-150 p-12 border-8">
                <h1 className="text-8xl md:text-[12rem] leading-none mb-4 text-white">
                   STUDENT<br/>O_S
                </h1>
                <p className="font-bebas text-4xl text-zine-coral tracking-[0.3em] bg-black px-4 py-2">
                   VIRTUAL_INFRASTRUCTURE_V1
                </p>
             </div>
             
             <a 
               href="/login"
               className="zine-button mt-20 text-4xl px-12 py-6 scale-125 hover:scale-135 transition-transform"
             >
                INITIALIZE_SESSION →
             </a>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-12 font-bebas text-xl opacity-40 max-w-xs leading-none">
             "THIS IS NOT A TEMPLATE. THIS IS A SYSTEM. ORGANIZE YOUR CHAOS."
          </div>
        </section>

        {/* Features - Zine Grid */}
        <section id="features" className="py-32 px-12 bg-zinc-950">
           <h2 className="text-8xl mb-24 text-zinc-100 italic border-l-[20px] border-zine-coral pl-8">
              CORE_MODULES
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="zine-card group hover:-rotate-2 transition-transform h-[450px] flex flex-col justify-between">
                 <div>
                    <div className="text-9xl opacity-10 absolute -top-8 -left-4 font-zine">01</div>
                    <h3 className="text-5xl mb-6 text-zine-coral underline">NOTES_VAULT</h3>
                    <p className="font-mono text-zinc-400 uppercase leading-relaxed tracking-tighter">
                       A distracted mind is a losing mind. Capture every lecture, thought, and research node in a high-fidelity markdown environment.
                    </p>
                 </div>
                 <div className="w-full h-32 bg-zinc-900 border-t-2 border-zinc-800" />
              </div>

              <div className="zine-card group translate-y-12 rotate-1 h-[450px] flex flex-col justify-between bg-zinc-100 text-zinc-950 border-zinc-950">
                 <div>
                    <div className="text-9xl opacity-10 absolute -top-8 -left-4 font-zine">02</div>
                    <h3 className="text-5xl mb-6 text-zine-green underline">DATA_LINKS</h3>
                    <p className="font-mono text-zinc-600 uppercase leading-relaxed tracking-tighter">
                       Bookmarks are dead. Long live the Link Grid. Organize your digital resources with visual cards and auto-favicon fetching.
                    </p>
                 </div>
                 <div className="w-full h-32 bg-zinc-200 border-t-2 border-zinc-300" />
              </div>

              <div className="zine-card group hover:rotate-2 transition-transform h-[450px] flex flex-col justify-between border-dashed border-4">
                 <div>
                    <div className="text-9xl opacity-10 absolute -top-8 -left-4 font-zine">03</div>
                    <h3 className="text-5xl mb-6 text-zine-coral underline">DOC_EXPLORER</h3>
                    <p className="font-mono text-zinc-400 uppercase leading-relaxed tracking-tighter">
                       Your documents, curated. A metadata-rich filesystem that feels more like a digital scrapbook than a storage folder.
                    </p>
                 </div>
                 <div className="w-full h-32 bg-zinc-900 border-t-2 border-zinc-800" />
              </div>
           </div>
        </section>

        {/* CTA Footer */}
        <section className="py-40 px-12 flex flex-col items-center justify-center text-center bg-zine-green border-t-8 border-zine-coral">
           <h2 className="text-8xl md:text-9xl text-zine-coral mb-12">STOP_BROWSING.<br/>START_BUILDING.</h2>
           <p className="font-bebas text-3xl max-w-2xl mb-16 opacity-70">
              JOIN THE ALPHA NODE TODAY. FREE FOREVER FOR STUDENTS OF THE NEW WORLD.
           </p>
           <a href="/dashboard" className="zine-button text-5xl px-16 py-8">
              INITIALIZE_SYNC
           </a>
        </section>
      </main>

      <footer className="h-32 border-t-2 border-zinc-800 flex items-center justify-between px-12 font-bebas text-xl opacity-40">
         <span>© 2026_STUDENT_OS_ALPHA</span>
         <div className="flex gap-8">
            <a href="#">MANIFESTO</a>
            <a href="#">SOURCE</a>
            <a href="#">TERMINAL</a>
         </div>
      </footer>
    </div>
  );
}
