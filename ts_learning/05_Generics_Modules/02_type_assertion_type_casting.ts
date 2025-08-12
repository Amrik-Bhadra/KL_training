// type assertion: telling the typescript, whats the type of a particular variablem
// use it know when you are sure about the tyoe of that variable

let a: any = 12;

// (a as string)  or  <string>a     ---> this is type assertion
// Number(a)                        ---> this is typecasting


// Non-null assertion operator
let b: null | undefined | string;

b = "hello"; // u are sure always string will be stored in b

// then if we write:  b!  (! ensures that value in b will not be null/undefined)

b = b!.replace("l", "m");
console.log(b);
b = null;
console.log(b);