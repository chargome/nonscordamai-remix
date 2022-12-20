import type { SupabaseClient } from "@supabase/supabase-js";

export const getAuthenticatedUser = async (client: SupabaseClient) => {
  const {
    data: { session },
  } = await client.auth.getSession();
  return session?.user;
};

export const signOut = async (client: SupabaseClient) => {
  return client.auth.signOut();
};
