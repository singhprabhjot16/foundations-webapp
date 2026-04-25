import { createSlice } from '@reduxjs/toolkit';
import { MAX_HINTS } from '../constants/categories';

/**
 * quizSessionSlice — Active quiz state: questions, answers, timers, hints.
 */
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answerMap: {},           // { questionId: answerId | null (skipped) }
  hintsRemaining: MAX_HINTS,
  hintsConsumedQuestions: [],
  totalTimeRemaining: 0,   // seconds
  tpqTimeElapsed: 0,       // seconds elapsed for current question
  isTpqExceeded: false,
  isQuizActive: false,
  quizStartTimestamp: null,
};

const quizSessionSlice = createSlice({
  name: 'quizSession',
  initialState,
  reducers: {
    startQuiz(state, action) {
      const { questions, totalTimeSeconds } = action.payload;
      state.questions = questions;
      state.currentQuestionIndex = 0;
      state.answerMap = {};
      state.hintsRemaining = MAX_HINTS;
      state.hintsConsumedQuestions = [];
      state.totalTimeRemaining = totalTimeSeconds;
      state.tpqTimeElapsed = 0;
      state.isTpqExceeded = false;
      state.isQuizActive = true;
      state.quizStartTimestamp = new Date().toISOString();
    },
    answerQuestion(state, action) {
      const { questionId, answerId } = action.payload;
      state.answerMap[questionId] = answerId;
    },
    skipQuestion(state, action) {
      const { questionId } = action.payload;
      state.answerMap[questionId] = null;
    },
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.tpqTimeElapsed = 0;
        state.isTpqExceeded = false;
      }
    },
    tickTotalTimer(state) {
      if (state.totalTimeRemaining > 0) {
        state.totalTimeRemaining -= 1;
      }
      if (state.totalTimeRemaining <= 0) {
        state.isQuizActive = false;
      }
    },
    tickTpqTimer(state, action) {
      const { tpqSeconds } = action.payload;
      state.tpqTimeElapsed += 1;
      if (state.tpqTimeElapsed > tpqSeconds) {
        state.isTpqExceeded = true;
      }
    },
    consumeHint(state, action) {
      const { questionId } = action.payload;
      if (state.hintsRemaining > 0) {
        state.hintsRemaining -= 1;
        state.hintsConsumedQuestions.push(questionId);
      }
    },
    endQuiz(state) {
      state.isQuizActive = false;
    },
    resetSession() {
      return initialState;
    },
  },
});

export const {
  startQuiz,
  answerQuestion,
  skipQuestion,
  nextQuestion,
  tickTotalTimer,
  tickTpqTimer,
  consumeHint,
  endQuiz,
  resetSession,
} = quizSessionSlice.actions;

export default quizSessionSlice.reducer;
