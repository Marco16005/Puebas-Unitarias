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

function outOfRangeMessage(maxSide) {
  return `Los lados deben ser menores o iguales a ${maxSide}.`;
}

function classifyTriangle(a, b, c) {
  if (arguments.length !== 3) {
    throw new Error(ERROR_MESSAGES.EXACTLY_THREE_PARAMETERS);
  }

  const sides = [a, b, c];

  if (!sides.every((side) => Number.isInteger(side))) {
    throw new Error(ERROR_MESSAGES.INTEGERS_REQUIRED);
  }

  if (!sides.every((side) => side > 0)) {
    throw new Error(ERROR_MESSAGES.POSITIVE_REQUIRED);
  }

  if (!sides.every((side) => side <= MAX_SIDE)) {
    throw new Error(outOfRangeMessage(MAX_SIDE));
  }

  // Sort once to evaluate the strict triangle inequality in canonical order.
  const [smallest, middle, largest] = [...sides].sort((left, right) => left - right);
  if (smallest + middle <= largest) {
    throw new Error(ERROR_MESSAGES.INVALID_TRIANGLE);
  }

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
