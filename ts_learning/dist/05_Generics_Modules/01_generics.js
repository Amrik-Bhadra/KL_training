"use strict";
//Create a function which will accept any type of value and print it
function logger(a) {
    console.log(a);
}
logger("hey");
logger(45);
logger(true); // we can leave the type here, typescript infer automatically
function myFunc(a, b, c) {
    console.log(a, b, c);
}
myFunc('Hello', 'World', 3000);
function func1(obj) {
    console.log(obj);
}
func1({ name: 'Amrik', age: 22, role: 'full-stack' });
//--------------------------------------------------------------------------------------------------
// generic classes
class ClassMaker {
    constructor(key) {
        this.key = key;
    }
}
const b1 = new ClassMaker('hey');
const b2 = new ClassMaker(45);
//--------------------------------------------------------------------------------------------------
/*
    Note:

    function abcd<T>(a: T, b: T): T {
        return a;       // correct
        return b;       // correct
        return "hey";   // wrong as "hey" is string literal and return type is T (even though T is string type)

        return "hey" as T    ✅
    }

    abcd<string>("hello", "world");

*/
function func2(a, b) {
    // return "hey" as T;
    // or
    return "hey";
}
func2("Hello", 'World');
