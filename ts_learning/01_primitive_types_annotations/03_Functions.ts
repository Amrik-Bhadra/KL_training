function add(num1: number, num2: number): number {
    return num1 + num2;
}

console.log(add(34, 43));
// console.log(add('4', 56)); // Error: Argument of type 'string' is not assignable to parameter of type 'number'


// with arrow functions
const subtract = (num1: number, num2: number): number => {
    return num1 - num2;
}

console.log(subtract(23, 11));