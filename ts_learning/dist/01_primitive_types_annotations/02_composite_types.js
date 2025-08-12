"use strict";
/*
    Union:
    --> allows a variable to hold one of several types, instead of just one
    --> used using pipe (|) symbol
*/
let value; //The value can be either a string or a number — not both at once, but one of the two.
value = 'HELLO';
value = 34;
// value = false;  // Error: Type 'boolean' is not assignable to type 'InputType'.
/*
    Why Use Union Types?
    --> when value can possibly be of more than one type
    --> to make flexible APIs
    --> to handle multiple input formats (example: userId can be string or number)
*/
// using union as function parameter
function prinUserId(userId) {
}
