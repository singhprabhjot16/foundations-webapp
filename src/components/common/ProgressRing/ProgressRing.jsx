import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * ProgressRing - SVG circular progress timer for per-question countdown
 * @component
 * @param {Object} props
 * @param {number} props.elapsed - Seconds elapsed on current question
 * @param {number} props.total - Total TPQ seconds
 * @param {number} [props.size=140] - Ring size in px
 * @param {number} [props.strokeWidth=8] - Stroke width
 * @param {boolean} [props.isExceeded=false] - Whether TPQ is exceeded
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const ProgressRing = ({ elapsed, total, size = 140, strokeWidth = 8, isExceeded = false, sx = {} }) => {
  const theme = useTheme();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const remaining = Math.max(0, total - elapsed);
  const progress = total > 0 ? remaining / total : 1;
  const strokeDashoffset = circumference * (1 - progress);

  const ringColor = isExceeded ? theme.palette.error.main : theme.palette.primary.main;
  const bgColor = isExceeded ? theme.palette.error.light + '30' : theme.palette.grey[200];

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: isExceeded ? 'pulse 1s ease-in-out infinite' : 'none',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        ...sx,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
        />
      </svg>
      {/* Center text */}
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: ringColor,
            fontFamily: '"Inter", monospace',
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        >
          {remaining}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, fontSize: '0.65rem' }}
        >
          sec
        </Typography>
      </Box>
    </Box>
  );
};

ProgressRing.propTypes = {
  elapsed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  isExceeded: PropTypes.bool,
  sx: PropTypes.object,
};

export default ProgressRing;
