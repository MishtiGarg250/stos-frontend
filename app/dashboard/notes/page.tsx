"use client";
import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import ZineDrawer from '@/components/dashboard/ZineDrawer';

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await apiFetch("/notes");
      setNotes(data || []);
      if (data && data.length > 0 && !selectedNote) {
        setSelectedNote(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;

    setIsSubmitting(true);
    try {
      await apiFetch('/notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
      });
      setNewNote({ title: '', content: '' });
      setIsDrawerOpen(false);
      fetchNotes();
    } catch (err) {
      console.error("Create Note Error:", err);
      alert("SYSTEM_SYNC_ERROR: UNABLE_TO_LOG_NOTE");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center group">
        <div>
          <h2 className="text-7xl text-white font-display font-bold tracking-tighter transition-all group-hover:tracking-normal duration-500 uppercase">FRAGMENTS</h2>
          <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">// VAULT.DIRECTORY</p>
        </div>
        <button 
          className="aether-button border-2 border-black"
          onClick={() => setIsDrawerOpen(true)}
        >
          + NEW_FRAGMENT
        </button>
      </div>

      <ZineDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="ENCODE_FRAGMENT"
      >
        <form onSubmit={handleCreateNote} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">FRAGMENT_LABEL</label>
            <input 
              type="text" 
              required
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="aether-input border-zinc-800"
              placeholder="IDENTIFIER..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">CONTENT_STREAM</label>
            <textarea 
              required
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="aether-input h-80 resize-none border-zinc-800"
              placeholder="BEGIN_TRANSMISSION..."
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="aether-button mt-4 h-16 text-xl tracking-[0.2em]"
          >
            {isSubmitting ? 'SYNCING...' : 'COMMIT_FRAGMENT'}
          </button>
        </form>
      </ZineDrawer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">
        {/* Notes List */}
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[75vh] pr-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center opacity-20 text-white">
               <div className="w-12 h-12 border-4 border-zinc-800 border-t-zine-coral rounded-full animate-spin mb-4" />
               <p className="font-display text-xs uppercase tracking-widest italic tracking-[0.4em]">Retrieving_Fragments...</p>
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div 
                key={note._id} 
                onClick={() => setSelectedNote(note)}
                className={`aether-card p-10 group cursor-pointer border-l-8 transition-all duration-300 overflow-hidden ${selectedNote?._id === note._id ? 'border-zine-coral bg-zinc-900 shadow-[12px_12px_0px_var(--zine-coral)]' : 'border-zinc-800 grayscale hover:grayscale-0'}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-display font-black text-zinc-400 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                    {new Date(note.updatedAt).toLocaleDateString()} // OFFSET_01
                  </span>
                  <div className={`w-3 h-3 rounded-full ${selectedNote?._id === note._id ? 'bg-zine-coral animate-pulse' : 'bg-zinc-800'}`} />
                </div>
                <h3 className="text-3xl mb-3 font-display font-black group-hover:text-zine-coral transition-colors break-words line-clamp-1 tracking-tighter text-white uppercase">{note.title || "UNTITLED_NODE"}</h3>
                <p className="text-zinc-400 font-sans text-sm line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tight">
                  {note.content || "NO_BODY_CONTENT_DETECTED..."}
                </p>
              </div>
            ))
          ) : (
            <div className="aether-card border-dashed border-zinc-700 opacity-30 p-20 text-center">
               <p className="font-display text-xs uppercase tracking-[0.4em]">VAULT_EMPTY // NO_RECORDS_DETECTED</p>
            </div>
          )}
        </div>

        {/* Note Viewer */}
        <div className="aether-card min-h-[600px] flex flex-col sticky top-4 bg-zine-paper text-zinc-950 border-8 border-dashed border-zinc-300">
           {selectedNote ? (
             <>
               <div className="p-8 border-b-4 border-zinc-200 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                  <span className="font-display text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">FRAGMENT_VIEWER // ID: {selectedNote._id.slice(-6)}</span>
                  <div className="flex gap-6">
                     <button className="text-[10px] font-bold text-zinc-600 hover:text-zine-coral hover:underline transition-all uppercase tracking-widest">Edit</button>
                     <button className="text-[10px] font-bold text-zinc-600 hover:text-red-600 hover:underline transition-all uppercase tracking-widest">Delete</button>
                  </div>
               </div>
               
               <div className="p-12 font-sans flex-1 overflow-y-auto relative">
                  <h1 className="text-5xl font-display font-black mb-8 text-zinc-900 uppercase tracking-tighter leading-none border-b-8 border-zinc-900/10 pb-4">
                     {selectedNote.title || "UNTITLED"}
                  </h1>
                  <p className="text-xl leading-relaxed whitespace-pre-wrap text-zinc-800 font-medium">
                     {selectedNote.content}
                  </p>
                  
                  <div className="mt-20 pt-12 border-t-2 border-zinc-200 flex justify-between items-center">
                     <span className="text-[9px] font-display text-zinc-400 uppercase tracking-[0.5em] font-bold italic">-- DATA_END: SECURED --</span>
                     <div className="w-16 h-1 bg-zinc-900/10" />
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-10 grayscale">
                <div className="text-[12rem] font-display font-black leading-none select-none text-zinc-900">NULL</div>
                <p className="font-display text-xs tracking-[0.5em] uppercase -mt-4 font-bold">Select_A_Node_To_View</p>
             </div>
           )}
           
           <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
        </div>
      </div>
    </div>
  );
}
