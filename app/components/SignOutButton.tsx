import { useSubmit } from "@remix-run/react";
import Button from "./Button";
import { Icons } from "./Icons";

const SignOutButton = () => {
  const submit = useSubmit();

  return (
    <Button
      color="primary"
      onClick={() => submit(null, { method: "post", action: "/logout" })}
    >
      <Icons.SignOut className="h-5 w-5" />
      Signout
    </Button>
  );
};

export default SignOutButton;
