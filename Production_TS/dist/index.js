"use strict";
// simple way: 
// class User{
//     email: string;
//     name: string;
//     city: string;
//     state: string;
//     constructor(email: string, name: string, city: string, state: string){
//         this.email = email;
//         this.name = name;
//         this.city = city;
//         this.state = state;
//     }
// }
// class User {
//     private email: string;    // property of class User
//     private name: string;     // property of class User
//     private city?: string;    // optional attribute (?)
//     private readonly state?: string;  //  readonly cannot be changed
//     constructor(email: string, name: string, city?: string, state?: string){
//         this.email = email;
//         this.name = name
//         this.city = city;
//         this.state = state;
//     }
// }
// more professional way
class User {
    constructor(_email, _name, city, state) {
        this._email = _email;
        this._name = _name;
        this.city = city;
        this.state = state;
        this._courseCount = 1;
    }
    // getter
    get name() { return this._name; }
    get email() { return this._email; }
    get courseCount() { return this._courseCount; }
    // setter
    set name(name) {
        this._name = name;
    }
    set email(email) {
        this._email = email;
    }
    set courseCount(courseCount) {
        if (courseCount < 1) {
            throw new Error('course count cannot be < 1');
        }
        this._courseCount = courseCount;
    }
}
const user1 = new User("amrik.bhadra@gmail.com", "Amrik Bhadra", "Pune", "Maharashtra");
console.log(user1);
// user1.state = 'Jharkhand'   // -> gives error
console.log(user1.name);
user1.name = 'Ricky';
class SubUser extends User {
    constructor() {
        super(...arguments);
        this.isFamily = true;
    }
    changeCourseCount() {
        this._courseCount = 4;
    }
}
//# sourceMappingURL=index.js.map