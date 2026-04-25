import { generateTablesQuestions } from './tablesGenerator';
import { generateSquaresQuestions } from './squaresGenerator';
import { generateCubesQuestions } from './cubesGenerator';
import { generateFractionsQuestions } from './fractionsGenerator';
import { generateVocabQuestions } from './vocabularyGenerator';
import { shuffleArray } from './tablesGenerator';

/**
 * Generate a "Taste of All" mixed quiz.
 * Distributes N questions across 5 categories:
 *   base = floor(N / 5)
 *   remainder goes to VOCABULARY
 * Then shuffles the combined set.
 *
 * @param {number} totalQuestions - Total number of questions
 * @returns {Array} Shuffled array of question objects
 */
export const generateTasteOfAllQuestions = (totalQuestions) => {
  const base = Math.floor(totalQuestions / 5);
  const remainder = totalQuestions % 5;

  const tables = generateTablesQuestions(base);
  const squares = generateSquaresQuestions(base);
  const cubes = generateCubesQuestions(base);
  const fractions = generateFractionsQuestions(base);
  const vocab = generateVocabQuestions(base + remainder);

  const allQuestions = [
    ...tables,
    ...squares,
    ...cubes,
    ...fractions,
    ...vocab,
  ];

  return shuffleArray(allQuestions);
};
