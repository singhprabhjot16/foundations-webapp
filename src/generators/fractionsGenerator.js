import { generateUUID } from '../utils/uuid';
import { CATEGORY_KEYS } from '../constants/categories';
import { randomInt, shuffleArray } from './tablesGenerator';
import FRACTION_TABLE from '../constants/fractionTable';

const denominators = Object.keys(FRACTION_TABLE).map(Number);

/**
 * Generate a fractions question — decimal or percentage variant.
 * @returns {Object} Question object
 */
export const generateFractionsQuestion = () => {
  const d = denominators[randomInt(0, denominators.length - 1)];
  const entry = FRACTION_TABLE[d];
  const isPercentage = Math.random() < 0.5;

  let questionDescription, correct, formatAnswer;

  if (isPercentage) {
    questionDescription = `1/${d} expressed as a percentage is approximately?`;
    correct = entry.percentage;
    formatAnswer = (v) => `${v}%`;
  } else {
    questionDescription = `What is the decimal equivalent of 1/${d}?`;
    correct = entry.decimal;
    formatAnswer = (v) => String(v);
  }

  const distractors = generateFractionDistractors(correct, 3, isPercentage);

  const allValues = shuffleArray([correct, ...distractors]);
  const options = allValues.map((val) => ({
    answerId: generateUUID(),
    answerValue: formatAnswer(val),
  }));

  const correctOption = options.find((o) => o.answerValue === formatAnswer(correct));

  return {
    questionId: generateUUID(),
    questionDescription,
    categoryType: CATEGORY_KEYS.FRACTIONS,
    possibleAnswers: options,
    correctAnswer: { answerId: correctOption.answerId, answerValue: correctOption.answerValue },
    hint: null,
  };
};

/**
 * Generate N fractions questions
 * @param {number} count
 * @returns {Array}
 */
export const generateFractionsQuestions = (count) => {
  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    const q = generateFractionsQuestion();
    if (!used.has(q.questionDescription)) {
      used.add(q.questionDescription);
      questions.push(q);
    }
  }

  return questions;
};

/**
 * Generate plausible fraction distractors
 */
function generateFractionDistractors(correct, count, isPercentage) {
  const distractors = new Set();
  let attempts = 0;

  // Try using other actual fraction values first
  const otherValues = denominators
    .map((d) => isPercentage ? FRACTION_TABLE[d].percentage : FRACTION_TABLE[d].decimal)
    .filter((v) => v !== correct);

  const shuffledOthers = shuffleArray(otherValues);
  for (const val of shuffledOthers) {
    if (distractors.size >= count) break;
    if (!distractors.has(val)) {
      distractors.add(val);
    }
  }

  // Fallback with offsets
  while (distractors.size < count && attempts < 100) {
    const offset = isPercentage
      ? (randomInt(1, 10) * 0.5)
      : (randomInt(1, 50) * 0.001);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const val = Math.round((correct + sign * offset) * (isPercentage ? 100 : 10000)) / (isPercentage ? 100 : 10000);

    if (val > 0 && val !== correct && !distractors.has(val)) {
      distractors.add(val);
    }
    attempts++;
  }

  return Array.from(distractors).slice(0, count);
}
