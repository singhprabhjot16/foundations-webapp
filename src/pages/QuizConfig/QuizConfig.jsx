import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, Switch, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/Path';
import { CATEGORIES, QUIZ_MODES, TOTAL_TIME_OPTIONS, TPQ_OPTIONS, NUM_QUESTIONS_OPTIONS } from '../../constants/categories';
import { setTotalTime, setTpq, setNumberOfQuestions, toggleQuickFire } from '../../store/quizConfigSlice';
import ChipSelector from '../../components/common/ChipSelector';
import PageHeader from '../../components/common/PageHeader';

/**
 * QuizConfig - Configuration screen for quiz parameters
 * @component
 * @returns {JSX.Element}
 */
const QuizConfig = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = useSelector((state) => state.quizConfig);
  const category = CATEGORIES[config.categoryKey];

  if (!category) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  const isQuickFire = config.quizMode === QUIZ_MODES.QUICK_FIRE;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sticky Header */}
      <PageHeader title={category.name} backTo={ROUTES.HOME} />

      {/* Scrollable Content */}
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 }, flex: 1 }}>
        {/* Config sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <ChipSelector
            label="No. of Questions"
            options={NUM_QUESTIONS_OPTIONS}
            value={config.numberOfQuestions}
            onChange={(val) => dispatch(setNumberOfQuestions(val))}
          />

          <ChipSelector
            label="Total Time"
            options={TOTAL_TIME_OPTIONS}
            value={config.totalTimeSeconds}
            onChange={(val) => dispatch(setTotalTime(val))}
          />

          <ChipSelector
            label="Time Per Question (TPQ)"
            options={TPQ_OPTIONS}
            value={config.tpqSeconds}
            onChange={(val) => dispatch(setTpq(val))}
            sx={{
              opacity: isQuickFire ? 0.5 : 1,
              pointerEvents: isQuickFire ? 'none' : 'auto',
            }}
          />

          {/* Quick Fire Mode — placed right after TPQ */}
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 3,
              p: { xs: 2.5, sm: 3 },
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                Quick Fire Mode
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
                No per-question timer — race against total time only.
              </Typography>
            </Box>
            <Switch
              checked={isQuickFire}
              onChange={() => dispatch(toggleQuickFire())}
              aria-label="toggle quick fire mode"
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: '#FFFFFF',
                },
                '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                  backgroundColor: '#FFFFFF',
                },
              }}
            />
          </Box>
        </Box>

        {/* Start Quiz CTA */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate(ROUTES.COUNTDOWN)}
          sx={{
            py: 2,
            borderRadius: 3,
            fontSize: '1.0625rem',
            fontWeight: 700,
            mt: 1,
          }}
        >
          Start Quiz
        </Button>
      </Container>
    </Box>
  );
};

export default QuizConfig;
