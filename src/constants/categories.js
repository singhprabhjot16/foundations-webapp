/**
 * Category definitions — keys, display names, accent colors, and MUI icon names.
 */

export const CATEGORY_KEYS = {
  TABLES: 'TABLES',
  SQUARES: 'SQUARES',
  CUBES: 'CUBES',
  FRACTIONS: 'FRACTIONS',
  VOCABULARY: 'VOCABULARY',
  TASTE_OF_ALL: 'TASTE_OF_ALL',
};

export const CATEGORIES = {
  [CATEGORY_KEYS.TABLES]: {
    key: CATEGORY_KEYS.TABLES,
    name: 'Multiplication Tables (1–30)',
    shortName: 'Tables',
    accent: '#4F46E5',
    accentLight: '#EEF2FF',
    icon: 'GridOn',
  },
  [CATEGORY_KEYS.SQUARES]: {
    key: CATEGORY_KEYS.SQUARES,
    name: 'Squares (1–30)',
    shortName: 'Squares',
    accent: '#0D9488',
    accentLight: '#F0FDFA',
    icon: 'CropSquare',
  },
  [CATEGORY_KEYS.CUBES]: {
    key: CATEGORY_KEYS.CUBES,
    name: 'Cubes (1–25)',
    shortName: 'Cubes',
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
    icon: 'ViewInAr',
  },
  [CATEGORY_KEYS.FRACTIONS]: {
    key: CATEGORY_KEYS.FRACTIONS,
    name: 'Fractions & Percentages',
    shortName: 'Fractions',
    accent: '#EA580C',
    accentLight: '#FFF7ED',
    icon: 'PieChartOutline',
  },
  [CATEGORY_KEYS.VOCABULARY]: {
    key: CATEGORY_KEYS.VOCABULARY,
    name: 'Vocabulary',
    shortName: 'Vocab',
    accent: '#16A34A',
    accentLight: '#F0FDF4',
    icon: 'MenuBook',
  },
  [CATEGORY_KEYS.TASTE_OF_ALL]: {
    key: CATEGORY_KEYS.TASTE_OF_ALL,
    name: 'Give Me a Taste of All!',
    shortName: 'Mixed',
    accent: '#E11D48',
    accentLight: '#FFF1F2',
    icon: 'AutoAwesome',
  },
};

/** Ordered list of category keys for rendering */
export const CATEGORY_ORDER = [
  CATEGORY_KEYS.TABLES,
  CATEGORY_KEYS.SQUARES,
  CATEGORY_KEYS.CUBES,
  CATEGORY_KEYS.FRACTIONS,
  CATEGORY_KEYS.VOCABULARY,
  CATEGORY_KEYS.TASTE_OF_ALL,
];

/** Quiz mode constants */
export const QUIZ_MODES = {
  STANDARD: 'STANDARD',
  QUICK_FIRE: 'QUICK_FIRE',
};

/** Total time options in seconds */
export const TOTAL_TIME_OPTIONS = [
  { label: '5m', value: 300 },
  { label: '10m', value: 600 },
  { label: '15m', value: 900 },
  { label: '20m', value: 1200 },
  { label: '30m', value: 1800 },
];

/** Time per question options in seconds */
export const TPQ_OPTIONS = [
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '1.5m', value: 90 },
  { label: '2m', value: 120 },
];

/** Number of questions options */
export const NUM_QUESTIONS_OPTIONS = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

/** Default quiz configuration */
export const DEFAULT_CONFIG = {
  totalTimeSeconds: 600,
  tpqSeconds: 60,
  numberOfQuestions: 10,
  quizMode: QUIZ_MODES.STANDARD,
};

/** Max hints per quiz */
export const MAX_HINTS = 3;
