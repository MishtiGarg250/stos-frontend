"use client";
import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '@/lib/api';
import ZineDrawer from '@/components/dashboard/ZineDrawer';

type DocumentItem = {
  _id: string;
  name: string;
  url?: string;
  secureUrl?: string;
  type?: string;
  isProcessed?: boolean;
  processingError?: string | null;
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeChatDoc, setActiveChatDoc] = useState<DocumentItem | null>(null);
  const [chatQuery, setChatQuery] = useState('');
  const [chatAnswer, setChatAnswer] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      setFetchError('');
      const data = await apiFetch('/documents');
      const nextDocs: DocumentItem[] = Array.isArray(data) ? data : [];
      setDocs(nextDocs);
      setActiveChatDoc((current: DocumentItem | null) =>
        current ? nextDocs.find((doc) => doc._id === current._id) ?? null : null
      );
    } catch (err) {
      console.error("Fetch Error:", err);
      setDocs([]);
      setActiveChatDoc(null);
      setFetchError(err instanceof Error ? err.message : 'FAILED_TO_LOAD_DOCUMENTS');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFetchError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await apiFetch('/documents/upload', {
        method: 'POST',
        body: formData,
        headers: {},
      });
      setIsDrawerOpen(false);
      fetchDocs();
    } catch (err) {
      console.error("Upload Error:", err);
      setFetchError(err instanceof Error ? err.message : 'UPLOAD_FAILED');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim() || !activeChatDoc) return;

    setIsChatting(true);
    try {
      const data = await apiFetch(`/search/chat/${activeChatDoc._id}`, {
        method: 'POST',
        body: JSON.stringify({ query: chatQuery }),
      });
      setChatAnswer(typeof data?.answer === 'string' ? data.answer : 'NO_RESPONSE_RECEIVED');
    } catch (err) {
      setChatAnswer(err instanceof Error ? err.message : 'SYSTEM_ERROR: LVM_UPLINK_OFFLINE');
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center group">
        <div>
          <h2 className="text-7xl text-white font-display font-black tracking-tighter transition-all group-hover:tracking-normal duration-500 uppercase italic">ARTIFACTS</h2>
          <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">ENCRYPTED_STORAGE.FS</p>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          disabled={isUploading}
          className="aether-button border-2 border-black"
        >
           <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
           </svg>
           {isUploading ? 'SYNCING...' : 'UPLOAD_ARTIFACT'}
        </button>
      </div>

      <ZineDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="UPLINK_PROTOCOL"
      >
        <div className="flex flex-col gap-12">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aether-card border-none bg-zinc-900 p-24 flex flex-col items-center justify-center gap-8 cursor-pointer hover:bg-zinc-800 hover:border-zine-coral border-2 border-dashed border-zinc-700 transition-all group"
          >
             <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zine-coral group-hover:text-zinc-950 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                   <path d="M12 5v14M5 12h14"/>
                </svg>
             </div>
             <div className="text-center">
                <p className="font-display text-2xl font-black tracking-tight uppercase">SELECT_DATA_SOURCE</p>
                <p className="font-display text-[9px] text-zinc-500 mt-3 uppercase tracking-widest font-bold font-bold">PDF, TXT, OR IMAGE // SIZE_LIMIT: 10MB</p>
             </div>
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                className="hidden" 
                accept=".pdf,.txt,.jpg,.png"
              />
          </div>

          {isUploading && (
            <div className="aether-card bg-zine-coral/10 border-zine-coral p-8">
               <div className="flex justify-between items-center mb-4">
                  <p className="font-display text-[10px] text-zine-coral font-bold uppercase tracking-widest italic animate-pulse">Transmitting_Packets...</p>
               </div>
               <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-zine-coral w-1/3 animate-[slide_1.5s_infinite_linear]" />
               </div>
            </div>
          )}

          <div className="bg-zinc-900/50 p-8 border border-zinc-800 font-display text-[9px] text-zinc-500 leading-loose uppercase tracking-widest font-bold">
            NOTE: All artifacts are indexed using 1536-dimensional vector embeddings to enable semantic retrieval and AI analysis.
          </div>
        </div>
      </ZineDrawer>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Modern Data Table */}
        <div className={`aether-card flex flex-col gap-0 p-0 border-zinc-800 ${activeChatDoc ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="grid grid-cols-12 bg-zinc-900 text-zinc-500 font-display text-[10px] font-black tracking-[0.3em] p-6 border-b border-zinc-800 uppercase">
            <div className="col-span-6">Identifier</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3 text-right">Operation</div>
          </div>

          <div className="flex flex-col">
            {fetchError ? (
              <div className="p-20 text-center font-display text-sm text-zinc-500 italic uppercase tracking-widest">
                {fetchError}
              </div>
            ) : docs.length === 0 ? (
              <div className="p-32 text-center font-display text-xs text-zinc-700 uppercase tracking-[0.5em] italic font-bold">Empty_Data_Node</div>
            ) : docs.map((doc) => (
              <div 
                key={doc._id} 
                className={`grid grid-cols-12 items-center p-8 border-b border-zinc-900 hover:bg-zinc-900/50 transition-all cursor-pointer group ${activeChatDoc?._id === doc._id ? 'bg-zinc-900 border-l-8 border-zine-coral' : 'border-l-8 border-transparent'}`}
                onClick={() => setActiveChatDoc(doc)}
              >
                <div className="col-span-6 flex items-center gap-6">
                  <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center text-[8px] font-black group-hover:bg-zine-coral group-hover:text-zinc-950 transition-all uppercase">
                     {doc.type?.split('/')[1]?.slice(0,3) || '??'}
                  </div>
                  <span className="font-display font-black text-sm truncate max-w-full text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">{doc.name}</span>
                </div>
                <div className="col-span-3 font-display text-[10px] font-black uppercase tracking-widest">
                   <span className={doc.isProcessed ? 'text-zinc-700' : doc.processingError ? 'text-red-500' : 'text-zine-coral animate-pulse'}>
                      {doc.isProcessed ? 'Indexed' : doc.processingError ? 'Upload_Only' : 'Processing...'}
                   </span>
                </div>
                <div className="col-span-3 text-right">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      const docUrl = doc.secureUrl || doc.url;
                      if (docUrl) window.open(docUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="font-display text-[10px] font-black text-zinc-500 group-hover:text-zine-coral transition-colors uppercase tracking-[0.2em]"
                  >
                    Open_Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis Portal */}
        {activeChatDoc && (
          <div className="lg:col-span-5 aether-card border-zine-coral bg-zine-paper text-zinc-950 flex flex-col min-h-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
             <div className="p-6 bg-zinc-900 text-white flex justify-between items-center border-b-4 border-zinc-100">
                <span className="font-display text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em] truncate max-w-[200px]">Node Analysis: {activeChatDoc.name}</span>
                <button onClick={() => {setActiveChatDoc(null); setChatAnswer('');}} className="text-zinc-500 hover:text-zine-coral transition-colors font-black">X</button>
             </div>
             
             <div className="flex-1 p-10 overflow-y-auto max-h-[400px] relative">
                {chatAnswer ? (
                  <div className="flex flex-col gap-6">
                     <p className="font-display text-[9px] font-black text-zine-coral uppercase tracking-widest italic animate-aether-pulse">AI_Response_Buffer:</p>
                     <p className="font-sans text-lg leading-relaxed text-zinc-800 font-bold opacity-90 italic">{chatAnswer}</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-10 py-20 grayscale">
                     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-6">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                     </svg>
                     <p className="font-display text-xs tracking-[0.5em] uppercase font-bold">Initialize_Query_Stream</p>
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
             </div>

             <form onSubmit={handleChat} className="p-8 border-t-4 border-zinc-900 bg-zinc-100">
                <textarea 
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="Ask_document_specific_query..."
                  className="aether-input h-24 mb-6 text-sm placeholder:opacity-30 border-zinc-300 text-zinc-900 focus:border-zine-coral"
                />
                <button 
                  type="submit" 
                  disabled={isChatting}
                  className="aether-button w-full h-16 text-xl tracking-[0.2em] shadow-none hover:bg-zinc-900 hover:text-white"
                >
                  {isChatting ? 'Computing...' : 'EXECUTE_QUERY'}
                </button>
             </form>
          </div>
        )}
      </div>
    </div>
  );
}
