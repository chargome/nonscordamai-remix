import type { Entry } from "~/types/entry";
import EntriesListView from "./EntriesListView";
import EntriesMapView from "./EntriesMapView";

interface Props {
  isListView: boolean;
  data: Entry[];
}

const EntriesView = ({ isListView, data }: Props) => {
  if (isListView) {
    return <EntriesListView data={data} />;
  }
  return <EntriesMapView data={data} />;
};

export default EntriesView;
