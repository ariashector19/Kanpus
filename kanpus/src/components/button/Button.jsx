import { useContext } from "react";
import { ThemeContext } from "../../utils/themeContext/Theme.js";

export const Button = ({ children, ...props }) => {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.bg2,
        color: theme.text,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
