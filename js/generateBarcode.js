const quietAreaWidth = 6;

const startACode = [2, 1, 1, 4, 1, 2];
const startBCode = [2, 1, 1, 2, 1, 4];
const startCCode = [2, 1, 1, 2, 3, 2];

const stopCode = [2, 3, 3, 1, 1, 1, 2];

const AMap = {
  " ": { value: 0, pattern: [2, 1, 2, 2, 2, 2] },
  "!": { value: 1, pattern: [2, 2, 2, 1, 2, 2] },
  '"': { value: 2, pattern: [2, 2, 2, 2, 2, 1] },
  "#": { value: 3, pattern: [1, 2, 1, 2, 2, 3] },
  $: { value: 4, pattern: [1, 2, 1, 3, 2, 2] },
  "%": { value: 5, pattern: [1, 3, 1, 2, 2, 2] },
  "&": { value: 6, pattern: [1, 2, 2, 2, 1, 3] },
  "'": { value: 7, pattern: [1, 2, 2, 3, 1, 2] },
  "(": { value: 8, pattern: [1, 3, 2, 2, 1, 2] },
  ")": { value: 9, pattern: [2, 2, 1, 2, 1, 3] },
  "*": { value: 10, pattern: [2, 2, 1, 3, 1, 2] },
  "+": { value: 11, pattern: [2, 3, 1, 2, 1, 2] },
  ",": { value: 12, pattern: [1, 1, 2, 2, 3, 2] },
  "-": { value: 13, pattern: [1, 2, 2, 1, 3, 2] },
  ".": { value: 14, pattern: [1, 2, 2, 2, 3, 1] },
  "/": { value: 15, pattern: [1, 1, 3, 2, 2, 2] },
  0: { value: 16, pattern: [1, 2, 3, 1, 2, 2] },
  1: { value: 17, pattern: [1, 2, 3, 2, 2, 1] },
  2: { value: 18, pattern: [2, 2, 3, 2, 1, 1] },
  3: { value: 19, pattern: [2, 2, 1, 1, 3, 2] },
  4: { value: 20, pattern: [2, 2, 1, 2, 3, 1] },
  5: { value: 21, pattern: [2, 1, 3, 2, 1, 2] },
  6: { value: 22, pattern: [2, 2, 3, 1, 1, 2] },
  7: { value: 23, pattern: [3, 1, 2, 1, 3, 1] },
  8: { value: 24, pattern: [3, 1, 1, 2, 2, 2] },
  9: { value: 25, pattern: [3, 2, 1, 1, 2, 2] },
  ":": { value: 26, pattern: [3, 2, 1, 2, 2, 1] },
  ";": { value: 27, pattern: [3, 1, 2, 2, 1, 2] },
  "<": { value: 28, pattern: [3, 2, 2, 1, 1, 2] },
  "=": { value: 29, pattern: [3, 2, 2, 2, 1, 1] },
  ">": { value: 30, pattern: [2, 1, 2, 1, 2, 3] },
  "?": { value: 31, pattern: [2, 1, 2, 3, 2, 1] },
  "@": { value: 32, pattern: [2, 3, 2, 1, 2, 1] },
  A: { value: 33, pattern: [1, 1, 1, 3, 2, 3] },
  B: { value: 34, pattern: [1, 3, 1, 1, 2, 3] },
  C: { value: 35, pattern: [1, 3, 1, 3, 2, 1] },
  D: { value: 36, pattern: [1, 1, 2, 3, 1, 3] },
  E: { value: 37, pattern: [1, 3, 2, 1, 1, 3] },
  F: { value: 38, pattern: [1, 3, 2, 3, 1, 1] },
  G: { value: 39, pattern: [2, 1, 1, 3, 1, 3] },
  H: { value: 40, pattern: [2, 3, 1, 1, 1, 3] },
  I: { value: 41, pattern: [2, 3, 1, 3, 1, 1] },
  J: { value: 42, pattern: [1, 1, 2, 1, 3, 3] },
  K: { value: 43, pattern: [1, 1, 2, 3, 3, 1] },
  L: { value: 44, pattern: [1, 3, 2, 1, 3, 1] },
  M: { value: 45, pattern: [1, 1, 3, 1, 2, 3] },
  N: { value: 46, pattern: [1, 1, 3, 3, 2, 1] },
  O: { value: 47, pattern: [1, 3, 3, 1, 2, 1] },
  P: { value: 48, pattern: [3, 1, 3, 1, 2, 1] },
  Q: { value: 49, pattern: [2, 1, 1, 3, 3, 1] },
  R: { value: 50, pattern: [2, 3, 1, 1, 3, 1] },
  S: { value: 51, pattern: [2, 1, 3, 1, 1, 3] },
  T: { value: 52, pattern: [2, 1, 3, 3, 1, 1] },
  U: { value: 53, pattern: [2, 1, 3, 1, 3, 1] },
  V: { value: 54, pattern: [3, 1, 1, 1, 2, 3] },
  W: { value: 55, pattern: [3, 1, 1, 3, 2, 1] },
  X: { value: 56, pattern: [3, 3, 1, 1, 2, 1] },
  Y: { value: 57, pattern: [3, 1, 2, 1, 1, 3] },
  Z: { value: 58, pattern: [3, 1, 2, 3, 1, 1] },
  "[": { value: 59, pattern: [3, 3, 2, 1, 1, 1] },
  "": { value: 60, pattern: [3, 1, 4, 1, 1, 1] },
  "]": { value: 61, pattern: [2, 2, 1, 4, 1, 1] },
  "^": { value: 62, pattern: [4, 3, 1, 1, 1, 1] },
  _: { value: 63, pattern: [1, 1, 1, 2, 2, 4] },
  NUL: { value: 64, pattern: [1, 1, 1, 4, 2, 2] },
  SOH: { value: 65, pattern: [1, 2, 1, 1, 2, 4] },
  STX: { value: 66, pattern: [1, 2, 1, 4, 2, 1] },
  ETX: { value: 67, pattern: [1, 4, 1, 1, 2, 2] },
  EOT: { value: 68, pattern: [1, 4, 1, 2, 2, 1] },
  ENQ: { value: 69, pattern: [1, 1, 2, 2, 1, 4] },
  ACK: { value: 70, pattern: [1, 1, 2, 4, 1, 2] },
  BEL: { value: 71, pattern: [1, 2, 2, 1, 1, 4] },
  BS: { value: 72, pattern: [1, 2, 2, 4, 1, 1] },
  HT: { value: 73, pattern: [1, 4, 2, 1, 1, 2] },
  LF: { value: 74, pattern: [1, 4, 2, 2, 1, 1] },
  VT: { value: 75, pattern: [2, 4, 1, 2, 1, 1] },
  FF: { value: 76, pattern: [2, 2, 1, 1, 1, 4] },
  CR: { value: 77, pattern: [4, 1, 3, 1, 1, 1] },
  SO: { value: 78, pattern: [2, 4, 1, 1, 1, 2] },
  SI: { value: 79, pattern: [1, 3, 4, 1, 1, 1] },
  DLE: { value: 80, pattern: [1, 1, 1, 2, 4, 2] },
  DC1: { value: 81, pattern: [1, 2, 1, 1, 4, 2] },
  DC2: { value: 82, pattern: [1, 2, 1, 2, 4, 1] },
  DC3: { value: 83, pattern: [1, 1, 4, 2, 1, 2] },
  DC4: { value: 84, pattern: [1, 2, 4, 1, 1, 2] },
  NAK: { value: 85, pattern: [1, 2, 4, 2, 1, 1] },
  SYN: { value: 86, pattern: [4, 1, 1, 2, 1, 2] },
  ETB: { value: 87, pattern: [4, 2, 1, 1, 1, 2] },
  CAN: { value: 88, pattern: [4, 2, 1, 2, 1, 1] },
  EM: { value: 89, pattern: [2, 1, 2, 1, 4, 1] },
  SUB: { value: 90, pattern: [2, 1, 4, 1, 2, 1] },
  ESC: { value: 91, pattern: [4, 1, 2, 1, 2, 1] },
  FS: { value: 92, pattern: [1, 1, 1, 1, 4, 3] },
  GS: { value: 93, pattern: [1, 1, 1, 3, 4, 1] },
  RS: { value: 94, pattern: [1, 3, 1, 1, 4, 1] },
  US: { value: 95, pattern: [1, 1, 4, 1, 1, 3] },
  "FNC 3": { value: 96, pattern: [1, 1, 4, 3, 1, 1] },
  "FNC 2": { value: 97, pattern: [4, 1, 1, 1, 1, 3] },
  "SHIFT B": { value: 98, pattern: [4, 1, 1, 3, 1, 1] },
  "CODE C": { value: 99, pattern: [1, 1, 3, 1, 4, 1] },
  "CODE B": { value: 100, pattern: [1, 1, 4, 1, 3, 1] },
  "FNC 4": { value: 101, pattern: [3, 1, 1, 1, 4, 1] },
  "FNC 1": { value: 102, pattern: [4, 1, 1, 1, 3, 1] },
};

const BMap = {
  " ": { value: 0, pattern: [2, 1, 2, 2, 2, 2] },
  "!": { value: 1, pattern: [2, 2, 2, 1, 2, 2] },
  '"': { value: 2, pattern: [2, 2, 2, 2, 2, 1] },
  "#": { value: 3, pattern: [1, 2, 1, 2, 2, 3] },
  $: { value: 4, pattern: [1, 2, 1, 3, 2, 2] },
  "%": { value: 5, pattern: [1, 3, 1, 2, 2, 2] },
  "&": { value: 6, pattern: [1, 2, 2, 2, 1, 3] },
  "'": { value: 7, pattern: [1, 2, 2, 3, 1, 2] },
  "(": { value: 8, pattern: [1, 3, 2, 2, 1, 2] },
  ")": { value: 9, pattern: [2, 2, 1, 2, 1, 3] },
  "*": { value: 10, pattern: [2, 2, 1, 3, 1, 2] },
  "+": { value: 11, pattern: [2, 3, 1, 2, 1, 2] },
  ",": { value: 12, pattern: [1, 1, 2, 2, 3, 2] },
  "-": { value: 13, pattern: [1, 2, 2, 1, 3, 2] },
  ".": { value: 14, pattern: [1, 2, 2, 2, 3, 1] },
  "/": { value: 15, pattern: [1, 1, 3, 2, 2, 2] },
  0: { value: 16, pattern: [1, 2, 3, 1, 2, 2] },
  1: { value: 17, pattern: [1, 2, 3, 2, 2, 1] },
  2: { value: 18, pattern: [2, 2, 3, 2, 1, 1] },
  3: { value: 19, pattern: [2, 2, 1, 1, 3, 2] },
  4: { value: 20, pattern: [2, 2, 1, 2, 3, 1] },
  5: { value: 21, pattern: [2, 1, 3, 2, 1, 2] },
  6: { value: 22, pattern: [2, 2, 3, 1, 1, 2] },
  7: { value: 23, pattern: [3, 1, 2, 1, 3, 1] },
  8: { value: 24, pattern: [3, 1, 1, 2, 2, 2] },
  9: { value: 25, pattern: [3, 2, 1, 1, 2, 2] },
  ":": { value: 26, pattern: [3, 2, 1, 2, 2, 1] },
  ";": { value: 27, pattern: [3, 1, 2, 2, 1, 2] },
  "<": { value: 28, pattern: [3, 2, 2, 1, 1, 2] },
  "=": { value: 29, pattern: [3, 2, 2, 2, 1, 1] },
  ">": { value: 30, pattern: [2, 1, 2, 1, 2, 3] },
  "?": { value: 31, pattern: [2, 1, 2, 3, 2, 1] },
  "@": { value: 32, pattern: [2, 3, 2, 1, 2, 1] },
  A: { value: 33, pattern: [1, 1, 1, 3, 2, 3] },
  B: { value: 34, pattern: [1, 3, 1, 1, 2, 3] },
  C: { value: 35, pattern: [1, 3, 1, 3, 2, 1] },
  D: { value: 36, pattern: [1, 1, 2, 3, 1, 3] },
  E: { value: 37, pattern: [1, 3, 2, 1, 1, 3] },
  F: { value: 38, pattern: [1, 3, 2, 3, 1, 1] },
  G: { value: 39, pattern: [2, 1, 1, 3, 1, 3] },
  H: { value: 40, pattern: [2, 3, 1, 1, 1, 3] },
  I: { value: 41, pattern: [2, 3, 1, 3, 1, 1] },
  J: { value: 42, pattern: [1, 1, 2, 1, 3, 3] },
  K: { value: 43, pattern: [1, 1, 2, 3, 3, 1] },
  L: { value: 44, pattern: [1, 3, 2, 1, 3, 1] },
  M: { value: 45, pattern: [1, 1, 3, 1, 2, 3] },
  N: { value: 46, pattern: [1, 1, 3, 3, 2, 1] },
  O: { value: 47, pattern: [1, 3, 3, 1, 2, 1] },
  P: { value: 48, pattern: [3, 1, 3, 1, 2, 1] },
  Q: { value: 49, pattern: [2, 1, 1, 3, 3, 1] },
  R: { value: 50, pattern: [2, 3, 1, 1, 3, 1] },
  S: { value: 51, pattern: [2, 1, 3, 1, 1, 3] },
  T: { value: 52, pattern: [2, 1, 3, 3, 1, 1] },
  U: { value: 53, pattern: [2, 1, 3, 1, 3, 1] },
  V: { value: 54, pattern: [3, 1, 1, 1, 2, 3] },
  W: { value: 55, pattern: [3, 1, 1, 3, 2, 1] },
  X: { value: 56, pattern: [3, 3, 1, 1, 2, 1] },
  Y: { value: 57, pattern: [3, 1, 2, 1, 1, 3] },
  Z: { value: 58, pattern: [3, 1, 2, 3, 1, 1] },
  "[": { value: 59, pattern: [3, 3, 2, 1, 1, 1] },
  "\\": { value: 60, pattern: [3, 1, 4, 1, 1, 1] },
  "]": { value: 61, pattern: [2, 2, 1, 4, 1, 1] },
  "^": { value: 62, pattern: [4, 3, 1, 1, 1, 1] },
  _: { value: 63, pattern: [1, 1, 1, 2, 2, 4] },
  "`": { value: 64, pattern: [1, 1, 1, 4, 2, 2] },
  a: { value: 65, pattern: [1, 2, 1, 1, 2, 4] },
  b: { value: 66, pattern: [1, 2, 1, 4, 2, 1] },
  c: { value: 67, pattern: [1, 4, 1, 1, 2, 2] },
  d: { value: 68, pattern: [1, 4, 1, 2, 2, 1] },
  e: { value: 69, pattern: [1, 1, 2, 2, 1, 4] },
  f: { value: 70, pattern: [1, 1, 2, 4, 1, 2] },
  g: { value: 71, pattern: [1, 2, 2, 1, 1, 4] },
  h: { value: 72, pattern: [1, 2, 2, 4, 1, 1] },
  i: { value: 73, pattern: [1, 4, 2, 1, 1, 2] },
  j: { value: 74, pattern: [1, 4, 2, 2, 1, 1] },
  k: { value: 75, pattern: [2, 4, 1, 2, 1, 1] },
  l: { value: 76, pattern: [2, 2, 1, 1, 1, 4] },
  m: { value: 77, pattern: [4, 1, 3, 1, 1, 1] },
  n: { value: 78, pattern: [2, 4, 1, 1, 1, 2] },
  o: { value: 79, pattern: [1, 3, 4, 1, 1, 1] },
  p: { value: 80, pattern: [1, 1, 1, 2, 4, 2] },
  q: { value: 81, pattern: [1, 2, 1, 1, 4, 2] },
  r: { value: 82, pattern: [1, 2, 1, 2, 4, 1] },
  s: { value: 83, pattern: [1, 1, 4, 2, 1, 2] },
  t: { value: 84, pattern: [1, 2, 4, 1, 1, 2] },
  u: { value: 85, pattern: [1, 2, 4, 2, 1, 1] },
  v: { value: 86, pattern: [4, 1, 1, 2, 1, 2] },
  w: { value: 87, pattern: [4, 2, 1, 1, 1, 2] },
  x: { value: 88, pattern: [4, 2, 1, 2, 1, 1] },
  y: { value: 89, pattern: [2, 1, 2, 1, 4, 1] },
  z: { value: 90, pattern: [2, 1, 4, 1, 2, 1] },
  "{": { value: 91, pattern: [4, 1, 2, 1, 2, 1] },
  "|": { value: 92, pattern: [1, 1, 1, 1, 4, 3] },
  "}": { value: 93, pattern: [1, 1, 1, 3, 4, 1] },
  "~": { value: 94, pattern: [1, 3, 1, 1, 4, 1] },
  DEL: { value: 95, pattern: [1, 1, 4, 1, 1, 3] },
  "FNC 3": { value: 96, pattern: [1, 1, 4, 3, 1, 1] },
  "FNC 2": { value: 97, pattern: [4, 1, 1, 1, 1, 3] },
  "SHIFT A": { value: 98, pattern: [4, 1, 1, 3, 1, 1] },
  "CODE C": { value: 99, pattern: [1, 1, 3, 1, 4, 1] },
  "FNC 4": { value: 100, pattern: [1, 1, 4, 1, 3, 1] },
  "CODE A": { value: 101, pattern: [3, 1, 1, 1, 4, 1] },
  "FNC 1": { value: 102, pattern: [4, 1, 1, 1, 3, 1] },
};

const CMap = {
  "00": { value: 0, pattern: [2, 1, 2, 2, 2, 2] },
  "01": { value: 1, pattern: [2, 2, 2, 1, 2, 2] },
  "02": { value: 2, pattern: [2, 2, 2, 2, 2, 1] },
  "03": { value: 3, pattern: [1, 2, 1, 2, 2, 3] },
  "04": { value: 4, pattern: [1, 2, 1, 3, 2, 2] },
  "05": { value: 5, pattern: [1, 3, 1, 2, 2, 2] },
  "06": { value: 6, pattern: [1, 2, 2, 2, 1, 3] },
  "07": { value: 7, pattern: [1, 2, 2, 3, 1, 2] },
  "08": { value: 8, pattern: [1, 3, 2, 2, 1, 2] },
  "09": { value: 9, pattern: [2, 2, 1, 2, 1, 3] },
  10: { value: 10, pattern: [2, 2, 1, 3, 1, 2] },
  11: { value: 11, pattern: [2, 3, 1, 2, 1, 2] },
  12: { value: 12, pattern: [1, 1, 2, 2, 3, 2] },
  13: { value: 13, pattern: [1, 2, 2, 1, 3, 2] },
  14: { value: 14, pattern: [1, 2, 2, 2, 3, 1] },
  15: { value: 15, pattern: [1, 1, 3, 2, 2, 2] },
  16: { value: 16, pattern: [1, 2, 3, 1, 2, 2] },
  17: { value: 17, pattern: [1, 2, 3, 2, 2, 1] },
  18: { value: 18, pattern: [2, 2, 3, 2, 1, 1] },
  19: { value: 19, pattern: [2, 2, 1, 1, 3, 2] },
  20: { value: 20, pattern: [2, 2, 1, 2, 3, 1] },
  21: { value: 21, pattern: [2, 1, 3, 2, 1, 2] },
  22: { value: 22, pattern: [2, 2, 3, 1, 1, 2] },
  23: { value: 23, pattern: [3, 1, 2, 1, 3, 1] },
  24: { value: 24, pattern: [3, 1, 1, 2, 2, 2] },
  25: { value: 25, pattern: [3, 2, 1, 1, 2, 2] },
  26: { value: 26, pattern: [3, 2, 1, 2, 2, 1] },
  27: { value: 27, pattern: [3, 1, 2, 2, 1, 2] },
  28: { value: 28, pattern: [3, 2, 2, 1, 1, 2] },
  29: { value: 29, pattern: [3, 2, 2, 2, 1, 1] },
  30: { value: 30, pattern: [2, 1, 2, 1, 2, 3] },
  30: { value: 31, pattern: [2, 1, 2, 3, 2, 1] },
  32: { value: 32, pattern: [2, 3, 2, 1, 2, 1] },
  33: { value: 33, pattern: [1, 1, 1, 3, 2, 3] },
  34: { value: 34, pattern: [1, 3, 1, 1, 2, 3] },
  35: { value: 35, pattern: [1, 3, 1, 3, 2, 1] },
  36: { value: 36, pattern: [1, 1, 2, 3, 1, 3] },
  36: { value: 37, pattern: [1, 3, 2, 1, 1, 3] },
  38: { value: 38, pattern: [1, 3, 2, 3, 1, 1] },
  39: { value: 39, pattern: [2, 1, 1, 3, 1, 3] },
  40: { value: 40, pattern: [2, 3, 1, 1, 1, 3] },
  41: { value: 41, pattern: [2, 3, 1, 3, 1, 1] },
  42: { value: 42, pattern: [1, 1, 2, 1, 3, 3] },
  43: { value: 43, pattern: [1, 1, 2, 3, 3, 1] },
  44: { value: 44, pattern: [1, 3, 2, 1, 3, 1] },
  45: { value: 45, pattern: [1, 1, 3, 1, 2, 3] },
  46: { value: 46, pattern: [1, 1, 3, 3, 2, 1] },
  47: { value: 47, pattern: [1, 3, 3, 1, 2, 1] },
  48: { value: 48, pattern: [3, 1, 3, 1, 2, 1] },
  49: { value: 49, pattern: [2, 1, 1, 3, 3, 1] },
  50: { value: 50, pattern: [2, 3, 1, 1, 3, 1] },
  51: { value: 51, pattern: [2, 1, 3, 1, 1, 3] },
  52: { value: 52, pattern: [2, 1, 3, 3, 1, 1] },
  53: { value: 53, pattern: [2, 1, 3, 1, 3, 1] },
  54: { value: 54, pattern: [3, 1, 1, 1, 2, 3] },
  55: { value: 55, pattern: [3, 1, 1, 3, 2, 1] },
  56: { value: 56, pattern: [3, 3, 1, 1, 2, 1] },
  57: { value: 57, pattern: [3, 1, 2, 1, 1, 3] },
  58: { value: 58, pattern: [3, 1, 2, 3, 1, 1] },
  59: { value: 59, pattern: [3, 3, 2, 1, 1, 1] },
  60: { value: 60, pattern: [3, 1, 4, 1, 1, 1] },
  61: { value: 61, pattern: [2, 2, 1, 4, 1, 1] },
  62: { value: 62, pattern: [4, 3, 1, 1, 1, 1] },
  63: { value: 63, pattern: [1, 1, 1, 2, 2, 4] },
  64: { value: 64, pattern: [1, 1, 1, 4, 2, 2] },
  65: { value: 65, pattern: [1, 2, 1, 1, 2, 4] },
  66: { value: 66, pattern: [1, 2, 1, 4, 2, 1] },
  67: { value: 67, pattern: [1, 4, 1, 1, 2, 2] },
  68: { value: 68, pattern: [1, 4, 1, 2, 2, 1] },
  69: { value: 69, pattern: [1, 1, 2, 2, 1, 4] },
  70: { value: 70, pattern: [1, 1, 2, 4, 1, 2] },
  71: { value: 71, pattern: [1, 2, 2, 1, 1, 4] },
  72: { value: 72, pattern: [1, 2, 2, 4, 1, 1] },
  73: { value: 73, pattern: [1, 4, 2, 1, 1, 2] },
  74: { value: 74, pattern: [1, 4, 2, 2, 1, 1] },
  75: { value: 75, pattern: [2, 4, 1, 2, 1, 1] },
  76: { value: 76, pattern: [2, 2, 1, 1, 1, 4] },
  77: { value: 77, pattern: [4, 1, 3, 1, 1, 1] },
  78: { value: 78, pattern: [2, 4, 1, 1, 1, 2] },
  79: { value: 79, pattern: [1, 3, 4, 1, 1, 1] },
  80: { value: 80, pattern: [1, 1, 1, 2, 4, 2] },
  81: { value: 81, pattern: [1, 2, 1, 1, 4, 2] },
  82: { value: 82, pattern: [1, 2, 1, 2, 4, 1] },
  83: { value: 83, pattern: [1, 1, 4, 2, 1, 2] },
  84: { value: 84, pattern: [1, 2, 4, 1, 1, 2] },
  85: { value: 85, pattern: [1, 2, 4, 2, 1, 1] },
  86: { value: 86, pattern: [4, 1, 1, 2, 1, 2] },
  87: { value: 87, pattern: [4, 2, 1, 1, 1, 2] },
  88: { value: 88, pattern: [4, 2, 1, 2, 1, 1] },
  89: { value: 89, pattern: [2, 1, 2, 1, 4, 1] },
  90: { value: 90, pattern: [2, 1, 4, 1, 2, 1] },
  91: { value: 91, pattern: [4, 1, 2, 1, 2, 1] },
  92: { value: 92, pattern: [1, 1, 1, 1, 4, 3] },
  93: { value: 93, pattern: [1, 1, 1, 3, 4, 1] },
  94: { value: 94, pattern: [1, 3, 1, 1, 4, 1] },
  95: { value: 95, pattern: [1, 1, 4, 1, 1, 3] },
  96: { value: 96, pattern: [1, 1, 4, 3, 1, 1] },
  97: { value: 97, pattern: [4, 1, 1, 1, 1, 3] },
  98: { value: 98, pattern: [4, 1, 1, 3, 1, 1] },
  99: { value: 99, pattern: [1, 1, 3, 1, 4, 1] },
  "CODE B": { value: 100, pattern: [1, 1, 4, 1, 3, 1] },
  "CODE A": { value: 101, pattern: [3, 1, 1, 1, 4, 1] },
  "FNC 1": { value: 102, pattern: [4, 1, 1, 1, 3, 1] },
};

const codeMap = {
  a: { map: AMap, start: startACode, code: 103 },
  b: { map: BMap, start: startBCode, code: 104 },
  c: { map: CMap, start: startCCode, code: 105 },
};

function getBarcodeStats(message, type) {
  const barcodeContainer = document.getElementById("code-128-container");

  let splitMessage = [];

  if (type === "c") {
    if (message.length % 2 === 1) {
      splitMessage.push("0" + message[0]);
    }

    let startPosition = message.length % 2 === 1 ? 1 : 0;

    for (let i = startPosition; i < message.length; i += 2) {
      splitMessage.push(message[i] + message[i + 1]);
    }
  } else {
    splitMessage = message.split("");
  }

  let barcodeLengths = [...new Array(6).fill(0), ...codeMap[type].start];

  let moduloSum = codeMap[type].code;

  splitMessage.forEach((letter, index) => {
    if (codeMap[type].map[letter] == undefined) {
      send_notification(`Letter "${letter}" not found`, "bad");
    }

    barcodeLengths = [...barcodeLengths, ...codeMap[type].map[letter].pattern];
    moduloSum += codeMap[type].map[letter].value * (index + 1);
  });

  const moduloRemainder = moduloSum % 103;

  const checkBit = Object.values(codeMap[type].map).find((mappedItem) => {
    return mappedItem.value === moduloRemainder;
  });

  barcodeLengths = [
    ...barcodeLengths,
    ...checkBit.pattern,
    ...stopCode,
    ...new Array(6).fill(0),
  ];

  return {
    barcodeSum: barcodeLengths.reduce((a, b) => a + b, 0) + 12,
    barcodeLengths,
  };
}

function createBarCode(message, type, scaleX, shouldAddMarkers, barColor) {
  const { barcodeSum, barcodeLengths } = getBarcodeStats(message, type);

  if (barColor !== "black" && barColor !== "#000000") {
    shouldAddMarkers = false;
  }

  const canvas = document.createElement("canvas");
  canvas.width = barcodeSum * scaleX;

  const ctx = canvas.getContext("2d");

  const monospaceOnePX = 0.60205078125;
  const heightPerPXForLimits = 1.4;
  const maxHeightPX = (shouldAddMarkers ? 40 : 50) / heightPerPXForLimits;

  const maxPX = (canvas.width - 20) / (monospaceOnePX * message.length);

  ctx.font = `${Math.min(maxHeightPX, maxPX)}px monospace`;

  const measuredText = ctx.measureText(message);

  let actualHeight =
    measuredText.actualBoundingBoxAscent +
    measuredText.actualBoundingBoxDescent;

  const fontRatio = canvas.width / (message.length + 4);

  if (fontRatio < 8) {
    canvas.height = shouldAddMarkers ? 110 : 100;
  }

  let sum = 0;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, barcodeSum * scaleX, 150);

  barcodeLengths.forEach((value, index) => {
    // Create barcode
    if (index % 2 === 1 || value === 0) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = barColor;
    }

    const currentBarWidth = value === 0 ? scaleX : value * scaleX;

    ctx.fillRect(sum, 0, currentBarWidth, 100);

    // Create colored Box's to show different area's of barcode
    if (shouldAddMarkers) {
      ctx.fillStyle = "green"; // Quiet area
      if (index < barcodeLengths.length - 6) {
        ctx.fillStyle = "purple"; // Stop bit
      }
      if (index < barcodeLengths.length - 7) {
        ctx.fillStyle = "red"; // Stop code
      }
      if (index < barcodeLengths.length - 12) {
        ctx.fillStyle = "orange"; // Check code
      }
      if (index < barcodeLengths.length - 18) {
        ctx.fillStyle = "blue"; // Main data
      }
      if (index < 12) {
        ctx.fillStyle = "red"; // Start code
      }
      if (index < 6) {
        ctx.fillStyle = "green"; // Quiet area
      }

      ctx.fillRect(sum, 100, currentBarWidth + 1, 10);
    }

    sum += currentBarWidth;
  });

  ctx.fillStyle = "black";

  if (fontRatio > 8) {
    ctx.fillText(
      message,
      //prettier-ignore
      (canvas.width / 2) - (measuredText.width / 2),
      //prettier-ignore
      ( (canvas.height - 3) + (actualHeight / 2) ) - ((shouldAddMarkers ? 40 : 50) / 2)
    );
  }

  return canvas;
}
