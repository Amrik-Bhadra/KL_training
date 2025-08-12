// method overloading

class SumOfNums{
    // function signatures
    public static sum(a: number, b: number): number;
    public static sum(a: number, b: number, c: number): number;
    
    public static sum(a: number, b: number, c?: number): number {
        if(typeof(c) === "number"){
            return a + b + c;
        }

        return a + b;
    }

}

console.log(SumOfNums.sum(1, 2));
console.log(SumOfNums.sum(1, 2, 3));