import { memo } from "react";
import cl from "./Input.module.css";

const MemoizedInput = memo(function Input({
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
}) {
  return (
    <input
      checked={value}
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
});

export default MemoizedInput;
