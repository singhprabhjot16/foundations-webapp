import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/Path';
import { CATEGORIES, CATEGORY_KEYS } from '../../constants/categories';
import { startQuiz } from '../../store/quizSessionSlice';
import { generateTablesQuestions } from '../../generators/tablesGenerator';
import { generateSquaresQuestions } from '../../generators/squaresGenerator';
import { generateCubesQuestions } from '../../generators/cubesGenerator';
import { generateFractionsQuestions } from '../../generators/fractionsGenerator';
import { generateVocabQuestions } from '../../generators/vocabularyGenerator';
import { generateTasteOfAllQuestions } from '../../generators/tasteOfAllGenerator';

/**
 * Countdown - 3, 2, 1, GO! pre-quiz screen
 * @component
 * @returns {JSX.Element}
 */
const Countdown = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = useSelector((state) => state.quizConfig);
  const [count, setCount] = useState(3);
  const category = CATEGORIES[config.categoryKey];

  useEffect(() => {
    if (!config.categoryKey) {
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [config.categoryKey, navigate]);

  useEffect(() => {
    if (count < 0) {
      // Generate questions based on category
      let questions;
      try {
        switch (config.categoryKey) {
          case CATEGORY_KEYS.TABLES:
            questions = generateTablesQuestions(config.numberOfQuestions);
            break;
          case CATEGORY_KEYS.SQUARES:
            questions = generateSquaresQuestions(config.numberOfQuestions);
            break;
          case CATEGORY_KEYS.CUBES:
            questions = generateCubesQuestions(config.numberOfQuestions);
            break;
          case CATEGORY_KEYS.FRACTIONS:
            questions = generateFractionsQuestions(config.numberOfQuestions);
            break;
          case CATEGORY_KEYS.VOCABULARY:
            questions = generateVocabQuestions(config.numberOfQuestions);
            break;
          case CATEGORY_KEYS.TASTE_OF_ALL:
            questions = generateTasteOfAllQuestions(config.numberOfQuestions);
            break;
          default:
            questions = generateTablesQuestions(config.numberOfQuestions);
        }
      } catch (error) {
        console.error('Error generating questions:', error);
        navigate(ROUTES.HOME, { replace: true });
        return;
      }

      dispatch(startQuiz({
        questions,
        totalTimeSeconds: config.totalTimeSeconds,
      }));

      navigate(ROUTES.QUIZ, { replace: true });
    }
  }, [count, config, dispatch, navigate]);

  const displayText = count > 0 ? String(count) : 'GO!';
  const accent = category?.accent || theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${accent} 0%, ${accent}DD 100%)`,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          color: '#FFFFFF',
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          lineHeight: 1,
          animation: 'scaleIn 0.4s ease-out',
          '@keyframes scaleIn': {
            '0%': { transform: 'scale(0.5)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
        }}
        key={count} // Force re-render for animation
      >
        {displayText}
      </Typography>
    </Box>
  );
};

export default Countdown;
