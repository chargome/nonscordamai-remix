import Button from "./Button";
import { Icons } from "./Icons";
// import { signInWithGithub, signInWithGoogle } from "@/lib/auth";

export const LoginForm = (): JSX.Element => {
  // console.log('client env: ', process.env);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="pb-8 text-center text-3xl">Authenticate</h1>
      <Button onClick={() => {}}>
        <Icons.Google className="h-5 w-5" />
        Google
      </Button>
      <Button onClick={() => {}}>
        <Icons.Github className="h-5 w-5" />
        Github
      </Button>
    </div>
  );
};

export default LoginForm;
