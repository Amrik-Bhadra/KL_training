"use strict";
// Tuples: fixed-length array in which we have data-type for each  position
// let user: [string, number] = ["Alice", 25];
// real world usecase: when you
// 1. Returning multiple values from a function:
function getUser() {
    return ["Amrik", 22];
}
const [username, userage] = getUser();
const point = [23, 34];
// optional elements in tupes
const myTuple = ['apple', 45];
const myTuple2 = ['banana', , 32];
const myuser = ["Rita", 30];
