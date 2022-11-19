import { OutputData } from "@editorjs/editorjs";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AddEntrySteps from "~/components/AddEntrySteps";
import { addEntry } from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";
import { FORM_DATA_DATA, FORM_DATA_LOCATION } from "~/types/entry";
import type { ActionDataError } from "~/types/error";
import { Location } from "~/types/location";

type LoaderData = {
  googleKey: string;
};

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();
  const formData = await request.formData();
  const location = JSON.parse(
    formData.get(FORM_DATA_LOCATION) as string
  ) as Location;
  const data = JSON.parse(formData.get(FORM_DATA_DATA) as string) as OutputData;
  const client = await getClient(request, response);
  const {
    data: { session },
  } = await client.auth.getSession();
  const res = await addEntry(
    client,
    { location, data },
    session?.user.id || ""
  );
  console.log("res: ", res);
  return redirect("/dashboard");

  return json<ActionDataError>({ msg: "Something went wrong" });
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

  return (
    <div className="py-10 px-10">
      <h1 className="pb-10 text-end text-xl">Create a new Entry</h1>
      <AddEntrySteps googleKey={data.googleKey} />
    </div>
  );
};

export default AddEntryPage;
