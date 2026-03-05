type ButtonProps = {
  children: React.ReactNode;
  variant?: "dark" | "light";
  onClick: () => void;
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "dark",
  className,
}: ButtonProps) {
  const baseStyle = `px-2 py-1 rounded-md cursor-pointer`;
  const variants = {
    dark: "bg-black/30 text-white",
    light: "bg-white text-black border border-black/20",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
