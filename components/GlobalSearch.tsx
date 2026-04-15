"use client";
import React, { useState } from 'react';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAnswer('');
    
    try {
      const res = await fetch('http://localhost:5000/search/global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      const data = await res.json();
      setAnswer(data.answer);
      setSources(data.context || []);
    } catch (err) {
      setAnswer('SYSTEM_ERROR: LVM_UPLINK_OFFLINE');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 relative z-50">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1 zine-card p-0 overflow-hidden border-4 border-zinc-100 bg-zinc-950">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SYSTEM_QUERY: ASK_ANYTHING_ACROSS_DOCS..."
            className="w-full bg-transparent p-4 text-2xl font-bebas tracking-widest text-zinc-100 focus:outline-none placeholder:opacity-30"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSearching}
          className="zine-button h-full px-8 text-3xl flex items-center justify-center min-w-[150px]"
        >
          {isSearching ? '...' : 'QUERY'}
        </button>
      </form>

      {/* Results HUD */}
      {(answer || isSearching) && (
        <div className="mt-6 zine-card bg-zinc-950 border-double border-4 border-zine-coral p-8 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex justify-between border-b-2 border-zinc-800 pb-2 mb-6">
              <span className="font-bebas text-xl text-zine-coral">RESPONSE_LOG // DATA_RETRIEVED</span>
              <button 
                onClick={() => {setAnswer(''); setQuery('');}}
                className="text-xs hover:underline uppercase font-bold"
              >
                [CLOSE_TERMINAL]
              </button>
           </div>
           
           {isSearching ? (
             <div className="font-mono text-xs animate-pulse text-zinc-500">
                INITIATING SEMANTIC SEARCH...
                VECTOR_SYNC_V4.03...
                COMPILING CONTEXT FROM NODES...
             </div>
           ) : (
             <div className="flex flex-col gap-8">
                <p className="text-xl font-medium leading-relaxed font-mono whitespace-pre-wrap">
                   {answer}
                </p>
                
                {sources.length > 0 && (
                  <div className="flex flex-col gap-3">
                     <span className="font-bebas text-lg opacity-40">RELEVANT_FRAGMENTS:</span>
                     <div className="flex flex-wrap gap-2">
                        {sources.map((s, i) => (
                           <div key={i} className="text-[10px] bg-zinc-900 border border-zinc-700 px-2 py-1 font-mono uppercase truncate max-w-[200px]">
                              {s.text.slice(0, 50)}...
                           </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>
           )}
        </div>
      )}
    </div>
  );
}
