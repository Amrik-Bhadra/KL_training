"use strict";
// method overloading
class SumOfNums {
    static sum(a, b, c) {
        if (typeof (c) === "number") {
            return a + b + c;
        }
        return a + b;
    }
}
console.log(SumOfNums.sum(1, 2));
console.log(SumOfNums.sum(1, 2, 3));
