import { useLoadScript } from "@react-google-maps/api";
import type { HasChildren } from "~/types/ui";
import { LoadingIndicator } from "../LoadingIndicator";

interface Props extends HasChildren {
  googleKey: string;
}

const Loader = ({ children, googleKey }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <LoadingIndicator isLocation msg="Map loading..." />;
  }

  return <>{children}</>;
};

export default Loader;
