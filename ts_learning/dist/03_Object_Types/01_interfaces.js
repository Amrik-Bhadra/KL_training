"use strict";
// // interface defines shape of object - properties and its types present in the object
// // mainly used for objects and class-like structures, including React Component Props
// interface User {
//     firstName: string,
//     lastName: string,
//     email: string,
//     phoneNumber: number,
//     isLoggedIn: boolean
// }
// // as variable
// const user1: User = {
//     firstName: 'Amrik',
//     lastName: 'Bhadra',
//     email: 'amrik.bhadra@gmail.com',
//     phoneNumber: 7739226540,
//     isLoggedIn: false
// }
// // as function parameter
// function greetUser(user: User) {
//     if (user.isLoggedIn) {
//         console.log(`Good Morning! ${user.firstName} ${user.lastName}`);
//     } else {
//         console.log('Please login first');
//     }
// }
// greetUser(user1);
// user1.isLoggedIn = true;
// greetUser(user1);
// // as return value from function
// function createUser(firstName: string, lastName: string, email: string, phoneNumber: number, isLoggedIn: boolean): User {
//     return {
//         firstName, phoneNumber, lastName, email,  isLoggedIn
//     }
// }
// let user2: User = createUser('Srivaths', 'Iyer', 'srivaths.iyer@gmail.com', 9878676790, true);
// greetUser(user2);
// // optional and readonly
// interface Config {
//   url: string;
//   timeout?: number; // Optional property
//   readonly version: string; // Readonly property
// }
// const conf: Config = { url: "api/test", version: "1.0" };
// conf.timeout = 5000;
// // conf.version = "2.0"; // Error: Cannot assign to 'version'[25][34]
