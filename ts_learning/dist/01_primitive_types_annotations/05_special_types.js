"use strict";
// any
let myValue;
myValue = 5;
myValue = 'five';
myValue = false;
// unknown
let input;
input = 'text';
input = 50;
input = [1, 2, 3, 4];
function run(task) {
    if (typeof task === "string") {
        console.log(task.toLowerCase());
    }
}
// void
function display(name) {
    console.log(`My name is ${name}`);
}
let result = undefined;
// never
function throwError(msg) {
    throw new Error(msg);
}
function infinite() {
    while (true) {
        console.log('infinite loop');
    }
}
