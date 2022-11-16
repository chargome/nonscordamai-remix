import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabaseClient = getClient(request, response);
  const session = await supabaseClient.auth.getSession();
  return json({ session });
};

const DashboardPage = () => {
  const { session } = useLoaderData();
  return (
    <>
      <div>DASHBOARD</div>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};

export default DashboardPage;
