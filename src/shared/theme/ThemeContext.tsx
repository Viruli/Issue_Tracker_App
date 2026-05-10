import React, { createContext, useState } from "react";
import { lightPalette } from "./palattes/light";
import { darkPalette } from "./palattes/dark";
import type { ThemePalette, ThemeMode } from "./types";

type ThemeContextType = {
  mode: ThemeMode;
  palette: ThemePalette;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const palette = mode === "light" ? lightPalette : darkPalette;

  return (
    <ThemeContext.Provider value={{ mode, palette, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
