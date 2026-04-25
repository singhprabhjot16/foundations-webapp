import { generateUUID } from '../utils/uuid';
import { CATEGORY_KEYS } from '../constants/categories';
import { randomInt, generateMathDistractors, shuffleArray } from './tablesGenerator';

/**
 * Generate a squares question with standard or reverse variant.
 * Standard: "What is the square of N?"
 * Reverse:  "Which number has a square of N²?"
 * @returns {Object} Question object
 */
export const generateSquaresQuestion = () => {
  const n = randomInt(1, 30);
  const nSquared = n * n;
  const isReverse = Math.random() < 0.4; // 40% chance of reverse

  let questionDescription, correct;

  if (isReverse) {
    questionDescription = `Which number has a square of ${nSquared}?`;
    correct = n;
  } else {
    questionDescription = `What is the square of ${n}?`;
    correct = nSquared;
  }

  const distractors = isReverse
    ? generateNearbyIntDistractors(correct, 3, 1, 5)
    : generateMathDistractors(correct, 3);

  const options = shuffleArray([correct, ...distractors]).map((val) => ({
    answerId: generateUUID(),
    answerValue: String(val),
  }));

  const correctOption = options.find((o) => o.answerValue === String(correct));

  return {
    questionId: generateUUID(),
    questionDescription,
    categoryType: CATEGORY_KEYS.SQUARES,
    possibleAnswers: options,
    correctAnswer: { answerId: correctOption.answerId, answerValue: correctOption.answerValue },
    hint: null,
  };
};

/**
 * Generate N squares questions
 * @param {number} count
 * @returns {Array}
 */
export const generateSquaresQuestions = (count) => {
  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    const q = generateSquaresQuestion();
    if (!used.has(q.questionDescription)) {
      used.add(q.questionDescription);
      questions.push(q);
    }
  }

  return questions;
};

/**
 * Generate nearby integer distractors for reverse questions
 */
function generateNearbyIntDistractors(correct, count, minOffset, maxOffset) {
  const distractors = new Set();
  let attempts = 0;

  while (distractors.size < count && attempts < 100) {
    const offset = randomInt(minOffset, maxOffset);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const value = correct + sign * offset;

    if (value > 0 && value !== correct && !distractors.has(value)) {
      distractors.add(value);
    }
    attempts++;
  }

  while (distractors.size < count) {
    distractors.add(correct + distractors.size + 1);
  }

  return Array.from(distractors);
}
