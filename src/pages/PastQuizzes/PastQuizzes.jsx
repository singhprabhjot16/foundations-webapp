import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../../routes/Path';
import { loadHistory } from '../../store/historySlice';
import { isWithinMonths } from '../../utils/dateUtils';
import CategoryChart from '../../components/history/CategoryChart';
import QuizHistoryItem from '../../components/history/QuizHistoryItem';

const FILTER_OPTIONS = [
  { label: '1 Month', value: 1 },
  { label: '3 Months', value: 3 },
  { label: '6 Months', value: 6 },
];

const PastQuizzes = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes, isLoaded } = useSelector((s) => s.history);
  const [filterMonths, setFilterMonths] = useState(1);

  useEffect(() => { if (!isLoaded) dispatch(loadHistory()); }, [isLoaded, dispatch]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => isWithinMonths(q.generationTimestamp, filterMonths));
  }, [quizzes, filterMonths]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <IconButton onClick={() => navigate(ROUTES.HOME)} aria-label="back"><ArrowBackIcon /></IconButton>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>My Past Quizzes</Typography>
        </Box>

        <ToggleButtonGroup value={filterMonths} exclusive onChange={(e, v) => { if (v !== null) setFilterMonths(v); }}
          sx={{ mb: 3, display: 'flex', '& .MuiToggleButtonGroup-grouped': { flex: 1, borderRadius: '20px !important', border: `1.5px solid ${theme.palette.grey[200]} !important`, fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', '&.Mui-selected': { bgcolor: `${theme.palette.primary.main} !important`, color: '#fff !important', borderColor: `${theme.palette.primary.main} !important` } } }}>
          {FILTER_OPTIONS.map((opt) => (<ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>))}
        </ToggleButtonGroup>

        <CategoryChart quizzes={filteredQuizzes} sx={{ mb: 3, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Quiz History</Typography>
        {filteredQuizzes.length === 0 ? (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 4 }}>No quizzes found for this period.</Typography>
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
