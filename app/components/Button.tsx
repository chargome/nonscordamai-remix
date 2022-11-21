import type { HasChildren, HasClassName } from "~/types/ui";

interface Props extends HasChildren, HasClassName {
  size?: "small" | "normal" | "large";
  variant?: "normal" | "icon";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "error"
    | "warning"
    | "ghost"
    | "info";
  onClick?: () => void;
  type?: "button" | "submit";
  isDisabled?: boolean;
}

const VARIANTS = {
  normal: "p-3 min-w-[140px]",
  icon: "btn-circle",
};

const SIZES = {
  small: "btn-sm",
  normal: "",
  large: "btn-lg",
};

const COLORS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  success: "btn-success",
  error: "btn-error",
  warning: "btn-warning",
  info: "btn-info",
  ghost: "btn-ghost",
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
      className={`btn flex items-center justify-center gap-1 ${
        color && COLORS[color]
      } ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
