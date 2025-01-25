import cl from "./TextArea.module.css";

export default function TextArea({
  id,
  placeholder,
  width,
  height,
  changeHandler = () => {},
  color = "#757575",
  border = "none",
  value,
}) {
  return (
    <textarea
      value={value}
      id={id || undefined}
      style={{ width, color, border, height }}
      className={cl.textArea}
      placeholder={placeholder}
      onChange={(e) => changeHandler(e.target.value)}
    />
  );
}
