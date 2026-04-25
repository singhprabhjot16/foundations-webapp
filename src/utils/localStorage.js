/**
 * localStorage utility functions for quiz history and streak persistence.
 * Follows the StorageService pattern from coding guardrails.
 */

const KEYS = {
  QUIZ_HISTORY: 'foundations_quiz_history',
  STREAK: 'foundations_streak',
};

const CLEANUP_DAYS = 180; // 6 months

/**
 * Safely get a JSON value from localStorage
 * @param {string} key
 * @returns {*} Parsed value or null
 */
const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Safely set a JSON value in localStorage
 * @param {string} key
 * @param {*} value
 */
const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
};

/**
 * Get all quiz history from localStorage
 * @returns {Array} Array of quiz result objects
 */
export const getQuizHistory = () => {
  return getItem(KEYS.QUIZ_HISTORY) || [];
};

/**
 * Save a quiz result to localStorage history
 * @param {Object} quizResult - Complete quiz result object
 */
export const saveQuizResult = (quizResult) => {
  const history = getQuizHistory();
  history.unshift(quizResult); // Most recent first
  setItem(KEYS.QUIZ_HISTORY, history);
};

/**
 * Get streak data from localStorage
 * @returns {Object} { lastQuizDate: string, streakCount: number }
 */
export const getStreak = () => {
  return getItem(KEYS.STREAK) || { lastQuizDate: null, streakCount: 0 };
};

/**
 * Update streak data in localStorage
 * @param {Object} streakData - { lastQuizDate, streakCount }
 */
export const updateStreak = (streakData) => {
  setItem(KEYS.STREAK, streakData);
};

/**
 * Remove quiz records older than 6 months (183 days).
 * Called once per app session on initialization.
 * @returns {number} Number of records removed
 */
export const cleanupOldRecords = () => {
  const history = getQuizHistory();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - CLEANUP_DAYS);

  const filtered = history.filter((quiz) => {
    const quizDate = new Date(quiz.generationTimestamp);
    return quizDate >= cutoffDate;
  });

  const removed = history.length - filtered.length;
  if (removed > 0) {
    setItem(KEYS.QUIZ_HISTORY, filtered);
  }
  return removed;
};

export default {
  getQuizHistory,
  saveQuizResult,
  getStreak,
  updateStreak,
  cleanupOldRecords,
  KEYS,
};
