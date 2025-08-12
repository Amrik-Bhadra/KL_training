//Type 1:
const scores: number[] = [90, 78, 98];

//Type 2:
const names: Array<String> = [];  // using generic Array<T>

names.push('Amrik Bhadra'); // no error
// names.push(30); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.


// Arrays with custom type:
type Product = { name: string, price: number };

let cart: Product[] = [
    { name: "Book", price: 200 },
    { name: "Phone", price: 150 }
];



// readonly: The readonly keyword can prevent arrays from being changed.
const books: readonly string[] = ['Hamlet', 'The Odyssey', 'The Stranger'];
// books.push('Do Epic Shit');  // Error: Property 'push' does not exist on type 'readonly string[]'


// ReadonlyArray<T>  for creating readonly arrays
const colors: ReadonlyArray<string> = ['red', 'while', 'black', 'pink'];

