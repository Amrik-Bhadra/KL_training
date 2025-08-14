import { divide } from "../src/utils/mathOperations.util";

test("should divide two numbers", () => {
    expect(divide(10, 2)).toBe(5);
});

test("should throw error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
});