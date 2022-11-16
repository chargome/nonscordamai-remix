import type { HasChildren, HasClassName } from "~/types/common";

interface Props extends HasChildren, HasClassName {
  size?: "small" | "normal";
  variant?: "normal" | "icon";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "error"
    | "warning"
    | "info";
  onClick?: () => void;
  type?: "button" | "submit";
  isDisabled?: boolean;
}

const VARIANTS = {
  normal: "border-2 border-black p-3 min-w-[140px]",
  icon: "btn-circle btn-primary",
};

const SIZES = {
  small: "",
  normal: "",
};

const COLORS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  success: "btn-success",
  error: "btn-error",
  warning: "btn-warning",
  info: "btn-info",
};

const Button = ({
  children,
  className,
  onClick,
  size = "normal",
  variant = "normal",
  color,
  type = "submit",
  isDisabled,
}: Props) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={`btn flex items-center justify-center ${
        color && COLORS[color]
      } ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
