"use strict";
// number - can be integer, float, hex
let year = 2025;
let price = 139.77;
let hex = 0xff;
let binary = 0b1010;
let octal = 0o755;
const nonValue = NaN;
const infiniteValue = Infinity;
// string
let firstName = "Amrik";
// allows string interpolation
let greetings = `Good Morning! ${firstName}`;
// let myNum: string = 123; ❌
// boolean
let isMinor = false;
let isLoggedIn = true;
//type saftey
// isMinor = 'No'; ❌
// bigint
// let largeNumber: bigint = 9007199254740995n;
// symbol: Represents unique, immutable identifiers (used for object property keys, etc).
let sym1 = Symbol("unique");
let sym2 = Symbol("unique");
console.log(sym1 === sym2); // false
// null: intentional absence of value
// undefined: Variable has been declared but not yet assigned a value.
let empty = null;
let notAssigned = undefined;
// By default, variables declared but not initialized get 'undefined'
let x;
console.log(x); // undefined
// Assignability
// By default with strictNullChecks enabled (recommended), only null can be assigned to null, and only undefined to undefined:
// let test: string = null; // Error if strictNullChecks is on
// let obj: null = undefined; // Error: Type 'undefined' is not assignable to type 'null'
