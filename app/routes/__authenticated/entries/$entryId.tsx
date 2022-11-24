import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import { Icons } from "~/components/Icons";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import LocationDisplay from "~/components/LocationDisplay";
import TextEditor from "~/components/TextEditor";
import { MY_ENTRIES } from "~/constants/routes";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { deleteEntry, getEntry } from "~/lib/entry/entry.service";
import { parseEntryResponse } from "~/lib/entry/entry.util";
import { getClient } from "~/lib/supabase";
import type { EntryResponseData } from "~/types/entry";

interface LoaderData {
  error?: string;
  data?: EntryResponseData;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const response = new Response();
  const entryId = params.entryId;
  const client = await getClient(request, response);
  const user = await getAuthenticatedUser(client);

  if (!user) {
    return redirect("/", 401);
  }

  if (!entryId) {
    return redirect(MY_ENTRIES);
  }

  const entry = await getEntry(client, user.id, entryId);

  if (!entry.data) {
    return json<LoaderData>(
      { error: "Entry not found" },
      { headers: response.headers }
    );
  }

  return json<LoaderData>({ data: entry.data }, { headers: response.headers });
};

export const action: ActionFunction = async ({ request, params }) => {
  const response = new Response();
  const postId = params.entryId;

  if (request.method === "DELETE" && postId) {
    const client = await getClient(request, response);
    await deleteEntry(client, postId);
    return redirect(MY_ENTRIES);
  }

  return json({}, { headers: response.headers });
};

const EntryDetailPage = () => {
  const loaderData = useLoaderData<LoaderData>();
  const transition = useTransition();
  const submit = useSubmit();

  if (transition.state !== "idle") {
    return <LoadingIndicator isFullScreen />;
  }

  if (loaderData.error) {
    return (
      <div className="p-10 text-center text-error">{loaderData.error}</div>
    );
  }

  const entry = parseEntryResponse(loaderData.data as EntryResponseData);

  return (
    <div className="p-4">
      <Link to={MY_ENTRIES}>
        <Button size="large" className="mb-4" color="ghost">
          <Icons.BackArrow className="h-5 w-5" />
          Back
        </Button>
      </Link>
      <div className="px-8 md:px-20">
        {loaderData.data && (
          <div className="flex flex-col gap-4">
            <Card title="🗓 Date">
              {entry.createdAt.toLocaleString("de-AT")}
            </Card>
            <LocationDisplay
              location={{
                lat: entry.location.lat,
                lng: entry.location.lng,
                address: entry.location.address,
              }}
            />
            <TextEditor initialData={entry.data.blocks} readOnly />
            <Card title="🚨 Danger Zone" noText>
              <div className="flex justify-center">
                <Button
                  color="error"
                  onClick={() => submit({}, { method: "delete" })}
                >
                  Delete Entry
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryDetailPage;
