import type { Location } from "~/types/location";
import { useGeolocation } from "~/hooks/useGeolocation";
import { useAddEntryStore } from "~/store/AddEntry";
import { useCallback, useEffect, useState } from "react";
import { getGeocode } from "use-places-autocomplete";
import { LoadingIndicator } from "../LoadingIndicator";
import LocationSearch from "../LocationSearch";
import MapView from "../MapView";

interface Props {
  nextStep: () => void;
}

const LocationPicker = ({ nextStep }: Props): JSX.Element => {
  const { loading: geoLoading, location } = useGeolocation();
  const [locationCache, setLocationCache] = useAddEntryStore((state) => [
    state.location,
    state.setLocation,
  ]);
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(locationCache);
  const [loading, setLoading] = useState(false);

  const updateLocation = useCallback(
    async (lat: number, lng: number, givenAddress?: string) => {
      setLoading(true);
      let address = givenAddress;
      if (!address) {
        const geoRes = await getGeocode({ location: { lat, lng } });
        address = geoRes[0].formatted_address;
      }
      setSelectedLocation({
        address,
        lat,
        lng,
      });
      setLoading(false);
    },
    [setSelectedLocation]
  );

  useEffect(() => {
    if (location?.coords && !locationCache) {
      updateLocation(location.coords.latitude, location.coords.longitude);
    }
  }, [location, locationCache, updateLocation]);

  if (geoLoading && !locationCache) {
    return (
      <LoadingIndicator
        isLocation
        msg="Sit tight, we're trying to locate you..."
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <LocationSearch
        confirmLocation={() => {
          setLocationCache(selectedLocation);
          nextStep();
        }}
        cancelLocation={() => setSelectedLocation(undefined)}
        loading={loading}
        selectedLocation={selectedLocation}
        updateLocation={({ lat, lng, address }) =>
          updateLocation(lat, lng, address)
        }
      />
      <MapView
        lat={selectedLocation?.lat}
        lng={selectedLocation?.lng}
        onClickLocation={updateLocation}
      />
    </div>
  );
};

export default LocationPicker;
