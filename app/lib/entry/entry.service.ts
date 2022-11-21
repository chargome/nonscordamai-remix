import type { SupabaseClient } from "@supabase/supabase-js";
import type { Entry } from "~/types/entry";

export const getEntries = (client: SupabaseClient, userId: string) => {
  return client
    .from("entries")
    .select("id, created_at, address, lat, lng, data")
    .filter("fk_user", "eq", userId);
};

export const getEntry = (
  client: SupabaseClient,
  userId: string,
  entryId: string
) => {
  return client
    .from("entries")
    .select("*")
    .eq("id", entryId)
    .eq("fk_user", userId)
    .limit(1);
};

export const addEntry = (
  client: SupabaseClient,
  entry: Entry,
  userId: string
) => {
  return client.from("entries").insert({
    fk_user: userId,
    address: entry.location.address,
    lat: entry.location.lat,
    lng: entry.location.lng,
    data: entry.data,
  });
};
