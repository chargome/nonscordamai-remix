import type { HasChildren } from "~/types/ui";

const ListItem = ({ children }: HasChildren) => (
  <li className="my-2 rounded border-4 border-base-200 bg-base-200 p-4 transition-all hover:-translate-x-1 hover:border-primary">
    {children}
  </li>
);

export default ListItem;
