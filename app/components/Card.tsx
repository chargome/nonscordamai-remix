import type { HasChildren, HasClassName } from "~/types/ui";

interface Props extends HasChildren, HasClassName {
  title?: string;
}

const Card = ({ title, children, className }: Props) => {
  return (
    <div className={`${className} card bg-base-300`}>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="prose m-auto w-full rounded bg-base-100 p-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
