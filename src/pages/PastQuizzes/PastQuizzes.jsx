import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/Path';
import { loadHistory } from '../../store/historySlice';
import { isWithinMonths } from '../../utils/dateUtils';
import CategoryChart from '../../components/history/CategoryChart';
import QuizHistoryItem from '../../components/history/QuizHistoryItem';
import PageHeader from '../../components/common/PageHeader';
import BarChartIcon from '@mui/icons-material/BarChart';

const FILTER_OPTIONS = [
  { label: '1 Month', value: 1 },
  { label: '3 Months', value: 3 },
  { label: '6 Months', value: 6 },
];

const PastQuizzes = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { quizzes, isLoaded } = useSelector((s) => s.history);
  const [filterMonths, setFilterMonths] = useState(1);

  useEffect(() => { if (!isLoaded) dispatch(loadHistory()); }, [isLoaded, dispatch]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => isWithinMonths(q.generationTimestamp, filterMonths));
  }, [quizzes, filterMonths]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <PageHeader title="My Past Quizzes" backTo={ROUTES.HOME} />

      {/* Scrollable Content */}
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 }, flex: 1 }}>
        <ToggleButtonGroup
          value={filterMonths}
          exclusive
          onChange={(e, v) => { if (v !== null) setFilterMonths(v); }}
          sx={{
            mb: 3,
            display: 'flex',
            bgcolor: theme.palette.grey[100],
            borderRadius: '14px',
            p: '4px',
            '& .MuiToggleButtonGroup-grouped': {
              flex: 1,
              border: 'none !important',
              borderRadius: '11px !important',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'none',
              color: theme.palette.text.secondary,
              py: 1.2,
              transition: 'all 0.2s ease',
              '&.Mui-selected': {
                bgcolor: `${theme.palette.background.paper} !important`,
                color: `${theme.palette.text.primary} !important`,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 1px 4px rgba(0,0,0,0.4)'
                  : '0 1px 4px rgba(0,0,0,0.1)',
              },
              '&:hover': {
                bgcolor: 'transparent',
              },
            },
          }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>

        <CategoryChart quizzes={filteredQuizzes} sx={{ mb: 3, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }} />

        <Typography variant="overline" sx={{ fontWeight: 700, mb: 2, ml: 1.5, display: 'block', letterSpacing: '0.08em', color: theme.palette.text.secondary }}>History</Typography>
        {filteredQuizzes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, bgcolor: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <BarChartIcon sx={{ fontSize: 48, color: theme.palette.grey[300], mb: 1 }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>No quizzes taken in this period.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {filteredQuizzes.map((quiz) => (<QuizHistoryItem key={quiz.quizId} quiz={quiz} />))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PastQuizzes;
