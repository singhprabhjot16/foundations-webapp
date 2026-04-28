import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../routes/Path';
import { loadStreak } from '../../store/streakSlice';
import { loadHistory } from '../../store/historySlice';
import GridOnIcon from '@mui/icons-material/GridOn';

/**
 * Splash - App entry screen with logo, name, tagline, and auto-redirect.
 * Uses position: fixed + height: 100% to avoid layout issues in WebView.
 * @component
 * @returns {JSX.Element}
 */
const Splash = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initialize app state
    dispatch(loadStreak());
    dispatch(loadHistory());

    // Fade in
    const fadeTimer = setTimeout(() => setVisible(true), 100);

    // Auto-navigate after 2.5 seconds
    const navTimer = setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true });
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, dispatch]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        px: 3,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: 4,
          bgcolor: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          backdropFilter: 'blur(10px)',
        }}
      >
        <GridOnIcon sx={{ fontSize: 48, color: '#FFFFFF' }} />
      </Box>

      {/* App name */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: '#FFFFFF',
          mb: 1.5,
          letterSpacing: '-0.02em',
          fontSize: { xs: '2rem', sm: '2.5rem' },
        }}
      >
        Foundations
      </Typography>

      {/* Tagline */}
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          maxWidth: 320,
          lineHeight: 1.6,
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        Build Speed. Build Accuracy. Build Confidence.
      </Typography>
    </Box>
  );
};

export default Splash;
