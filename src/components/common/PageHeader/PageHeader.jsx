import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useThemeMode } from '../../../theme/ThemeModeContext';

/**
 * PageHeader - Sticky top bar with back button, page title, and optional dark mode toggle.
 * Stays fixed at the top while page content scrolls beneath it.
 * @component
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} [props.backTo] - Route path for back navigation (omit to hide back button)
 * @param {React.ReactNode} [props.trailing] - Optional trailing content (e.g. StreakBadge)
 * @param {boolean} [props.showThemeToggle] - Whether to show the dark/light mode toggle
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const PageHeader = ({ title, backTo, trailing, showThemeToggle = false, sx = {} }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 1.5, sm: 2 },
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        ...sx,
      }}
    >
      {/* Back button */}
      {backTo && (
        <IconButton
          onClick={() => navigate(backTo)}
          aria-label="go back"
          size="small"
          sx={{
            color: theme.palette.text.primary,
            mr: 0.5,
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          flex: 1,
          fontSize: { xs: '1.05rem', sm: '1.2rem' },
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>

      {/* Dark mode switch */}
      {showThemeToggle && (
        <Switch
          checked={isDark}
          onChange={toggleMode}
          aria-label="toggle dark mode"
          icon={
            <Box sx={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              bgcolor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}>
              <LightModeRoundedIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
            </Box>
          }
          checkedIcon={
            <Box sx={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              bgcolor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}>
              <DarkModeRoundedIcon sx={{ fontSize: 14, color: theme.palette.primary.dark }} />
            </Box>
          }
          sx={{
            width: 48,
            height: 28,
            p: 0,
            '& .MuiSwitch-switchBase': {
              p: '3px',
              '&.Mui-checked': {
                transform: 'translateX(20px)',
                '& + .MuiSwitch-track': {
                  bgcolor: `${theme.palette.primary.dark} !important`,
                  opacity: '1 !important',
                },
              },
            },
            '& .MuiSwitch-track': {
              borderRadius: 14,
              bgcolor: '#F59E0B !important',
              opacity: '1 !important',
            },
          }}
        />
      )}

      {/* Optional trailing element */}
      {trailing && trailing}
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string,
  trailing: PropTypes.node,
  showThemeToggle: PropTypes.bool,
  sx: PropTypes.object,
};

export default PageHeader;
