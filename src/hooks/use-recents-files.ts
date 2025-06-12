// src/hooks/use-recent-files.ts
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { FileRow } from "@/types";

export function useRecentFiles(userId?: string) {
  const [recentFiles, setRecentFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .not("last_accessed_at", "is", null)
      .order("last_accessed_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (!error && data) setRecentFiles(data);
        setLoading(false);
      });
  }, [userId]);

  return { recentFiles, loading };
}