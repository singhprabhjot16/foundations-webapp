import { createSlice } from '@reduxjs/toolkit';

/**
 * resultsSlice — Stores the completed quiz result for the Results Screen.
 */
const initialState = {
  quizResult: null,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, action) {
      state.quizResult = action.payload;
    },
    clearResults(state) {
      state.quizResult = null;
    },
  },
});

export const { setResults, clearResults } = resultsSlice.actions;

export default resultsSlice.reducer;
