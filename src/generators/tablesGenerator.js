import { generateUUID } from '../utils/uuid';
import { CATEGORY_KEYS } from '../constants/categories';

/**
 * Generate a multiplication tables question.
 * Format: "What is A × B?" where A,B ∈ [2, 30]
 * @returns {Object} Question object
 */
export const generateTablesQuestion = () => {
  const a = randomInt(2, 30);
  const b = randomInt(2, 30);
  const correct = a * b;

  const distractors = generateMathDistractors(correct, 3);
  const options = shuffleArray([correct, ...distractors]).map((val) => ({
    answerId: generateUUID(),
    answerValue: String(val),
  }));

  const correctOption = options.find((o) => o.answerValue === String(correct));

  return {
    questionId: generateUUID(),
    questionDescription: `What is ${a} × ${b}?`,
    categoryType: CATEGORY_KEYS.TABLES,
    possibleAnswers: options,
    correctAnswer: { answerId: correctOption.answerId, answerValue: correctOption.answerValue },
    hint: null,
  };
};

/**
 * Generate N tables questions ensuring no duplicates
 * @param {number} count - Number of questions
 * @returns {Array} Array of question objects
 */
export const generateTablesQuestions = (count) => {
  const questions = [];
  const usedPairs = new Set();

  while (questions.length < count) {
    const q = generateTablesQuestion();
    const pairKey = q.questionDescription;
    if (!usedPairs.has(pairKey)) {
      usedPairs.add(pairKey);
      questions.push(q);
    }
  }

  return questions;
};

// --- Helpers ---

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathDistractors(correct, count) {
  const distractors = new Set();
  const offsets = [
    () => randomInt(2, 5),
    () => randomInt(6, 15),
    () => randomInt(16, 30),
  ];

  let attempts = 0;
  while (distractors.size < count && attempts < 100) {
    const offsetFn = offsets[distractors.size % offsets.length];
    const offset = offsetFn();
    const sign = Math.random() < 0.5 ? -1 : 1;
    const value = correct + sign * offset;

    if (value > 0 && value !== correct && !distractors.has(value)) {
      distractors.add(value);
    }
    attempts++;
  }

  // Fallback: fill remaining distractors
  while (distractors.size < count) {
    const fallback = correct + distractors.size + 1;
    if (fallback !== correct) distractors.add(fallback);
  }

  return Array.from(distractors);
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export { randomInt, generateMathDistractors, shuffleArray };
