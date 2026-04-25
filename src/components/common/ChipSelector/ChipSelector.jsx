import PropTypes from 'prop-types';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * ChipSelector - Reusable toggle chip group for selecting config values
 * @component
 * @param {Object} props
 * @param {string} props.label - Section label
 * @param {Array} props.options - Array of { label, value }
 * @param {*} props.value - Currently selected value
 * @param {Function} props.onChange - Change handler receiving new value
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const ChipSelector = ({ label, options, value, onChange, sx = {} }) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        border: `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 2,
        }}
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label={label}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiToggleButtonGroup-grouped': {
            border: `1.5px solid ${theme.palette.grey[200]} !important`,
            borderRadius: '24px !important',
            px: { xs: 2, sm: 3 },
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              bgcolor: `${theme.palette.primary.main} !important`,
              color: '#FFFFFF !important',
              borderColor: `${theme.palette.primary.main} !important`,
              boxShadow: `0 2px 8px ${theme.palette.primary.main}40`,
            },
            '&:hover': {
              bgcolor: theme.palette.grey[50],
            },
          },
        }}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            value={option.value}
            aria-label={option.label}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

ChipSelector.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default ChipSelector;
