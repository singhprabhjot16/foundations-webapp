import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * LoadingScreen - Full-screen loading component shown during lazy load
 * @component
 * @returns {JSX.Element}
 */
const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        sx={{ color: theme.palette.primary.main }}
      />
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
