import { createServerClient } from "@supabase/auth-helpers-remix";

const URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!URL || !ANON_KEY) {
  throw new Error("missing env variables: supabase");
}

export const getClient = (request: Request, response: Response) =>
  createServerClient(URL, ANON_KEY, { request, response });
