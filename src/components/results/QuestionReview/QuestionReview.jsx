import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlined';

/**
 * QuestionReview - Single question review showing user vs correct answer
 * @component
 */
const QuestionReview = ({ question, index, sx = {} }) => {
  const theme = useTheme();
  const { questionDescription, correctAnswer, userAnswer, isCorrect, isSkipped, categoryType } = question;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSkipped ? (
            <RemoveCircleOutlineIcon sx={{ color: theme.palette.grey[400], fontSize: 20 }} />
          ) : isCorrect ? (
            <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
          ) : (
            <CancelIcon sx={{ color: theme.palette.error.main, fontSize: 20 }} />
          )}
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Q{index + 1}
          </Typography>
        </Box>
        <Chip
          label={categoryType}
          size="small"
          sx={{
            fontSize: '0.65rem',
            height: 22,
            fontWeight: 600,
            bgcolor: theme.palette.grey[100],
            color: theme.palette.text.secondary,
          }}
        />
      </Box>

      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5, color: theme.palette.text.primary }}>
        {questionDescription}
      </Typography>

      {/* User answer */}
      {isSkipped ? (
        <Typography variant="caption" sx={{ color: theme.palette.grey[500], fontStyle: 'italic' }}>
          Skipped
        </Typography>
      ) : (
        <Box sx={{ mb: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: isCorrect ? theme.palette.success.main : theme.palette.error.main,
              fontWeight: 600,
            }}
          >
            Your answer:{' '}
            <Typography component="span" variant="caption" sx={{ fontWeight: 400 }}>
              {userAnswer?.answerValue || '—'}
            </Typography>
          </Typography>
        </Box>
      )}

      {/* Correct answer (shown if wrong or skipped) */}
      {(!isCorrect || isSkipped) && (
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
            Correct:{' '}
            <Typography component="span" variant="caption" sx={{ fontWeight: 400 }}>
              {correctAnswer?.answerValue || '—'}
            </Typography>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

QuestionReview.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default QuestionReview;
