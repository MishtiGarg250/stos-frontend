"use client";
import React, { useState } from 'react';

export default function NotesPage() {
  const [notes] = useState([
    { id: 1, title: "CRITICAL_PATH_ALPHA", content: "Implement the backend logic for session management...", date: "2024-04-14" },
    { id: 2, title: "DESIGN_INSPIRATION", content: "Check out 90s punk zines for the sidebar aesthetic.", date: "2024-04-12" },
    { id: 3, title: "LECTURE_NOTES_MATH", content: "The derivative of a constant is always zero.", date: "2024-04-10" },
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <h2 className="text-8xl text-zine-coral drop-shadow-[6px_6px_0px_#000]">NOTES_VAULT</h2>
        <button className="zine-button h-16">+ NEW ENTRY</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">

        <div className="flex flex-col gap-6">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="zine-card group cursor-pointer hover:bg-zinc-900 transition-all border-l-12 -rotate-1 hover:rotate-0"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-zine-coral text-zinc-950 font-bebas px-3 text-xl">{note.date}</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-zinc-800 rounded-full" />
                  <div className="w-3 h-3 bg-zinc-800 rounded-full" />
                </div>
              </div>
              <h3 className="text-3xl mb-2 group-hover:text-zine-coral transition-colors">{note.title}</h3>
              <p className="text-zinc-500 line-clamp-2 font-mono text-sm uppercase tracking-tighter">
                {note.content}
              </p>
              
              <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-100 transition-opacity">
                 <svg width="40" height="40" viewBox="0 0 40 40">
                    <path d="M5 35 L35 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M10 35 L35 10" stroke="currentColor" strokeWidth="1" fill="none" />
                 </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="zine-card bg-zine-paper text-zinc-950 sticky top-12 h-fit min-h-150 border-8 border-dashed border-zinc-400 rotate-1 shadow-2xl">
           <div className="absolute -top-6 -left-6 bg-zine-coral w-12 h-12 flex items-center justify-center font-bebas text-2xl rotate-12">
              01
           </div>
           
           <div className="p-4 border-b-2 border-zinc-200 flex justify-between">
              <span className="font-bebas text-2xl grayscale opacity-50">VIEWING: ACTIVE_FILE</span>
              <div className="flex gap-4">
                 <button className="text-xs font-bold underline">EDIT</button>
                 <button className="text-xs font-bold underline">SHARE</button>
              </div>
           </div>
           
           <div className="p-8 font-mono">
              <h1 className="text-5xl mb-6 text-zinc-900 border-b-4 border-zinc-900 uppercase leading-none">
                 {notes[0].title}
              </h1>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                 {notes[0].content}
              </p>
              
              <div className="mt-12 p-4 border-2 border-zinc-300 bg-zinc-50 italic text-zinc-500 text-sm">
                 -- EOF: DATA SECURED AT 1024KB --
              </div>
           </div>
           
           {/* Decorative Paper Texture */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      </div>
    </div>
  );
}
