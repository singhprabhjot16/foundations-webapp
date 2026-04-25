/**
 * Foundations App — MUI Component Overrides
 * @param {Object} theme - MUI theme object
 * @returns {Object} Component overrides
 */
const ComponentOverrides = (theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 12,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '0.9375rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        background: theme.gradient.primary,
        '&:hover': {
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        },
      },
      sizeLarge: {
        padding: '14px 32px',
        fontSize: '1.0625rem',
        borderRadius: 16,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontWeight: 500,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 52,
        height: 30,
        padding: 0,
      },
      switchBase: {
        padding: 3,
        '&.Mui-checked': {
          transform: 'translateX(22px)',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.primary.main,
            opacity: 1,
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      },
      track: {
        borderRadius: 15,
        backgroundColor: theme.palette.grey[300],
        opacity: 1,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
    },
  },
});

export default ComponentOverrides;
