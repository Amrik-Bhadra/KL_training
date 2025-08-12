"use strict";
/*
    Abstraction focuses on exposing only relevant functionalities and hiding unnecessary details (implementation).

    Interfaces and abstract classes define what a thing can do rather than how.
*/
class MyCar {
    startEngine() {
        console.log('Engine starts');
    }
    move() {
        console.log('Car is moving');
    }
}
class Animal {
    constructor(name) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} is moving.`);
    }
}
class Doggy extends Animal {
    constructor(name, breed) {
        super(name);
        this.name = name;
        this.breed = breed;
    }
    makeSound() {
        console.log(`${this.name} says: Woof!`);
    }
}
const husky = new Doggy('Danny', 'husky');
husky.makeSound();
husky.move();
