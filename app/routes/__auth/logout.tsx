import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { signOut } from "~/lib/auth/auth.service";
import { getClient } from "~/lib/supabase";

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();
  const client = await getClient(request, response);
  await signOut(client);
  return redirect("/", { headers: response.headers });
};
