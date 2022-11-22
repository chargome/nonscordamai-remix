import type { Entry } from "~/types/entry";
import EntriesListView from "./EntriesListView";

interface Props {
  isListView: boolean;
  data: Entry[];
}

const EntriesView = ({ isListView, data }: Props) => {
  if (isListView) {
    return <EntriesListView data={data} />;
  }
  return <EntriesListView data={data} />;
};

export default EntriesView;
