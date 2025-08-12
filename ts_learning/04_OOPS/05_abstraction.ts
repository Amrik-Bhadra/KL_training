/*
    Abstraction focuses on exposing only relevant functionalities and hiding unnecessary details (implementation).

    Interfaces and abstract classes define what a thing can do rather than how.
*/

interface Vehicle {
    startEngine(): void;
    move(): void;
}

class MyCar implements Vehicle {
    startEngine(): void {
        console.log('Engine starts');
    }

    move(): void {
        console.log('Car is moving');
    }
}



abstract class Animal {
    constructor(public name: string) { }

    // abstract methods must be defined/implemented by subclass
    abstract makeSound(): void;

    move(): void {
        console.log(`${this.name} is moving.`);
    }
}

class Doggy extends Animal {
    constructor(public name: string, public breed: string ){
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}


const husky = new Doggy('Danny', 'husky');
husky.makeSound();
husky.move();