import { Outlet } from "@remix-run/react";
import { Frame } from "~/components/Frame";
import { Logo } from "~/components/Logo";

const AuthLayout = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col p-10 sm:px-20 lg:flex-row lg:px-20">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Logo />
        <Frame className="z-10 bg-base-100 p-8">
          <Outlet />
        </Frame>
      </div>
      <Frame className="relative z-0 -mt-20 h-full flex-1 lg:mt-0">
        <img
          alt="Napoli"
          src={"/images/diary_3.webp"}
          className="absolute h-full w-full object-cover"
        />
      </Frame>
    </div>
  );
};

export default AuthLayout;
