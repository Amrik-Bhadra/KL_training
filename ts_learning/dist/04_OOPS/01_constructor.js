"use strict";
class BottleMaker {
    constructor(name, price, waranty = 4) {
        this.name = name;
        this.price = price;
        this.waranty = waranty;
    }
}
// creating object of BottleMaker class
const bottle1 = new BottleMaker('Milton x2', 1200, 2);
const bottle2 = new BottleMaker('Cello z1', 2300);
class MusicMaker {
    constructor(name, duration, isFree, thumbnail = 'thumbnail1.jpg') {
        this.name = name;
        this.duration = duration;
        this.isFree = isFree;
        this.thumbnail = thumbnail;
    }
}
const m1 = new MusicMaker('Jugrafia', 4.3, false);
// this keyword
class abcd {
    constructor() {
        this.name = 'amrik';
    }
    changeName(newName) {
        this.name = newName;
    }
}
// access specifiers
// public: accessible within class and outside the class
// private: accessible within the class only; cannot access in children classes also (inheritance)
// protected: accessible within the parent class and its children classes aswell
class Chocolate {
    constructor(name) {
        this.name = name;
    }
    display() {
        console.log(this.name);
    }
}
const chocolate1 = new Chocolate('Kit Kat');
console.log(chocolate1.display());
// console.log(chocolate1.name);  // cannot access it here
class Bike {
    constructor(brand) {
        this.brand = brand;
    }
}
class ElectricBike extends Bike {
    // readonly -> cannot be changed later once provided the value
    constructor(brand, name, isManual) {
        super(brand);
        this.isManual = isManual;
        this.name = name;
    }
}
const bike1 = new ElectricBike('BMW', 'S1000RR', false);
