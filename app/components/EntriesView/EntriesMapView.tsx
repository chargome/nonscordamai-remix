import { useNavigate } from "@remix-run/react";
import { Marker } from "pigeon-maps";
import { useEffect, useState } from "react";
import { MY_ENTRIES } from "~/constants/routes";
import { getCenterOfCoordinates } from "~/lib/util/geo";
import type { Entry } from "~/types/entry";
import MapView from "../MapView";

interface Props {
  data: Entry[];
}

const EntriesMapView = ({ data }: Props) => {
  const [center, setCenter] = useState<number[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const newCoords = data.map((entry) => [
      entry.location.lat,
      entry.location.lng,
    ]);
    setCenter(getCenterOfCoordinates(newCoords));
  }, [data]);

  return (
    <MapView center={center}>
      {data.map(({ id, location: { lat, lng } }) => (
        <Marker
          width={40}
          key={id}
          anchor={[lat, lng]}
          onClick={() => navigate(`${MY_ENTRIES}/${id}`)}
        />
      ))}
    </MapView>
  );
};

export default EntriesMapView;
