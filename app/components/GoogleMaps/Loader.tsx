import { useLoadScript } from "@react-google-maps/api";
import type { HasChildren } from "~/types/ui";
import { LoadingIndicator } from "../LoadingIndicator";

const Loader = ({ children }: HasChildren) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDVEQkYxtSX5-5tnzyrvSv28OuHGSI4UFw", // todo: use env
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <LoadingIndicator isLocation msg="Map loading..." />;
  }

  return <>{children}</>;
};

export default Loader;
