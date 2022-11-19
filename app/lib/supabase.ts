import { createServerClient } from "@supabase/auth-helpers-remix";
import { Database } from "~/types/db";

const URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!URL || !ANON_KEY) {
  throw new Error("missing env variables: supabase");
}

export const getClient = (request: Request, response: Response) =>
  createServerClient<Database>(URL, ANON_KEY, { request, response });
