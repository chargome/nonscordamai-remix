import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/Button";
import EntriesView from "~/components/EntriesView";
import { Icons } from "~/components/Icons";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { ADD_ENTRY } from "~/constants/routes";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { getEntries } from "~/lib/entry/entry.service";
import { parseEntryResponse } from "~/lib/entry/entry.util";
import { getClient } from "~/lib/supabase";
import type { EntriesResponseData } from "~/types/entry";

interface LoaderData {
  error: string;
  data: EntriesResponseData;
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
    { data: entriesRes.data, error: "" },
    { headers: response.headers }
  );
};

const EntriesPage = () => {
  const { error, data } = useLoaderData<LoaderData>();
  const parsedEntries = parseEntryResponse(data as EntriesResponseData);
  const transition = useTransition();
  const [isListView, setIsListView] = useState(true);

  if (transition.state === "loading") {
    return <LoadingIndicator isFullScreen />;
  }

  return (
    <div className="p-4 px-10">
      {error && <div className="text-md text-center text-error">{error}</div>}
      <div className="flex justify-end pb-4">
        <div className="btn-group">
          <Button
            color={isListView ? "primary" : undefined}
            onClick={() => setIsListView(true)}
          >
            <Icons.List className="h-5 w-5" />
            List
          </Button>
          <Button
            color={!isListView ? "primary" : undefined}
            onClick={() => setIsListView(false)}
          >
            <Icons.MapLocation className="h-5 w-5" />
            Map
          </Button>
        </div>
      </div>
      <EntriesView isListView={isListView} data={parsedEntries} />
      <div className="flex justify-center py-6">
        <Link to={ADD_ENTRY}>
          <Button color="primary">
            <Icons.Plus className="h-5 w-5" />
            Add entry
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EntriesPage;
