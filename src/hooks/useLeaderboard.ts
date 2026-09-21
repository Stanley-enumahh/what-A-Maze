import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  completion_time: number;
  levels_completed: number;
  created_at: string;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("leaderboard")
      .select("*")
      .order("completion_time", { ascending: true })
      .limit(20);

    if (fetchError) {
      setError("Could not load leaderboard.");
      setLoading(false);
      return;
    }

    setEntries(data ?? []);
    setLoading(false);
  }, []);

  const submitScore = useCallback(
    async (
      playerName: string,
      completionTime: number,
      levelsCompleted: number,
    ) => {
      setSubmitting(true);
      setError(null);

      const { error: submitError } = await supabase.from("leaderboard").insert({
        player_name: playerName.trim(),
        completion_time: completionTime,
        levels_completed: levelsCompleted,
      });

      if (submitError) {
        setError("Could not submit your score.");
        setSubmitting(false);
        return false;
      }

      await fetchLeaderboard();

      setSubmitting(false);
      return true;
    },
    [fetchLeaderboard],
  );

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return {
    entries,
    loading,
    submitting,
    error,
    submitScore,
    fetchLeaderboard,
  };
}
