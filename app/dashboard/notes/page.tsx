"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import ZineDrawer from '@/components/dashboard/ZineDrawer';
import { useAnnotations, Annotation } from "@/hooks/useAnnotations";
import AnnotatedContent from "@/components/AnnotatedContent";
import AnnotationToolbar, { AnnotationMode, HIGHLIGHT_COLORS } from "@/components/AnnotationToolbar";

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

type LocalAnnotation = Annotation & { _pending?: "create" | "delete" };

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [mode, setMode] = useState<AnnotationMode>("none");
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [local, setLocal] = useState<LocalAnnotation[]>([]);
  const [saving, setSaving] = useState(false);

  const { annotations: saved, refetch } = useAnnotations({
    sourceId: selectedNote?._id ?? null,
    sourceType: "note",
  });

    useEffect(() => {
    setLocal(saved.map((a) => ({ ...a })));
  }, [saved]);

  const hasUnsaved = local.some((a) => a._pending);
  const visible = local.filter((a) => a._pending !== "delete");

  //tool selection
   const selectColor = (color: string) => {
    setActiveColor(color);
    setMode("highlight");
  };

  const selectErase = () => {
    setActiveColor(null);
    setMode("erase");
  };

  const deactivate = () => {
    setActiveColor(null);
    setMode("none");
  };

  //highlight 
    const handleHighlight = useCallback((p: {
    startOffset: number; endOffset: number; highlightedText: string; color: string;
  }) => {
    if (!selectedNote) return;
    const tmp: LocalAnnotation = {
      _id: `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      sourceId: selectedNote._id,
      sourceType: "note",
      startOffset: p.startOffset,
      endOffset: p.endOffset,
      highlightedText: p.highlightedText,
      color: p.color,
      createdAt: new Date().toISOString(),
      _pending: "create",
    };
    setLocal(prev => [...prev, tmp].sort((a, b) => a.startOffset - b.startOffset));
  }, [selectedNote]);

  const handleErase = useCallback((id: string) => {
    setLocal((prev) =>
      prev
        .map((a) => (a._id === id ? { ...a, _pending: "delete" as const } : a))
        // if it was a temp create that never got saved, just drop it
        .filter((a) => !(a._pending === "delete" && a._id.startsWith("tmp_")))
    );
  }, []);

  const handleSave = async () => {
    if (!selectedNote || saving) return;
    setSaving(true);
    try {
      const toCreate = local.filter((a) => a._pending === "create");
      const toDelete = local.filter((a) => a._pending === "delete" && !a._id.startsWith("tmp_"));

      await Promise.all([
        ...toCreate.map((a) =>
          apiFetch("/annotations", {
            method: "POST",
            body: JSON.stringify({
              sourceId: a.sourceId,
              sourceType: a.sourceType,
              startOffset: a.startOffset,
              endOffset: a.endOffset,
              highlightedText: a.highlightedText,
              color: a.color,
            }),
          })
        ),
        ...toDelete.map((a) =>
          apiFetch(`/annotations/${a._id}`, { method: "DELETE" })
        ),
      ]);

      await refetch(); // re-fetch real IDs from DB, clears _pending flags
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save highlights. Check the console.");
    } finally {
      setSaving(false);
    }
  };
  


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

  const switchNote = (note: Note) => {
    if (hasUnsaved) {
      if (!window.confirm("You have unsaved highlights. Switch notes and discard them?")) return;
    }
    setSelectedNote(note);
    setMode("none");
    setActiveColor(null);
  };

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

      {/* Page header */}
      <div className="flex justify-between items-center group">
        <div>
          <h2 className="text-7xl text-white font-display font-bold tracking-tighter transition-all group-hover:tracking-normal duration-500 uppercase">
            FRAGMENTS
          </h2>
          <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">
            // VAULT.DIRECTORY
          </p>
        </div>
        <button className="aether-button border-2 border-black" onClick={() => setIsDrawerOpen(true)}>
          + NEW_FRAGMENT
        </button>
      </div>

      {/* Create note drawer */}
      <ZineDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="ENCODE_FRAGMENT">
        <form onSubmit={handleCreateNote} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
              FRAGMENT_LABEL
            </label>
            <input
              type="text" required
              value={newNote.title}
              onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              className="aether-input border-zinc-800"
              placeholder="IDENTIFIER..."
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
              CONTENT_STREAM
            </label>
            <textarea
              required
              value={newNote.content}
              onChange={e => setNewNote({ ...newNote, content: e.target.value })}
              className="aether-input h-80 resize-none border-zinc-800"
              placeholder="BEGIN_TRANSMISSION..."
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="aether-button mt-4 h-16 text-xl tracking-[0.2em]">
            {isSubmitting ? "SYNCING..." : "COMMIT_FRAGMENT"}
          </button>
        </form>
      </ZineDrawer>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">

        {/* Left: note list */}
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[75vh] pr-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center opacity-20 text-white">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-zine-coral rounded-full animate-spin mb-4" />
              <p className="font-display text-xs uppercase tracking-[0.4em]">Retrieving_Fragments...</p>
            </div>
          ) : notes.length > 0 ? notes.map(note => (
            <div
              key={note._id}
              onClick={() => switchNote(note)}
              className={`aether-card p-10 group cursor-pointer border-l-8 transition-all duration-300 overflow-hidden ${
                selectedNote?._id === note._id
                  ? "border-zine-coral bg-zinc-900 shadow-[12px_12px_0px_var(--zine-coral)]"
                  : "border-zinc-800 grayscale hover:grayscale-0"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-display font-black text-zinc-400 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  {new Date(note.updatedAt).toLocaleDateString()} // OFFSET_01
                </span>
                <div className={`w-3 h-3 rounded-full ${selectedNote?._id === note._id ? "bg-zine-coral animate-pulse" : "bg-zinc-800"}`} />
              </div>
              <h3 className="text-3xl mb-3 font-display font-black group-hover:text-zine-coral transition-colors break-words line-clamp-1 tracking-tighter text-white uppercase">
                {note.title || "UNTITLED_NODE"}
              </h3>
              <p className="text-zinc-400 font-sans text-sm line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tight">
                {note.content || "NO_BODY_CONTENT_DETECTED..."}
              </p>
            </div>
          )) : (
            <div className="aether-card border-dashed border-zinc-700 opacity-30 p-20 text-center">
              <p className="font-display text-xs uppercase tracking-[0.4em]">VAULT_EMPTY // NO_RECORDS_DETECTED</p>
            </div>
          )}
        </div>

        {/* Right: note viewer */}
       {/* Right: note viewer */}
<div className="aether-card min-h-[600px] flex flex-col sticky top-4 bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl relative">
  {selectedNote ? (
    <>
      {/* Doc header */}
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80 backdrop-blur-md flex-shrink-0">
        <span className="font-display text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">
          FRAGMENT_VIEWER // ID: {selectedNote._id.slice(-6)}
        </span>
        <div className="flex gap-6">
          <button className="text-[10px] font-bold text-zinc-400 hover:text-zine-coral hover:underline transition-all uppercase tracking-widest">Edit</button>
          <button className="text-[10px] font-bold text-zinc-400 hover:text-red-500 hover:underline transition-all uppercase tracking-widest">Delete</button>
        </div>
      </div>

      {/* Annotation toolbar */}
      <AnnotationToolbar
        mode={mode}
        activeColor={activeColor}
        onSelectColor={selectColor}
        onSelectErase={selectErase}
        onDeactivate={deactivate}
        onSave={handleSave}
        isSaving={saving}
        hasUnsaved={hasUnsaved}
        count={visible.length}
      />

      {/* Mode hint banner */}
      {mode !== "none" && (
        <div className={`flex-shrink-0 px-4 py-2 text-[8px] font-mono font-bold uppercase tracking-[0.25em] border-b ${
          mode === "highlight"
            ? "bg-amber-950/40 border-amber-900/50 text-amber-400"
            : "bg-red-950/40 border-red-900/50 text-red-400"
        }`}>
          {mode === "highlight"
            ? `● ${HIGHLIGHT_COLORS.find(c => c.value === activeColor)?.name ?? ""} pen — select any text`
            : "● Eraser — hover a highlight then click to remove"}
        </div>
      )}

      {/* Scrollable content with highlights */}
      <div className="p-12 font-sans flex-1 overflow-y-auto relative z-10">
        <h1 className="text-5xl font-display font-black mb-8 text-white uppercase tracking-tighter leading-none border-b border-zinc-800 pb-6">
          {selectedNote?.title || "UNTITLED"}
        </h1>

        <AnnotatedContent
          content={selectedNote?.content}
          annotations={visible}
          activeColor={activeColor}
          isEraseMode={mode === "erase"}
          onHighlight={handleHighlight}
          onErase={handleErase}
          // Changed text color to a readable light gray
          className="text-xl leading-relaxed text-zinc-300 font-light" 
        />

        <div className="mt-20 pt-12 border-t border-zinc-800 flex justify-between items-center">
          <span className="text-[9px] font-display text-zinc-600 uppercase tracking-[0.5em] font-bold italic">-- DATA_END: SECURED --</span>
          <div className="w-16 h-px bg-zinc-800" />
        </div>
      </div>
    </>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20">
      <div className="text-[10rem] font-display font-black leading-none select-none text-zinc-700">NULL</div>
      <p className="font-display text-xs tracking-[0.5em] uppercase mt-4 font-bold text-zinc-400">Select_A_Node_To_View</p>
    </div>
  )}
  {/* Optional: Kept the texture, but lowered opacity so it doesn't wash out the dark background */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
</div>
      </div>
    </div>
  );
}
