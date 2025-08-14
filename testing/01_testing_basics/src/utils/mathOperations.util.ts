export function add(...numbers: number[]): number {
    const sum: number = numbers.reduce((sum, num) => sum + num, 0);
    return sum;
}

export function multiply(...numbers: number[]): number {
    const product: number = numbers.reduce((product, num) => product * num, 1);
    return product;
}

export function divide(dividend: number, divisor: number): number {
    if (divisor == 0) throw new Error("Division by zero");

    return dividend / divisor;
}