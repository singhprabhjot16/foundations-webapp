import { configureStore } from '@reduxjs/toolkit';
import quizConfigReducer from './quizConfigSlice';
import quizSessionReducer from './quizSessionSlice';
import resultsReducer from './resultsSlice';
import historyReducer from './historySlice';
import streakReducer from './streakSlice';

/**
 * Redux store configuration combining all 5 slices.
 */
const store = configureStore({
  reducer: {
    quizConfig: quizConfigReducer,
    quizSession: quizSessionReducer,
    results: resultsReducer,
    history: historyReducer,
    streak: streakReducer,
  },
});

export default store;
