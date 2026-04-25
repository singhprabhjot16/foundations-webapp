import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * ActionBar - Bottom bar with Skip and Next/Finish buttons
 * @component
 */
const ActionBar = ({ hasSelected, isLastQuestion, onSkip, onNext, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        px: { xs: 2, sm: 3 },
        py: 2,
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        bottom: 0,
        ...sx,
      }}
    >
      <Button
        variant="outlined"
        onClick={onSkip}
        startIcon={<SkipNextIcon />}
        sx={{
          flex: 1,
          borderRadius: 3,
          py: 1.5,
          borderColor: theme.palette.grey[300],
          color: theme.palette.text.secondary,
          '&:hover': {
            borderColor: theme.palette.grey[400],
            bgcolor: theme.palette.grey[50],
          },
        }}
      >
        Skip
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={!hasSelected}
        endIcon={isLastQuestion ? <CheckCircleIcon /> : <ArrowForwardIcon />}
        sx={{
          flex: 2,
          borderRadius: 3,
          py: 1.5,
        }}
      >
        {isLastQuestion ? 'Finish Quiz' : 'Next'}
      </Button>
    </Box>
  );
};

ActionBar.propTypes = {
  hasSelected: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  onSkip: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default ActionBar;
