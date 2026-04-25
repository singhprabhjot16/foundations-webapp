import PropTypes from 'prop-types';
import { Box, Typography, Chip, Collapse, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { CATEGORIES, QUIZ_MODES } from '../../../constants/categories';
import { formatDate } from '../../../utils/dateUtils';
import QuestionReview from '../../results/QuestionReview';

/**
 * QuizHistoryItem - Past quiz list item with expandable review
 * @component
 */
const QuizHistoryItem = ({ quiz, sx = {} }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const category = CATEGORIES[quiz.categoryKey];
  const accuracy = quiz.totalQuestions > 0 ? Math.round((quiz.score / quiz.totalQuestions) * 100) : 0;

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: { xs: 2, sm: 2.5 },
          '&:hover': { bgcolor: theme.palette.grey[50] },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Chip
              label={category?.shortName || quiz.categoryKey}
              size="small"
              sx={{
                bgcolor: category?.accentLight,
                color: category?.accent,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
            <Chip
              label={quiz.quizMode === QUIZ_MODES.QUICK_FIRE ? 'Quick Fire' : 'Standard'}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.65rem', height: 22 }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
            {formatDate(quiz.generationTimestamp)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {quiz.score}/{quiz.totalQuestions}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: accuracy >= 70 ? theme.palette.success.main : theme.palette.error.main,
                fontWeight: 600,
              }}
            >
              {accuracy}%
            </Typography>
          </Box>
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {quiz.questions?.map((q, idx) => (
            <QuestionReview key={q.questionId} question={q} index={idx} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

QuizHistoryItem.propTypes = {
  quiz: PropTypes.object.isRequired,
  sx: PropTypes.object,
};

export default QuizHistoryItem;
