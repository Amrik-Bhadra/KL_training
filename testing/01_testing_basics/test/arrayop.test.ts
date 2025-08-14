import { arraySum, popFromArray, pushToArray } from "../src/utils/arrayOperations.util";

// nested describe
describe('Testing Array Operations', () => {
    let arr: number[];
    beforeEach(() => {
        arr = [];
    });

    // describe.skip() skips the test inside this describe

    describe("test push method", () => {
        it('should contain 5 in array', () => {
            pushToArray(arr, 5);
            expect(arr).toContain(5);
        });
    });

    // describe.only(): runs only the tests present insde this and skips all others
    describe.only("test pop method", ()=>{
        it('should remove last item', () => {
            pushToArray(arr, 1, 2, 3);
            popFromArray(arr)
            expect(arr).toEqual([1, 2]);
        });
    });

    describe('test array sum', () => {
        test('array sum should be 10', () => {
            expect(arraySum([1, 2, 3, 4])).toBe(10);
        });
    });
});