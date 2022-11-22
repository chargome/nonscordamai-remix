import { Link } from "@remix-run/react";
import { MY_ENTRIES } from "~/constants/routes";
import type { Entry } from "~/types/entry";
import List from "../List";
import ListItem from "../ListItem";

interface Props {
  data: Entry[];
}

const EntriesListView = ({ data }: Props) => {
  return (
    <List>
      {data.map((entry) => (
        <Link key={entry.id} to={`${MY_ENTRIES}/${entry.id}`}>
          <ListItem>
            {`${new Date(entry.createdAt).toLocaleString("de-AT")}: 📍${
              entry.location.address
            }`}
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default EntriesListView;
