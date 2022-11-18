import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface Props {
  handleLocationClick: (lat: number, lng: number, description: string) => void;
}

const LocationSearchbar = ({ handleLocationClick }: Props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onLocationSelect = async (address: string) => {
    const geoCodes = await getGeocode({ address });
    const { lat, lng } = getLatLng(geoCodes[0]);
    handleLocationClick(lat, lng, address);
    setValue(address);
    clearSuggestions();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className={`${data.length > 0 && "dropdown-open"} dropdown`}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Please type your location"
          className="input-bordered input-primary input w-96 max-w-lg"
        />
        {value !== "" && (
          <ul
            tab-Index="0"
            className="dropdown-content menu rounded-box w-96 bg-base-100 p-2 shadow"
          >
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <li
                  key={place_id}
                  onClick={() => onLocationSelect(description)}
                >
                  <a>{description}</a>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationSearchbar;
