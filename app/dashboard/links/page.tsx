"use client";
import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import ZineDrawer from '@/components/dashboard/ZineDrawer';

interface Link {
  _id: string;
  title: string;
  url: string;
  category?: string;
  createdAt: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', category: 'General' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLinks = async () => {
    try {
      const data = await apiFetch("/links");
      setLinks(data || []);
    } catch (err) {
      console.error("Failed to fetch links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.url.trim()) return;

    setIsSubmitting(true);
    try {
      await apiFetch('/links', {
        method: 'POST',
        body: JSON.stringify(newLink),
      });
      setNewLink({ title: '', url: '', category: 'General' });
      setIsDrawerOpen(false);
      fetchLinks();
    } catch (err) {
      console.error("Create Link Error:", err);
      alert("SYSTEM_SYNC_ERROR: UNABLE_TO_LOG_LINK");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center group">
        <div>
          <h2 className="text-7xl text-white font-display font-black tracking-tighter transition-all group-hover:tracking-normal duration-500 uppercase italic">RESOURCES</h2>
          <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">// EXTERNAL_LINK.REGISTRY</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end opacity-20">
             <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-white">{links.length} ACTIVE_NODES</span>
             <div className="w-16 h-1 bg-zine-coral mt-1" />
          </div>
          <button 
            className="aether-button border-2 border-black"
            onClick={() => setIsDrawerOpen(true)}
          >
            + INDEX_RESOURCE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-4">
        {loading ? (
          <div className="col-span-full py-40 flex flex-col items-center opacity-20 text-white">
             <div className="w-12 h-12 border-4 border-zinc-800 border-t-zine-coral rounded-full animate-spin mb-4" />
             <p className="font-display text-xs uppercase tracking-widest italic tracking-[0.4em]">Scanning_Remote_Nodes...</p>
          </div>
        ) : links.length > 0 ? (
          links.map((link, index) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`aether-card p-10 min-h-[240px] flex flex-col justify-between group transition-all duration-300 ${index % 3 === 0 ? 'bg-zine-green border-black' : 'bg-zinc-950 border-zinc-800'}`}
            >
              <div className={`flex justify-between items-start ${index % 3 === 0 ? 'text-zinc-950' : 'text-zinc-500 group-hover:text-zine-coral'}`}>
                <span className="text-xl font-display font-black uppercase tracking-widest italic">#{String(index + 1).padStart(2, '0')}</span>
                <span className={`text-[9px] font-display font-black uppercase tracking-[0.2em] border px-2 py-0.5 rounded ${index % 3 === 0 ? 'border-zinc-950' : 'border-zinc-800'}`}>
                  {link.category || "GENERAL"}
                </span>
              </div>
              
              <div className="relative z-10 w-full overflow-hidden">
                <h3 className={`text-3xl font-display font-black leading-tight tracking-tighter transition-colors break-words line-clamp-2 ${index % 3 === 0 ? 'text-zinc-950' : 'text-white'}`}>
                  {link.title || link.url}
                </h3>
                <p className={`text-[10px] truncate mt-4 font-display font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity ${index % 3 === 0 ? 'text-zinc-900/60' : 'text-zinc-400'}`}>
                  {link.url}
                </p>
              </div>
              <div className={`absolute bottom-6 right-6 opacity-5 group-hover:opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ${index % 3 === 0 ? 'text-zinc-950' : 'text-zine-coral'}`}>
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                 </svg>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full aether-card border-dashed border-zinc-700 p-32 text-center opacity-20 group hover:opacity-100 transition-opacity">
             <p className="font-display text-xs uppercase tracking-[0.5em] group-hover:text-zine-coral transition-colors font-bold">OUTPOST_SILENT // NO_DATA_LINKS_DETECTED</p>
          </div>
        )}
      </div>

      <ZineDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="INDEX_DATA_NODE"
      >
        <form onSubmit={handleCreateLink} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">RESOURCE_LABEL</label>
            <input 
              type="text" 
              required
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="aether-input border-zinc-800"
              placeholder="E.G. CENTRAL_ARCHIVE"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">SOURCE_UPLINK (URL)</label>
            <input 
              type="url" 
              required
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="aether-input border-zinc-800"
              placeholder="https://..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">NODE_CLASSIFICATION</label>
            <select 
              value={newLink.category}
              onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
              className="aether-input border-zinc-800 appearance-none cursor-pointer"
            >
               <option value="General">GENERAL_ACCESS</option>
               <option value="Academic">ACADEMIC_LOG</option>
               <option value="Finance">FINANCIAL_CORE</option>
               <option value="Personal">PRIVATE_FILE</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="aether-button mt-4 h-16 text-xl tracking-[0.2em]"
          >
            {isSubmitting ? 'SYNCING...' : 'ESTABLISH_LINK'}
          </button>
        </form>
      </ZineDrawer>

      <div className="mt-24 aether-card border-none bg-zinc-900/50 p-10 flex flex-wrap gap-8 items-center border-t border-zinc-800 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
         <span className="font-display text-sm font-black text-zine-coral tracking-widest uppercase italic">// PROTOCOL_NOTICE:</span>
         <span className="font-sans text-[10px] uppercase font-bold opacity-50 tracking-[0.2em] max-w-2xl leading-relaxed text-white">All external resource links are proxied through AETHER secure routing nodes to ensure data sovereignity and complete privacy from third-party tracking algorithms.</span>
      </div>
    </div>
  );
}
