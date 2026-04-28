import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/**
 * PageHeader - Sticky top bar with back button and page title.
 * Stays fixed at the top while page content scrolls beneath it.
 * @component
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} [props.backTo] - Route path for back navigation (omit to hide back button)
 * @param {React.ReactNode} [props.trailing] - Optional trailing content (e.g. StreakBadge)
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const PageHeader = ({ title, backTo, trailing, sx = {} }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 1.75, sm: 2.25 },
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

      {/* Optional trailing element */}
      {trailing && trailing}
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string,
  trailing: PropTypes.node,
  sx: PropTypes.object,
};

export default PageHeader;
