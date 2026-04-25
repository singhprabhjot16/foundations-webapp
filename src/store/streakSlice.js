import { createSlice } from '@reduxjs/toolkit';
import { getStreak, updateStreak } from '../utils/localStorage';
import { getTodayString, isToday, isYesterday } from '../utils/dateUtils';

/**
 * streakSlice — Tracks consecutive quiz days.
 * Logic: complete at least one quiz per calendar day to maintain streak.
 */
const initialState = {
  lastQuizDate: null,
  streakCount: 0,
};

const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    loadStreak(state) {
      const saved = getStreak();
      state.lastQuizDate = saved.lastQuizDate;
      state.streakCount = saved.streakCount;

      // If last quiz was before yesterday, streak is broken
      if (saved.lastQuizDate && !isToday(saved.lastQuizDate) && !isYesterday(saved.lastQuizDate)) {
        state.streakCount = 0;
        const resetData = { lastQuizDate: saved.lastQuizDate, streakCount: 0 };
        updateStreak(resetData);
      }
    },
    recordQuizCompletion(state) {
      const today = getTodayString();

      if (isToday(state.lastQuizDate)) {
        // Already recorded today — no change
        return;
      }

      if (isYesterday(state.lastQuizDate)) {
        // Consecutive day — increment
        state.streakCount += 1;
      } else {
        // Gap or first quiz — reset to 1
        state.streakCount = 1;
      }

      state.lastQuizDate = today;
      updateStreak({ lastQuizDate: today, streakCount: state.streakCount });
    },
  },
});

export const { loadStreak, recordQuizCompletion } = streakSlice.actions;

export default streakSlice.reducer;
