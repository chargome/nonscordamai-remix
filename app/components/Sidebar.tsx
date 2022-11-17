import type { User } from "@supabase/supabase-js";
import { Icons } from "./Icons";
import MenuItems from "./MenuItems";
import SignOutButton from "./SignOutButton";
import UserAvatar from "./UserAvatar";

interface Props {
  children: React.ReactNode;
  user: User;
}

export const Sidebar = ({ children, user }: Props) => {
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn-ghost drawer-button btn-circle btn fixed top-3 left-3 lg:hidden"
        >
          <Icons.Menu className="h-6 w-6" />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu w-60 overflow-y-auto bg-base-200 p-4 text-base-content">
          <div className="flex justify-center pb-6">
            <UserAvatar user={user} />
          </div>
          <MenuItems />
          <SignOutButton />
        </ul>
      </div>
    </div>
  );
};
