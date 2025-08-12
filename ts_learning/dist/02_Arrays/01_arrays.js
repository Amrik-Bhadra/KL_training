"use strict";
//Type 1:
const scores = [90, 78, 98];
//Type 2:
const names = []; // using generic Array<T>
names.push('Amrik Bhadra'); // no error
let cart = [
    { name: "Book", price: 200 },
    { name: "Phone", price: 150 }
];
// readonly: The readonly keyword can prevent arrays from being changed.
const books = ['Hamlet', 'The Odyssey', 'The Stranger'];
// books.push('Do Epic Shit');  // Error: Property 'push' does not exist on type 'readonly string[]'
// ReadonlyArray<T>  for creating readonly arrays
const colors = ['red', 'while', 'black', 'pink'];
