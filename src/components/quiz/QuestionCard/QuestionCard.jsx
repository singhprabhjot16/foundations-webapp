import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * QuestionCard - Displays the current question text
 * @component
 */
const QuestionCard = ({ questionNumber, totalQuestions, questionText, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
        ...sx,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: theme.palette.text.secondary,
          mb: 1,
          display: 'block',
        }}
      >
        Question {questionNumber} of {totalQuestions}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          lineHeight: 1.4,
          fontSize: { xs: '1.15rem', sm: '1.35rem', md: '1.5rem' },
        }}
      >
        {questionText}
      </Typography>
    </Box>
  );
};

QuestionCard.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default QuestionCard;
