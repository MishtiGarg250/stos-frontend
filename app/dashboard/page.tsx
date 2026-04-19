"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/api";

interface Note {
  _id: string;
  title: string;
  updatedAt: string;
}

interface Link {
  _id: string;
  title: string;
  url: string;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [notesData, linksData] = await Promise.all([
          apiFetch("/notes"),
          apiFetch("/links")
        ]);
        setNotes(notesData || []);
        setLinks(linksData || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statsCount = notes.length + links.length;
  const storagePercentage = Math.min(Math.round((statsCount / 100) * 100), 100); // Mocking 100 items limit

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-64 w-full overflow-hidden zine-card flex items-center px-12 group">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 mix-blend-multiply" />
        <div className="relative z-10">
          <h2 className="text-7xl text-zinc-950 stroke-zine-coral drop-shadow-[4px_4px_0px_var(--zine-coral)]">
            WELCOME_BACK
          </h2>
          <p className="font-bebas text-3xl text-zine-coral bg-black px-4 py-1 inline-block -rotate-1 mt-4">
            USER_NODE: {user?.displayName?.toUpperCase() || "IDENTITY_UNKNOWN"} // SESSION_{new Date().getFullYear()}
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="zine-card flex flex-col gap-4 min-h-[300px] border-r-8">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">RECENT_NOTES</h3>
          <div className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[180px]">
            {loading ? (
              <p className="font-mono text-zinc-500 animate-pulse">STATUS: RETRIEVING_DATA...</p>
            ) : notes.length > 0 ? (
              notes.slice(0, 3).map((note) => (
                <div key={note._id} className="bg-zinc-900 p-3 border-l-4 border-zine-coral hover:bg-zinc-800 cursor-pointer transition-colors overflow-hidden">
                  <p className="font-bold break-words line-clamp-1">{note.title || "Untitled Note"}</p>
                  <p className="text-[10px] opacity-60 uppercase mt-1 text-zinc-400">
                    UPDATED: {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-mono text-xs opacity-30 mt-4 italic font-bold">NO_FRAGMENTS_FOUND // START_TYPING</p>
            )}
          </div>
          <a href="/dashboard/notes" className="mt-auto font-bebas text-xl text-zine-coral text-left hover:translate-x-2 transition-transform font-bold tracking-widest">
            VIEW ALL NOTES →
          </a>
        </div>

        <div className="zine-card flex flex-col gap-4 min-h-[300px] bg-zinc-950 border-zinc-900 border-2">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">IMP_LINKS</h3>
          <div className="grid grid-cols-2 gap-4 mt-4 overflow-y-auto max-h-[180px]">
            {loading ? (
              <p className="font-mono text-zinc-500 animate-pulse col-span-2 text-center text-[10px] font-bold">SYNCING_ASSETS...</p>
            ) : links.length > 0 ? (
              links.slice(0, 4).map((link) => (
                <a 
                  key={link._id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="aspect-square bg-zine-green/20 border-2 border-zinc-800 flex flex-col items-center justify-center p-4 hover:border-zine-coral transition-all text-center group overflow-hidden"
                >
                  <div className="w-8 h-8 bg-zinc-800 mb-2 group-hover:bg-zine-coral group-hover:text-zinc-950 flex items-center justify-center transition-all">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                     </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase break-words line-clamp-2 w-full leading-tight text-zinc-300">{link.title || link.url}</span>
                </a>
              ))
            ) : (
              <p className="font-mono text-xs opacity-30 mt-4 col-span-2 text-center">NO_ARTIFACTS_LOGGED</p>
            )}
          </div>
          <a href="/dashboard/links" className="mt-auto font-bebas text-xl text-zinc-950 bg-zine-coral inline-block px-4 py-1 self-start hover:shadow-[4px_4px_0px_white] transition-shadow">
             LOG_NEW_LINK
          </a>
        </div>

        <div className="zine-card flex flex-col gap-4 min-h-[300px] -rotate-1">
          <h3 className="text-4xl border-b-2 border-zinc-700 pb-2">DATA_CORE</h3>
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 border-8 border-zine-green rounded-full flex items-center justify-center">
               <div className="text-center">
                  <span className="text-4xl block font-zine">{storagePercentage}%</span>
                  <span className="text-[10px] uppercase font-bold text-zine-coral">Occupied</span>
               </div>
               <div 
                 className="absolute inset-0 border-t-8 border-zine-coral rounded-full transition-transform duration-1000" 
                 style={{ transform: `rotate(${storagePercentage * 3.6}deg)` }} 
               />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-zinc-500">
               {statsCount} / 100 NODES USED
            </p>
          </div>
        </div>
      </div>
      <footer className="h-32 w-full zine-card flex items-center justify-between px-12 bg-zine-coral text-zinc-950 mt-12 overflow-hidden relative">
         <div className="text-6xl tracking-tighter mix-blend-multiply opacity-20 whitespace-nowrap -translate-x-12 animate-marquee">
           KNOWLEDGE IS POWER • SOURCE THE CODE • EDIT THE FUTURE • KNOWLEDGE IS POWER • SOURCE THE CODE • EDIT THE FUTURE •
         </div>
         <div className="absolute right-12 z-10 flex items-center gap-4">
            <span className="font-bebas text-2xl uppercase">Build v1.0.4-Alpha</span>
            <div className="w-12 h-12 bg-zinc-950" />
         </div>
      </footer>
    </div>
  );
}
