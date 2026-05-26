"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export interface Annotation {
  _id: string;
  sourceId: string;
  sourceType: "note" | "document";
  startOffset: number;
  endOffset: number;
  highlightedText: string;
  color: string;
  createdAt: string;
}

interface Options {
  sourceId: string | null;
  sourceType: "note" | "document";
}

export function useAnnotations({ sourceId, sourceType }: Options) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);
 
  const refetch = useCallback(async () => {
    if (!sourceId) { setAnnotations([]); return; }
    setLoading(true);
    try {
      const data = await apiFetch(`/annotations?sourceId=${sourceId}&sourceType=${sourceType}`);
      setAnnotations(Array.isArray(data) ? data : []);
    } catch {
      setAnnotations([]);
    } finally {
      setLoading(false);
    }
  }, [sourceId, sourceType]);
 
  useEffect(() => { refetch(); }, [refetch]);
 
  return { annotations, loading, refetch };
}