import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import List from "~/components/List";
import ListItem from "~/components/ListItem";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { MY_ENTRIES } from "~/constants/routes";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { getEntries } from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";

type EntriesResponse = Awaited<ReturnType<typeof getEntries>>;
interface LoaderData {
  error: string;
  data: EntriesResponse["data"];
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
  const transition = useTransition();

  if (transition.state === "loading") {
    return <LoadingIndicator isFullScreen />;
  }

  return (
    <div className="p-4">
      {error && <div className="text-md text-center text-error">{error}</div>}
      <List>
        {data?.map((entry) => (
          <Link key={entry.id} to={`${MY_ENTRIES}/${entry.id}`}>
            <ListItem>
              {`${new Date(entry.created_at).toLocaleString()}: 📍${
                entry.address
              }`}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default EntriesPage;
