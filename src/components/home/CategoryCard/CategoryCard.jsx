import PropTypes from 'prop-types';
import { Box, Typography, Card as MuiCard, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridOnIcon from '@mui/icons-material/GridOn';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ICON_MAP = {
  GridOn: GridOnIcon,
  CropSquare: CropSquareIcon,
  ViewInAr: ViewInArIcon,
  PieChartOutline: PieChartOutlinedIcon,
  MenuBook: MenuBookIcon,
  AutoAwesome: AutoAwesomeIcon,
};

/**
 * CategoryCard - Displays a quiz category as a tappable card
 * @component
 * @param {Object} props
 * @param {Object} props.category - Category object from categories.js
 * @param {Function} props.onClick - Click handler
 * @param {Object} [props.sx] - Additional styles
 * @returns {JSX.Element}
 */
const CategoryCard = ({ category, onClick, sx = {} }) => {
  const theme = useTheme();
  const IconComponent = ICON_MAP[category.icon] || GridOnIcon;

  return (
    <MuiCard
      sx={{
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${category.accent}20`,
        },
        '&:active': {
          transform: 'translateY(-1px)',
        },
        ...sx,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          p: { xs: 2.5, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1.5,
          minHeight: { xs: 130, sm: 150 },
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: category.accentLight,
          }}
        >
          <IconComponent sx={{ fontSize: 26, color: category.accent }} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            lineHeight: 1.3,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {category.name}
        </Typography>
      </CardActionArea>
    </MuiCard>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    accentLight: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default CategoryCard;
