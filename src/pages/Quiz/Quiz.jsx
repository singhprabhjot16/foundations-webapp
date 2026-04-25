import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/Path';
import { QUIZ_MODES, CATEGORY_KEYS } from '../../constants/categories';
import { answerQuestion, skipQuestion, nextQuestion, tickTotalTimer, tickTpqTimer, consumeHint, endQuiz } from '../../store/quizSessionSlice';
import QuizHeader from '../../components/quiz/QuizHeader';
import ProgressRing from '../../components/common/ProgressRing';
import QuestionCard from '../../components/quiz/QuestionCard';
import AnswerOption from '../../components/quiz/AnswerOption';
import ActionBar from '../../components/quiz/ActionBar';
import HintPopover from '../../components/common/HintPopover';

const Quiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = useSelector((s) => s.quizConfig);
  const session = useSelector((s) => s.quizSession);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [hintOpen, setHintOpen] = useState(false);
  const timerRef = useRef(null);
  const { questions, currentQuestionIndex, hintsRemaining, hintsConsumedQuestions, totalTimeRemaining, tpqTimeElapsed, isTpqExceeded, isQuizActive } = session;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isQuickFire = config.quizMode === QUIZ_MODES.QUICK_FIRE;

  useEffect(() => { if (!isQuizActive && questions.length === 0) navigate(ROUTES.HOME, { replace: true }); }, [isQuizActive, questions.length, navigate]);

  useEffect(() => {
    if (!isQuizActive) return;
    timerRef.current = setInterval(() => {
      dispatch(tickTotalTimer());
      if (!isQuickFire) dispatch(tickTpqTimer({ tpqSeconds: config.tpqSeconds }));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isQuizActive, isQuickFire, config.tpqSeconds, dispatch]);

  const handleFinishQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    dispatch(endQuiz());
    navigate(ROUTES.RESULTS, { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => { if (totalTimeRemaining <= 0 && isQuizActive) handleFinishQuiz(); }, [totalTimeRemaining, isQuizActive, handleFinishQuiz]);
  useEffect(() => { setSelectedAnswerId(null); }, [currentQuestionIndex]);

  const handleSelectAnswer = useCallback((answerId) => { setSelectedAnswerId(answerId); if (currentQuestion) dispatch(answerQuestion({ questionId: currentQuestion.questionId, answerId })); }, [currentQuestion, dispatch]);
  const handleSkip = useCallback(() => { if (currentQuestion) dispatch(skipQuestion({ questionId: currentQuestion.questionId })); if (isLastQuestion) handleFinishQuiz(); else dispatch(nextQuestion()); }, [currentQuestion, isLastQuestion, dispatch, handleFinishQuiz]);
  const handleNext = useCallback(() => { if (isLastQuestion) handleFinishQuiz(); else dispatch(nextQuestion()); }, [isLastQuestion, dispatch, handleFinishQuiz]);
  const handleHintClick = useCallback(() => { if (currentQuestion && hintsRemaining > 0 && !hintsConsumedQuestions.includes(currentQuestion.questionId)) dispatch(consumeHint({ questionId: currentQuestion.questionId })); setHintOpen(true); }, [currentQuestion, hintsRemaining, hintsConsumedQuestions, dispatch]);

  const isHintAvailable = currentQuestion?.categoryType === CATEGORY_KEYS.VOCABULARY && currentQuestion?.hint;
  if (!currentQuestion) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <QuizHeader currentIndex={currentQuestionIndex} totalQuestions={questions.length} totalTimeRemaining={totalTimeRemaining} hintsRemaining={hintsRemaining} onHintClick={handleHintClick} isHintAvailable={!!isHintAvailable} />
      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 } }}>
        {!isQuickFire && (<Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><ProgressRing elapsed={tpqTimeElapsed} total={config.tpqSeconds} isExceeded={isTpqExceeded} size={120} strokeWidth={8} /></Box>)}
        <QuestionCard questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} questionText={currentQuestion.questionDescription} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, px: { xs: 2, sm: 3 }, py: 2, flex: 1 }}>
          {currentQuestion.possibleAnswers.map((option, idx) => (<AnswerOption key={option.answerId} index={idx} answerValue={option.answerValue} isSelected={selectedAnswerId === option.answerId} onClick={() => handleSelectAnswer(option.answerId)} />))}
        </Box>
      </Container>
      <ActionBar hasSelected={!!selectedAnswerId} isLastQuestion={isLastQuestion} onSkip={handleSkip} onNext={handleNext} />
      <HintPopover open={hintOpen} hintText={currentQuestion.hint} hintsRemaining={hintsRemaining} onClose={() => setHintOpen(false)} />
    </Box>
  );
};

export default Quiz;
