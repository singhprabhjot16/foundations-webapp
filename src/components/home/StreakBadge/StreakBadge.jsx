import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

/**
 * StreakBadge - Displays the user's daily streak count
 * @component
 * @param {Object} props
 * @param {number} props.streakCount - Number of consecutive days
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const StreakBadge = ({ streakCount, sx = {} }) => {
  const theme = useTheme();

  if (streakCount <= 0) return null;

  return (
    <Chip
      icon={<LocalFireDepartmentIcon sx={{ color: '#F97316 !important', fontSize: 20 }} />}
      label={
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#F97316' }}>
          {streakCount} Day{streakCount !== 1 ? 's' : ''}
        </Typography>
      }
      variant="outlined"
      sx={{
        borderColor: '#FDBA74',
        bgcolor: '#FFF7ED',
        borderRadius: 20,
        px: 1,
        height: 36,
        '& .MuiChip-icon': {
          marginLeft: '4px',
        },
        ...sx,
      }}
    />
  );
};

StreakBadge.propTypes = {
  streakCount: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default StreakBadge;
