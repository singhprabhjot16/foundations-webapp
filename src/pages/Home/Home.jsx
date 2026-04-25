import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridOnIcon from '@mui/icons-material/GridOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ROUTES } from '../../routes/Path';
import { CATEGORIES, CATEGORY_ORDER } from '../../constants/categories';
import { setCategory, resetConfig } from '../../store/quizConfigSlice';
import { loadStreak } from '../../store/streakSlice';
import { loadHistory } from '../../store/historySlice';
import CategoryCard from '../../components/home/CategoryCard';
import StreakBadge from '../../components/home/StreakBadge';

/**
 * Home - Central hub with category grid and streak badge
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const streakCount = useSelector((state) => state.streak.streakCount);
  const isLoaded = useSelector((state) => state.history.isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadHistory());
      dispatch(loadStreak());
    }
  }, [dispatch, isLoaded]);

  const handleCategoryClick = (categoryKey) => {
    dispatch(resetConfig());
    dispatch(setCategory(categoryKey));
    navigate(ROUTES.QUIZ_CONFIG);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                bgcolor: theme.palette.primary.main + '12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GridOnIcon sx={{ fontSize: 22, color: theme.palette.primary.main }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: theme.palette.text.primary }}
            >
              Foundations
            </Typography>
          </Box>
          <StreakBadge streakCount={streakCount} />
        </Box>

        {/* Section label */}
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            display: 'block',
            letterSpacing: '0.1em',
          }}
        >
          Select a Category
        </Typography>

        {/* Category Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
            gap: { xs: 1.5, sm: 2 },
            mb: 4,
          }}
        >
          {CATEGORY_ORDER.map((key) => (
            <CategoryCard
              key={key}
              category={CATEGORIES[key]}
              onClick={() => handleCategoryClick(key)}
            />
          ))}
        </Box>

        {/* My Past Quizzes Button */}
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<BarChartIcon />}
          onClick={() => navigate(ROUTES.PAST_QUIZZES)}
          sx={{
            borderRadius: 3,
            py: 2,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            fontWeight: 600,
            '&:hover': {
              borderColor: theme.palette.primary.light,
              bgcolor: `${theme.palette.primary.main}05`,
            },
          }}
        >
          My Past Quizzes
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
