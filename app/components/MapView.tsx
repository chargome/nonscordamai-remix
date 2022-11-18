import { Map, Marker } from 'pigeon-maps';

interface Props {
  lat?: number;
  lng?: number;
  onClickLocation?: (lat: number, lng: number) => void;
}

// NAPOLI, ITALIA
const DEFAULT_LOCATION = {
  lat: 40.8517983,
  lng: 14.26812,
};

const MapView = ({ lat, lng, onClickLocation = () => null }: Props) => {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg">
      <Map
        boxClassname="grayscale"
        height={500}
        center={[lat || DEFAULT_LOCATION.lat, lng || DEFAULT_LOCATION.lng]}
        defaultZoom={11}
        onClick={({ latLng }) => {
          onClickLocation(latLng[0], latLng[1]);
        }}
      >
        {lat && lng && <Marker width={50} anchor={[lat, lng]} />}
      </Map>
    </div>
  );
};

export default MapView;
