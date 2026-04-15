"use client";
import React, { useState } from 'react';

export default function LinksPage() {
  const [links] = useState([
    { id: 1, title: "Google Scholar", url: "https://scholar.google.com", category: "Research", color: "zine-coral" },
    { id: 2, title: "Github Repo", url: "https://github.com", category: "Code", color: "zinc-800" },
    { id: 3, title: "Canva Design", url: "https://canva.com", category: "Creative", color: "zinc-800" },
    { id: 4, title: "Stack Overflow", url: "https://stackoverflow.com", category: "Code", color: "zinc-800" },
    { id: 5, title: "Figma Artboard", url: "https://figma.com", category: "Creative", color: "zine-coral" },
    { id: 6, title: "Project Board", url: "https://trello.com", category: "Misc", color: "zinc-800" },
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end border-b-8 border-zine-coral pb-4">
        <h2 className="text-8xl text-zinc-100 italic drop-shadow-[4px_4px_0px_#FF6B35]">DATA_LINKS</h2>
        <div className="bg-zine-coral text-zinc-950 font-bebas px-4 py-2 text-2xl rotate-2">
           STORAGE: CLOUD_LOCAL
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`zine-card h-48 flex flex-col justify-between group transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_#000] ${
              link.color === 'zine-coral' ? 'bg-zine-coral text-zinc-950' : 'bg-zine-green text-zinc-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-black/20 flex items-center justify-center font-bebas text-2xl">
                 #0{link.id}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] border border-current px-2 py-0.5">
                {link.category}
              </span>
            </div>
            
            <div>
              <h3 className="text-3xl leading-none font-bebas truncate">{link.title}</h3>
              <p className="text-[10px] opacity-60 truncate mt-1 lowercase font-mono">{link.url}</p>
            </div>

            {/* Decorative Link Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-150 group-hover:opacity-20 transition-opacity">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
               </svg>
            </div>
          </a>
        ))}

        <button className="zine-card h-48 border-dashed border-zine-coral bg-transparent flex flex-col items-center justify-center gap-4 hover:bg-zine-coral/10 transition-colors group">
           <div className="w-16 h-16 border-4 border-zine-coral flex items-center justify-center font-zine text-5xl text-zine-coral group-hover:scale-110 transition-transform">
              +
           </div>
           <span className="font-bebas text-3xl text-zine-coral">NEW_BOOKMARK</span>
        </button>
      </div>

      <div className="mt-20 zine-card bg-zinc-950 flex flex-wrap gap-4 items-center">
         <span className="font-bebas text-2xl text-zine-coral mr-4">FILTER_BY:</span>
         {['ALL', 'RESEARCH', 'CODE', 'CREATIVE', 'MISC'].map((cat) => (
           <button key={cat} className="hover:underline font-bold text-xs tracking-widest uppercase">
              {cat} (0{cat === 'ALL' ? '6' : '1'})
           </button>
         ))}
      </div>
    </div>
  );
}
