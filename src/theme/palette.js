/**
 * Foundations App — Color Palette
 * Deep Indigo primary with category-specific accent colors.
 */
const palette = () => ({
  mode: 'light',
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
    default: '#F8F9FB',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    disabled: '#94A3B8',
  },
  divider: '#E2E8F0',
  grey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
});

export default palette;
