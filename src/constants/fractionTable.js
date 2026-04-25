/**
 * Pre-computed fraction values for 1/N where N = 2..30
 * Each entry has decimal (4 decimal places) and percentage (2 decimal places).
 */
const FRACTION_TABLE = {
  2:  { decimal: 0.5000, percentage: 50.00, fraction: '1/2' },
  3:  { decimal: 0.3333, percentage: 33.33, fraction: '1/3' },
  4:  { decimal: 0.2500, percentage: 25.00, fraction: '1/4' },
  5:  { decimal: 0.2000, percentage: 20.00, fraction: '1/5' },
  6:  { decimal: 0.1667, percentage: 16.67, fraction: '1/6' },
  7:  { decimal: 0.1429, percentage: 14.29, fraction: '1/7' },
  8:  { decimal: 0.1250, percentage: 12.50, fraction: '1/8' },
  9:  { decimal: 0.1111, percentage: 11.11, fraction: '1/9' },
  10: { decimal: 0.1000, percentage: 10.00, fraction: '1/10' },
  11: { decimal: 0.0909, percentage: 9.09,  fraction: '1/11' },
  12: { decimal: 0.0833, percentage: 8.33,  fraction: '1/12' },
  13: { decimal: 0.0769, percentage: 7.69,  fraction: '1/13' },
  14: { decimal: 0.0714, percentage: 7.14,  fraction: '1/14' },
  15: { decimal: 0.0667, percentage: 6.67,  fraction: '1/15' },
  16: { decimal: 0.0625, percentage: 6.25,  fraction: '1/16' },
  17: { decimal: 0.0588, percentage: 5.88,  fraction: '1/17' },
  18: { decimal: 0.0556, percentage: 5.56,  fraction: '1/18' },
  19: { decimal: 0.0526, percentage: 5.26,  fraction: '1/19' },
  20: { decimal: 0.0500, percentage: 5.00,  fraction: '1/20' },
  21: { decimal: 0.0476, percentage: 4.76,  fraction: '1/21' },
  22: { decimal: 0.0455, percentage: 4.55,  fraction: '1/22' },
  23: { decimal: 0.0435, percentage: 4.35,  fraction: '1/23' },
  24: { decimal: 0.0417, percentage: 4.17,  fraction: '1/24' },
  25: { decimal: 0.0400, percentage: 4.00,  fraction: '1/25' },
  26: { decimal: 0.0385, percentage: 3.85,  fraction: '1/26' },
  27: { decimal: 0.0370, percentage: 3.70,  fraction: '1/27' },
  28: { decimal: 0.0357, percentage: 3.57,  fraction: '1/28' },
  29: { decimal: 0.0345, percentage: 3.45,  fraction: '1/29' },
  30: { decimal: 0.0333, percentage: 3.33,  fraction: '1/30' },
};

export default FRACTION_TABLE;
