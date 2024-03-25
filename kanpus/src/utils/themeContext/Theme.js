import { createContext } from "react";

export const themes = {
  light: {
    text: "#3c3b3d",
    bg: "#eff1f5",
    bg2: "#ccd0da",
  },
  dark: {
    text: "#cdd6f4",
    bg: "#1e1e2e",
    bg2: "#313244",
  },
};

export const ThemeContext = createContext(themes.light);
