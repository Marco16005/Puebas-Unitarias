const { classifyTriangle } = require("./src/triangleClassifier");

function runFromCLI(rawArgs) {
  if (rawArgs.length !== 3) {
    throw new Error("Debes proporcionar exactamente 3 enteros.");
  }

  const sides = rawArgs.map((value) => Number(value));

  if (!sides.every((value) => Number.isInteger(value))) {
    throw new Error("Los argumentos deben ser enteros.");
  }

  return classifyTriangle(sides[0], sides[1], sides[2]);
}

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
