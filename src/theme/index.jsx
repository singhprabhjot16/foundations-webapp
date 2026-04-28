import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from "@mui/material";
import { useMemo } from "react";
import palette from "./palette";
import gradient from "./gradient";
import typography from "./typography";
import PropTypes from "prop-types";
import ComponentOverrides from "./overrides";
import { ThemeModeProvider, useThemeMode } from "./ThemeModeContext";

/**
 * InnerThemeProvider - Builds the MUI theme using current mode from context.
 */
function InnerThemeProvider({ children }) {
  const { mode } = useThemeMode();

  const theme = useMemo(() => {
    const t = createTheme({
      palette: palette(mode),
      gradient: gradient(),
      typography,
      shape: {
        borderRadius: 12,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1200,
          xl: 1536,
        },
      },
    });
    t.components = ComponentOverrides(t);
    return t;
  }, [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

InnerThemeProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * ThemeProvider - Wraps the app with theme mode context + MUI theming.
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export default function ThemeProvider({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeModeProvider>
        <InnerThemeProvider>
          {children}
        </InnerThemeProvider>
      </ThemeModeProvider>
    </StyledEngineProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
