import type { HasChildren, HasClassName } from "~/types/ui";

interface Props extends HasChildren, HasClassName {
  title?: string;
  noText?: boolean;
}

const Card = ({ title, children, className, noText }: Props) => {
  return (
    <div className={`${className} card bg-base-300`}>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {noText ? (
          children
        ) : (
          <div className="prose m-auto w-full rounded bg-base-100 p-4 shadow-sm">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
