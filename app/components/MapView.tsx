import { Map, Marker } from "pigeon-maps";
import type { HasChildren } from "~/types/ui";

interface Props extends HasChildren {
  center?: number[];
  showCenterMarker?: boolean;
  markers?: number[][];
  onClickLocation?: (lat: number, lng: number) => void;
}

// NAPOLI, ITALIA
const DEFAULT_LOCATION = {
  lat: 40.8517983,
  lng: 14.26812,
};

const MapView = ({
  children,
  center,
  showCenterMarker,
  onClickLocation = () => null,
}: Props) => {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg">
      <Map
        boxClassname="grayscale"
        height={500}
        center={[
          center ? center[0] : DEFAULT_LOCATION.lat,
          center ? center[1] : DEFAULT_LOCATION.lng,
        ]}
        defaultZoom={5}
        onClick={({ latLng }) => {
          onClickLocation(latLng[0], latLng[1]);
        }}
      >
        {showCenterMarker && (
          <Marker
            width={50}
            anchor={[
              center ? center[0] : DEFAULT_LOCATION.lat,
              center ? center[1] : DEFAULT_LOCATION.lng,
            ]}
          />
        )}
        {children}
      </Map>
    </div>
  );
};

export default MapView;
