import type { EntryLocation } from "~/types/entry";
import Card from "./Card";

interface Props {
  location?: EntryLocation;
}

const LocationDisplay = ({ location }: Props) => {
  return (
    <Card title="📍 Location">
      <p>{location?.address}</p>
    </Card>
  );
};

export default LocationDisplay;
