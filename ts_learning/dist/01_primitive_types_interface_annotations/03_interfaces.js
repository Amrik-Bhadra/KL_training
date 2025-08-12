"use strict";
// interface defines shape of object - properties and its types present in the object
// mainly used for objects and class-like structures, including React Component Props
// as variable
const user1 = {
    firstName: 'Amrik',
    lastName: 'Bhadra',
    email: 'amrik.bhadra@gmail.com',
    phoneNumber: 7739226540,
    isLoggedIn: false
};
// as function parameter
function greetUser(user) {
    if (user.isLoggedIn) {
        console.log(`Good Morning! ${user.firstName} ${user.lastName}`);
    }
    else {
        console.log('Please login first');
    }
}
greetUser(user1);
user1.isLoggedIn = true;
greetUser(user1);
// as return value from function
function createUser(firstName, lastName, email, phoneNumber, isLoggedIn) {
    return {
        firstName, phoneNumber, lastName, email, isLoggedIn
    };
}
let user2 = createUser('Srivaths', 'Iyer', 'srivaths.iyer@gmail.com', 9878676790, true);
greetUser(user2);
