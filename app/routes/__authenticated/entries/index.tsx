import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { getEntries } from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";

type MoviesResponse = Awaited<ReturnType<typeof getEntries>>;
interface LoaderData {
  error: string;
  data: MoviesResponse["data"];
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const client = await getClient(request, response);
  const user = await getAuthenticatedUser(client);

  if (!user) {
    return redirect("/", 401);
  }

  const entriesRes = await getEntries(client, user?.id);

  if (entriesRes.error) {
    console.log(entriesRes.error);
    return json<LoaderData>({ error: entriesRes.error.message, data: [] });
  }

  return json<LoaderData>(
    { data: entriesRes.data || [], error: "" },
    { headers: response.headers }
  );
};

const EntriesPage = () => {
  const { error, data } = useLoaderData<LoaderData>();

  return (
    <div>
      {error && <div className="text-md text-center text-error">{error}</div>}
      {data?.map((entry) => (
        <div key={entry.id}>{entry.address}</div>
      ))}
    </div>
  );
};

export default EntriesPage;
