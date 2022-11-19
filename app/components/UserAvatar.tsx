import type { User } from "@supabase/supabase-js";
import Image from "remix-image";

interface Props {
  user: User;
}

const UserAvatar = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <div className="avatar absolute z-10 h-24 w-24">
          <div className="mask mask-hexagon relative w-24">
            <img
              referrerPolicy="no-referrer"
              src={user.user_metadata.avatar_url || "/images/pizzaiolo.webp"}
              alt="user"
            />
          </div>
        </div>
        <div className="-z-10 h-full w-full animate-logo-pulse rounded-full bg-gradient-to-br from-yellow-200 to-pink-500 blur-xl" />
      </div>
      <div className="text-center text-xs">{user.user_metadata.name}</div>
    </div>
  );
};

export default UserAvatar;
