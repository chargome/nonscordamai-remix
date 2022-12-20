import { Link } from "@remix-run/react";
import { ADD_ENTRY, DASHBOARD, MY_ENTRIES } from "~/constants/routes";
import { Icons } from "./Icons";

const MenuItems = () => {
  return (
    <>
      <li>
        <Link to={DASHBOARD}>
          <Icons.Dashboard className="h-5 w-5" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to={MY_ENTRIES}>
          <Icons.Entries className="h-5 w-5" />
          My Entries
        </Link>
      </li>
      <li>
        <Link to={ADD_ENTRY}>
          <Icons.Write className="h-5 w-5" />
          Add Entry
        </Link>
      </li>
    </>
  );
};

export default MenuItems;
