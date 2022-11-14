import type { HasChildren } from "~/types/common";

interface Props extends HasChildren {
  className?: string;
}

export const Frame = ({ children, className = "" }: Props): JSX.Element => {
  return (
    <div
      className={`rounded-sm border-8 border-black dark:border-white ${className}`}
    >
      {children}
    </div>
  );
};
