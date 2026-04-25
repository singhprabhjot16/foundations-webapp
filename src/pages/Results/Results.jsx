import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import { ROUTES } from '../../routes/Path';
import { MAX_HINTS } from '../../constants/categories';
import { setResults } from '../../store/resultsSlice';
import { addQuizToHistory } from '../../store/historySlice';
import { recordQuizCompletion } from '../../store/streakSlice';
import { resetSession } from '../../store/quizSessionSlice';
import { generateUUID } from '../../utils/uuid';
import ScoreCard from '../../components/results/ScoreCard';
import QuestionReview from '../../components/results/QuestionReview';

const Results = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = useSelector((s) => s.quizConfig);
  const session = useSelector((s) => s.quizSession);
  const storedResult = useSelector((s) => s.results.quizResult);

  const quizResult = useMemo(() => {
    if (storedResult) return storedResult;
    if (!session.questions.length) return null;
    const questions = session.questions.map((q) => {
      const userAnswerId = session.answerMap[q.questionId];
      const isSkipped = userAnswerId === null || userAnswerId === undefined;
      const userAnswer = isSkipped ? null : q.possibleAnswers.find((o) => o.answerId === userAnswerId) || null;
      const isCorrect = !isSkipped && userAnswer?.answerId === q.correctAnswer.answerId;
      return { ...q, userAnswer, isCorrect, isSkipped };
    });
    const score = questions.filter((q) => q.isCorrect).length;
    const totalElapsed = config.totalTimeSeconds - session.totalTimeRemaining;
    return {
      quizId: generateUUID(),
      generationTimestamp: session.quizStartTimestamp || new Date().toISOString(),
      categoryKey: config.categoryKey,
      quizMode: config.quizMode,
      config: { totalTimeSeconds: config.totalTimeSeconds, tpqSeconds: config.tpqSeconds, numberOfQuestions: config.numberOfQuestions },
      score, totalQuestions: questions.length,
      hintsUsed: MAX_HINTS - session.hintsRemaining,
      timeElapsedSeconds: totalElapsed,
      questions,
    };
  }, [session, config, storedResult]);

  useEffect(() => {
    if (!quizResult) { navigate(ROUTES.HOME, { replace: true }); return; }
    if (!storedResult) {
      dispatch(setResults(quizResult));
      dispatch(addQuizToHistory(quizResult));
      dispatch(recordQuizCompletion());
    }
  }, [quizResult, storedResult, dispatch, navigate]);

  if (!quizResult) return null;

  const handleRetake = () => { dispatch(resetSession()); navigate(ROUTES.COUNTDOWN); };
  const handleHome = () => { dispatch(resetSession()); dispatch(setResults(null)); navigate(ROUTES.HOME); };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 3 }}>Quiz Complete!</Typography>
        <ScoreCard quizResult={quizResult} sx={{ mb: 4 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="outlined" startIcon={<ReplayIcon />} onClick={handleRetake} sx={{ flex: 1, borderRadius: 3, py: 1.5 }}>Retake</Button>
          <Button variant="contained" startIcon={<HomeIcon />} onClick={handleHome} sx={{ flex: 1, borderRadius: 3, py: 1.5 }}>Home</Button>
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Question Review</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {quizResult.questions.map((q, idx) => (<QuestionReview key={q.questionId} question={q} index={idx} />))}
        </Box>
      </Container>
    </Box>
  );
};

export default Results;
