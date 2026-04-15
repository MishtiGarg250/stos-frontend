"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function DocumentsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeChatDoc, setActiveChatDoc] = useState<any>(null);
  const [chatQuery, setChatQuery] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await fetch('http://localhost:5000/documents');
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/documents/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchDocs();
      }
    } catch (err) {
      console.error("Upload Error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim() || !activeChatDoc) return;

    setIsChatting(true);
    try {
      const res = await fetch(`http://localhost:5000/search/chat/${activeChatDoc._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: chatQuery }),
      });
      const data = await res.json();
      setChatAnswer(data.answer);
    } catch (err) {
      setChatAnswer('SYSTEM_ERROR: LVM_UPLINK_OFFLINE');
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center zine-card bg-zinc-950 border-r-8">
        <div>
          <h2 className="text-8xl text-zine-coral">DOC_FILE</h2>
          <p className="font-bebas text-2xl tracking-[0.4em] opacity-40">SYSTEM_DIRECTORY: /USER/DOCS</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept=".pdf,.txt,.jpg,.png"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="zine-button h-24 w-64 flex items-center justify-center gap-4"
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
           </svg>
           {isUploading ? 'SYNCING...' : 'UPLOAD_RAW'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Area */}
        <div className={`zine-card flex flex-col gap-0 p-0 overflow-hidden ${activeChatDoc ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="grid grid-cols-12 bg-zine-green text-zine-coral font-bebas text-2xl p-4 border-b-4 border-zine-coral">
            <div className="col-span-6">FILE_NAME</div>
            <div className="col-span-3">STATUS</div>
            <div className="col-span-3 text-right">ACTION</div>
          </div>

          <div className="flex flex-col bg-zinc-900/50">
            {docs.length === 0 ? (
              <div className="p-12 text-center font-bebas text-2xl opacity-20 italic">EMPTY_STORAGE_NODE</div>
            ) : docs.map((doc, idx) => (
              <div 
                key={doc._id} 
                className={`grid grid-cols-12 items-center p-6 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all cursor-pointer group ${activeChatDoc?._id === doc._id ? 'bg-zinc-800/80 border-l-8 border-zine-coral' : ''}`}
                onClick={() => setActiveChatDoc(doc)}
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-8 h-8 bg-zinc-700 flex items-center justify-center font-bold text-[10px] group-hover:bg-zine-coral group-hover:text-zinc-950 transition-colors uppercase">
                     {doc.type?.split('/')[1] || '??'}
                  </div>
                  <span className="font-mono font-bold truncate max-w-full">{doc.name}</span>
                </div>
                <div className="col-span-3 font-bebas text-xl opacity-60">
                   {doc.isProcessed ? 'SYNCED' : 'PROCESSING...'}
                </div>
                <div className="col-span-3 text-right">
                  <button className="font-bebas text-xl text-zine-coral hover:underline">START_CHAT</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focused Chat Area */}
        {activeChatDoc && (
          <div className="lg:col-span-5 zine-card bg-zine-paper text-zinc-950 border-8 border-zine-coral min-h-150 flex flex-col relative animate-in slide-in-from-right-8 duration-500">
             <div className="p-4 bg-zinc-950 text-white flex justify-between items-center">
                <span className="font-bebas text-2xl tracking-widest truncate max-w-50">SOURCE: {activeChatDoc.name}</span>
                <button onClick={() => {setActiveChatDoc(null); setChatAnswer('');}} className="text-zine-coral font-bold">[X]</button>
             </div>
             
             <div className="flex-1 p-8 overflow-y-auto max-h-100">
                {chatAnswer ? (
                  <div className="flex flex-col gap-4">
                     <p className="font-mono font-bold text-zinc-500 text-xs">AI_RESPONSE:</p>
                     <p className="font-mono text-lg whitespace-pre-wrap leading-relaxed">{chatAnswer}</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                     <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                     </svg>
                     <p className="font-bebas text-2xl">INITIALIZE_QUERY_UPLINK</p>
                  </div>
                )}
             </div>

             <form onSubmit={handleChat} className="p-4 border-t-4 border-zinc-950 bg-zinc-100">
                <textarea 
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="ASK_SPECIFIC_QUESTION..."
                  className="w-full bg-white border-2 border-zinc-300 p-4 font-mono focus:border-zine-coral focus:outline-none h-24 mb-4"
                />
                <button 
                  type="submit" 
                  disabled={isChatting}
                  className="zine-button w-full h-16 text-3xl"
                >
                  {isChatting ? 'THINKING...' : 'SEND_QUERY'}
                </button>
             </form>
             
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
          </div>
        )}
      </div>
    </div>
  );
}
