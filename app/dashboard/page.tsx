import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-64 w-full overflow-hidden zine-card flex items-center px-12 group">
        {/* <Image
          src="/zine_collage_dashboard_1776137811385.png"
          alt="Dashboard Collage"
          fill
          className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
        /> */}
        <div className="relative z-10">
          <h2 className="text-7xl text-zinc-950 stroke-zine-coral drop-shadow-[4px_4px_0px_var(--zine-coral)]">
            WELCOME BACK
          </h2>
          <p className="font-bebas text-3xl text-zine-coral bg-black px-4 py-1 inline-block -rotate-1 mt-4">
            USER_NODE: ACTIVE // 2026_SESSION
          </p>
        </div>
      </section>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent Notes */}
        <div className="zine-card flex flex-col gap-4 min-h-[300px] border-r-8">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">RECENT NOTES</h3>
          <div className="flex flex-col gap-3 mt-4">
            <div className="bg-zinc-900 p-3 border-l-4 border-zine-coral hover:bg-zinc-800 cursor-pointer transition-colors">
              <p className="font-bold">Project Alpha Specs</p>
              <p className="text-xs opacity-50 uppercase mt-1">Updated 2h ago</p>
            </div>
            <div className="bg-zinc-900 p-3 border-l-4 border-zine-coral hover:bg-zinc-800 cursor-pointer transition-colors">
              <p className="font-bold">Exam Schedule - Q3</p>
              <p className="text-xs opacity-50 uppercase mt-1">Updated 1d ago</p>
            </div>
          </div>
          <button className="mt-auto font-bebas text-xl text-zine-coral text-left hover:translate-x-2 transition-transform">
            VIEW ALL NOTES →
          </button>
        </div>

        {/* Important Links */}
        <div className="zine-card flex flex-col gap-4 min-h-[300px] bg-zinc-950">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">IMP_LINKS</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <a href="#" className="aspect-square bg-zine-green border border-zinc-800 flex flex-col items-center justify-center p-4 hover:border-zine-coral transition-colors text-center group">
              <div className="w-8 h-8 bg-zinc-700 mb-2 group-hover:bg-zine-coral" />
              <span className="text-[10px] font-bold uppercase truncate w-full">Library Access</span>
            </a>
            <a href="#" className="aspect-square bg-zine-green border border-zinc-800 flex flex-col items-center justify-center p-4 hover:border-zine-coral transition-colors text-center group">
              <div className="w-8 h-8 bg-zinc-700 mb-2 group-hover:bg-zine-coral" />
              <span className="text-[10px] font-bold uppercase truncate w-full">Course Portal</span>
            </a>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="zine-card flex flex-col gap-4 min-h-[300px] -rotate-1">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">DATA_CORE</h3>
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 border-8 border-zine-green rounded-full flex items-center justify-center">
               <div className="text-center">
                  <span className="text-4xl block">64%</span>
                  <span className="text-[10px] uppercase font-bold text-zine-coral">Full</span>
               </div>
               {/* Decorative ticks */}
               <div className="absolute inset-0 border-t-8 border-zine-coral rounded-full rotate-45" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-zinc-500">
               4.2 GB / 10 GB USED
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Artistic Banner */}
      <footer className="h-32 w-full zine-card flex items-center justify-between px-12 bg-zine-coral text-zinc-950 mt-12 overflow-hidden relative">
         <div className="text-6xl tracking-tighter mix-blend-multiply opacity-20 whitespace-nowrap -translate-x-12">
           KNOWLEDGE IS POWER • SOURCE THE CODE • EDIT THE FUTURE •
         </div>
         <div className="absolute right-12 z-10 flex items-center gap-4">
            <span className="font-bebas text-2xl uppercase">Build v1.0.4-Alpha</span>
            <div className="w-12 h-12 bg-zinc-950" />
         </div>
      </footer>
    </div>
  );
}
