export function pushToArray(arr: number[], ...numbers: number[]): void {
    numbers.forEach((num) => arr.push(num));
}

export function popFromArray(arr: number[]): void {
    arr.pop();
}

export function arraySum(arr: number[]): number {
    return arr.reduce((sum, num) => sum + num, 0);
}