import type { Location } from "~/types/location";
import Button from "./Button";
import LocationSearchbar from "./GoogleMaps/LocationSearchbar";
import { Icons } from "./Icons";
import { LoadingIndicator } from "./LoadingIndicator";

interface Props {
  confirmLocation: () => void;
  cancelLocation: () => void;
  loading: boolean;
  updateLocation: (location: Location) => void;
  selectedLocation?: Location;
}

const LocationSearch = ({
  selectedLocation,
  updateLocation,
  loading,
  confirmLocation,
  cancelLocation,
}: Props) => {
  if (loading) {
    return <LoadingIndicator isLocation msg="Validating your location..." />;
  }

  if (selectedLocation) {
    return (
      <div className="flex flex-col gap-5 py-5">
        <div className="text-center text-xl font-bold">
          {selectedLocation.address}
        </div>
        <div className="text-center text-lg">Is this location correct?</div>
        <div className="flex justify-center gap-4">
          <Button
            variant="icon"
            className="btn-success"
            onClick={confirmLocation}
          >
            <Icons.Check />
          </Button>
          <Button variant="icon" className="btn-error" onClick={cancelLocation}>
            <Icons.Cancel />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-lg">
        Type in your location or click on the map!
      </div>
      <LocationSearchbar
        handleLocationClick={(lat, lng, address) =>
          updateLocation({ lat, lng, address })
        }
      />
    </div>
  );
};

export default LocationSearch;
