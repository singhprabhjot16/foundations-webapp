/**
 * Date utility functions for streak logic and history filtering.
 */

/**
 * Get today's date as YYYY-MM-DD string
 * @returns {string}
 */
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Get yesterday's date as YYYY-MM-DD string
 * @returns {string}
 */
export const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

/**
 * Check if a date string is today
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {boolean}
 */
export const isToday = (dateStr) => {
  return dateStr === getTodayString();
};

/**
 * Check if a date string is yesterday
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {boolean}
 */
export const isYesterday = (dateStr) => {
  return dateStr === getYesterdayString();
};

/**
 * Check if an ISO-8601 timestamp is older than a given number of days
 * @param {string} isoTimestamp - ISO-8601 datetime string
 * @param {number} days - Number of days
 * @returns {boolean}
 */
export const isOlderThanDays = (isoTimestamp, days) => {
  const date = new Date(isoTimestamp);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date < cutoff;
};

/**
 * Check if an ISO-8601 timestamp is within the last N months
 * @param {string} isoTimestamp - ISO-8601 datetime string
 * @param {number} months - Number of months
 * @returns {boolean}
 */
export const isWithinMonths = (isoTimestamp, months) => {
  const date = new Date(isoTimestamp);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return date >= cutoff;
};

/**
 * Format seconds to MM:SS display
 * @param {number} totalSeconds
 * @returns {string}
 */
export const formatTime = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format ISO timestamp to readable date
 * @param {string} isoTimestamp
 * @returns {string}
 */
export const formatDate = (isoTimestamp) => {
  const date = new Date(isoTimestamp);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
