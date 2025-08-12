// number - can be integer, float, hex
let year: number = 2025;
let price: number = 139.77;
let hex: number = 0xff;
let binary: number = 0b1010;
let octal: number = 0o755;
const nonValue: number = NaN;
const infiniteValue: number = Infinity;


// string
let firstName: string = "Amrik";
// allows string interpolation
let greetings = `Good Morning! ${firstName}`; 

// let myNum: string = 123; ❌


// boolean
let isMinor: boolean = false;
let isLoggedIn: boolean = true;

//type saftey
// isMinor = 'No'; ❌



// bigint
// let largeNumber: bigint = 9007199254740995n;


// symbol: Represents unique, immutable identifiers (used for object property keys, etc).
let sym1: symbol = Symbol("unique");
let sym2: symbol = Symbol("unique");

console.log(sym1 === sym2); // false


// null: intentional absence of value
// undefined: Variable has been declared but not yet assigned a value.
let empty: null = null;
let notAssigned: undefined = undefined

// By default, variables declared but not initialized get 'undefined'
let x;
console.log(x); // undefined


// Assignability
// By default with strictNullChecks enabled (recommended), only null can be assigned to null, and only undefined to undefined:

// let test: string = null; // Error if strictNullChecks is on
// let obj: null = undefined; // Error: Type 'undefined' is not assignable to type 'null'
