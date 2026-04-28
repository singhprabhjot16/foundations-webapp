import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CATEGORIES, CATEGORY_KEYS } from '../../../constants/categories';
import GridOnIcon from '@mui/icons-material/GridOn';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const ICON_MAP = {
  GridOn: GridOnIcon,
  CropSquare: CropSquareIcon,
  ViewInAr: ViewInArIcon,
  PieChartOutline: PieChartOutlinedIcon,
  MenuBook: MenuBookIcon,
};

const CHART_CATEGORIES = [
  CATEGORY_KEYS.TABLES,
  CATEGORY_KEYS.SQUARES,
  CATEGORY_KEYS.CUBES,
  CATEGORY_KEYS.FRACTIONS,
  CATEGORY_KEYS.VOCABULARY,
];

/**
 * CategoryChart - Horizontal bar chart rows showing accuracy per category
 * Each row: icon | name | colored bar | accuracy %
 * @component
 */
const CategoryChart = ({ quizzes, sx = {} }) => {
  const theme = useTheme();

  // Calculate accuracy per category
  const chartData = CHART_CATEGORIES.map((catKey) => {
    const cat = CATEGORIES[catKey];
    let totalCorrect = 0;
    let totalAttempted = 0;

    quizzes.forEach((quiz) => {
      if (quiz.questions) {
        quiz.questions.forEach((q) => {
          if (q.categoryType === catKey) {
            totalAttempted++;
            if (q.isCorrect) totalCorrect++;
          }
        });
      }
    });

    return {
      key: catKey,
      name: cat.shortName,
      accuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      color: cat.accent,
      accentLight: cat.accentLight,
      icon: cat.icon,
      hasData: totalAttempted > 0,
    };
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Typography
        variant="overline"
        sx={{
          fontWeight: 700,
          mb: 2.5,
          display: 'block',
          letterSpacing: '0.08em',
          color: theme.palette.text.secondary,
        }}
      >
        Category Accuracy
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {chartData.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || GridOnIcon;

          return (
            <Box key={item.key}>
              {/* Row: Icon + Name + Percentage */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 0.75,
                }}
              >
                {/* Category icon */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: item.accentLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComponent sx={{ fontSize: 16, color: item.color }} />
                </Box>

                {/* Category name */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    flex: 1,
                    fontSize: '0.85rem',
                  }}
                >
                  {item.name}
                </Typography>

                {/* Accuracy value */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: item.hasData ? item.color : theme.palette.grey[400],
                    fontSize: '0.85rem',
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {item.hasData ? `${item.accuracy}%` : '—'}
                </Typography>
              </Box>

              {/* Horizontal bar */}
              <Box
                sx={{
                  width: '100%',
                  height: 6,
                  borderRadius: 3,
                  bgcolor: theme.palette.grey[100],
                  overflow: 'hidden',
                  ml: '44px', // align with text (32px icon + 12px gap)
                  maxWidth: 'calc(100% - 44px)',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${item.accuracy}%`,
                    borderRadius: 3,
                    bgcolor: item.color,
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: item.hasData && item.accuracy > 0 ? 4 : 0,
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

CategoryChart.propTypes = {
  quizzes: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default CategoryChart;
