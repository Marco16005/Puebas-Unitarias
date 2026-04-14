const { classifyTriangle } = require("./src/triangleClassifier");

/**
 * Parses CLI arguments and validates they represent exactly 3 integer sides.
 * @param {string[]} rawArgs
 * @returns {number[]}
 */
function parseCliSides(rawArgs) {
  if (rawArgs.length !== 3) {
    throw new Error("Debes proporcionar exactamente 3 enteros.");
  }

  const sides = rawArgs.map((value) => Number(value));

  if (!sides.every((value) => Number.isInteger(value))) {
    throw new Error("Los argumentos deben ser enteros.");
  }

  return sides;
}

/**
 * Runs triangle classification from CLI-style string arguments.
 * @param {string[]} rawArgs
 * @returns {string}
 */
function runFromCLI(rawArgs) {
  const [a, b, c] = parseCliSides(rawArgs);
  return classifyTriangle(a, b, c);
}

// Prevent side effects when this module is imported by tests or other modules.
if (require.main === module) {
  try {
    const result = runFromCLI(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  runFromCLI,
};
