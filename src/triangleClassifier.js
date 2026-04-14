const MAX_SIDE = 1000000;

const TRIANGLE_TYPES = Object.freeze({
  EQUILATERO: "Equilatero",
  ISOSCELES: "Isosceles",
  ESCALENO: "Escaleno",
});

const ERROR_MESSAGES = Object.freeze({
  EXACTLY_THREE_PARAMETERS: "Se requieren exactamente 3 parametros.",
  INTEGERS_REQUIRED: "Los lados deben ser enteros.",
  POSITIVE_REQUIRED: "Los lados deben ser mayores que 0.",
  INVALID_TRIANGLE: "No es un triangulo valido.",
});

/**
 * Builds the validation message for sides that exceed the allowed max value.
 * @param {number} maxSide
 * @returns {string}
 */
function outOfRangeMessage(maxSide) {
  return `Los lados deben ser menores o iguales a ${maxSide}.`;
}

/**
 * Ensures the API receives exactly three arguments.
 * @param {number} argsLength
 */
function ensureExactlyThreeParameters(argsLength) {
  if (argsLength !== 3) {
    throw new Error(ERROR_MESSAGES.EXACTLY_THREE_PARAMETERS);
  }
}

/**
 * Ensures all sides are integers (no floats, no strings, no NaN).
 * @param {number[]} sides
 */
function ensureIntegerSides(sides) {
  if (!sides.every((side) => Number.isInteger(side))) {
    throw new Error(ERROR_MESSAGES.INTEGERS_REQUIRED);
  }
}

/**
 * Ensures all sides are strictly greater than zero.
 * @param {number[]} sides
 */
function ensurePositiveSides(sides) {
  if (!sides.every((side) => side > 0)) {
    throw new Error(ERROR_MESSAGES.POSITIVE_REQUIRED);
  }
}

/**
 * Ensures all sides are within the accepted upper bound.
 * @param {number[]} sides
 * @param {number} maxSide
 */
function ensureSidesWithinRange(sides, maxSide) {
  if (!sides.every((side) => side <= maxSide)) {
    throw new Error(outOfRangeMessage(maxSide));
  }
}

/**
 * Returns the sides in ascending order to evaluate inequalities consistently.
 * @param {number[]} sides
 * @returns {number[]}
 */
function getSortedSides(sides) {
  return [...sides].sort((left, right) => left - right);
}

/**
 * Validates the strict triangle inequality.
 * @param {number} smallest
 * @param {number} middle
 * @param {number} largest
 */
function ensureStrictTriangleInequality(smallest, middle, largest) {
  if (smallest + middle <= largest) {
    throw new Error(ERROR_MESSAGES.INVALID_TRIANGLE);
  }
}

/**
 * Classifies a triangle from three side lengths.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {string}
 * @throws {Error} If any input validation rule fails.
 */
function classifyTriangle(a, b, c) {
  // Validate domain rules first so classification logic stays simple and predictable.
  ensureExactlyThreeParameters(arguments.length);

  const sides = [a, b, c];
  ensureIntegerSides(sides);
  ensurePositiveSides(sides);
  ensureSidesWithinRange(sides, MAX_SIDE);

  // Sort once to evaluate the strict triangle inequality in canonical order.
  const [smallest, middle, largest] = getSortedSides(sides);
  ensureStrictTriangleInequality(smallest, middle, largest);

  if (smallest === largest) {
    return TRIANGLE_TYPES.EQUILATERO;
  }

  if (smallest === middle || middle === largest) {
    return TRIANGLE_TYPES.ISOSCELES;
  }

  return TRIANGLE_TYPES.ESCALENO;
}

module.exports = {
  classifyTriangle,
  MAX_SIDE,
  TRIANGLE_TYPES,
  ERROR_MESSAGES,
  outOfRangeMessage,
};
