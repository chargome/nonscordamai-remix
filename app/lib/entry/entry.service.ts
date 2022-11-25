import type { SupabaseClient } from "@supabase/supabase-js";
import type { EntryData, EntryLocation } from "~/types/entry";

const ENTRIES_TABLE = "entries";

export const getEntries = (client: SupabaseClient, userId: string) => {
  return client
    .from(ENTRIES_TABLE)
    .select("id, created_at, address, lat, lng, data")
    .filter("fk_user", "eq", userId);
};

export const getEntry = (
  client: SupabaseClient,
  userId: string,
  entryId: string
) => {
  return client
    .from(ENTRIES_TABLE)
    .select("id, created_at, address, lat, lng, data")
    .eq("id", entryId)
    .eq("fk_user", userId)
    .limit(1)
    .single();
};

export const addEntry = (
  client: SupabaseClient,
  data: EntryData,
  location: EntryLocation,
  userId: string
) => {
  return client.from(ENTRIES_TABLE).insert({
    fk_user: userId,
    address: location.address,
    lat: location.lat,
    lng: location.lng,
    data,
  });
};

export const deleteEntry = (client: SupabaseClient, postId: string) => {
  return client.from(ENTRIES_TABLE).delete().eq("id", postId);
};

export const getTotalEntryCount = (client: SupabaseClient, userId: string) => {
  return client
    .from(ENTRIES_TABLE)
    .select("*", { count: "exact", head: true })
    .eq("fk_user", userId);
};

export const getEntryCountByRange = (
  client: SupabaseClient,
  userId: string,
  start: Date,
  end: Date
) => {
  return client
    .from(ENTRIES_TABLE)
    .select("*", { count: "exact", head: true })
    .eq("fk_user", userId)
    .lt("created_at", end.toISOString())
    .gt("created_at", start.toISOString());
};
