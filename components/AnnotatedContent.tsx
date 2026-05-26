"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Annotation } from "@/hooks/useAnnotations";

interface Segment {
  text: string;
  annotation: Annotation | null;
}

interface Props {
  content: string;
  annotations: Annotation[];
  activeColor: string | null;   // set = highlight mode with this color
  isEraseMode: boolean;
  onHighlight: (p: { startOffset: number; endOffset: number; highlightedText: string; color: string }) => void;
  onErase: (id: string) => void;
  className?: string;
}

// Build span segments from plain text + annotation list
function buildSegments(content: string, annotations: Annotation[]): Segment[] {
  if (!content) return [];
  const byChar: (Annotation | undefined)[] = new Array(content.length).fill(undefined);
  for (const ann of [...annotations].sort((a, b) => a.startOffset - b.startOffset)) {
    for (let i = ann.startOffset; i < Math.min(ann.endOffset, content.length); i++) {
      byChar[i] = ann;
    }
  }
  const segs: Segment[] = [];
  let s = 0;
  for (let i = 1; i <= content.length; i++) {
    const prev = byChar[i - 1];
    const curr = byChar[i];
    if (i === content.length || (prev?._id ?? null) !== (curr?._id ?? null)) {
      segs.push({ text: content.slice(s, i), annotation: prev ?? null });
      s = i;
    }
  }
  return segs;
}

// Convert a DOM (node, offset) pair into an absolute character index
function absOffset(node: Node, off: number, container: HTMLElement): number {
  let n = 0;
  const w = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    if (w.currentNode === node) return n + off;
    n += (w.currentNode.textContent ?? "").length;
  }
  return n;
}

export default function AnnotatedContent({
  content, annotations, activeColor, isEraseMode, onHighlight, onErase, className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isHighlight = !!activeColor;

  // Document-level mouseup so drag-outside-box is still caught
  useEffect(() => {
    if (!isHighlight) return;
    const handler = () => {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !ref.current) return;
        const text = sel.toString();
        if (!text.trim()) return;
        const range = sel.getRangeAt(0);
        if (!ref.current.contains(range.commonAncestorContainer)) return;
        const start = absOffset(range.startContainer, range.startOffset, ref.current);
        const end   = absOffset(range.endContainer,   range.endOffset,   ref.current);
        if (start >= end) return;
        sel.removeAllRanges();
        onHighlight({ startOffset: start, endOffset: end, highlightedText: text, color: activeColor! });
      }, 10);
    };
    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [isHighlight, activeColor, onHighlight]);

  // Erase: find which annotation is under cursor on every mousemove
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isEraseMode || !ref.current) return;
    let charOff: number | null = null;
    if ("caretRangeFromPoint" in document) {
      const r = (document as Document & { caretRangeFromPoint(x: number, y: number): Range | null })
        .caretRangeFromPoint(e.clientX, e.clientY);
      if (r) charOff = absOffset(r.startContainer, r.startOffset, ref.current);
    } else if ("caretPositionFromPoint" in document) {
      const p = (document as Document & { caretPositionFromPoint(x: number, y: number): { offsetNode: Node; offset: number } | null })
        .caretPositionFromPoint(e.clientX, e.clientY);
      if (p) charOff = absOffset(p.offsetNode, p.offset, ref.current);
    }
    if (charOff === null) { setHoveredId(null); return; }
    const hit = annotations.find(a => charOff! >= a.startOffset && charOff! < a.endOffset);
    setHoveredId(hit?._id ?? null);
  }, [isEraseMode, annotations]);

  const onClick = useCallback(() => {
    if (!isEraseMode || !hoveredId) return;
    onErase(hoveredId);
    setHoveredId(null);
  }, [isEraseMode, hoveredId, onErase]);

  useEffect(() => { if (!isEraseMode) setHoveredId(null); }, [isEraseMode]);

  const segs = buildSegments(content, annotations);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onClick={onClick}
      className={`whitespace-pre-wrap ${className}`}
      style={{ userSelect: isEraseMode ? "none" : "text", cursor: isEraseMode ? "crosshair" : "text" }}
    >
      {segs.map((seg, i) => {
        if (!seg.annotation) return <span key={i}>{seg.text}</span>;
        const hovered = isEraseMode && seg.annotation._id === hoveredId;
        return (
          <span
            key={i}
            data-annotation-id={seg.annotation._id}
            style={{
              backgroundColor: seg.annotation.color,
              borderRadius: "2px",
              padding: "1px 0",
              outline: hovered ? "2px solid rgba(239,68,68,0.9)" : "none",
              outlineOffset: "1px",
              opacity: isEraseMode && !hovered ? 0.5 : 1,
              transition: "opacity 0.1s, outline 0.08s",
              cursor: isEraseMode ? "crosshair" : "inherit",
            }}
          >
            {seg.text}
          </span>
        );
      })}
    </div>
  );
}
