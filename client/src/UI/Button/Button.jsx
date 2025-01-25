import cl from "./Button.module.css";

export default function Button({
  children,
  clickHandler = () => {},
  variant,
  size = { width: "auto", height: "auto" },
  animated = false,
}) {
  const buttonClasses = `${animated ? cl.animated : ""} ${cl[variant]}`;

  return (
    <button
      style={{ width: size.width, height: size.height }}
      className={buttonClasses}
      onClick={() => clickHandler()}
    >
      {children}
    </button>
  );
}
