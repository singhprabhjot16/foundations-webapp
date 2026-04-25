import { createSlice } from '@reduxjs/toolkit';
import { getQuizHistory, saveQuizResult, cleanupOldRecords } from '../utils/localStorage';

/**
 * historySlice — Manages past quiz history loaded from localStorage.
 */
const initialState = {
  quizzes: [],
  isLoaded: false,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    loadHistory(state) {
      cleanupOldRecords();
      state.quizzes = getQuizHistory();
      state.isLoaded = true;
    },
    addQuizToHistory(state, action) {
      const quizResult = action.payload;
      saveQuizResult(quizResult);
      state.quizzes.unshift(quizResult);
    },
  },
});

export const { loadHistory, addQuizToHistory } = historySlice.actions;

export default historySlice.reducer;
