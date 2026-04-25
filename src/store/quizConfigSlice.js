import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CONFIG, QUIZ_MODES } from '../constants/categories';

/**
 * quizConfigSlice — Stores the user's selected quiz configuration.
 */
const initialState = {
  categoryKey: null,
  totalTimeSeconds: DEFAULT_CONFIG.totalTimeSeconds,
  tpqSeconds: DEFAULT_CONFIG.tpqSeconds,
  numberOfQuestions: DEFAULT_CONFIG.numberOfQuestions,
  quizMode: DEFAULT_CONFIG.quizMode,
};

const quizConfigSlice = createSlice({
  name: 'quizConfig',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryKey = action.payload;
    },
    setTotalTime(state, action) {
      state.totalTimeSeconds = action.payload;
    },
    setTpq(state, action) {
      state.tpqSeconds = action.payload;
    },
    setNumberOfQuestions(state, action) {
      state.numberOfQuestions = action.payload;
    },
    setQuizMode(state, action) {
      state.quizMode = action.payload;
    },
    toggleQuickFire(state) {
      state.quizMode =
        state.quizMode === QUIZ_MODES.STANDARD
          ? QUIZ_MODES.QUICK_FIRE
          : QUIZ_MODES.STANDARD;
    },
    resetConfig(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCategory,
  setTotalTime,
  setTpq,
  setNumberOfQuestions,
  setQuizMode,
  toggleQuickFire,
  resetConfig,
} = quizConfigSlice.actions;

export default quizConfigSlice.reducer;
