import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import { formatTime } from '../../../utils/dateUtils';

/**
 * QuizHeader - Top bar showing question counter, total time, and hint button
 * @component
 */
const QuizHeader = ({ currentIndex, totalQuestions, totalTimeRemaining, hintsRemaining, onHintClick, isHintAvailable }) => {
  const theme = useTheme();
  const isLowTime = totalTimeRemaining < 60;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3 },
        py: 1.5,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Question counter */}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, color: theme.palette.text.primary, minWidth: 60 }}
      >
        Q {currentIndex + 1} / {totalQuestions}
      </Typography>

      {/* Total time */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontFamily: '"Inter", monospace',
          color: isLowTime ? theme.palette.error.main : theme.palette.text.primary,
          animation: isLowTime ? 'blink 1s step-end infinite' : 'none',
          '@keyframes blink': {
            '50%': { opacity: 0.4 },
          },
        }}
      >
        {formatTime(totalTimeRemaining)}
      </Typography>

      {/* Hint button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton
          onClick={onHintClick}
          disabled={!isHintAvailable || hintsRemaining <= 0}
          aria-label="use hint"
          sx={{
            color: isHintAvailable && hintsRemaining > 0
              ? theme.palette.warning.main
              : theme.palette.grey[400],
          }}
        >
          <Badge
            badgeContent={hintsRemaining}
            color="warning"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.65rem',
                minWidth: 18,
                height: 18,
              },
            }}
          >
            <HelpOutlineIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

QuizHeader.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  totalTimeRemaining: PropTypes.number.isRequired,
  hintsRemaining: PropTypes.number.isRequired,
  onHintClick: PropTypes.func.isRequired,
  isHintAvailable: PropTypes.bool.isRequired,
};

export default QuizHeader;
