"use strict";
// static -> accessing class propertie/methods without creating object of class
// can access directly using class reference
class MyModule {
    static getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }
}
MyModule.verion = '1.0.0';
console.log(`My Module's version: ${MyModule.verion}`);
console.log(MyModule.getRandomNumber());
