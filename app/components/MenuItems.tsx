import { Link } from "@remix-run/react";
import { ADD_ENTRY, DASHBOARD, MY_ENTRIES } from "~/constants/routes";

const MenuItems = () => {
  return (
    <>
      <li>
        <Link to={DASHBOARD}>Dashboard</Link>
      </li>
      <li>
        <Link to={MY_ENTRIES}>My Entries</Link>
      </li>
      <li>
        <Link to={ADD_ENTRY}>Add Entry</Link>
      </li>
    </>
  );
};

export default MenuItems;
