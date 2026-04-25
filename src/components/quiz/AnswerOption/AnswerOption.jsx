import PropTypes from 'prop-types';
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

/**
 * AnswerOption - Tappable MCQ option card
 * @component
 */
const AnswerOption = ({ index, answerValue, isSelected, onClick, sx = {} }) => {
  const theme = useTheme();
  const label = OPTION_LABELS[index] || String(index + 1);

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        p: { xs: 1.5, sm: 2 },
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        minHeight: 56,
        transition: 'all 0.2s ease',
        border: isSelected
          ? `2px solid ${theme.palette.primary.main}`
          : `1.5px solid ${theme.palette.divider}`,
        bgcolor: isSelected ? `${theme.palette.primary.main}08` : theme.palette.background.paper,
        boxShadow: isSelected
          ? `0 2px 12px ${theme.palette.primary.main}20`
          : '0 1px 2px rgba(0,0,0,0.04)',
        '&:hover': {
          borderColor: theme.palette.primary.light,
          bgcolor: `${theme.palette.primary.main}05`,
        },
        '&:active': {
          transform: 'scale(0.99)',
        },
        ...sx,
      }}
    >
      {/* Option label circle */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isSelected ? theme.palette.primary.main : theme.palette.grey[100],
          color: isSelected ? '#FFFFFF' : theme.palette.text.secondary,
          fontWeight: 700,
          fontSize: '0.875rem',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        {label}
      </Box>
      {/* Answer text */}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: isSelected ? 600 : 400,
          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          lineHeight: 1.5,
        }}
      >
        {answerValue}
      </Typography>
    </Card>
  );
};

AnswerOption.propTypes = {
  index: PropTypes.number.isRequired,
  answerValue: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default AnswerOption;
