import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getItem, setItem, KEYS } from '../utils/localStorage';

/**
 * Read saved theme mode from localStorage, default to 'light'.
 * @returns {'light' | 'dark'}
 */
const getSavedMode = () => {
  const saved = getItem(KEYS.THEME_MODE);
  if (saved === 'dark' || saved === 'light') return saved;
  return 'light';
};

/** @type {React.Context<{ mode: string, toggleMode: () => void }>} */
const ThemeModeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

/**
 * ThemeModeProvider - Manages light/dark mode with localStorage persistence.
 * @component
 */
export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(getSavedMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      setItem(KEYS.THEME_MODE, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};

ThemeModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook to access current theme mode and toggle function.
 * @returns {{ mode: 'light' | 'dark', toggleMode: () => void }}
 */
export const useThemeMode = () => useContext(ThemeModeContext);

export default ThemeModeContext;
