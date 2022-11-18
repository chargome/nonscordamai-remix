import type { Location } from "~/types/location";
import Card from "./Card";

interface Props {
  location?: Location;
}

const LocationDisplay = ({ location }: Props) => {
  return (
    <Card title="📍 Location">
      <p>{location?.address}</p>
    </Card>
  );
};

export default LocationDisplay;
