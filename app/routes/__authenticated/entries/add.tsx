import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import AddEntrySteps from "~/components/AddEntrySteps";
import { MY_ENTRIES } from "~/constants/routes";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { addEntry } from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";
import { FORM_DATA_DATA, FORM_DATA_LOCATION } from "~/types/entry";
import type { ActionDataError } from "~/types/error";
import type { EntryLocation, EntryData } from "~/types/entry";

type LoaderData = {
  googleKey: string;
};

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();
  const formData = await request.formData();

  // todo: add validation
  const location = JSON.parse(
    formData.get(FORM_DATA_LOCATION) as string
  ) as EntryLocation;
  const data = JSON.parse(formData.get(FORM_DATA_DATA) as string) as EntryData;
  const client = await getClient(request, response);
  const user = await getAuthenticatedUser(client);

  if (!user) {
    return redirect("/", 401);
  }

  const res = await addEntry(client, data, location, user.id);

  if (res.error) {
    return json<ActionDataError>({ msg: "Something went wrong" });
  }

  // success
  return redirect(MY_ENTRIES);
};

export const loader: LoaderFunction = () => {
  const response = new Response();
  const googleKey = process.env.GOOGLE_MAPS_KEY;

  if (!googleKey) {
    throw new Error("missing env: google");
  }

  return json<LoaderData>({ googleKey }, { headers: response.headers });
};

const AddEntryPage = () => {
  const data = useLoaderData<LoaderData>();
  const submit = useSubmit();

  const saveEntry = (location: EntryLocation, data: EntryData) => {
    const formData = new FormData();
    formData.append(FORM_DATA_LOCATION, JSON.stringify(location));
    formData.append(FORM_DATA_DATA, JSON.stringify(data));
    submit(formData, { method: "post" });
  };

  return (
    <>
      <div className="p-2 text-center text-xs bg-warning">⚠ WARNING: This repo is only a showcase for <a href="https://remix.run"><b>remix</b></a>, do not store any sensitive data in the app</div>
      <div className="py-10 px-10">
        <h1 className="pb-10 text-end text-xl">Create a new Entry</h1>
        <AddEntrySteps googleKey={data.googleKey} saveEntry={saveEntry} />
      </div>
    </>
  );
};

export default AddEntryPage;
