"use strict";
// numeric: values are auto-increment , starting from 0
var nums;
(function (nums) {
    nums[nums["zero"] = 0] = "zero";
    nums[nums["one"] = 1] = "one";
    nums[nums["two"] = 2] = "two";
    nums[nums["three"] = 3] = "three";
    nums[nums["four"] = 4] = "four"; // 4
})(nums || (nums = {}));
console.log(nums.three); // 3
// provide value for initial enum, and furuther will be auto-increment
var values;
(function (values) {
    values[values["a"] = 10] = "a";
    values[values["b"] = 11] = "b";
    values[values["c"] = 12] = "c";
    values[values["d"] = 13] = "d";
    values[values["e"] = 14] = "e"; // 14
})(values || (values = {}));
// string enums
var Codes;
(function (Codes) {
    Codes[Codes["OK"] = 200] = "OK";
    Codes[Codes["BadRequest"] = 400] = "BadRequest";
})(Codes || (Codes = {}));
console.log(Codes.OK); // 200
console.log(Codes[200]); // "OK"
