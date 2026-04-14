const {
  classifyTriangle,
  MAX_SIDE,
  TRIANGLE_TYPES,
  ERROR_MESSAGES,
  outOfRangeMessage,
} = require("../src/triangleClassifier");

describe("Clases de equivalencia - casos validos", () => {
  test("Equilatero", () => {
    // Arrange
    const a = 6;
    const b = 6;
    const c = 6;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(TRIANGLE_TYPES.EQUILATERO);
  });

  test.each([
    [8, 8, 5],
    [8, 5, 8],
    [5, 8, 8],
  ])("Isosceles (permutaciones) - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const expected = TRIANGLE_TYPES.ISOSCELES;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test("Escaleno", () => {
    // Arrange
    const a = 4;
    const b = 5;
    const c = 6;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(TRIANGLE_TYPES.ESCALENO);
  });
});

describe("Clases de equivalencia - casos invalidos", () => {
  test("Triangulo imposible", () => {
    // Arrange
    const act = () => classifyTriangle(10, 3, 3);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.INVALID_TRIANGLE);
  });

  test.each([
    [0, 4, 4],
    [4, 0, 4],
    [4, 4, 0],
  ])("Uno o mas lados en 0 - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.POSITIVE_REQUIRED);
  });

  test.each([
    [-1, 4, 4],
    [4, -1, 4],
    [4, 4, -1],
  ])("Lados negativos - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.POSITIVE_REQUIRED);
  });

  test.each([
    [4.5, 4, 4],
    [4, 4.5, 4],
    [4, 4, 4.5],
  ])("Lados flotantes - (%f, %f, %f)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.INTEGERS_REQUIRED);
  });

  test.each([
    () => classifyTriangle(4, 4),
    () => classifyTriangle(4, 4, 4, 4),
  ])("Numero incorrecto de parametros", (act) => {
    // Arrange
    const action = act;

    // Act + Assert
    expect(action).toThrow(ERROR_MESSAGES.EXACTLY_THREE_PARAMETERS);
  });
});

describe("Condiciones de borde", () => {
  test.each([
    [100, 100, 99],
    [100, 99, 100],
    [99, 100, 100],
  ])("1) Isosceles casi equilatero - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const expected = TRIANGLE_TYPES.ISOSCELES;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test.each([
    [101, 100, 99],
    [100, 99, 98],
  ])("2) Escaleno casi isosceles/equilatero - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const expected = TRIANGLE_TYPES.ESCALENO;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test.each([
    [1, 1, 1, TRIANGLE_TYPES.EQUILATERO],
    [2, 2, 3, TRIANGLE_TYPES.ISOSCELES],
    [2, 3, 4, TRIANGLE_TYPES.ESCALENO],
  ])("3) Triangulos muy pequenos - (%i, %i, %i)", (a, b, c, expected) => {
    // Arrange
    const expectedType = expected;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expectedType);
  });

  test.each([
    [MAX_SIDE, MAX_SIDE, MAX_SIDE, TRIANGLE_TYPES.EQUILATERO],
    [MAX_SIDE, MAX_SIDE, MAX_SIDE - 1, TRIANGLE_TYPES.ISOSCELES],
    [MAX_SIDE, MAX_SIDE - 1, MAX_SIDE - 2, TRIANGLE_TYPES.ESCALENO],
  ])("4) Triangulos muy grandes - (%i, %i, %i)", (a, b, c, expected) => {
    // Arrange
    const expectedType = expected;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expectedType);
  });

  test.each([
    [1, MAX_SIDE, MAX_SIDE],
    [MAX_SIDE, 1, MAX_SIDE],
    [MAX_SIDE, MAX_SIDE, 1],
  ])("5) Lados muy largo y muy corto (todas las posiciones) - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const expected = TRIANGLE_TYPES.ISOSCELES;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test.each([
    [MAX_SIDE + 1, MAX_SIDE, MAX_SIDE],
    [MAX_SIDE, MAX_SIDE + 1, MAX_SIDE],
    [MAX_SIDE, MAX_SIDE, MAX_SIDE + 1],
  ])("6) Lado fuera de rango - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(outOfRangeMessage(MAX_SIDE));
  });

  test.each([
    [10, 4, 6],
    [4, 10, 6],
    [4, 6, 10],
  ])("7) Un lado igual a la suma de los otros dos - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.INVALID_TRIANGLE);
  });

  test.each([
    [9, 4, 6],
    [4, 9, 6],
    [4, 6, 9],
  ])("8) Un lado apenas menor a la suma de los otros dos - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const expected = TRIANGLE_TYPES.ESCALENO;

    // Act
    const result = classifyTriangle(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test.each([
    [11, 4, 6],
    [4, 11, 6],
    [4, 6, 11],
  ])("9) Un lado apenas mayor a la suma de los otros dos - (%i, %i, %i)", (a, b, c) => {
    // Arrange
    const act = () => classifyTriangle(a, b, c);

    // Act + Assert
    expect(act).toThrow(ERROR_MESSAGES.INVALID_TRIANGLE);
  });
});
