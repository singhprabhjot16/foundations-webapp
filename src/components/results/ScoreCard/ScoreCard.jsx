import PropTypes from 'prop-types';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CATEGORIES, QUIZ_MODES } from '../../../constants/categories';
import { formatTime } from '../../../utils/dateUtils';

/**
 * ScoreCard - Displays quiz results summary
 * @component
 */
const ScoreCard = ({ quizResult, sx = {} }) => {
  const theme = useTheme();
  const { score, totalQuestions, categoryKey, quizMode, hintsUsed, timeElapsedSeconds, config } = quizResult;
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const category = CATEGORIES[categoryKey];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.primary.light}12 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        ...sx,
      }}
    >
      <EmojiEventsIcon
        sx={{
          fontSize: 48,
          color: accuracy >= 70 ? '#F59E0B' : theme.palette.grey[400],
          mb: 1,
        }}
      />
      <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.primary.main, mb: 0.5 }}>
        {score} / {totalQuestions}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.secondary, mb: 3 }}>
        {accuracy}% Accuracy
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
        <Chip
          icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
          label={formatTime(timeElapsedSeconds)}
          size="small"
          variant="outlined"
        />
        <Chip
          label={`Hints: ${hintsUsed} / 3`}
          size="small"
          variant="outlined"
        />
        <Chip
          label={category?.shortName || categoryKey}
          size="small"
          sx={{ bgcolor: category?.accentLight, color: category?.accent, fontWeight: 600 }}
        />
        <Chip
          label={quizMode === QUIZ_MODES.QUICK_FIRE ? 'Quick Fire' : 'Standard'}
          size="small"
          variant="outlined"
          sx={{ borderColor: theme.palette.primary.light }}
        />
      </Box>
    </Paper>
  );
};

ScoreCard.propTypes = {
  quizResult: PropTypes.object.isRequired,
  sx: PropTypes.object,
};

export default ScoreCard;
