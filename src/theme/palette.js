/**
 * Foundations App — Color Palette
 * Deep Indigo primary with category-specific accent colors.
 * Supports both light and dark modes.
 * @param {string} mode - 'light' or 'dark'
 */
const palette = (mode = 'light') => {
  const isLight = mode === 'light';

  return {
    mode,
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6366F1',
      light: '#A5B4FC',
      dark: '#4338CA',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#22C55E',
      light: '#86EFAC',
      dark: '#16A34A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#DC2626',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3B82F6',
      light: '#93C5FD',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: isLight ? '#F8F9FB' : '#0F172A',
      paper: isLight ? '#FFFFFF' : '#1E293B',
    },
    text: {
      primary: isLight ? '#1E293B' : '#F1F5F9',
      secondary: isLight ? '#64748B' : '#94A3B8',
      disabled: isLight ? '#94A3B8' : '#475569',
    },
    divider: isLight ? '#E2E8F0' : '#334155',
    grey: {
      50: isLight ? '#F8FAFC' : '#020617',
      100: isLight ? '#F1F5F9' : '#0F172A',
      200: isLight ? '#E2E8F0' : '#1E293B',
      300: isLight ? '#CBD5E1' : '#334155',
      400: isLight ? '#94A3B8' : '#475569',
      500: isLight ? '#64748B' : '#64748B',
      600: isLight ? '#475569' : '#94A3B8',
      700: isLight ? '#334155' : '#CBD5E1',
      800: isLight ? '#1E293B' : '#E2E8F0',
      900: isLight ? '#0F172A' : '#F8FAFC',
    },
  };
};

export default palette;
