import { Link } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import Button from "~/components/Button";
import EntryStats from "~/components/EntryStats";
import { ADD_ENTRY, AUTHENTICATED_WRAPPER } from "~/constants/routes";
import { useRouteData } from "~/hooks/useRouteData";

interface LoaderData {
  user: User;
}

const DashboardPage = () => {
  const routeData = useRouteData<LoaderData>(AUTHENTICATED_WRAPPER);

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 py-20">
      <h1 className="pb-10 text-5xl font-bold">
        Hello, {routeData?.user.user_metadata.name}
      </h1>
      <EntryStats />
      <Link to={ADD_ENTRY}>
        <Button>CREATE A NEW ENTRY</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;
