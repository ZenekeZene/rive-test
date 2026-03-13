import { useState, useEffect, useCallback, useRef } from "react";

let supabasePromise;
function getSupabase() {
  if (!supabasePromise) {
    supabasePromise = import("../lib/supabase").then((m) => m.supabase);
  }
  return supabasePromise;
}

const PAGE_SIZE = 12;
const COOLDOWN_KEY = "guestbook_last_signed";
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [cooldown, setCooldown] = useState(false);

  // Check cooldown on mount
  useEffect(() => {
    const lastSigned = localStorage.getItem(COOLDOWN_KEY);
    if (lastSigned) {
      const elapsed = Date.now() - Number(lastSigned);
      if (elapsed < COOLDOWN_MS) {
        setCooldown(true);
        const timer = setTimeout(() => setCooldown(false), COOLDOWN_MS - elapsed);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Fetch entries on demand (not on mount) to avoid critical request chain
  const hasFetched = useRef(false);
  const fetchInitial = useCallback(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const sb = await getSupabase();
    const { data, error } = await sb
      .from("guestbook_entries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE);

    if (!error && data) {
      setEntries(data);
      setHasMore(data.length === PAGE_SIZE);
    }
    setLoading(false);
  }

  const loadMore = useCallback(async () => {
    if (!hasMore || entries.length === 0) return;

    const sb = await getSupabase();
    const lastEntry = entries[entries.length - 1];
    const { data, error } = await sb
      .from("guestbook_entries")
      .select("*")
      .order("created_at", { ascending: false })
      .lt("created_at", lastEntry.created_at)
      .limit(PAGE_SIZE);

    if (!error && data) {
      setEntries((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    }
  }, [hasMore, entries]);

  const submitEntry = useCallback(async (authorName, message, imageBlob) => {
    const sb = await getSupabase();
    // Upload image to storage
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
    const { error: uploadError } = await sb.storage
      .from("guestbook-captures")
      .upload(fileName, imageBlob, {
        contentType: "image/png",
        cacheControl: "31536000",
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = sb.storage
      .from("guestbook-captures")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // Insert entry
    const { data, error: insertError } = await sb
      .from("guestbook_entries")
      .insert({ author_name: authorName, message, image_url: imageUrl })
      .select()
      .single();

    if (insertError) throw insertError;

    // Optimistic update
    setEntries((prev) => [data, ...prev]);

    // Set cooldown
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN_MS);

    return data;
  }, []);

  return { entries, loading, submitEntry, loadMore, hasMore, cooldown, fetchInitial };
}
