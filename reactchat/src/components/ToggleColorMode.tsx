import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import createMuiTheme from "../theme/Theme";
import { ColorModeContext } from "../context/DarkModeContext";
import Cookie from "js-cookie";

interface ToggleColorModeProps {
  children: ReactNode;
}

const ToggleColorMode = ({ children }: ToggleColorModeProps) => {
  const storeMode = Cookie.get("colorMode") as "light" | "dark";
  const prefersDarkMode = useMediaQuery("([prefers-color-scheme: dark])");
  const defaultMode = storeMode || (prefersDarkMode ? "dark" : "light");

  const [mode, setMode] = useState<"light" | "dark">(defaultMode);

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    Cookie.set("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  const theme = useMemo(() => createMuiTheme(mode || "light"), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
