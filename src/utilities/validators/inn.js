function checkDigit(inn, coefficients) {
  let n = 0;
  for (const i in coefficients) {
    n += coefficients[i] * inn[i];
  }
  return parseInt(n % 11 % 10, 10);
}

const n10 = [2, 4, 10, 3, 5, 9, 4, 6, 8];
const n11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
const n12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

export default function validateInn(inn) {
  let result = false;

  switch (inn.length) {
    case 10:
      if (checkDigit(inn, n10) === parseInt(inn[9], 10)) {
        result = true;
      }
      break;
    case 12:
      if ((checkDigit(inn, n11) === parseInt(inn[10], 10)) && (checkDigit(inn, n12) === parseInt(inn[11], 10))) {
        result = true;
      }
      break;
    // no default
  }

  return result;
}
