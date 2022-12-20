import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import Image from "remix-image";
import Button from "~/components/Button";
import EntryStats from "~/components/EntryStats";
import { Frame } from "~/components/Frame";
import { ADD_ENTRY, AUTHENTICATED_WRAPPER, LOGIN } from "~/constants/routes";
import { useRouteData } from "~/hooks/useRouteData";
import { getAuthenticatedUser } from "~/lib/auth/auth.service";
import {
  getEntryCountByRange,
  getTotalEntryCount,
} from "~/lib/entry/entry.service";
import { getClient } from "~/lib/supabase";
import {
  getCurrentMonthBoundaries,
  getCurrentWeekBoundaries,
} from "~/lib/util/time";

interface RouteData {
  user: User;
}

interface LoaderData {
  stats: {
    weekly: number;
    monthly: number;
    total: number;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const client = await getClient(request, response);
  const user = await getAuthenticatedUser(client);
  if (!user) {
    return redirect(LOGIN, 401);
  }
  const { start: weekStart, end: weekEnd } = getCurrentWeekBoundaries();
  const { start: monthStart, end: monthEnd } = getCurrentMonthBoundaries();
  const { count: totalCount } = await getTotalEntryCount(client, user.id);
  const { count: weekCount } = await getEntryCountByRange(
    client,
    user.id,
    weekStart.toDate(),
    weekEnd.toDate()
  );
  const { count: monthCount } = await getEntryCountByRange(
    client,
    user.id,
    monthStart.toDate(),
    monthEnd.toDate()
  );

  return json<LoaderData>({
    stats: {
      weekly: weekCount || 0,
      monthly: monthCount || 0,
      total: totalCount || 0,
    },
  });
};

const DashboardPage = () => {
  const routeData = useRouteData<RouteData>(AUTHENTICATED_WRAPPER);
  const loaderData = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 py-20">
      <h1 className="pb-10 text-5xl font-bold">
        Hello, {routeData?.user.user_metadata.name}
      </h1>
      <EntryStats
        weekly={loaderData.stats.weekly}
        monthly={loaderData.stats.monthly}
        total={loaderData.stats.total}
      />
      <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
        <Link to={ADD_ENTRY} className="z-10 md:-mr-16">
          <Button size="large" color="secondary">
            CREATE A NEW ENTRY
          </Button>
        </Link>
        <Frame className="z-0">
          <Image
            loaderUrl="/api/image"
            src="/images/diary_2.webp"
            alt="Diary"
            responsive={[
              {
                size: {
                  width: 400,
                  height: 400,
                },
                maxWidth: 200,
              },
            ]}
            dprVariants={[1, 3]}
          />
        </Frame>
      </div>
    </div>
  );
};

export default DashboardPage;
