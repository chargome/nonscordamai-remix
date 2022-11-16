import { Icons } from "./Icons";

interface Props {
  isLocation?: boolean;
  msg?: string;
}

export const LoadingIndicator = ({ msg, isLocation }: Props) => {
  return (
    <div className="flex flex-col items-center gap-6">
      {isLocation ? (
        <Icons.Location className="h-7 w-7 animate-ping" />
      ) : (
        <Icons.Pizza className="h-7 w-7 animate-ping" />
      )}
      <div>{msg}</div>
    </div>
  );
};
