import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import { Sidebar } from "~/components/Sidebar";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import { getClient } from "~/lib/supabase";

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const client = getClient(request, response);
  const user = await getAuthenticatedUser(client);

  if (!user) {
    return redirect("/login");
  }

  return json<LoaderData>({ user }, { headers: response.headers });
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
