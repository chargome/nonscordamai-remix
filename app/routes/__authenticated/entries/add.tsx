import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AddEntrySteps from "~/components/AddEntrySteps";

type LoaderData = {
  googleKey: string;
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
