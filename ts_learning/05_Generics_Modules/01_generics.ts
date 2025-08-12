//Create a function which will accept any type of value and print it

function logger<T>(a: T) {
    console.log(a);
}

logger<string>("hey");
logger<number>(45);
logger(true);  // we can leave the type here, typescript infer automatically


function myFunc<T>(a: T, b: string, c: number) {
    console.log(a, b, c);
}

myFunc<string>('Hello', 'World', 3000);

//--------------------------------------------------------------------------------------------------

// generics with typescript
interface Data<T> {
    name: string;
    age: number;
    role: T;
}

function func1(obj: Data<string>) {
    console.log(obj);
}

func1({ name: 'Amrik', age: 22, role: 'full-stack' });

//--------------------------------------------------------------------------------------------------


// generic classes
class ClassMaker<T> {
    constructor(public key: T) { }
}

const b1 = new ClassMaker<string>('hey');
const b2 = new ClassMaker<number>(45);
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


function func2<T>(a: T, b: T): T {
    // return "hey" as T;
    // or
    return <T>"hey";

}

func2<string>("Hello", 'World');