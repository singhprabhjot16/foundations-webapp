import { generateUUID } from '../utils/uuid';
import { CATEGORY_KEYS } from '../constants/categories';
import { randomInt, generateMathDistractors, shuffleArray } from './tablesGenerator';

/**
 * Generate a cubes question with standard or reverse variant.
 * Standard: "What is the cube of N?"
 * Reverse:  "The cube root of N³ is?"
 * @returns {Object} Question object
 */
export const generateCubesQuestion = () => {
  const n = randomInt(1, 25);
  const nCubed = n * n * n;
  const isReverse = Math.random() < 0.4;

  let questionDescription, correct;

  if (isReverse) {
    questionDescription = `The cube root of ${nCubed} is?`;
    correct = n;
  } else {
    questionDescription = `What is the cube of ${n}?`;
    correct = nCubed;
  }

  let distractors;
  if (isReverse) {
    // Generate nearby integers for reverse
    const distSet = new Set();
    let attempts = 0;
    while (distSet.size < 3 && attempts < 100) {
      const offset = randomInt(1, 5);
      const sign = Math.random() < 0.5 ? -1 : 1;
      const val = correct + sign * offset;
      if (val > 0 && val !== correct && !distSet.has(val)) {
        distSet.add(val);
      }
      attempts++;
    }
    while (distSet.size < 3) distSet.add(correct + distSet.size + 1);
    distractors = Array.from(distSet);
  } else {
    distractors = generateMathDistractors(correct, 3);
  }

  const options = shuffleArray([correct, ...distractors]).map((val) => ({
    answerId: generateUUID(),
    answerValue: String(val),
  }));

  const correctOption = options.find((o) => o.answerValue === String(correct));

  return {
    questionId: generateUUID(),
    questionDescription,
    categoryType: CATEGORY_KEYS.CUBES,
    possibleAnswers: options,
    correctAnswer: { answerId: correctOption.answerId, answerValue: correctOption.answerValue },
    hint: null,
  };
};

/**
 * Generate N cubes questions
 * @param {number} count
 * @returns {Array}
 */
export const generateCubesQuestions = (count) => {
  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    const q = generateCubesQuestion();
    if (!used.has(q.questionDescription)) {
      used.add(q.questionDescription);
      questions.push(q);
    }
  }

  return questions;
};
