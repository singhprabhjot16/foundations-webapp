import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { CATEGORIES, CATEGORY_KEYS } from '../../../constants/categories';

const CHART_CATEGORIES = [
  CATEGORY_KEYS.TABLES,
  CATEGORY_KEYS.SQUARES,
  CATEGORY_KEYS.CUBES,
  CATEGORY_KEYS.FRACTIONS,
  CATEGORY_KEYS.VOCABULARY,
];

/**
 * CategoryChart - Bar chart showing accuracy per category
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
      category: cat.shortName,
      accuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      color: cat.accent,
    };
  });

  const hasData = chartData.some((d) => d.accuracy > 0);

  if (!hasData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, ...sx }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          No quiz data available for this period.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
        Category-wise Accuracy
      </Typography>
      <BarChart
        xAxis={[{
          scaleType: 'band',
          data: chartData.map((d) => d.category),
          tickLabelStyle: {
            fontSize: 11,
            fontWeight: 500,
          },
        }]}
        series={[{
          data: chartData.map((d) => d.accuracy),
          color: theme.palette.primary.main,
          label: 'Accuracy %',
        }]}
        yAxis={[{
          min: 0,
          max: 100,
          tickLabelStyle: {
            fontSize: 11,
          },
        }]}
        height={220}
        margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
        sx={{
          '& .MuiChartsAxis-line': { stroke: theme.palette.divider },
          '& .MuiChartsAxis-tick': { stroke: theme.palette.divider },
        }}
      />
    </Box>
  );
};

CategoryChart.propTypes = {
  quizzes: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default CategoryChart;
