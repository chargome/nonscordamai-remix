import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Link,
  useActionData,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { getClient } from "~/lib/supabase";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

type ActionData = {
  error: string;
};

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();
  const data = await request.formData();
  const access_token = data.get(ACCESS_TOKEN) as string;
  const refresh_token = data.get(REFRESH_TOKEN) as string;
  const supabaseClient = getClient(request, response);

  if (!access_token || !refresh_token) {
    return json<ActionData>({ error: "Something went wrong" });
  }

  const {
    data: { session },
  } = await supabaseClient.auth.setSession({
    access_token,
    refresh_token,
  });

  if (!session) {
    return json<ActionData>({ error: "Something went wrong" });
  }

  return redirect("/dashboard", { headers: response.headers });
};

export default function OAuth() {
  const submit = useSubmit();
  const error = useActionData<ActionData>();
  const transition = useTransition();
  const [isWithoutTokens, setIsWithoutTokens] = useState(false);

  useEffect(() => {
    const sendTokens = () => {
      if (!error && transition.state === "idle") {
        const hash = new URLSearchParams(window.location.hash.substring(1));
        const access_token = hash.get(ACCESS_TOKEN);
        const refresh_token = hash.get(REFRESH_TOKEN);
        const formData = new FormData();
        formData.append(ACCESS_TOKEN, access_token || "");
        formData.append(REFRESH_TOKEN, refresh_token || "");
        if (access_token && refresh_token) {
          submit(formData, { method: "post" });
        } else {
          setIsWithoutTokens(true);
        }
      }
    };

    sendTokens();
  }, [error, submit, transition.state]);

  if ((error || isWithoutTokens) && transition.state === "idle") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div>Something went wrong. 🐛</div>
        <Link to="/login">
          <Button>back to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingIndicator msg="You're getting authenticated." />
    </div>
  );
}
