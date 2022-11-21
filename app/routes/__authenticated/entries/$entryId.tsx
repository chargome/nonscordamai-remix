import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import Button from "~/components/Button";
import { Icons } from "~/components/Icons";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import LocationDisplay from "~/components/LocationDisplay";
import TextEditor from "~/components/TextEditor";
import { MY_ENTRIES } from "~/constants/routes";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { getEntry } from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";

type EntryResponse = Awaited<ReturnType<typeof getEntry>>;

interface LoaderData {
  error?: string;
  data?: EntryResponse["data"];
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

const EntryDetailPage = () => {
  const loaderData = useLoaderData<LoaderData>();
  const transition = useTransition();

  const data =
    loaderData?.data && loaderData?.data?.length > 0
      ? loaderData?.data[0]
      : null;

  if (transition.state !== "idle") {
    return <LoadingIndicator isFullScreen />;
  }

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
            <LocationDisplay
              location={{ lat: data.lat, lng: data.lng, address: data.address }}
            />
            <TextEditor initialData={data.data.blocks} readOnly />
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryDetailPage;
