import { useSubmit } from "@remix-run/react";
import Button from "./Button";

const SignOutButton = () => {
  const submit = useSubmit();

  return (
    <Button
      color="primary"
      onClick={() => submit(null, { method: "post", action: "/logout" })}
    >
      Signout
    </Button>
  );
};

export default SignOutButton;
