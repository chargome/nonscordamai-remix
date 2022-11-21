import { Icons } from "./Icons";

interface Props {
  isLocation?: boolean;
  msg?: string;
  isFullScreen?: boolean;
}

const fullScreenClasses = "h-screen w-full justify-center";

export const LoadingIndicator = ({ msg, isLocation, isFullScreen }: Props) => {
  return (
    <div
      className={`flex flex-col items-center gap-6 ${
        isFullScreen && fullScreenClasses
      }`}
    >
      {isLocation ? (
        <Icons.Location className="h-7 w-7 animate-ping" />
      ) : (
        <Icons.Pizza className="h-7 w-7 animate-ping" />
      )}
      <div>{msg}</div>
    </div>
  );
};
