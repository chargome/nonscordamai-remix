import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import Button from "~/components/Button";
import { Icons } from "~/components/Icons";
import { getClient } from "~/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const response = new Response();
  const formData = await request.formData();
  const provider = formData.get("provider") as string;
  const supabaseClient = getClient(request, response);

  if (typeof provider === "string" && ["google", "github"].includes(provider)) {
    const { data } = await supabaseClient.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: "http://localhost:3000/oauth/callback",
      },
    });

    if (data.url) {
      return redirect(data.url);
    }
  }

  return json<ActionData>(
    { error: "Something went wrong." },
    {
      headers: response.headers,
    }
  );
};

const LoginPage = (): JSX.Element => {
  const transition = useTransition();
  const error = useActionData<ActionData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="pb-8 text-center text-3xl">Authenticate</h1>
      <Form method="post">
        <input type="hidden" name="provider" value="google" />
        <Button
          type="submit"
          className="w-full"
          isDisabled={transition.state === "submitting"}
        >
          <Icons.Google className="h-5 w-5" />
          Google
        </Button>
      </Form>
      <Form method="post">
        <input type="hidden" name="provider" value="github" />
        <Button
          onClick={() => {}}
          className="w-full"
          isDisabled={transition.state === "submitting"}
        >
          <Icons.Github className="h-5 w-5" />
          Github
        </Button>
      </Form>
      <div className="text-md text-error">{error?.error}</div>
    </div>
  );
};

export default LoginPage;
