import cl from "./Input.module.css";

const Input = ({
  id,
  type = "text",
  placeholder,
  width,
  changeHandler = () => {},
  pushEnter = () => {},
  color = "#757575",
  focus = () => {},
  border = "none",
  value,
}) => {
  return (
    <input
      value={value}
      id={id}
      style={{ width, color, border }}
      className={cl.input}
      type={type}
      placeholder={placeholder}
      onFocus={(e) => focus(e.target.value)}
      onChange={(e) => {
        if (type === "checkbox") {
          changeHandler(e.target.checked);
        } else {
          changeHandler(e.target.value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          pushEnter(e.target.value);
        }
      }}
    />
  );
};

export default Input;
