import cl from "./Button.module.css";

export default function Button({
  children,
  clickHandler,
  variant,
  size,
  animated = false,
}) {
  const buttonClasses = `${animated ? cl.animated : ""} ${cl[variant]}`;

  return (
    <button
      style={{ width: size }}
      className={buttonClasses}
      onClick={() => clickHandler()}
    >
      {children}
    </button>
  );
}