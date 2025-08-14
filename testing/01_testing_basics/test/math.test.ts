import { add, multiply } from "../src/utils/mathOperations.util";

// describe used to group multiple tests
describe("Testing Math Utilities", () => {
    test("add multiple values", () => {
        expect(add(2, 3, 4, 1)).toBe(10);
        expect(add(10, 20, 30)).toBe(60);
    });

    test("multiply multiple values", () => {
        expect(multiply(3, 5, 2)).toBe(30);
        expect(multiply(4, -2, 5)).toBe(-40);
    });
});



