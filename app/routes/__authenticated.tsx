import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import { Sidebar } from "~/components/Sidebar";
import { getClient } from "~/lib/supabase";

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const client = getClient(request, response);
  const {
    data: { session },
  } = await client.auth.getSession();

  if (session?.user) {
    return json<LoaderData>(
      { user: session.user },
      { headers: response.headers }
    );
  }

  return redirect("/login", 401);
};

const AuthenticatedLayout = (): JSX.Element => {
  const data = useLoaderData<LoaderData>();

  return (
    <Sidebar user={data.user}>
      <Outlet />
    </Sidebar>
  );
};

export default AuthenticatedLayout;
