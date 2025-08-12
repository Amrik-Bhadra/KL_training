// static -> accessing class propertie/methods without creating object of class
// can access directly using class reference

class MyModule{
    static verion = '1.0.0';

    static getRandomNumber(): number{
        return Math.floor(Math.random() * 10);
    }
}

console.log(`My Module's version: ${MyModule.verion}`);
console.log(MyModule.getRandomNumber());