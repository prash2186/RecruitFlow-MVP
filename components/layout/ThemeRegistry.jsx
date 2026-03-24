"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { lightTheme, darkTheme } from "../../lib/theme";

export const ThemeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = React.useState("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      localStorage.setItem("themeMode", "dark");
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode],
  );

  const theme = React.useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  // Prevent flash by ensuring mounted before full render
  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  );
}
