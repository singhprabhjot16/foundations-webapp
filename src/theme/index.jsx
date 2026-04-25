import { createTheme, CssBaseline, GlobalStyles, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from "@mui/material";
import palette from "./palette";
import gradient from "./gradient";
import typography from "./typography";
import PropTypes from "prop-types";
import ComponentOverrides from "./overrides";

/**
 * ThemeProvider - Wraps the app with MUI theming
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export default function ThemeProvider({ children }) {
  const theme = createTheme({
    palette: palette(),
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

  theme.components = ComponentOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap')",
          }}
        />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
