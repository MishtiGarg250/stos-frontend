"use client";

import React from "react";

export type AnnotationMode = "none" | "highlight" | "erase";

export const HIGHLIGHT_COLORS = [
  { name: "Amber",   value: "rgba(251,191,36,0.48)"  },
  { name: "Coral",   value: "rgba(255,79,50,0.40)"   },
  { name: "Emerald", value: "rgba(52,211,153,0.40)"  },
  { name: "Sky",     value: "rgba(56,189,248,0.40)"  },
  { name: "Violet",  value: "rgba(167,139,250,0.44)" },
  { name: "Rose",    value: "rgba(251,113,133,0.44)" },
];

interface Props {
  mode: AnnotationMode;
  activeColor: string | null;
  onSelectColor: (color: string) => void;
  onSelectErase: () => void;
  onDeactivate: () => void;
  onSave: () => void;
  isSaving: boolean;
  hasUnsaved: boolean;
  count: number;
}

export default function AnnotationToolbar({
  mode, activeColor,
  onSelectColor, onSelectErase, onDeactivate,
  onSave, isSaving, hasUnsaved, count,
}: Props) {
  return (
    <div className="flex items-center border-b border-zinc-800 bg-zinc-950 select-none overflow-x-auto flex-shrink-0">

      {/* Status dot + label */}
      <div className="flex items-center gap-2 px-3 py-2 border-r border-zinc-800 flex-shrink-0">
        <div
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor:
              mode === "highlight" && activeColor ? activeColor.replace(/[\d.]+\)$/, "1)")
              : mode === "erase" ? "rgb(239,68,68)"
              : "rgb(63,63,70)",
            boxShadow: mode !== "none"
              ? `0 0 5px ${mode === "erase" ? "rgba(239,68,68,0.6)" : activeColor?.replace(/[\d.]+\)$/, "0.6)") ?? "transparent"}`
              : "none",
          }}
        />
        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-[0.3em] whitespace-nowrap">
          Annotate
        </span>
      </div>

      {/* Color pen buttons */}
      <div className="flex items-center border-r border-zinc-800">
        {HIGHLIGHT_COLORS.map((c) => {
          const active = mode === "highlight" && activeColor === c.value;
          return (
            <button
              key={c.value}
              title={`${c.name} highlighter — click then select text`}
              onClick={() => active ? onDeactivate() : onSelectColor(c.value)}
              className="relative flex items-center justify-center w-8 h-9 border-r border-zinc-800/50 last:border-r-0 hover:bg-zinc-900 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect
                  x="9" y="2" width="6" height="14" rx="3"
                  fill={c.value.replace(/[\d.]+\)$/, "0.88)")}
                  stroke={active ? "white" : "rgba(255,255,255,0.12)"}
                  strokeWidth={active ? "1.5" : "1"}
                />
                <path
                  d="M10.5 16 L12 22 L13.5 16Z"
                  fill={c.value.replace(/[\d.]+\)$/, "0.88)")}
                  stroke={active ? "white" : "rgba(255,255,255,0.12)"}
                  strokeWidth={active ? "1.5" : "1"}
                  strokeLinejoin="round"
                />
              </svg>
              {active && (
                <span
                  className="absolute inset-0.5 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${c.value.replace(/[\d.]+\)$/, "1)")}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Eraser */}
      <button
        title="Eraser — hover a highlight then click to remove it"
        onClick={() => mode === "erase" ? onDeactivate() : onSelectErase()}
        disabled={count === 0}
        className={`flex items-center justify-center w-8 h-9 border-r border-zinc-800 flex-shrink-0 transition-all ${
          count === 0 ? "opacity-20 cursor-not-allowed"
          : mode === "erase" ? "bg-red-950/50"
          : "hover:bg-zinc-900"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <rect
            x="7" y="9" width="10" height="8" rx="1"
            fill={mode === "erase" ? "rgba(239,68,68,0.22)" : "rgba(255,255,255,0.05)"}
            stroke={mode === "erase" ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.22)"}
            strokeWidth="1.5"
          />
          <path d="M3 17h18" stroke={mode === "erase" ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.22)"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Active mode hint */}
      {mode !== "none" && (
        <span className={`px-3 text-[7.5px] font-mono font-bold uppercase tracking-[0.2em] whitespace-nowrap ${
          mode === "highlight" ? "text-amber-400/70" : "text-red-400/70"
        }`}>
          {mode === "highlight"
            ? `${HIGHLIGHT_COLORS.find(c => c.value === activeColor)?.name ?? ""} pen — select text`
            : "Eraser — click a highlight"}
        </span>
      )}

      <div className="flex-1" />

      {/* Count + Save */}
      <div className="flex items-center gap-2.5 px-3 py-2 border-l border-zinc-800 flex-shrink-0">
        {count > 0 && (
          <span className="text-[8px] font-mono text-zinc-600 whitespace-nowrap">
            <span className="text-zinc-400">{count}</span> {count === 1 ? "highlight" : "highlights"}
          </span>
        )}

        <button
          onClick={onSave}
          disabled={!hasUnsaved || isSaving}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${
            !hasUnsaved ? "border-zinc-800 text-zinc-700 cursor-default"
            : isSaving   ? "border-zinc-700 text-zinc-500 cursor-wait"
            : "border-[var(--zine-coral,#ff4f32)] text-[var(--zine-coral,#ff4f32)] hover:bg-[var(--zine-coral,#ff4f32)] hover:text-zinc-950"
          }`}
        >
          {isSaving ? (
            <>
              <svg className="w-2.5 h-2.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Saving
            </>
          ) : (
            <>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17,21 17,13 7,13 7,21" />
                <polyline points="7,3 7,8 15,8" />
              </svg>
              {hasUnsaved ? "Save" : "Saved"}
            </>
          )}
        </button>

        {hasUnsaved && !isSaving && (
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
            style={{ backgroundColor: "var(--zine-coral, #ff4f32)" }}
            title="Unsaved highlights"
          />
        )}
      </div>
    </div>
  );
}
